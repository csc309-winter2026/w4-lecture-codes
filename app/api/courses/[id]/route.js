import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";

export async function GET(request, { params }) {
  const { id } = await params;

  if (isNaN(Number(id))) {
    return NextResponse.json({ error: "Invalid course ID" }, { status: 400 });
  }

  const course = await prisma.course.findUnique({ where: { id: Number(id) } });

  if (!course) {
    return NextResponse.json(
      { error: "Course with this ID does not exist" },
      { status: 404 },
    );
  }

  return NextResponse.json(course);
}

export async function POST(request, { params }) {
  const { id } = await params;

  if (isNaN(Number(id))) {
    return NextResponse.json({ error: "Invalid course ID" }, { status: 400 });
  }

  if (!(await prisma.course.findUnique({ where: { id: Number(id) } }))) {
    return NextResponse.json(
      { error: "Course with this ID does not exist" },
      { status: 404 },
    );
  }

  const { name, capacity, isClosed } = await request.json();

  const updatedCourse = await prisma.course.update({
    where: { id: Number(id) },
    data: {
      name,
      capacity,
      isClosed,
    },
  });

  return NextResponse.json(updatedCourse);
}

export async function DELETE(request, { params }) {
  const { id } = await params;

  if (isNaN(Number(id))) {
    return NextResponse.json({ error: "Invalid course ID" }, { status: 400 });
  }

  if (!(await prisma.course.findUnique({ where: { id: Number(id) } }))) {
    return NextResponse.json(
      { error: "Course with this ID does not exist" },
      { status: 404 },
    );
  }

  await prisma.course.delete({ where: { id: Number(id) } });

  return NextResponse.json({ message: "Course deleted successfully" });
}
