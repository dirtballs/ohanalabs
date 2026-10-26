import { aiJson } from '../ai-facts';
export const dynamic = 'force-static';
export function GET() {
  return new Response(JSON.stringify(aiJson(), null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
