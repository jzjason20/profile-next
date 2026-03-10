"use client";

import { useEffect, useState } from "react";

const DISCORD_ID = "1188830310473928734";

export type DiscordStatus = "online" | "idle" | "dnd" | "offline";

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
}

export function useLanyard(): LanyardData | null {
  const [data, setData] = useState<LanyardData | null>(null);

  useEffect(() => {
    let ws: WebSocket;
    let heartbeatInterval: ReturnType<typeof setInterval>;
    let reconnectTimeout: ReturnType<typeof setTimeout>;

    function connect() {
      ws = new WebSocket("wss://api.lanyard.rest/socket");

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data as string);

        if (msg.op === 1) {
          // HELLO — subscribe and start heartbeat
          ws.send(
            JSON.stringify({ op: 2, d: { subscribe_to_id: DISCORD_ID } })
          );
          heartbeatInterval = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ op: 3 }));
            }
          }, msg.d.heartbeat_interval);
        } else if (msg.op === 0) {
          // INIT_STATE or PRESENCE_UPDATE
          const d = msg.d;
          setData({
            discord_status: d.discord_status,
            listening_to_spotify: d.listening_to_spotify,
            spotify: d.spotify ?? null,
          });
        }
      };

      ws.onclose = () => {
        clearInterval(heartbeatInterval);
        // Reconnect after 5s
        reconnectTimeout = setTimeout(connect, 5000);
      };
    }

    connect();

    return () => {
      clearInterval(heartbeatInterval);
      clearTimeout(reconnectTimeout);
      ws?.close();
    };
  }, []);

  return data;
}
