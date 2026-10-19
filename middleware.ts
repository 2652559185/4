export const config = {
  runtime: 'nodejs',
  matcher: ['/((?!api|assets|favicon.ico|sw.js|workbox-.*|folia-cover-sw.js).*)'],
};

export default function middleware(request: Request) {
  const url = new URL(request.url);
  const key = url.searchParams.get('key');

  if (key === '114514') {
    return new Response(null, {
      status: 302,
      headers: {
        'Location': url.pathname,
        'Set-Cookie': 'folia_auth=ok; Path=/; Max-Age=2592000; HttpOnly',
      },
    });
  }

  const cookie = request.headers.get('cookie') || '';
  if (cookie.includes('folia_auth=ok')) {
    return;
  }

  return new Response('向苍天大声的呼喊久安我爆米花', { status: 401 });
}
