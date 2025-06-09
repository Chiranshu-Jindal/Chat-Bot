/* src/components/JoinCreateChat.jsx */
import React, { useState } from "react";
import chatIcon from "../assets/chat.png";
import toast from "react-hot-toast";
import { createRoomApi, joinChatApi } from "../services/RoomService";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router-dom";
import { DarkModeButton } from "./DarkModeButton";

const JoinCreateChat = () => {
  const [detail, setDetail] = useState({
    roomId: "",
    userName: "",
  });
  const { setRoomId, setCurrentUser, setConnected } = useChatContext();
  const navigate = useNavigate();

  function handleFormInputChange(event) {
    setDetail({
      ...detail,
      [event.target.name]: event.target.value,
    });
  }

  function validateForm() {
    if (detail.roomId === "" || detail.userName === "") {
      toast.error("Please fill in all fields!");
      return false;
    }
    return true;
  }

  async function joinChat() {
    if (validateForm()) {
      try {
        const room = await joinChatApi(detail.roomId);
        toast.success("Joined room successfully!");
        setCurrentUser(detail.userName);
        setRoomId(room.roomId);
        setConnected(true);
        navigate("/chat");
      } catch (error) {
        toast.error(error.status === 400 ? error.response.data : "Failed to join room");
        console.error(error);
      }
    }
  }

  async function createRoom() {
    if (validateForm()) {
      try {
        const response = await createRoomApi(detail.roomId);
        toast.success("Room created successfully!");
        setCurrentUser(detail.userName);
        setRoomId(response.roomId);
        setConnected(true);
        navigate("/chat");
      } catch (error) {
        toast.error(error.status === 400 ? "Room already exists!" : "Failed to create room");
        console.error(error);
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 w-full max-w-md rounded-xl shadow-md flex flex-col gap-6">
        <div className="absolute top-4 right-4">
          <DarkModeButton />
        </div>
        <div className="flex justify-center">
          <img src={chatIcon} alt="Chat Icon" className="w-16 mb-2" />
        </div>
        <h1 className="text-xl font-bold text-center text-gray-900 dark:text-gray-100">
          Join or Create a Chat Room
        </h1>
        <div>
          <label
            htmlFor="userName"
            className="block font-medium mb-1 text-gray-700 dark:text-gray-300"
          >
            Your Name
          </label>
          <input
            onChange={handleFormInputChange}
            value={detail.userName}
            type="text"
            id="userName"
            name="userName"
            placeholder="Enter your name"
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-900 dark:text-gray-100 transition-colors duration-200"
          />
        </div>
        <div>
          <label
            htmlFor="roomId"
            className="block font-medium mb-1 text-gray-700 dark:text-gray-300"
          >
            Room ID
          </label>
          <input
            onChange={handleFormInputChange}
            value={detail.roomId}
            type="text"
            id="roomId"
            name="roomId"
            placeholder="Enter room ID"
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-900 dark:text-gray-100 transition-colors duration-200"
          />
        </div>
        <div className="flex justify-center gap-3">
          <button
            onClick={joinChat}
            className="px-4 py-2 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors duration-200"
          >
            Join Room
          </button>
          <button
            onClick={createRoom}
            className="px-4 py-2 bg-teal-600 dark:bg-teal-500 hover:bg-teal-700 dark:hover:bg-teal-600 text-white rounded-lg font-medium transition-colors duration-200"
          >
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinCreateChat;