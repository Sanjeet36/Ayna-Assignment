// layout.tsx

"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useLocalStorage from '@/hooks/localStorageHook';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser, clearUser] = useLocalStorage('user', '');

  useEffect(() => {
    async function isUserAuthenticated() {
      let token;

      if (typeof window !== 'undefined') {
        token = localStorage.getItem("jwtToken");
      }

      if (token) {
        token = token.substring(1, token.length - 1);
      }


      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setLoading(false); // User is authenticated, stop loading
      } catch (err) {
        router.push('/');
      }
    }

    isUserAuthenticated();
  }, [router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-between h-screen w-screen bg-[#0F0F0F]">
    <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
  </svg>
    </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-between h-screen w-screen bg-[#0F0F0F]">
      {children}
    </div>
  );
}
