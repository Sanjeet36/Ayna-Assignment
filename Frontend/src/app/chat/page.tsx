
"use client";

import { Key, useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import axios from 'axios';

import Day from "@/components/day";
import Message from "@/components/message";
import Navbar from "@/components/navbar";
import Textbox from "@/components/textbox";
import useLocalStorage from "@/hooks/localStorageHook";
import { socket } from '@/socket';
import { formatDate, formatTime, getCurrentDateTime, processPreviousMessageArray } from "@/util";
import useStrapiApi from "@/hooks/useStrapiApi";

export default function Chat() {

  const [olderMessages, setOlderMessages] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [user, setUser, clearUser] = useLocalStorage('user', '');
  const [token, setToken, clearToken] = useLocalStorage('jwtToken', '');

  const { loading, fetchData } = useStrapiApi();


  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => { 
    
    const userId = user.id;

    const getMessages = async () => {
      const response = await fetchData(`${process.env.NEXT_PUBLIC_BACKEND_URL}/messages?filters[userId][$eq]=${userId}&sort[0]=createdAt:asc`);
      const processedMessages = processPreviousMessageArray(response.data);
      setOlderMessages(processedMessages);
    };
    
    
    getMessages();

  }, [])

  useEffect(() => {
    // Event listener for receiving messages
    socket.on('chat-message.response', (data) => {

      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Clean up socket listener when component unmounts
    return () => {
      socket.off('chat-message.response');
    };
  }, []);

  function sendMessage() {
    if (messageInput.trim() !== '') {
      const message = {
        message: messageInput.trim(),
        userId: user.id,
        token: token
      };
      const messageData = {
        sender: "user",
        data: {
          message: messageInput,
          time: getCurrentDateTime(),
        }
      };
      setMessages((prevMessages) => [...prevMessages, messageData]);
      socket.emit('chat-message', { message });
      setMessageInput('');
    }
  }

  // Automatically scroll to the bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-start h-full w-full overflow-auto scrollbar-none py-2 px-1">
        {/* Handling Older Messages */}
        {  olderMessages.length === 0 ? <></> :olderMessages.map((message: any, key: Key | null | undefined) => {
          if (message.sender === "server") {
            return (
              <Message key={key} align="left" text={message.data.attributes.message} time={formatTime(message.data.attributes.createdAt)} character="CB"/>
            );
          } else if (message.sender === "user") {
            return (
              <Message key={key} align="right" text={message.data.attributes.message} time={formatTime(message.data.attributes.createdAt)} character={user.username[0]}/>
            );
          } else {
            return <Day key={key} date={formatDate(message.date)} />;
          }
        })}
        <Day date="Current Session"/>
        {/* Handling Current Messages */}
        {messages.map((message: { sender: string; data: { attributes: { message: string; createdAt: string; }; message: string; time: string; }; }, key: Key | null | undefined) => {
          if (message.sender === "server") {
            return (
              <Message key={key} align="left" text={message.data.attributes.message} time={formatTime(message.data.attributes.createdAt)} character="CB"/>
            );
          } else if (message.sender === "user") {
            return (
              <Message key={key} align="right" text={message.data.message} time={formatTime(message.data.time)} character={user.username[0]}/>
            );
          } else {
            return <></>;
          }
        })}
        <div ref={messagesEndRef} />
      </div>
      <Textbox sendMessage={sendMessage} messageInput={messageInput} setMessage={(message) => setMessageInput(message)} />
      </>
  );
}

