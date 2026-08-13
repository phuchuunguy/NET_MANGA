"use client";

import { ListUserProps } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import ListUser from "./ListUser";
import { getUserRankings } from "@/lib/actions/user";
import SkeletonRankings from "../skeleton/SkeletonRankings";
import { message } from "antd";
import { socket } from "@/lib/socket";
import { useSession } from "next-auth/react";

const Rankings = () => {
  const [data, setData]   = useState<ListUserProps>({ criterion: "vip_level", users: [] });
  const [loading, setLoading] = useState(true);
  const currentScrollRef  = useRef<HTMLDivElement>(null);
  const { data: sesstion } = useSession();

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    const response = await getUserRankings("vip_level");
    setLoading(false);
    if (response?.status === "success") {
      setData(response.data);
    } else {
      setData({ criterion: "vip_level", users: [] });
    }
  };

  useEffect(() => {
    socket.on("refresh-sesstion", (res) => {
      if (res?.type === "update-ranking") {
        fetchData();
        message.info("Bảng xếp hạng vừa được cập nhật");
      }
    });
    return () => { socket.off("refresh-sesstion"); };
  }, [sesstion]);

  return (
    <div ref={currentScrollRef}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          padding: "8px 24px",
          borderRadius: "50px",
          border: "1px solid rgba(234,179,8,0.35)",
          background: "rgba(234,179,8,0.08)",
        }}>
          <span style={{ fontSize: "20px" }}>🏆</span>
          <span style={{
            fontSize: "16px",
            fontWeight: 800,
            background: "linear-gradient(135deg,#EAB308,#F97316)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "1.5px",
          }}>
            BẢNG XẾP HẠNG
          </span>
          <span style={{ fontSize: "20px" }}>🏆</span>
        </div>
      </div>

      {/* Content */}
      <div className="rank-content">
        {loading ? (
          <SkeletonRankings />
        ) : (
          <ListUser
            showFrame={true}
            users={data.users}
            criterion={data.criterion}
            type="vip"
          />
        )}
      </div>

      <style>{`
        .rank-content {
          background: rgba(0,0,0,0.02);
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 16px;
          padding: 20px;
        }
        .dark .rank-content {
          background: rgba(255,255,255,0.02);
          border-color: rgba(255,255,255,0.07);
        }
      `}</style>
    </div>
  );
};

export default Rankings;
