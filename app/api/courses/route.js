import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const courses = await prisma.course.findMany({
    select: {
      id: true,
      code: true,
      name: true,
      capacity: true,
      isClosed: true,
    },
  });

  return NextResponse.json(courses);
}

export async function POST(request) {
  const { code, name, capacity, isClosed } = await request.json();

  if (!code) {
    return NextResponse.json({ error: "Code is required" }, { status: 400 });
  }

  if (typeof code !== "string") {
    return NextResponse.json(
      { error: "Code must be a string" },
      { status: 400 },
    );
  }

  const newCourse = await prisma.course.create({
    data: {
      code,
      name, // Validation needed
      capacity,
      isClosed,
    },
  });

  return NextResponse.json(newCourse);
}
