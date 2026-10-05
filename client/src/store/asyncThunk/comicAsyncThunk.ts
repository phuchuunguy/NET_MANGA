import { ComicDetail, ComicInfo, SearchComic } from "@/lib/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getChapterPages,
  getMangaById,
  getMangaChapters,
  getMangaList,
  getTags,
} from "@/lib/mangadex";

const PAGE_SIZE = 24;

function pageOffset(page: string) {
  const pageNumber = Math.max(1, Number.parseInt(page, 10) || 1);
  return (pageNumber - 1) * PAGE_SIZE;
}

function listResponse(result: Awaited<ReturnType<typeof getMangaList>>, titlePage: string) {
  return {
    status: "success",
    data: {
      items: result.items,
      titlePage,
      breadCrumb: [{ name: titlePage }],
      params: {
        pagination: {
          totalItems: result.totalItems,
          totalItemsPerPage: PAGE_SIZE,
        },
      },
    },
  };
}

async function getComicInfo(slug: string) {
  const [manga, chapterResult] = await Promise.all([
    getMangaById(slug),
    getMangaChapters(slug),
  ]);
  const chapters = chapterResult.items;
  return {
    status: "success",
    data: {
      item: {
        ...manga,
        chapters: [{ server_data: chapters }],
        chaptersLatest: chapters.length ? [chapters[chapters.length - 1]] : [],
      },
      breadCrumb: [{ name: manga.name }],
    },
  };
}

export const fetchCategorys = createAsyncThunk(
  "users/fetchCategorys",
  async () => {
    return { status: "success", data: { items: await getTags() } };
  }
);

export const fetchComicSlide = createAsyncThunk(
  "users/fetchComicSlide",
  async () => {
    const result = await getMangaList({ limit: 24, order: "latestUploadedChapter" });
    return { status: "success", data: { items: result.items } };
  }
);

export const fetchNewComic = createAsyncThunk(
  "users/fetchNewComic",
  async () => {
    const result = await getMangaList({ limit: PAGE_SIZE, order: "createdAt" });
    return { status: "success", data: { items: result.items } };
  }
);

export const fetchPublishedComic = createAsyncThunk(
  "users/fetchPublishedComic",
  async () => {
    const result = await getMangaList({ limit: PAGE_SIZE, status: "ongoing" });
    return { status: "success", data: { items: result.items } };
  }
);

export const fetchUpComingComic = createAsyncThunk(
  "users/fetchUpComingComic",
  async () => {
    const result = await getMangaList({ limit: PAGE_SIZE, order: "createdAt" });
    return { status: "success", data: { items: result.items } };
  }
);

export const fetchCompletedComic = createAsyncThunk(
  "users/fetchCompletedComic",
  async () => {
    const result = await getMangaList({ limit: PAGE_SIZE, status: "completed" });
    return { status: "success", data: { items: result.items } };
  }
);

export const fetchComicDetail = createAsyncThunk(
  "users/fetchComicDetail",
  async ({ description, slug, currentPage }: ComicDetail) => {
    const page = Math.max(1, Number.parseInt(currentPage, 10) || 1);
    const offset = pageOffset(currentPage);
    let result;
    let titlePage = "Truyện MangaDex";

    if (description === "the-loai") {
      const tags = await getTags();
      titlePage = tags.find((tag) => tag.slug === slug)?.name ?? "Thể loại";
      result = await getMangaList({ tagId: slug, limit: PAGE_SIZE, offset });
    } else if (slug === "dang-phat-hanh") {
      titlePage = "Truyện đang phát hành";
      result = await getMangaList({ status: "ongoing", limit: PAGE_SIZE, offset });
    } else if (slug === "da-hoan-thanh") {
      titlePage = "Truyện đã hoàn thành";
      result = await getMangaList({ status: "completed", limit: PAGE_SIZE, offset });
    } else {
      titlePage = slug === "sap-ra-mat" ? "Manga mới tạo" : "Manga mới cập nhật";
      result = await getMangaList({
        order: slug === "sap-ra-mat" ? "createdAt" : "latestUploadedChapter",
        limit: PAGE_SIZE,
        offset,
      });
    }

    return listResponse(result, titlePage);
  }
);

export const fetchComicInfo = createAsyncThunk(
  "users/fetchComicInfo",
  async ({ slug }: ComicInfo) => {
    return getComicInfo(slug);
  }
);

export const fetchSearchComic = createAsyncThunk(
  "users/fetchSearchComic",
  async ({ keyword, currentPage }: SearchComic) => {
    const result = await getMangaList({
      query: keyword,
      limit: PAGE_SIZE,
      offset: pageOffset(currentPage),
    });
    return listResponse(result, `Tìm kiếm: ${keyword}`);
  }
);

export const fetchSearchComicPreview = createAsyncThunk(
  "users/fetchSearchComicPreview",
  async ({ keyword }: { keyword: string }) => {
    const result = await getMangaList({ query: keyword, limit: 8 });
    return {
      status: "success",
      data: {
        items: result.items,
        params: { pagination: { totalItems: result.totalItems } },
      },
    };
  }
);

export const fetchImageComic = createAsyncThunk(
  "users/fetchReadComic",
  async ({ id }: { id: string }) => {
    const [pageResult, chapterInfo] = await Promise.all([
      getChapterPages(id),
      fetch(`/api/mangadex?endpoint=chapter/${encodeURIComponent(id)}`).then(async (response) => {
        if (!response.ok) throw new Error("Unable to load chapter metadata");
        return response.json();
      }),
    ]);
    const chapterName = chapterInfo?.data?.attributes?.chapter ?? "?";
    const chapterTitle = chapterInfo?.data?.attributes?.title;
    return {
      status: "success",
      data: {
        item: {
          ...pageResult.chapter,
          chapter_name: `${chapterName}${chapterTitle ? ` - ${chapterTitle}` : ""}`,
          imageUrls: pageResult.imageUrls,
          chapter_image: pageResult.imageUrls.map((url) => ({ image_url: url })),
        },
      },
    };
  }
);
