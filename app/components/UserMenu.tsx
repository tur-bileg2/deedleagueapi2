'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/app/utils/supabase/client';
import { UserCircle, LogOut, ChevronDown, ChevronUp, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UserMenu() {
  const [user, setUser] = useState<{ email: string | null } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Handle clicks outside the menu to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    const supabase = createClient();
    
    // Check current user on mount
    const checkUser = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setUser(data?.user ? { email: data.user.email ?? null } : null);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkUser();
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ? { email: session.user.email ?? null } : null);
      }
    );
    
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);
  
  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      setUser(null);
      setIsOpen(false);
      router.push('/sign-in');
      router.refresh();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="h-10 flex items-center justify-center">
        <div className="h-8 w-32 rounded-full bg-gray-200 animate-pulse"></div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="flex space-x-2">
        <Link href="/sign-in" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium transition-colors duration-200">
          Sign In
        </Link>
        <Link href="/sign-up" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium shadow-sm transition-all duration-200 hover:shadow">
          Sign Up
        </Link>
      </div>
    );
  }
  
  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`flex items-center space-x-2 text-sm ${
          isOpen ? 'bg-gray-200' : 'bg-gray-100'
        } hover:bg-gray-200 px-3 py-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1`}
      >
        <UserCircle className="w-5 h-5 text-gray-600" />
        <span className="max-w-[120px] truncate">{user.email || 'User'}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-100 transform origin-top-right transition-all duration-200 ease-out">
          <div className="px-4 py-3 text-xs text-gray-500 border-b border-gray-100">
            <div className="font-medium text-gray-700 mb-1">Signed in as</div>
            <div className="font-semibold text-blue-600 truncate">{user.email}</div>
          </div>
          
          <Link 
            href="/profile" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <UserCircle className="w-4 h-4 mr-2" />
            Your Profile
          </Link>
          
          <Link 
            href="/protected" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <Settings className="w-4 h-4 mr-2" />
            API Documentation
          </Link>
          
          <div className="border-t border-gray-100 my-1"></div>
          
          <button
            onClick={handleSignOut}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center transition-colors duration-200"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
