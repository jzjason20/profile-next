"use client";

import { useLanyard, type Activity } from "@/hooks/useLanyard";

const DiscordIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
  </svg>
);

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

export function NowDiscord() {
  const lanyard = useLanyard();

  if (!lanyard) return null;

  // Find first non-Spotify, non-custom-status activity (type 0 = Playing)
  const activity = lanyard.activities.find(
    (a) => a.type === 0 || a.type === 1 || a.type === 3
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
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={activity.assets?.large_text ?? activity.name}
              className="h-14 w-14 shrink-0 rounded-md object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-white/10 text-white/40">
              <DiscordIcon />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="mb-1 flex items-center gap-1.5 text-xs text-indigo-400">
              <DiscordIcon />
              {getActivityLabel(activity)}
            </p>
            <p className="truncate font-semibold text-white">{activity.name}</p>
            {activity.details && (
              <p className="truncate text-sm text-white/50">{activity.details}</p>
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
