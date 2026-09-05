import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/* Request header so the root layout can put the Google Ads tag in the
   real document <head> on Unattended routes only. Must be on the
   request, not the response, for headers() to see it. */
export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ['/unattended', '/unattended/:path*'],
};
