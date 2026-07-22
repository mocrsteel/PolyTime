import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  const response = NextResponse.next({
    headers: requestHeaders,
  })
  response.headers.set('x-request-id', crypto.randomUUID().toUpperCase())

  console.log(response)

  return response
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!api|_next/static|_next/image|.*\\.png$).*)',
}
