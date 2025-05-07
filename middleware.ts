
// middleware.ts with log-in page:

// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function middleware(req: NextRequest) {
//   const cookie = req.cookies.get('auth')?.value
//   const pathname = req.nextUrl.pathname

//   console.log(`[middleware] Path: ${pathname}`)
//   console.log(`[middleware] Auth cookie: ${cookie}`)

//   const protectedPaths = ['/dashboard', '/about', '/contact', '/marketplaces']
//   const isProtected = protectedPaths.includes(pathname)

//   if (isProtected && cookie !== 'true') {
//     console.log('[middleware] 🚫 Redirecting to /login')
//     return NextResponse.redirect(new URL('/login', req.url))
//   }

//   console.log('[middleware] ✅ Allowing access')
//   return NextResponse.next()
// }

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  // Allow access to everything
  return NextResponse.next()
}
