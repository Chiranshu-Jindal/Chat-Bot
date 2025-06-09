/* src/components/ChatPage.jsx */
import React, { useEffect, useRef, useState } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { baseURL } from "../config/AxiosHelper";
import { getMessagess } from "../services/RoomService";
import { timeAgo } from "../config/helper";
import { DarkModeButton } from "./DarkModeButton";

const ChatPage = () => {
  const {
    roomId,
    currentUser,
    connected,
    setConnected,
    setRoomId,
    setCurrentUser,
  } = useChatContext();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);

  // Redirect if not connected
  useEffect(() => {
    if (!connected) {
      navigate("/");
    }
  }, [connected, navigate]);

  // Load initial messages
  useEffect(() => {
    async function loadMessages() {
      try {
        const messages = await getMessagess(roomId);
        setMessages(messages);
      } catch (error) {
        console.error("Failed to load messages:", error);
        toast.error("Failed to load messages");
      }
    }
    if (connected && roomId) {
      loadMessages();
    }
  }, [roomId, connected]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scroll({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // WebSocket connection
  useEffect(() => {
    const connectWebSocket = () => {
      const sock = new SockJS(`${baseURL}/chat`);
      const client = Stomp.over(sock);
      client.connect(
        {},
        () => {
          setStompClient(client);
          toast.success("Connected to chat");
          client.subscribe(`/topic/room/${roomId}`, (message) => {
            const newMessage = JSON.parse(message.body);
            setMessages((prev) => [...prev, newMessage]);
          });
        },
        (error) => {
          console.error("WebSocket connection error:", error);
          toast.error("Failed to connect to chat");
        }
      );
    };

    if (connected && roomId) {
      connectWebSocket();
    }

    return () => {
      if (stompClient) {
        stompClient.disconnect(() => {
          console.log("Disconnected from WebSocket");
        });
      }
    };
  }, [roomId, connected]);

  // Send message
  const sendMessage = async () => {
    if (stompClient && connected && input.trim()) {
      try {
        const message = {
          sender: currentUser,
          content: input,
          roomId: roomId,
          timeStamp: new Date().toISOString(),
        };
        stompClient.send(
          `/app/sendMessage/${roomId}`,
          {},
          JSON.stringify(message)
        );
        setInput("");
        inputRef.current?.focus();
      } catch (error) {
        console.error("Failed to send message:", error);
        toast.error("Failed to send message");
      }
    } else {
      toast.error("Cannot send empty message");
    }
  };

  // Logout
  const handleLogout = () => {
    if (stompClient) {
      stompClient.disconnect(() => {
        console.log("Disconnected from WebSocket");
      });
    }
    setConnected(false);
    setRoomId("");
    setCurrentUser("");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-6 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Room:{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              {roomId}
            </span>
          </h1>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            User:{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              {currentUser}
            </span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <DarkModeButton />
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-200"
          >
            Leave Room
          </button>
        </div>
      </header>

      <main
        ref={chatBoxRef}
        className="pt-20 pb-20 px-6 w-full max-w-3xl mx-auto h-screen overflow-auto bg-gray-100 dark:bg-gray-800 transition-colors duration-300"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === currentUser ? "justify-end" : "justify-start"
            } my-3`}
          >
            <div
              className={`flex items-start gap-3 max-w-xs md:max-w-sm p-3 rounded-xl ${
                message.sender === currentUser
                  ? "bg-indigo-100 text-gray-900 dark:bg-indigo-900 dark:text-white"
                  : "bg-white text-gray-900 dark:bg-gray-700 dark:text-white"
              } shadow-md transition-colors duration-200`}
            >
              <img
                className="h-8 w-8 rounded-full"
                src="https://avatar.iran.liara.run/public/43"
                alt={`${message.sender}'s avatar`}
              />
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {message.sender}
                </p>
                <p className="text-sm">{message.content}</p>
                <p className="text-[11px] text-right text-gray-500 dark:text-gray-300 mt-1">
                  {timeAgo(message.timeStamp)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </main>

      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center gap-3 max-w-3xl mx-auto">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            type="text"
            placeholder="Type your message here..."
            className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-900 dark:text-white transition-colors duration-200"
          />
          <div className="flex gap-2">
            <button className="p-2 bg-purple-600 dark:bg-purple-500 hover:bg-purple-700 dark:hover:bg-purple-600 text-white rounded-lg transition-colors duration-200">
              <MdAttachFile size={24} />
            </button>
            <button
              onClick={sendMessage}
              className="p-2 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white rounded-lg transition-colors duration-200"
            >
              <MdSend size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
