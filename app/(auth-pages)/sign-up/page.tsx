import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "../../components/form-message";
import { SubmitButton } from "../../components/submit-button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import Link from "next/link";
import { Sparkles, CheckCircle, ArrowRight } from "lucide-react";
import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function SignUp(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  
  // Create a sign up with Google action
  async function signUpWithGoogle() {
    "use server";
    const supabase = await createClient();
    // Set the callback URL to the current origin
    const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://webscraper-eosin.vercel.app/";
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`
      }
    });
    
    if (error) {
      console.error("Google sign-up error:", error);
      // Redirect back to sign-up page with an error message
      return redirect(`/sign-up?message=${encodeURIComponent('Could not authenticate with Google')}&type=error`);
    }

    if (data.url) {
      // Redirect the user to the Google authentication page
      return redirect(data.url);
    }

    // Fallback redirect in case data.url is unexpectedly null
    return redirect('/sign-up?message=An unexpected error occurred&type=error');
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative bg-blue-600 text-white p-2 rounded-lg">
              <Sparkles className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
            </div>
            <h2 className="text-center text-3xl font-extrabold text-blue-600">Deed League API</h2>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/sign-in" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-100">
          <form className="space-y-6">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </Label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                  placeholder="********"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters</p>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <Label htmlFor="terms" className="font-medium text-gray-700">
                  I agree to the{' '}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
            </div>

            <div>
              <SubmitButton
                pendingText="Creating Account..." 
                formAction={signUpAction}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <CheckCircle className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
                </span>
                Sign up
              </SubmitButton>
            </div>
            
            <FormMessage message={searchParams} />
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <form action={signUpWithGoogle}>
                <button
                  type="submit"
                  className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                  </svg>
                  Sign up with Google
                </button>
              </form>
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Sparkles className="h-5 w-5 text-blue-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Benefits of creating an account
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Access to detailed player statistics</li>
                      <li>Save favorite players for quick reference</li>
                      <li>API access for developers</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <p className="mt-6 text-center text-xs text-gray-600">
          By signing up, you acknowledge that you have read and understood our{' '}
          <Link href="/data-policy" className="font-medium text-blue-600 hover:text-blue-500">
            Data Collection Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
