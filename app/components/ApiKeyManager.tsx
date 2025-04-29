'use client';

import { useState } from 'react';
import { createClient, generateApiKey } from '../utils/supabase/client';
import { useRouter } from 'next/navigation';

type ApiKey = {
  id: string;
  name: string;
  key: string;
  created_at: string;
  last_used_at: string | null;
  revoked: boolean;
};

export default function ApiKeyManager({ initialKeys, userId }: { initialKeys: ApiKey[], userId: string }) {
  const [keys, setKeys] = useState(initialKeys);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKey, setNewKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  
  const createNewKey = async () => {
    if (!newKeyName.trim()) {
      setError('Key name is required');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const apiKey = generateApiKey();
      const supabase = createClient();
      
      const { data, error } = await supabase
        .from('api_keys')
        .insert({
          user_id: userId,
          name: newKeyName.trim(),
          key: apiKey,
          revoked: false
        })
        .select()
        .single();
        
      if (error) throw error;
      
      // Show the newly created key to the user (one-time display)
      setNewKey(apiKey);
      // Add the new key to the list
      setKeys([data, ...keys]);
      setNewKeyName('');
      
      // Refresh the page data
      router.refresh();
    } catch (err) {
      console.error('Error creating API keyy:', err);
      setError('Failed to create API key');
    } finally {
      setLoading(false);
    }
  };
  
  const revokeKey = async (id: string) => {
    if (!confirm('Are you sure you want to revoke this API key? This action cannot be undone.')) {
      return;
    }
    
    setLoading(true);
    
    try {
      const supabase = createClient();
      
      await supabase
        .from('api_keys')
        .update({ revoked: true })
        .eq('id', id)
        .eq('user_id', userId); // Extra security to ensure only owner can revoke
        
      // Update local state
      setKeys(keys.map(key => 
        key.id === id ? { ...key, revoked: true } : key
      ));
      
      // Refresh the page data
      router.refresh();
    } catch (err) {
      console.error('Error revoking API key:', err);
      setError('Failed to revoke API key');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-black">API Keys</h2>
      
      {/* Create new API key form */}
      <div className="mb-6 p-4 border border-gray-200 rounded-md">
        <h3 className="text-lg font-medium mb-4 text-black">Create New API Key</h3>
        
        <div className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded border border-red-200">
              {error}
            </div>
          )}
          
          {newKey && (
            <div className="bg-green-50 p-4 rounded border border-green-200 mb-4">
              <p className="text-green-700 font-medium mb-2">API Key Created</p>
              <p className="text-sm text-green-600 mb-3">
                Make sure to copy your API key now. You won't be able to see it again!
              </p>
              <div className="bg-white p-3 rounded border border-green-300 flex justify-between items-center">
                <code className="font-mono text-sm break-all">{newKey}</code>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(newKey);
                    alert('API key copied to clipboard!');
                  }}
                  className="ml-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
          
          <div>
            <label htmlFor="keyName" className="block text-sm font-medium text-black mb-1">
              Key Name
            </label>
            <input
              id="keyName"
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="My API Key"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
              disabled={loading}
            />
          </div>
          
          <button
            onClick={createNewKey}
            disabled={loading || !newKeyName.trim()}
            className={`px-4 py-2 rounded-md text-white ${
              loading || !newKeyName.trim() 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Creating...' : 'Create API Key'}
          </button>
        </div>
      </div>
      
      {/* API Keys List */}
      <div>
        <h3 className="text-lg font-medium mb-4 text-black">Your API Keys</h3>
        
        {keys.length === 0 ? (
          <p className="text-black italic">No API keys found. Create one above.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Created</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Last Used</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-black uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {keys.map((key) => (
                  <tr key={key.id} className={key.revoked ? 'bg-gray-50' : ''}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="font-medium text-black">{key.name}</div>
                      {key.id === keys[0].id && !key.revoked && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          Latest
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-black">
                      {new Date(key.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-black">
                      {key.last_used_at 
                        ? new Date(key.last_used_at).toLocaleString()
                        : 'Never used'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {key.revoked ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Revoked
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      {!key.revoked && (
                        <button
                          onClick={() => revokeKey(key.id)}
                          className="text-red-600 hover:text-red-900"
                          disabled={loading}
                        >
                          Revoke
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
