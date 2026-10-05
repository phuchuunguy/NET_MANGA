"use client";

import type { ComicItemProps } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge, Button, Typography } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";

const ComicItem = ({ data, onClickDelete, loading }: ComicItemProps) => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const pathname = usePathname();

  const chapterName =
    data?.chaptersLatest?.[0]?.chapter_name ?? data?.chapter_name;
  const chapterId =
    data?.chaptersLatest?.[0]?.chapter_api_data?.split("/").pop() ??
    ((pathname === "/kho-luu-tru" || pathname === "/lich-su-da-xem") ? data?.id : undefined);
  const statusLabels: Record<string, string> = {
    ongoing: "Đang phát hành",
    completed: "Đã hoàn thành",
    hiatus: "Tạm dừng",
    cancelled: "Đã hủy",
  };
  const textRibbon = chapterName
    ? `Chương ${chapterName}`
    : statusLabels[data?.status] ?? "MangaDex";
  const link = `/dang-xem/${data?.slug}/${chapterId}`;

  useEffect(() => {
    if (data?.thumb_url) {
      setImageSrc(data.thumb_url);
      return;
    }

    setImageSrc("/images/error-img.png");
  }, [data]);

  const handleDeleteComic = async (slug?: string, id?: string) => {
    if (onClickDelete) {
      onClickDelete(slug, id);
    }
  };

  return (
    <Badge.Ribbon
      placement="start"
      color={data?.status === "completed" ? "green" : "cyan"}
      text={textRibbon}
    >
      <div className="relative group overflow-hidden w-full">
        <Link
          href={`/thong-tin-truyen/${data?.slug}`}
          className="relative block"
        >
          <figure className="relative xl:h-[260px] 2xl:h-[240px] h-[260px] block rounded-lg overflow-hidden border border-[#f2f2f2]">
            {imageSrc ? (
              <Image
                className="w-full h-full transition-all lg:group-hover:scale-110 lg:group-hover:brightness-50 object-cover block"
                src={imageSrc}
                alt={data?.name ?? data?.comic_name ?? "Không xác định"}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                onError={() => setImageSrc("/images/error-img.png")}
                unoptimized
              />
            ) : null}
          </figure>
          <Typography.Text className="block p-2 font-semibold truncate group-hover:text-[#13c2c2] transition-all">
            {data?.name ?? data?.comic_name ?? "Không xác định"}
          </Typography.Text>
        </Link>

        {(pathname === "/kho-luu-tru" || pathname === "/lich-su-da-xem") && (
          <div className="absolute top-2 right-2">
            <Button
              loading={loading}
              onClick={() => handleDeleteComic(data?.slug, data?.id)}
              icon={<DeleteOutlined />}
              color="red"
              variant="solid"
            />
          </div>
        )}

        <div className="absolute lg:top-full top-[72%] flex justify-center gap-2 left-[12px] right-[12px] lg:opacity-0 group-hover:opacity-100 rounded-xl transition-all lg:group-hover:top-[70%]">
          <Link href={chapterId ? link : `/thong-tin-truyen/${data?.slug}`} className="w-full">
            <Button
              className="w-full"
              type="link"
              color="cyan"
              variant="solid"
              icon={<EyeOutlined />}
            >
              Đọc ngay
            </Button>
          </Link>
        </div>
      </div>
    </Badge.Ribbon>
  );
};

export default ComicItem;
