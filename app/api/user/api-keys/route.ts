import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { v4 as uuidv4 } from 'uuid';

// Generate a new API key
export async function POST(request: Request) {
  const supabase = await createClient();
  
  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const { name } = await request.json();
    
    if (!name) {
      return NextResponse.json({ error: 'API key name is required' }, { status: 400 });
    }
    
    // Generate a random API key
    const key = `mk_${uuidv4().replace(/-/g, '')}`;
    
    // Insert the new API key
    const { error } = await supabase
      .from('api_keys')
      .insert({
        key,
        user_id: user.id,
        name,
        rate_limit: 1000, // Default rate limit
        requests_today: 0,
      });
      
    if (error) throw error;
    
    return NextResponse.json({ key });
    
  } catch (error) {
    console.error('Error creating API key:', error);
    return NextResponse.json(
      { error: 'Failed to create API key' }, 
      { status: 500 }
    );
  }
}

// List API keys
export async function GET() {
  const supabase = await createClient();
  
  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    // Get user's API keys
    const { data, error } = await supabase
      .from('api_keys')
      .select('id, name, created_at, rate_limit, requests_today, last_request_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    return NextResponse.json({ keys: data });
    
  } catch (error) {
    console.error('Error fetching API keys:', error);
    return NextResponse.json(
      { error: 'Failed to fetch API keys' }, 
      { status: 500 }
    );
  }
}
