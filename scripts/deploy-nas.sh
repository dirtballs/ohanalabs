#!/bin/bash
# Ship ohanalabs.app to its self-hosted box: copy source, build the image
# there, restart the service. Nothing is in a registry, so the build has to
# happen on the host itself.
#
# Host-specific values live in scripts/deploy-nas.env (gitignored). Copy
# scripts/deploy-nas.env.example to scripts/deploy-nas.env and fill it in,
# or export the same variables before running this.
set -euo pipefail
cd "$(dirname "$0")/.."

[[ -f scripts/deploy-nas.env ]] && source scripts/deploy-nas.env

for v in DEPLOY_SSH_HOST DEPLOY_SRC_DIR DEPLOY_STACK_DIR; do
  if [[ -z "${!v:-}" ]]; then
    echo "error: $v is not set - see scripts/deploy-nas.env.example" >&2
    exit 1
  fi
done
STACK_NAME="${DEPLOY_STACK_NAME:-ohanalabs}"
IMAGE="${DEPLOY_IMAGE:-ohanalabs:latest}"
SERVICE="${DEPLOY_SERVICE:-web}"
SITE_URL="${DEPLOY_SITE_URL:-https://www.ohanalabs.app/}"

# NEXT_PUBLIC_CLOUDKIT_TOKEN is inlined at build time and only the /lumen
# editor uses it; without it the rest of the site is fine and /lumen cannot
# reach iCloud. Export it before running this, or put it in .env.local.
TOKEN="${NEXT_PUBLIC_CLOUDKIT_TOKEN:-}"
if [[ -z "$TOKEN" && -f .env.local ]]; then
  TOKEN=$(grep -E '^NEXT_PUBLIC_CLOUDKIT_TOKEN=' .env.local | cut -d= -f2- | tr -d '"'"'"'' || true)
fi
[[ -z "$TOKEN" ]] && echo "warning: no NEXT_PUBLIC_CLOUDKIT_TOKEN - /lumen will not sign in to iCloud" >&2

COPYFILE_DISABLE=1 tar --no-xattrs --exclude .git --exclude node_modules --exclude .next -czf - . |
  ssh "$DEPLOY_SSH_HOST" "set -e
    d='$DEPLOY_SRC_DIR'
    rm -rf \$d.new && mkdir -p \$d.new
    tar -xzf - -C \$d.new
    rm -rf \$d && mv \$d.new \$d
    docker build -q --build-arg NEXT_PUBLIC_CLOUDKIT_TOKEN='$TOKEN' -t '$IMAGE' \$d
    # The stack dir is root-only; recreate through a docker:cli helper.
    docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
      -v '$DEPLOY_STACK_DIR':/s -w /s docker:cli \
      docker compose -p '$STACK_NAME' up -d --no-deps '$SERVICE'"
# The container needs a few seconds to listen, and the tunnel a moment to
# pick up the new one, so a 502 right after the restart is expected.
for attempt in $(seq 1 20); do
  code=$(curl -s -o /dev/null -w '%{http_code}' "$SITE_URL" || true)
  [[ "$code" == "200" ]] && break
  sleep 3
done
echo "$SITE_URL -> HTTP $code"
[[ "$code" == "200" ]] || exit 1
