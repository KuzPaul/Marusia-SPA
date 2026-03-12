export const getYouTubeId = (url: string): string | null => {
  if (!url) return null;

  //если это id
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return url;
  }

  try {
    const urlObj = new URL(url);

    if (urlObj.hostname.includes("youtube.com")) {
      return urlObj.searchParams.get("v");
    }

    if (urlObj.hostname.includes("youtu.be")) {
      return urlObj.pathname.slice(1);
    }
  } catch {
    console.warn("Не удалось распарсить URL:", url);
  }

  return null;
};
