import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = await params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: "Invalid course ID" }, { status: 400 });
  }

  const course = await prisma.course.findUnique({
    where: { id: Number(id) },
  });

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  return NextResponse.json(course);
}

export async function POST(request, { params }) {
  const { id } = await params;
  const { name, capacity, isClosed } = await request.json();

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: "Invalid course ID" }, { status: 400 });
  }

  if (!(await prisma.course.findUnique({ where: { id: Number(id) } }))) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  const updatedCourse = await prisma.course.update({
    where: { id: Number(id) },
    data: {
      name, // Validation needed
      capacity,
      isClosed,
    },
  });

  return NextResponse.json(updatedCourse);
}

export async function DELETE(request, { params }) {
  const { id } = await params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: "Invalid course ID" }, { status: 400 });
  }

  if (!(await prisma.course.findUnique({ where: { id: Number(id) } }))) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  await prisma.course.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ message: "Course deleted successfully" });
}
