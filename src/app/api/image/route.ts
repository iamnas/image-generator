import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();

  const seed = generateRandomNumber();
  const URL = `${process.env.NEXT_PUBLIC_GEN_AI_URL}/${encodeURIComponent(prompt)}&seed=${seed}`;

  const res = await fetch(`${URL}`);

  return NextResponse.json({ message: "OK", image: res.url });
}

export async function GET() {
  return NextResponse.json({ message: "OK" });
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 100000000) + 1;
}
