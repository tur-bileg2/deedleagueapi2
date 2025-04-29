'use client';

import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

/**
 * Helper function to add authorization headers to fetch requests
 */
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    throw new Error('Not authenticated');
  }
  
  const authHeaders = {
    'Authorization': `Bearer ${session.access_token}`,
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  return fetch(url, {
    ...options,
    headers: authHeaders,
  });
}

/**
 * Generate a secure random API key
 */
export function generateApiKey() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const keyLength = 32;
  let apiKey = '';
  
  // Generate a random string
  for (let i = 0; i < keyLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    apiKey += characters.charAt(randomIndex);
  }
  
  return apiKey;
}
