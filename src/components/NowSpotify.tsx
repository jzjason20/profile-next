"use client";

import { useLanyard } from "@/hooks/useLanyard";

const SpotifyIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={spotify.album_art_url}
            alt="album art"
            className="h-14 w-14 shrink-0 rounded-md"
          />
          <div className="min-w-0 flex-1">
            <p className="mb-1 flex items-center gap-1.5 text-xs text-emerald-400">
              <SpotifyIcon />
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
