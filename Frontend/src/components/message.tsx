import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import React from "react";

interface MessageProps {
  align: string,
  text: string,
  time: string,
  character: string
}

export default function Message({ align, text, time, character  }: MessageProps) {
  const alignment = align == "left" ? "self-start" : "self-end";
  const flexDirection = align == "left" ? "flex-row" : "flex-row-reverse";
  return (
    <div
      className={`${alignment} flex ${flexDirection} justify-center items-center my-2`}
    >
      <div>
        <Avatar>
          {character === "CB" ? 
           <AvatarImage
           className="rounded-full"
           src="https://github.com/shadcn.png"
         /> : <></>}
         
          <AvatarFallback>{character}</AvatarFallback>
        </Avatar>
      </div>
      <div className="bg-[#474747] rounded-full px-3 py-1 text-white text-sm flex flex-row justify-between items-center">
        <span>{text}</span>
        <span className="text-xs font-light  ml-1 text-gray-300 self-end w-auto whitespace-nowrap">{time}</span>
      </div>
    </div>
  );
}
