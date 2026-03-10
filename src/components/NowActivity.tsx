"use client";

import { useLanyard, type LanyardActivity } from "@/hooks/useLanyard";

function getActivityImageUrl(activity: LanyardActivity): string | null {
  const img = activity.assets?.large_image;
  if (!img) return null;

  if (img.startsWith("mp:")) {
    return `https://media.discordapp.net/${img.slice(3)}`;
  }
  if (img.startsWith("spotify:")) {
    return null; // handled by NowSpotify
  }
  if (activity.application_id) {
    return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${img}.png`;
  }
  return null;
}

const activityTypeLabel: Record<number, string> = {
  0: "Playing",
  1: "Streaming",
  3: "Watching",
  5: "Competing in",
};

export function NowActivity() {
  const lanyard = useLanyard();

  if (!lanyard) return null;

  // Filter out Spotify (type=2) and Custom Status (type=4)
  const activities = lanyard.activities.filter(
    (a) => a.type !== 2 && a.type !== 4
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xs uppercase tracking-[0.25em] text-white/50">
        Activity
      </h2>
      {activities.length > 0 ? (
        <div className="space-y-3">
          {activities.map((activity, i) => {
            const imageUrl = getActivityImageUrl(activity);
            const label = activityTypeLabel[activity.type] ?? "Using";

            return (
              <div
                key={i}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                {imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imageUrl}
                    alt={activity.assets?.large_text ?? activity.name}
                    className="h-14 w-14 shrink-0 rounded-md object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-white/10 text-2xl">
                    🎮
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="mb-1 text-xs text-white/40">{label}</p>
                  <p className="truncate font-semibold text-white">
                    {activity.name}
                  </p>
                  {activity.details && (
                    <p className="truncate text-sm text-white/50">
                      {activity.details}
                    </p>
                  )}
                  {activity.state && (
                    <p className="truncate text-xs text-white/30">
                      {activity.state}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-white/30">No active sessions right now.</p>
      )}
    </div>
  );
}
