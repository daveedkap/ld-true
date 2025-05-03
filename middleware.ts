// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const isLoggedIn = req.cookies.get('auth')?.value === 'true'

  const protectedPaths = ['/dashboard']
  const pathname = req.nextUrl.pathname

  if (protectedPaths.includes(pathname) && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

// Protect only these paths
export const config = {
  matcher: ['/dashboard'],
}
