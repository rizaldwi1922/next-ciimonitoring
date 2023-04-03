// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const session =request.cookies.get('session')?.value;
    if(!session){
      return NextResponse.redirect(new URL('/authentication/login', request.url))
    }
      
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:path*',
}