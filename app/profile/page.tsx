import { redirect } from 'next/navigation';
import { createClient } from '../utils/supabase/server';
import ApiKeyManager from '../components/ApiKeyManager';

export default async function ProfilePage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/sign-in');
  }
  
  // Get user's API keys
  const { data: apiKeys } = await supabase
    .from('api_keys')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
    
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6 text-black">Profile</h1>
      
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-black">Account Information</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-black mb-1">Email</p>
            <p className="text-black">{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-black mb-1">User ID</p>
            <p className="font-mono text-sm text-black">{user.id}</p>
          </div>
        </div>
      </div>
      
      <ApiKeyManager initialKeys={apiKeys || []} userId={user.id} />
    </div>
  );
}
