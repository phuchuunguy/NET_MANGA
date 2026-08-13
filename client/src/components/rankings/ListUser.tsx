"use client";

import EmptyData from "../common/EmptyData";
import Link from "next/link";
import { ListUserProps } from "@/lib/types";
import { useSession } from "next-auth/react";
import AvatarUser from "../common/AvatarUser";

/* ── Rank 1/2/3 visual tokens ── */
const podium: Record<number, { bg: string; bgDark: string; border: string; glow: string; medal: string }> = {
  1: { bg: "rgba(234,179,8,0.10)",  bgDark: "rgba(234,179,8,0.15)",  border: "rgba(234,179,8,0.40)",  glow: "0 4px 20px rgba(234,179,8,0.18)",  medal: "🥇" },
  2: { bg: "rgba(148,163,184,0.10)",bgDark: "rgba(192,192,192,0.12)",border: "rgba(148,163,184,0.35)",glow: "0 4px 20px rgba(148,163,184,0.14)",medal: "🥈" },
  3: { bg: "rgba(180,83,9,0.08)",   bgDark: "rgba(205,127,50,0.12)", border: "rgba(180,83,9,0.30)",   glow: "0 4px 20px rgba(180,83,9,0.12)",  medal: "🥉" },
};

/* ── VIP level colors ── */
const vipColor: Record<number, { hex: string; glow: string; label: string }> = {
  1: { hex: "#0891B2", glow: "rgba(8,145,178,0.45)",  label: "Chiến Binh" },
  2: { hex: "#16A34A", glow: "rgba(22,163,74,0.45)",  label: "Chiến Binh Thép" },
  3: { hex: "#D97706", glow: "rgba(217,119,6,0.45)",  label: "Thợ Săn Huyền Thoại" },
  4: { hex: "#9333EA", glow: "rgba(147,51,234,0.45)", label: "Vua Truyện Cổ Đại" },
  5: { hex: "#DC2626", glow: "rgba(220,38,38,0.45)",  label: "Thần Thoại Manga" },
};

