#!/bin/bash
# Ship ohanalabs.app to the NAS: copy source, build the image there, restart.
# The Komodo stack `ohanalabs` runs image ohanalabs:latest. Nothing is in a
# registry, so the build has to happen on the NAS itself.
set -euo pipefail
cd "$(dirname "$0")/.."

# NEXT_PUBLIC_CLOUDKIT_TOKEN is inlined at build time and only the /lumen
# editor uses it; without it the rest of the site is fine and /lumen cannot
# reach iCloud. Export it before running this, or put it in .env.local.
TOKEN="${NEXT_PUBLIC_CLOUDKIT_TOKEN:-}"
if [[ -z "$TOKEN" && -f .env.local ]]; then
  TOKEN=$(grep -E '^NEXT_PUBLIC_CLOUDKIT_TOKEN=' .env.local | cut -d= -f2- | tr -d '"'"'"'' || true)
fi
[[ -z "$TOKEN" ]] && echo "warning: no NEXT_PUBLIC_CLOUDKIT_TOKEN - /lumen will not sign in to iCloud" >&2

COPYFILE_DISABLE=1 tar --no-xattrs --exclude .git --exclude node_modules --exclude .next -czf - . |
  ssh nas "set -e
    d=/volume1/docker/ohanalabs/src
    rm -rf \$d.new && mkdir -p \$d.new
    tar -xzf - -C \$d.new
    rm -rf \$d && mv \$d.new \$d
    docker build -q --build-arg NEXT_PUBLIC_CLOUDKIT_TOKEN='$TOKEN' -t ohanalabs:latest \$d
    # The stack dir is root-only; recreate through a docker:cli helper.
    docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
      -v /etc/komodo/stacks/ohanalabs:/s -w /s docker:cli \
      docker compose -p ohanalabs up -d --no-deps web"
curl -fsS -o /dev/null -w 'www.ohanalabs.app -> HTTP %{http_code}\n' https://www.ohanalabs.app/
