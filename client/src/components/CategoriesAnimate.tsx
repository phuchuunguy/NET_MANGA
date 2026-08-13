"use client";

import { RootState } from "@/store/store";
import Link from "next/link";
import { useSelector } from "react-redux";
import SkeletonCaterogiesAnimate from "./skeleton/SkeletonCaterogiesAnimate";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const CaterogiesAnimate = () => {
  const { items, loading } = useSelector(
    (state: RootState) => state.comic.catetorys
  );
  
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const activeElement = scrollRef.current.querySelector(".is-active");
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  }, [pathname, items]);

  if (loading) {
    return <SkeletonCaterogiesAnimate quantity={12} />;
  }

  const specialGenres = ["16+", "adult", "ecchi", "mature"];

  return (
    <div className="relative w-full max-w-[1200px] mx-auto mb-[20px] px-2 sm:px-4 mt-6">
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-[#1a1a1a] to-transparent z-10 pointer-events-none"></div>
      
      <div 
        ref={scrollRef}
        className="flex gap-2.5 overflow-x-auto scrollbar-hide py-2 px-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items?.map((category: any, index: number) => {
          const isActive = pathname === `/chi-tiet/the-loai/${category?.slug}`;
          const isSpecial = specialGenres.includes(category?.slug?.toLowerCase() || "");
          
          let styleClass = "cat-pill normal-pill";
          if (isActive) {
            styleClass = "cat-pill active-pill";
          } else if (isSpecial) {
            styleClass = "cat-pill special-pill";
          }

          return (
            <Link
              href={`/chi-tiet/the-loai/${category?.slug}`}
              key={index}
              className={`${styleClass} ${isActive ? "is-active" : ""}`}
            >
              {category?.name}
            </Link>
          );
        })}
      </div>

      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white dark:from-[#1a1a1a] to-transparent z-10 pointer-events-none"></div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .cat-pill {
          display: inline-flex;
          align-items: center;
          padding: 8px 18px;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid transparent;
        }

        .normal-pill {
          background: #f1f5f9;
          border-color: #e2e8f0;
          color: #475569;
        }
        .dark .normal-pill {
          background: #27272a;
          border-color: #3f3f46;
          color: #a1a1aa;
        }

        .normal-pill:hover {
          background: rgba(20,184,166,0.1);
          border-color: rgba(20,184,166,0.4);
          color: #0d9488;
          transform: translateY(-2px);
        }
        .dark .normal-pill:hover {
          background: rgba(20,184,166,0.15);
          border-color: rgba(20,184,166,0.5);
          color: #2dd4bf;
        }

        .active-pill {
          background: #14b8a6;
          border-color: #14b8a6;
          color: white;
          box-shadow: 0 4px 12px rgba(20,184,166,0.25);
          font-weight: 600;
        }
        .dark .active-pill {
          background: #0d9488;
          border-color: #0d9488;
          box-shadow: 0 4px 12px rgba(13,148,136,0.3);
        }

        .special-pill {
          background: #fff1f2;
          border-color: #fecdd3;
          color: #e11d48;
        }
        .dark .special-pill {
          background: rgba(225, 29, 72, 0.1);
          border-color: rgba(225, 29, 72, 0.3);
          color: #fb7185;
        }
        
        .special-pill:hover {
          background: #ffe4e6;
          border-color: #fda4af;
          transform: translateY(-2px);
        }
        .dark .special-pill:hover {
          background: rgba(225, 29, 72, 0.15);
          border-color: rgba(225, 29, 72, 0.5);
        }
      `}</style>
    </div>
  );
};

export default CaterogiesAnimate;
