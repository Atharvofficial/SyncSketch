import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import DrawingCanvas from "./DrawingCanvas";
import Toolbar from "./Toolbar";
import UserCursors from "./UserCursors";
import { getSocket } from "../socket.js";

const channel = new BroadcastChannel("whiteboard-sync");

const Whiteboard = () => {
  const { roomId } = useParams();
  const [userCount, setUserCount] = useState(1);
  const [color, setColor] = useState("black");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [tool, setTool] = useState("pencil");

  const socketRef = useRef(null);
  const hasJoinedRef = useRef(false);

  useEffect(() => {
    socketRef.current = getSocket();

    if (roomId && !hasJoinedRef.current) {
      socketRef.current.emit("join-room", roomId);
      hasJoinedRef.current = true;
    }

    const handleUserCount = (count) => setUserCount(count);
    socketRef.current.on("user-count", handleUserCount);

    return () => {
      socketRef.current.off("user-count", handleUserCount);
    };
  }, [roomId]);

  const handleClearCanvas = () => {
    socketRef.current.emit("clear-canvas", { roomId });
    channel.postMessage({ type: "clear-canvas" });
  };

  useEffect(() => {
    channel.onmessage = (event) => {
      const { type, data } = event.data;

      if (type === "color-change") setColor(data.color);
      if (type === "stroke-change") setStrokeWidth(data.strokeWidth);
      if (type === "tool-change") setTool(data.tool);
      if (type === "clear-canvas") {
        socketRef.current.emit("clear-canvas", { roomId });
      }
    };

    return () => {
      channel.close();
    };
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center bg-slate-50">
      {/* Header Block */}
      <div className="w-full p-3 sm:p-4 bg-white/70 backdrop-blur-md flex items-center justify-between shadow-sm border-b border-slate-200/80 text-center z-20">
        
        {/* Left Side */}
        <div className="flex-1 min-w-0">
          <h1 className="text-lg sm:text-xl text-slate-800 font-semibold text-left truncate">
            Room: <span className="font-mono text-blue-600">{roomId}</span>
          </h1>
        </div>

        {/* Center - App Name */}
        <div className="flex-1 min-w-0 px-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 text-center truncate">
            SyncSketch
          </h2>
        </div>

        {/* Right Side */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-slate-600 text-right">
            Active users:{" "}
            <span className="font-bold text-slate-800">{userCount}</span>
          </p>
        </div>
      </div>
      {/* End of Updated Block */}

      <Toolbar
        color={color}
        setColor={(c) => {
          setColor(c);
          channel.postMessage({ type: "color-change", data: { color: c } });
        }}
        strokeWidth={strokeWidth}
        setStrokeWidth={(w) => {
          setStrokeWidth(w);
          channel.postMessage({ type: "stroke-change", data: { strokeWidth: w } });
        }}
        onClear={handleClearCanvas}
        tool={tool}
        setTool={(t) => {
          setTool(t);
          channel.postMessage({ type: "tool-change", data: { tool: t } });
        }}
      />

      <div className="relative w-full h-full overflow-hidden bg-white">
        {/* Dot-grid pattern from index.css */}
        <div className="dot-grid-background" />

        <DrawingCanvas
          socket={socketRef.current}
          roomId={roomId}
          color={color}
          strokeWidth={strokeWidth}
          tool={tool}
        />
        <UserCursors socket={socketRef.current} roomId={roomId} />
      </div>
    </div>
  );
};

export default Whiteboard;