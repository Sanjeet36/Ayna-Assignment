"use client";

import { useRouter } from 'next/navigation';
import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import useStrapiApi from "@/hooks/useStrapiApi";
import CustomAlert from "@/components/Alert";

import useLocalStorage from "@/hooks/localStorageHook";

export default function Login() {


  const router = useRouter();

  // const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [registrationError, setRegistrationError] = useState<boolean>(false);

  const { loading, postData } = useStrapiApi();
  const [token, setToken, clearToken] = useLocalStorage('jwtToken', '');
  const [user, setUser, clearUser] = useLocalStorage('user', '');

  const [error, setError] = useState({
    "title": "Login Failed!",
    "descripton": "Invalid Credentials"
  });

  async function loginUser() {

    const userData = {
      "identifier": email,
      "password": password,
    };


    if (!email) {
      setRegistrationError(true);
      setError({
        "title": "Missing Field!",
        "descripton": "Email is missing!"
      })
      return;
    } else if (!password) {
      setRegistrationError(true);
      setError({
        "title": "Missing Field!",
        "descripton": "Password is missing!"
      })
      return;
    }

    const response = await postData("/auth/local", userData);

    if (response == null) {
      setRegistrationError(true);
      setError({
        "title": "Invalid Credentials!",
        "descripton": "Wrong email or password!"
      })
    } 
    else {
      setToken(response.jwt);
      setUser(response.user);
      router.push('/chat');
    }
  }
  return (
    <div className="flex flex-row items-center justify-center h-screen bg-[#0F0F0F]">
      <Card className="w-full max-w-sm bg-[#E3FEFF] text-[#506A86] font-medium">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="mail@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>

        <CardFooter>
          <div className="w-full flex flex-col items-end">
            <Button className="w-full mb-3" onClick={loginUser}>{loading ? "Signing in...": "Sign In"}</Button>
            <Link href="/register">
              <div className="text-xs hover:italic  hover:underline hover:cursor-pointer">
                New User? Register!
              </div>
            </Link>
          </div>
        </CardFooter>
      </Card>
      {registrationError ? (
        <CustomAlert
          title={error.title}
          description={error.descripton}
          variant="destructive"
          setErrorOrSuccess={() => {
            setRegistrationError(false);
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
}


// "use client"

// import React, { useEffect, useState } from 'react';
// import { socket }  from '@/socket';

// export default function Home() {
//   return (
//   <div>Home Page!</div>
//   );
// }
