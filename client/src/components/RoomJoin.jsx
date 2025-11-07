import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const isValidRoomCode = (code) => /^[a-zA-Z0-9]{6,8}$/.test(code);

const generateRoomCode = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

const RoomJoin = () => {
  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleJoin = (e) => {
    e.preventDefault();
    const trimmedCode = roomCode.trim();

    if (!isValidRoomCode(trimmedCode)) {
      setError("Room code must be 6–8 alphanumeric characters");
      return;
    }

    navigate(`/room/${trimmedCode}`);
  };

  const handleCreateRoom = () => {
    const newCode = generateRoomCode();
    navigate(`/room/${newCode}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50 px-4">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <img src="/image.png" alt="SyncSketch Logo" className="w-20 h-20" />
        <h1 className="text-5xl font-bold text-slate-800 mt-4">
          SyncSketch
        </h1>
      </div>
      {/*Logo End */}

      <div className="bg-white/70 backdrop-blur-lg p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-sm border border-white/30">
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-900">
          Join a Whiteboard
        </h2>

        <form onSubmit={handleJoin} className="flex flex-col">
          <label
            htmlFor="roomCode"
            className="text-sm font-medium text-slate-700 mb-1"
          >
            Room Code
          </label>
          <input
            id="roomCode"
            type="text"
            placeholder="Enter Room Code"
            value={roomCode}
            onChange={(e) => {
              setRoomCode(e.target.value);
              setError("");
            }}
            className="bg-white/80 border border-slate-300 p-2.5 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder-slate-500"
            maxLength={8}
            required
            disabled={loading}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2.5 rounded-md font-semibold hover:bg-blue-700 transition shadow-sm disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Joining..." : "Join Room"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-slate-300"></div>
          <span className="flex-shrink mx-4 text-slate-500 text-sm">OR</span>
          <div className="flex-grow border-t border-slate-300"></div>
        </div>

        <button
          onClick={handleCreateRoom}
          className="bg-transparent text-blue-600 w-full px-4 py-2.5 rounded-md hover:bg-blue-50 transition border border-blue-600 font-semibold"
        >
          Create New Room
        </button>

        {error && (
          <p className="text-red-500 mt-4 text-sm text-center">{error}</p>
        )}
      </div>
    </div>
  );
};

export default RoomJoin;