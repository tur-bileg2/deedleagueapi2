import { createClient } from '@/app/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Get the current URL to extract the code
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  
  // Get the origin to properly construct the redirect URL
  const origin = requestUrl.origin;
  
  console.log("Auth callback received with code:", code ? "present" : "missing");
  console.log("Current origin:", origin);
  
  if (code) {
    try {
      const supabase = await createClient();
      console.log("Supabase client created, attempting to exchange code for session");
      
      // Exchange the code for a session
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        console.error("Auth callback error:", error.message);
        console.error("Error object details:", JSON.stringify(error, null, 2));
        return NextResponse.redirect(new URL('/sign-in?error=' + encodeURIComponent(error.message), origin));
      }
      
      if (!data.session) {
        console.error("No session returned after code exchange");
        return NextResponse.redirect(new URL('/sign-in?error=No+session+returned', origin));
      }
      
      // After successful authentication, redirect to profile page
      console.log("Authentication successful, redirecting to profile");
      return NextResponse.redirect(new URL('/profile', origin));
    } catch (err) {
      console.error("Exception during auth flow:", err);
      return NextResponse.redirect(new URL('/sign-in?error=' + encodeURIComponent('Authentication error: ' + (err as Error).message), origin));
    }
  }
  
  // If there's no code, redirect to sign-in page
  console.log("No code found in auth callback, redirecting to sign-in");
  return NextResponse.redirect(new URL('/sign-in?error=Missing+authentication+code', origin));
}
