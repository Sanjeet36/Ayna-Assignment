
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Logout from "./logout";

import useLocalStorage from "@/hooks/localStorageHook";

// interface NavbarProps {
//   username: string
// };

export default function Navbar() {
  // export default function Navbar({username}: NavbarProps) {

  const [user, setUser, clearUser] = useLocalStorage('user', '');

  return (
    <div className="flex flex-row justify-between items-center w-full bg-[#1D96AD] px- py-2">
      <Logout />
      {/* <h1>Ayna Web Chat Application</h1> */}
      <span className="text-white font-semibold mr-1">@{user.username}</span>
    </div>
  );
}
