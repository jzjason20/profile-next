"use client";

import { useEffect, useState } from "react";

export interface SpotifyNowPlaying {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumArtUrl: string | null;
  trackId: string;
}

const POLL_INTERVAL = 30_000; // 30 seconds

export function useSpotify(): SpotifyNowPlaying | null {
  const [data, setData] = useState<SpotifyNowPlaying | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchNowPlaying() {
      try {
        const res = await fetch("/api/spotify");
        if (!res.ok) return;
        const json = (await res.json()) as SpotifyNowPlaying;
        if (!cancelled) setData(json);
      } catch {
        // Ignore network errors — stale data is fine
      }
    }

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, POLL_INTERVAL);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return data;
}