const ListUser = ({ users, criterion, showFrame, type }: ListUserProps) => {
  const { data: session }: any = useSession();

  if (!users || users.length === 0) {
    return (
      <EmptyData description="Không có ai xếp hạng à? Thời cơ tỏa sáng đây rồi! 🌟" />
    );
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {users.map((item, index: number) => {
          const rank = index + 1;
          const pod  = podium[rank];
          const isMe = session?.user?.id === item?.user_id;
          const vip  = vipColor[item?.vip_level];

          return (
            <div
              key={index}
              className={pod ? "rank-card rank-card--podium" : isMe ? "rank-card rank-card--me" : "rank-card"}
              style={pod ? ({
                "--pod-bg":     pod.bg,
                "--pod-border": pod.border,
                "--pod-glow":   pod.glow,
              } as React.CSSProperties) : undefined}
            >
              {/* shimmer top line for podium */}
              {pod && (
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                  background: `linear-gradient(90deg,transparent,${pod.border},transparent)`,
                }} />
              )}

              {/* Rank badge */}
              <div className="rank-badge">
                {rank <= 3
                  ? <span style={{ fontSize: "20px" }}>{pod.medal}</span>
                  : <span className="rank-number">{rank}</span>
                }
              </div>

              {/* Avatar */}
              <AvatarUser
                size={42}
                number={item?.vip_level ?? index + 1}
                avatar={item?.avatar ?? "/images/avatar.jpg"}
                showFrame={showFrame}
                type={type as "vip" | "top"}
              />

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <Link
                    href={`/trang-ca-nhan/${item?.user_id}`}
                    className="rank-username"
                    style={rank === 1 ? { color: "#B45309" } : rank === 2 ? { color: "#64748B" } : rank === 3 ? { color: "#92400E" } : undefined}
                  >
                    {item?.username}
                  </Link>
                  {isMe && <span className="rank-me-badge">Bạn</span>}
                </div>

                {/* Subtitle */}
                {criterion === "vip_level" && vip && (
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: vip.hex, boxShadow: `0 0 6px ${vip.glow}`, flexShrink: 0, display: "inline-block" }} />
                    <span style={{ fontSize: 12, color: vip.hex, fontWeight: 600 }}>
                      {item?.nickname || vip.label}
                    </span>
                    <span style={{
                      fontSize: 11, padding: "1px 8px", borderRadius: 20, fontWeight: 700,
                      background: `${vip.hex}18`, color: vip.hex, border: `1px solid ${vip.hex}44`,
                    }}>
                      VIP {item?.vip_level}
                    </span>
                  </div>
                )}
                {criterion !== "vip_level" && (
                  <span className="rank-subtitle">
                    {criterion === "comment_wrote"            && `${item?.quantity} bình luận`}
                    {criterion === "saved_comic"              && `${item?.quantity} truyện đã lưu`}
                    {criterion === "number_of_stories_read"  && `${item?.quantity} truyện đã xem`}
                  </span>
                )}
              </div>

              {/* Right quantity pill */}
              {criterion !== "vip_level" && item?.quantity != null && (
                <div className="rank-qty">
                  {item.quantity}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        /* ── base card ── */
        .rank-card {
          position: relative;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 16px;
          border-radius: 14px;
          border: 1px solid rgba(0,0,0,0.07);
          background: rgba(0,0,0,0.02);
          transition: transform .2s, box-shadow .2s;
          overflow: hidden;
        }
        .dark .rank-card {
          border-color: rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.025);
        }
        .rank-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
        }
        .dark .rank-card:hover {
          box-shadow: 0 6px 20px rgba(0,0,0,0.4);
        }

        /* ── podium card ── */
        .rank-card--podium {
          background: var(--pod-bg);
          border-color: var(--pod-border);
          box-shadow: var(--pod-glow);
        }
        .rank-card--podium:hover {
          box-shadow: var(--pod-glow), 0 6px 20px rgba(0,0,0,0.08);
        }

        /* ── "me" highlight ── */
        .rank-card--me {
          border-color: rgba(56,189,248,0.35);
          background: rgba(56,189,248,0.06);
        }
        .dark .rank-card--me {
          background: rgba(56,189,248,0.08);
        }

        /* ── rank badge ── */
        .rank-badge {
          width: 34px; height: 34px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          background: rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.08);
        }
        .dark .rank-badge {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.1);
        }
        .rank-number {
          font-size: 13px; font-weight: 700;
          color: #94A3B8;
        }
        .dark .rank-number { color: rgba(255,255,255,0.4); }

        /* ── username ── */
        .rank-username {
          font-size: 14px; font-weight: 700;
          color: #1E293B;
          text-decoration: none;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .dark .rank-username { color: rgba(255,255,255,0.88); }
        .rank-username:hover { text-decoration: underline; }

        /* ── "Bạn" badge ── */
        .rank-me-badge {
          font-size: 11px; padding: 1px 8px; border-radius: 20px;
          background: rgba(56,189,248,0.12);
          color: #0284C7;
          border: 1px solid rgba(56,189,248,0.35);
          font-weight: 700; flex-shrink: 0;
        }
        .dark .rank-me-badge { color: #38BDF8; background: rgba(56,189,248,0.15); }

        /* ── subtitle ── */
        .rank-subtitle {
          font-size: 12px; color: #64748B;
        }
        .dark .rank-subtitle { color: rgba(255,255,255,0.4); }

        /* ── quantity pill ── */
        .rank-qty {
          flex-shrink: 0;
          padding: 3px 12px; border-radius: 20px;
          font-size: 13px; font-weight: 700;
          background: rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.09);
          color: #475569;
        }
        .dark .rank-qty {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.55);
        }
      `}</style>
    </>
  );
};

export default ListUser;
