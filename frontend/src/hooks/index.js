import { useState, useEffect, useCallback, useRef } from "react";
import { debounce } from "../utils/helpers";

// Generic data fetching hook
export const useFetch = (fetchFn, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: res } = await fetchFn();
      setData(res);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, deps); // eslint-disable-line

  useEffect(() => { load(); }, [load]);

  return { data, loading, error, refetch: load };
};

// Debounced search hook
export const useSearch = (delay = 400) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), delay);
    return () => clearTimeout(timer);
  }, [query, delay]);

  return { query, setQuery, debouncedQuery };
};

// Pagination hook
export const usePagination = (totalItems, itemsPerPage = 12) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goTo = (p) => setPage(Math.max(1, Math.min(p, totalPages)));
  const next = () => goTo(page + 1);
  const prev = () => goTo(page - 1);

  return { page, totalPages, goTo, next, prev, setPage };
};

// Timer hook for quiz
export const useTimer = (initialSeconds, onExpire) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = useCallback(() => setRunning(true), []);
  const stop = useCallback(() => setRunning(false), []);
  const reset = useCallback(() => { setSeconds(initialSeconds); setRunning(false); }, [initialSeconds]);

  useEffect(() => {
    if (!running) { clearInterval(intervalRef.current); return; }
    intervalRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) { clearInterval(intervalRef.current); setRunning(false); onExpire?.(); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running, onExpire]);

  const percent = (seconds / initialSeconds) * 100;
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const display = `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  return { seconds, display, percent, start, stop, reset };
};
