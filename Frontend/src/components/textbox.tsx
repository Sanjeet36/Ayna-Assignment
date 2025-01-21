import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// import React from "react";

interface TextboxProps {
  sendMessage: () => void,
  messageInput: string,
  setMessage: (message: string) => void
}

export default function Textbox({ sendMessage, messageInput, setMessage }: TextboxProps)  {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };


  return (
    <div className="flex flex-row justify-between bg-[#474747] rounded-3xl px-2 py-1 w-[95%]  md:w-[80%] lg:w-[70%] ">
      <input onKeyDown={handleKeyDown} onChange={(e) => setMessage(e.target.value)} className="bg-transparent focus-visible:outline-0 text-sm text-white ml-3 w-full" type="text" placeholder="Enter message here..." value={messageInput}/>
      <Avatar className="bg-[#1C96AD] hover:cursor-pointer" onClick={sendMessage}>
        <AvatarImage className="" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNlbmQtaG9yaXpvbnRhbCI+PHBhdGggZD0ibTMgMyAzIDktMyA5IDE5LTlaIi8+PHBhdGggZD0iTTYgMTJoMTYiLz48L3N2Zz4=" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};