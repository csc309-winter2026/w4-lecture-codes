import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";

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

  if (await prisma.course.findUnique({ where: { code } })) {
    return NextResponse.json(
      { error: "Course with this code already exists" },
      { status: 400 },
    );
  }

  // Other fields require validation as well

  const newCourse = await prisma.course.create({
    data: {
      code,
      name,
      capacity,
      isClosed,
    },
  });

  return NextResponse.json(newCourse);
}
