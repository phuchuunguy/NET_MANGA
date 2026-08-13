"use client";

import { CoffeeOutlined, HeartFilled, ThunderboltFilled } from "@ant-design/icons";
import { Image } from "antd";

const Donate = () => {
  return (
    <div className="donate-wrap">

      {/* Header */}
      <div className="donate-header">
        <span className="donate-icon-wrap">
          <CoffeeOutlined />
        </span>
        <span className="donate-title">Ủng hộ tôi ly cà phê</span>
      </div>

      {/* Description */}
      <p className="donate-desc">
        Nếu bạn mê truyện trên{" "}
        <span className="donate-brand">NETMANGA</span>
        , hãy tài trợ cho tôi một ly cà phê ☕ để tôi có đủ năng lượng cày code
        xuyên đêm, fix bug thần tốc và tiếp tục mang đến những bộ truyện siêu
        hay cho các bro nhé!{" "}
        <ThunderboltFilled style={{ color: "#F59E0B" }} />{" "}
        <HeartFilled style={{ color: "#EF4444" }} />
      </p>

      {/* QR card */}
      <div className="donate-qr-card">
        <Image
          className="donate-qr-img"
          width={260}
          alt="QR-CODE donate"
          src="/images/donate.jpg"
          style={{ borderRadius: 12, display: "block" }}
          preview={{ mask: "Phóng to" }}
        />
      </div>

      <style>{`
        /* ── wrapper ── */
        .donate-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 4px 0 8px;
        }

        /* ── header ── */
        .donate-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 7px 20px;
          border-radius: 999px;
          border: 1px solid rgba(245,158,11,0.35);
          background: rgba(245,158,11,0.07);
        }
        .donate-icon-wrap {
          font-size: 16px;
          color: #D97706;
        }
        .donate-title {
          font-size: 14px;
          font-weight: 700;
          color: #92400E;
          letter-spacing: .4px;
        }
        .dark .donate-title { color: #FCD34D; }
        .dark .donate-header {
          border-color: rgba(252,211,77,0.3);
          background: rgba(252,211,77,0.07);
        }
        .dark .donate-icon-wrap { color: #FCD34D; }

        /* ── description ── */
        .donate-desc {
          font-size: 13.5px;
          line-height: 1.75;
          text-align: center;
          color: #374151;
          max-width: 320px;
          margin: 0;
        }
        .dark .donate-desc { color: rgba(255,255,255,0.65); }
        .donate-brand {
          color: #0891B2;
          font-weight: 700;
        }
        .dark .donate-brand { color: #22D3EE; }

        /* ── QR card ── */
        .donate-qr-card {
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.09);
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          background: #fff;
          transition: box-shadow .25s, transform .25s;
          cursor: pointer;
        }
        .donate-qr-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.13);
        }
        .dark .donate-qr-card {
          border-color: rgba(255,255,255,0.1);
          box-shadow: 0 4px 20px rgba(0,0,0,0.4);
          background: #1a1a1a;
        }
        .dark .donate-qr-card:hover {
          box-shadow: 0 8px 28px rgba(0,0,0,0.55);
        }
      `}</style>
    </div>
  );
};

export default Donate;
