const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";

// Cache the access token in memory across requests (one serverless instance)
let cachedToken: { access_token: string; expires_at: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expires_at) {
    return cachedToken.access_token;
  }

  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } =
    process.env;

  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`,
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN!,
    }),
  });

  const data = (await res.json()) as {
    access_token: string;
    expires_in: number;
  };
  // Subtract 60s buffer so we refresh before expiry
  cachedToken = {
    access_token: data.access_token,
    expires_at: Date.now() + (data.expires_in - 60) * 1000,
  };

  return cachedToken.access_token;
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();

    const res = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${accessToken}` },
      // Always fetch fresh — no Next.js cache
      cache: "no-store",
    });

    // 204 = nothing playing; anything ≥ 400 = error
    if (res.status === 204 || res.status >= 400) {
      return Response.json({ isPlaying: false });
    }

    const song = (await res.json()) as {
      is_playing: boolean;
      currently_playing_type: string;
      item: {
        id: string;
        name: string;
        artists: { name: string }[];
        album: { name: string; images: { url: string }[] };
      } | null;
    };

    if (song.currently_playing_type !== "track" || !song.item) {
      return Response.json({ isPlaying: false });
    }

    return Response.json({
      isPlaying: song.is_playing,
      title: song.item.name,
      artist: song.item.artists.map((a) => a.name).join(", "),
      album: song.item.album.name,
      albumArtUrl: song.item.album.images[0]?.url ?? null,
      trackId: song.item.id,
    });
  } catch {
    return Response.json({ isPlaying: false }, { status: 500 });
  }
}
