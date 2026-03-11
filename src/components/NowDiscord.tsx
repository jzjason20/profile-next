"use client";

import { DiscordIcon } from "@/components/icons";
import { useLanyard, type Activity } from "@/hooks/useLanyard";
import Image from "next/image";

interface NowDiscordProps {
  compact?: boolean;
}

const CODING_APPS = new Set([
  "visual studio code",
  "code",
  "intellij idea",
  "webstorm",
  "pycharm",
  "goland",
  "rider",
  "clion",
  "vim",
  "neovim",
  "nvim",
  "xcode",
  "android studio",
  "sublime text",
  "atom",
  "emacs",
]);

function getActivityLabel(activity: Activity): string {
  if (CODING_APPS.has(activity.name.toLowerCase())) return "Coding";
  if (activity.type === 1) return "Streaming";
  if (activity.type === 3) return "Watching";
  return "Playing";
}

function getActivityImageUrl(activity: Activity): string | null {
  const img = activity.assets?.large_image;
  if (!img) return null;

  // External image proxied through Discord's media proxy
  if (img.startsWith("mp:external/")) {
    const encoded = img.slice("mp:external/".length);
    // The URL is base64-like encoded after the hash segment
    const parts = encoded.split("/");
    // Reconstruct: everything after the first path segment is the external URL
    if (parts.length > 1) {
      return decodeURIComponent(parts.slice(1).join("/"));
    }
    return null;
  }

  // Standard application asset
  if (activity.application_id) {
    return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${img}.png`;
  }

  return null;
}

export function NowDiscord({ compact = false }: NowDiscordProps) {
  const lanyard = useLanyard();

  if (!lanyard) return null;

  // Find first non-Spotify, non-custom-status activity (type 0 = Playing)
  const activity = lanyard.activities.find(
    (a) => a.type === 0 || a.type === 1 || a.type === 3,
  );

  const imageUrl = activity ? getActivityImageUrl(activity) : null;

  return (
    <div className="space-y-4">
      <h2 className="text-xs uppercase tracking-[0.25em] text-white/50">
        Discord activity
      </h2>
      {activity ? (
        <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
          {imageUrl ? (
            imageUrl.includes("cdn.discordapp.com") ? (
              <Image
                src={imageUrl}
                alt={activity.assets?.large_text ?? activity.name}
                width={compact ? 44 : 56}
                height={compact ? 44 : 56}
                className={`${compact ? "h-11 w-11" : "h-14 w-14"} shrink-0 rounded-md object-cover`}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt={activity.assets?.large_text ?? activity.name}
                className={`${compact ? "h-11 w-11" : "h-14 w-14"} shrink-0 rounded-md object-cover`}
              />
            )
          ) : (
            <div
              className={`${compact ? "h-11 w-11" : "h-14 w-14"} flex shrink-0 items-center justify-center rounded-md bg-white/10 text-white/40`}
            >
              <DiscordIcon size={12} />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="mb-1 flex items-center gap-1.5 text-xs text-indigo-400">
              <DiscordIcon size={12} />
              {getActivityLabel(activity)}
            </p>
            <p className="truncate font-semibold text-white">{activity.name}</p>
            {activity.details && (
              <p className="truncate text-sm text-white/50">
                {activity.details}
              </p>
            )}
            {activity.state && (
              <p className="truncate text-xs text-white/30">{activity.state}</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-sm text-white/30">No active Discord activity.</p>
      )}
    </div>
  );
}
