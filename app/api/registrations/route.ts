import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { registrations } from "@/db/schema";

const clean = (value: unknown, max = 200) => typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const parentName = clean(body.parentName, 120), email = clean(body.email, 180).toLowerCase(), phone = clean(body.phone, 40), childName = clean(body.childName, 80), program = clean(body.program, 80), notes = clean(body.notes, 1000);
    const childAge = Number(body.childAge);
    const allowedPrograms = ["Rookie Kickers", "Skill Builders", "Next Level"];
    if (!parentName || !email.includes("@") || !phone || !childName || !Number.isInteger(childAge) || childAge < 5 || childAge > 15 || !allowedPrograms.includes(program) || body.consent !== true) {
      return NextResponse.json({ message: "Please check the required information and try again." }, { status: 400 });
    }
    await getDb().insert(registrations).values({ parentName, email, phone, childName, childAge, program, notes: notes || null, status: "new" });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Registration save failed", error);
    return NextResponse.json({ message: "Registration is temporarily unavailable. Please try again shortly." }, { status: 503 });
  }
}
