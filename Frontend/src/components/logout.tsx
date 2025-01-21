"use client"

import { useRouter } from 'next/navigation';
import { LogOut } from "lucide-react";
import React from 'react'
import useLocalStorage from '@/hooks/localStorageHook';


export default function Logout() {

  const [token, setToken, clearToken] = useLocalStorage('jwtToken', '');
  const [user, setUser, clearUser] = useLocalStorage('user', '');
    const router = useRouter();
  return (
    
    <LogOut className="ml-1 transform scale-x-[-1] text-white hover:cursor-pointer" onClick={() => {
      clearToken();  
      clearUser();
      router.push('/');
    }} />
  )
}
