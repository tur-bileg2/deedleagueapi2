import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define protected routes that require authentication
const PROTECTED_ROUTES = ['/protected', '/api-docs', '/dashboard']

export async function middleware(request: NextRequest) {
  // Create a response object
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Create the Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    }
  )
  
  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get the pathname of the request
  const { pathname } = request.nextUrl

  // Check if the requested path is in protected routes
  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )

  // If it's a protected route and user is not authenticated, redirect to sign in
  if (isProtectedRoute && !user) {
    const redirectUrl = new URL('/sign-in', request.url)
    // Add a callback URL to return to after signing in
    redirectUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // User is already authenticated and trying to access auth pages
  if (user && (pathname === '/sign-in' || pathname === '/sign-up')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return response
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: [
    // Match all protected routes
    '/protected/:path*',
    '/api-docs/:path*', 
    '/dashboard/:path*',
    // Match auth routes
    '/sign-in',
    '/sign-up',
  ],
}
