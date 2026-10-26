import { llmsText } from '../ai-facts';
export const dynamic = 'force-static';
export function GET() {
  return new Response(llmsText(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
