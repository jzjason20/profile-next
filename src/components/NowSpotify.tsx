"use client";

import { SpotifyIcon } from "@/components/icons";
import { useLanyard } from "@/hooks/useLanyard";
import Image from "next/image";

export function NowSpotify() {
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
          href={`https://open.spotify.com/track/${spotify.track_id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-white/20 hover:bg-white/8"
        >
          <Image
            src={spotify.album_art_url}
            alt={`Album art for ${spotify.song} by ${spotify.artist}`}
            width={56}
            height={56}
            className="h-14 w-14 shrink-0 rounded-md"
          />
          <div className="min-w-0 flex-1">
            <p className="mb-1 flex items-center gap-1.5 text-xs text-emerald-400">
              <SpotifyIcon size={12} />
              Now playing
            </p>
            <p className="truncate font-semibold text-white group-hover:text-white/90">
              {spotify.song}
            </p>
            <p className="truncate text-sm text-white/50">{spotify.artist}</p>
            <p className="truncate text-xs text-white/30">{spotify.album}</p>
          </div>
        </a>
      ) : (
        <p className="text-sm text-white/30">Not listening right now.</p>
      )}
    </div>
  );
}
