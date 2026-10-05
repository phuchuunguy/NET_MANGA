export type MangaDexEntity = {
  id: string;
  type: string;
  attributes: Record<string, any>;
  relationships?: Array<{ id: string; type: string; attributes?: Record<string, any> }>;
};

type MangaDexCollection = {
  data?: MangaDexEntity[];
  total?: number;
  limit?: number;
  offset?: number;
};

type MangaDexSingle = { data?: MangaDexEntity };

type ChapterPageData = {
  baseUrl: string;
  chapter: {
    hash: string;
    data: string[];
    dataSaver: string[];
  };
};

const API_PATH = "/api/mangadex";
const COVER_BASE = "https://uploads.mangadex.org/covers";
const API_KEYWORD = "endpoint";
const DEFAULT_LANGUAGE = "vi";

function localizeQuery(endpoint: string, params: URLSearchParams) {
  params.set(API_KEYWORD, endpoint);
  return `${API_PATH}?${params.toString()}`;
}

async function mangaDexFetch<T>(endpoint: string, params = new URLSearchParams()): Promise<T> {
  const response = await fetch(localizeQuery(endpoint, params), {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(`MangaDex ${response.status}: ${message}`);
  }
  return response.json() as Promise<T>;
}

function translatedText(value?: Record<string, string> | null): string {
  if (!value) return "";
  return value[DEFAULT_LANGUAGE] || value.en || Object.values(value)[0] || "";
}

function relationship(entity: MangaDexEntity, type: string) {
  return entity.relationships?.find((item) => item.type === type);
}

function coverFilename(entity: MangaDexEntity): string | undefined {
  const cover = relationship(entity, "cover_art");
  const fileName = cover?.attributes?.fileName;
  if (cover?.id && fileName) return `${COVER_BASE}/${entity.id}/${fileName}.256.jpg`;
  return undefined;
}

export function mapManga(entity: MangaDexEntity) {
  const attributes = entity.attributes;
  const title = translatedText(attributes.title) || "Không có tiêu đề";
  const description = translatedText(attributes.description);
  const cover = coverFilename(entity);
  const author = relationship(entity, "author")?.attributes?.name;
  const artist = relationship(entity, "artist")?.attributes?.name;
  const tags = (attributes.tags ?? []).map((tag: MangaDexEntity) => ({
    id: tag.id,
    name: translatedText(tag.attributes?.name) || "Khác",
    slug: tag.id,
  }));

  return {
    id: entity.id,
    slug: entity.id,
    name: title,
    comic_name: title,
    title: attributes.title,
    thumb_url: cover,
    coverUrl: cover,
    content: description,
    description,
    author: [author, artist].filter(Boolean),
    category: tags,
    status: attributes.status ?? "unknown",
    updatedAt: attributes.updatedAt,
    chaptersLatest: [],
    chapters: [],
  };
}

export function mapChapter(entity: MangaDexEntity) {
  const attributes = entity.attributes;
  const chapterLabel = attributes.chapter || attributes.volume || "?";
  const title = attributes.title ? ` - ${attributes.title}` : "";
  return {
    id: entity.id,
    chapter_name: `${chapterLabel}${title}`,
    chapter_api_data: entity.id,
    translatedLanguage: attributes.translatedLanguage,
    pages: attributes.pages,
    publishedAt: attributes.publishAt,
  };
}

export async function getMangaList(options: {
  offset?: number;
  limit?: number;
  query?: string;
  tagId?: string;
  order?: "latestUploadedChapter" | "createdAt";
  status?: string;
} = {}) {
  const params = new URLSearchParams();
  params.set("limit", String(options.limit ?? 24));
  params.set("offset", String(options.offset ?? 0));
  params.append("includes[]", "cover_art");
  params.append("includes[]", "author");
  params.append("includes[]", "artist");
  params.append("availableTranslatedLanguage[]", DEFAULT_LANGUAGE);
  params.append("availableTranslatedLanguage[]", "en");
  params.append("contentRating[]", "safe");
  params.append("contentRating[]", "suggestive");
  params.set(`order[${options.order ?? "latestUploadedChapter"}]`, "desc");
  if (options.query) params.set("title", options.query);
  if (options.tagId) params.append("includedTags[]", options.tagId);
  if (options.status) params.append("status[]", options.status);

  const result = await mangaDexFetch<MangaDexCollection>("manga", params);
  return {
    items: (result.data ?? []).map(mapManga),
    totalItems: result.total ?? 0,
    totalItemsPerPage: result.limit ?? options.limit ?? 24,
    offset: result.offset ?? options.offset ?? 0,
  };
}

export async function getMangaById(id: string) {
  const params = new URLSearchParams();
  params.append("includes[]", "cover_art");
  params.append("includes[]", "author");
  params.append("includes[]", "artist");
  params.append("includes[]", "tag");
  const result = await mangaDexFetch<MangaDexSingle>(`manga/${encodeURIComponent(id)}`, params);
  if (!result.data) throw new Error("Manga not found");
  return mapManga(result.data);
}

export async function getMangaChapters(id: string, options: { offset?: number; limit?: number } = {}) {
  const params = new URLSearchParams();
  params.set("limit", String(options.limit ?? 500));
  params.set("offset", String(options.offset ?? 0));
  params.append("translatedLanguage[]", DEFAULT_LANGUAGE);
  params.set("order[chapter]", "asc");
  params.set("order[volume]", "asc");
  params.set("includes[]", "scanlation_group");
  let result = await mangaDexFetch<MangaDexCollection>(`manga/${encodeURIComponent(id)}/feed`, params);
  if ((result.data?.length ?? 0) === 0 && DEFAULT_LANGUAGE !== "en") {
    params.delete("translatedLanguage[]");
    params.append("translatedLanguage[]", "en");
    result = await mangaDexFetch<MangaDexCollection>(`manga/${encodeURIComponent(id)}/feed`, params);
  }
  return {
    items: (result.data ?? []).map(mapChapter),
    totalItems: result.total ?? 0,
  };
}

export async function getChapterPages(id: string): Promise<{ chapter: Record<string, any>; imageUrls: string[] }> {
  const chapter = await mangaDexFetch<ChapterPageData>(`at-home/server/${encodeURIComponent(id)}`);
  const files = chapter.chapter.data?.length ? chapter.chapter.data : chapter.chapter.dataSaver;
  const quality = chapter.chapter.data?.length ? "data" : "data-saver";
  return {
    chapter: {
      id,
      chapter_name: "",
      pages: files.length,
    },
    imageUrls: files.map((file) => `${chapter.baseUrl}/${quality}/${chapter.chapter.hash}/${file}`),
  };
}

export async function getTags() {
  const result = await mangaDexFetch<{ data?: MangaDexEntity[] }>("manga/tag");
  return (result.data ?? []).map((tag) => ({
    _id: tag.id,
    id: tag.id,
    name: translatedText(tag.attributes?.name) || "Khác",
    slug: tag.id,
  }));
}
