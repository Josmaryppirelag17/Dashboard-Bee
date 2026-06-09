import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ version: "v1", docs: "/api/v1", deprecated: false });
}
