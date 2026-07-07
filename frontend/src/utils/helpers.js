// Format seconds to mm:ss or hh:mm:ss
export const formatDuration = (seconds) => {
  if (!seconds) return "0:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
};

// Extract YouTube video ID from URL
export const getYouTubeId = (url) => {
  if (!url) return null;
  const patterns = [
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

// YouTube embed URL
export const getYouTubeEmbedUrl = (url) => {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1` : null;
};

// YouTube thumbnail
export const getYouTubeThumbnail = (url) => {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : null;
};

// Format date
export const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Format currency
export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount || 0);

// Truncate text
export const truncate = (text, length = 100) =>
  text && text.length > length ? text.slice(0, length) + "…" : text;

// Generate unique ID
export const genId = () => Math.random().toString(36).slice(2, 9);

// Debounce
export const debounce = (fn, delay = 400) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

// Badge class by subscription type
export const badgeClass = (type) => {
  const map = { FREE: "badge-free", PLUS: "badge-plus", PREMIUM: "badge-premium" };
  return map[type] || "badge-free";
};
