"use client";

import { useEffect, useState } from "react";

const DISCORD_ID = "1188830310473928734";

export type DiscordStatus = "online" | "idle" | "dnd" | "offline";

export interface Activity {
  id: string;
  name: string;
  type: number; // 0=Playing, 1=Streaming, 2=Listening, 3=Watching, 4=Custom, 5=Competing
  details?: string;
  state?: string;
  application_id?: string;
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
  timestamps?: { start?: number; end?: number };
}

export interface LanyardData {
  discord_status: DiscordStatus;
  listening_to_spotify: boolean;
  spotify: {
    song: string;
    artist: string;
    album: string;
    album_art_url: string;
    track_id: string;
    timestamps: { start: number; end: number };
  } | null;
  activities: Activity[];
}

const MAX_RECONNECT_ATTEMPTS = 10;

export function useLanyard(): LanyardData | null {
  const [data, setData] = useState<LanyardData | null>(null);

  useEffect(() => {
    let ws: WebSocket;
    let heartbeatInterval: ReturnType<typeof setInterval>;
    let reconnectTimeout: ReturnType<typeof setTimeout>;
    let reconnectAttempts = 0;
    let disposed = false;

    function cleanup() {
      clearInterval(heartbeatInterval);
      clearTimeout(reconnectTimeout);
    }

    function scheduleReconnect() {
      if (disposed || reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) return;
      cleanup();
      const delay = Math.min(5000 * Math.pow(1.5, reconnectAttempts), 60000);
      reconnectAttempts++;
      reconnectTimeout = setTimeout(connect, delay);
    }

    function connect() {
      if (disposed) return;
      cleanup();

      ws = new WebSocket("wss://api.lanyard.rest/socket");

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data as string);

          if (msg.op === 1) {
            // HELLO — subscribe and start heartbeat
            ws.send(
              JSON.stringify({ op: 2, d: { subscribe_to_id: DISCORD_ID } }),
            );
            heartbeatInterval = setInterval(() => {
              if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ op: 3 }));
              }
            }, msg.d.heartbeat_interval);
          } else if (msg.op === 0) {
            // INIT_STATE or PRESENCE_UPDATE
            reconnectAttempts = 0;
            const d = msg.d;

            let isListening: boolean = d.listening_to_spotify;
            let spotifyData: LanyardData["spotify"] = d.spotify ?? null;

            // Fallback: mobile Spotify shows as a type-2 activity rather than
            // populating listening_to_spotify / spotify fields.
            if (!isListening) {
              const spotifyActivity = (d.activities ?? []).find(
                (a: Activity) => a.type === 2 && a.name === "Spotify",
              );
              if (spotifyActivity) {
                isListening = true;
                let albumArtUrl = "";
                const largeImage = spotifyActivity.assets?.large_image ?? "";
                if (largeImage.startsWith("spotify:")) {
                  albumArtUrl = `https://i.scdn.co/image/${largeImage.slice("spotify:".length)}`;
                } else if (largeImage.startsWith("mp:external/")) {
                  const encoded = largeImage.slice("mp:external/".length);
                  const parts = encoded.split("/");
                  if (parts.length > 1)
                    albumArtUrl = decodeURIComponent(parts.slice(1).join("/"));
                }
                spotifyData = {
                  song: spotifyActivity.details ?? "",
                  artist: spotifyActivity.state ?? "",
                  album: spotifyActivity.assets?.large_text ?? "",
                  album_art_url: albumArtUrl,
                  track_id: "",
                  timestamps: {
                    start: spotifyActivity.timestamps?.start ?? 0,
                    end: spotifyActivity.timestamps?.end ?? 0,
                  },
                };
              }
            }

            setData({
              discord_status: d.discord_status,
              listening_to_spotify: isListening,
              spotify: spotifyData,
              activities: d.activities ?? [],
            });
          }
        } catch {
          // Ignore malformed messages
        }
      };

      ws.onerror = () => {
        ws.close();
      };

      ws.onclose = () => {
        cleanup();
        scheduleReconnect();
      };
    }

    connect();

    return () => {
      disposed = true;
      cleanup();
      ws?.close();
    };
  }, []);

  return data;
}
