"use client";

import { SpotifyIcon } from "@/components/icons";
import { useLanyard } from "@/hooks/useLanyard";
import Image from "next/image";

interface NowSpotifyProps {
  compact?: boolean;
}

export function NowSpotify({ compact = false }: NowSpotifyProps) {
  const lanyard = useLanyard();

  if (!lanyard) return null;

  const { listening_to_spotify, spotify } = lanyard;

  return (
    <div className="space-y-4">
      <h2 className="text-xs uppercase tracking-[0.25em] text-white/50">
        Listening to
      </h2>
      {listening_to_spotify && spotify ? (
        <a
          href={
            spotify.track_id
              ? `https://open.spotify.com/track/${spotify.track_id}`
              : "https://open.spotify.com"
          }
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-white/20 hover:bg-white/8"
        >
          {spotify.album_art_url ? (
            <Image
              src={spotify.album_art_url}
              alt={`Album art for ${spotify.song} by ${spotify.artist}`}
              width={compact ? 44 : 56}
              height={compact ? 44 : 56}
              className={`${compact ? "h-11 w-11" : "h-14 w-14"} shrink-0 rounded-md`}
            />
          ) : (
            <div
              className={`${compact ? "h-11 w-11" : "h-14 w-14"} flex shrink-0 items-center justify-center rounded-md bg-white/10`}
            >
              <SpotifyIcon size={24} />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="mb-1 flex items-center gap-2 text-xs text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Listening to
            </p>
            <p className="truncate font-semibold text-white group-hover:text-white/90">
              {spotify.song}
            </p>
            <p className="truncate text-sm text-white/50">{spotify.artist}</p>
            <p className="truncate text-xs text-white/30">{spotify.album}</p>
          </div>
        </a>
      ) : (
        <p className="text-sm text-white/30">Not listening to Spotify</p>
      )}
    </div>
  );
}
