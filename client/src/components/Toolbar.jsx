import React from "react";

// Array of colors for the palette
const COLORS = [
  "#000000", // black
  "#EF4444", // red-500
  "#3B82F6", // blue-500
  "#22C55E", // green-500
  "#F97316", // orange-500
  "#A855F7", // purple-500
];

const Toolbar = ({
  color,
  setColor,
  strokeWidth,
  setStrokeWidth,
  onClear,
  tool,
  setTool,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-4 bg-white/70 backdrop-blur-md p-3 shadow-sm w-full justify-center z-20 border-b border-slate-200/80">
      {/* Tool Buttons */}
      <div className="flex items-center gap-1 bg-slate-200/70 p-1 rounded-lg">
        <button
          onClick={() => setTool("pencil")}
          className={`px-3 py-1.5 rounded-md text-sm sm:text-base font-medium transition-all ${
            tool === "pencil"
              ? "bg-white text-blue-600 shadow-sm"
              : "bg-transparent text-slate-700 hover:bg-white/50"
          }`}
        >
          ✏️ Pencil
        </button>

        <button
          onClick={() => setTool("eraser")}
          className={`px-3 py-1.5 rounded-md text-sm sm:text-base font-medium transition-all ${
            tool === "eraser"
              ? "bg-white text-blue-600 shadow-sm"
              : "bg-transparent text-slate-700 hover:bg-white/50"
          }`}
        >
          🧽 Eraser
        </button>
      </div>

      {/* Vertical Separator */}
      <div className="h-8 w-px bg-slate-300/70 hidden sm:block"></div>

      {/* Color Picker */}
      <div className="flex items-center gap-2">
        {COLORS.map((c) => (
          <button
            key={c}
            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full transition-all border-2 ${
              color === c
                ? "border-blue-600 ring-2 ring-blue-600 ring-offset-1"
                : "border-white/50 hover:border-gray-400"
            }`}
            style={{ backgroundColor: c }}
            onClick={() => setColor(c)}
          ></button>
        ))}
        {/* Custom color input */}
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-8 h-8 sm:w-9 sm:h-9 p-0 border-none rounded-full cursor-pointer bg-transparent"
        />
      </div>

      {/* Vertical Separator */}
      <div className="h-8 w-px bg-slate-300/70 hidden sm:block"></div>

      {/* Stroke Width Slider */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-slate-700">Stroke</label>
        <input
          type="range"
          min="1"
          max="30"
          value={strokeWidth}
          onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
          className="w-24 sm:w-32"
        />
        <span className="text-sm font-medium text-slate-700 w-4 text-right">
          {strokeWidth}
        </span>
      </div>

      {/* Clear Button */}
      <button
        className="px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition font-medium text-sm sm:text-base shadow-sm"
        onClick={onClear}
      >
        Clear All
      </button>
    </div>
  );
};

export default Toolbar;