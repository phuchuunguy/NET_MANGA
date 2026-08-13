"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Tránh hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ width: 36, height: 36 }} />;

  const isDark = theme === "dark";

  return (
    <Tooltip title={isDark ? "Chuyển sáng" : "Chuyển tối"} placement="bottom">
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: isDark
            ? "1px solid rgba(255,255,255,0.15)"
            : "1px solid rgba(0,0,0,0.12)",
          background: isDark
            ? "rgba(255,255,255,0.07)"
            : "rgba(0,0,0,0.04)",
          cursor: "pointer",
          transition: "all 0.25s ease",
          flexShrink: 0,
          color: isDark ? "#FACC15" : "#6366F1",
          fontSize: 16,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1.12)";
          (e.currentTarget as HTMLElement).style.background = isDark
            ? "rgba(255,255,255,0.13)"
            : "rgba(0,0,0,0.09)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLElement).style.background = isDark
            ? "rgba(255,255,255,0.07)"
            : "rgba(0,0,0,0.04)";
        }}
        aria-label="Toggle theme"
      >
        {isDark ? (
          <SunOutlined style={{ color: "#FACC15", filter: "drop-shadow(0 0 4px #FACC15)" }} />
        ) : (
          <MoonOutlined style={{ color: "#6366F1" }} />
        )}
      </button>
    </Tooltip>
  );
};

export default ThemeToggle;
