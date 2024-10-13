import { authOptions } from "@/utils/authOptions";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { prompt } = await request.json();

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "No such user" }, { status: 401 });
  }

  const seed = generateRandomNumber();
  const URL = `${process.env.NEXT_PUBLIC_GEN_AI_URL}/${encodeURIComponent(
    prompt
  )}&seed=${seed}&width=512&height=512&noLogo=true`;

  const res = await fetch(`${URL}`);

  await prisma.post.create({
    data: {
      prompt: prompt,
      seed: seed,
      userId: user.id,
      url: res.url,
    },
  });

  return NextResponse.json({ message: "OK", url: res.url });
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized User" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "No such user" }, { status: 401 });
  }

  const postData = await prisma.post.findMany({
    where: {
      userId: user.id,
    },
    orderBy:{
      createdAt:"desc"
    }
  });

  return NextResponse.json({ message: "OK", postData });
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 100000000) + 1;
}
