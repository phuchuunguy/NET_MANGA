"use client";

import { Avatar } from "antd";
import { useEffect, useState } from "react";

interface AvatarUserProps {
  avatar: string;
  size: "small" | "default" | "large" | number;
  number: number;
  type: "vip" | "top";
  showFrame?: boolean;
}

const vipBadgeStyle: Record<number, React.CSSProperties> = {
  1: { background: "rgba(6,182,212,0.2)", color: "#06B6D4", border: "1px solid rgba(6,182,212,0.5)", boxShadow: "0 0 8px rgba(6,182,212,0.4)" },
  2: { background: "rgba(34,197,94,0.2)", color: "#22C55E", border: "1px solid rgba(34,197,94,0.5)", boxShadow: "0 0 8px rgba(34,197,94,0.4)" },
  3: { background: "rgba(245,158,11,0.2)", color: "#F59E0B", border: "1px solid rgba(245,158,11,0.5)", boxShadow: "0 0 8px rgba(245,158,11,0.4)" },
  4: { background: "rgba(168,85,247,0.2)", color: "#A855F7", border: "1px solid rgba(168,85,247,0.5)", boxShadow: "0 0 8px rgba(168,85,247,0.4)" },
  5: { background: "rgba(239,68,68,0.2)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.5)", boxShadow: "0 0 8px rgba(239,68,68,0.4)" },
};

const AvatarUser = ({
  avatar,
  size,
  number,
  type,
  showFrame = true,
}: AvatarUserProps) => {
  const [srcImageFrame, setSrcImageFrame] = useState<string>("");

  useEffect(() => {
    if (type === "vip") {
      setSrcImageFrame(
        number >= 1 && number <= 5
          ? `/images/frame/vip-ranking/vip-${number}.png`
          : ""
      );
    } else if (type === "top") {
      if (number <= 3) {
        setSrcImageFrame(`/images/frame/top-ranking/top-${number}.png`);
      }
    }
  }, [number, type]);

  const showVipBadge = type === "vip" && number >= 1 && number <= 5;

  return (
    <div
      className="relative flex justify-center items-center w-14 h-14"
      style={{ marginBottom: showVipBadge ? "16px" : undefined }}
    >
      <Avatar
        className="z-10"
        size={size ?? "default"}
        src={avatar ?? "/images/avatar.jpg"}
        draggable={false}
        alt="avatar"
      />
      {showFrame && srcImageFrame !== "" && (
        <figure
          className={`absolute ${
            type === "vip"
              ? "w-16 h-16 top-[-4px] left-[-4px]"
              : "w-[74px] h-[74px] top-[-6px] left-[-8px]"
          }`}
        >
          <img
            src={srcImageFrame}
            alt="frame"
            className="w-full h-full pointer-events-none"
          />
        </figure>
      )}
      {showVipBadge && (
        <div
          style={{
            position: "absolute",
            bottom: "-16px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "1px 7px",
            borderRadius: "20px",
            fontSize: "10px",
            fontWeight: 700,
            whiteSpace: "nowrap",
            zIndex: 20,
            letterSpacing: "0.3px",
            ...vipBadgeStyle[number],
          }}
        >
          VIP {number}
        </div>
      )}
    </div>
  );
};

export default AvatarUser;
