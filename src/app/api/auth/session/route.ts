import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getDbError } from "@/lib/db/connection";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({
        success: true,
        data: { authenticated: false, user: null },
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        authenticated: true,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          name: user.name,
          lastName: user.lastName,
        },
      },
    });
  } catch (error) {
    console.error("[auth/session]", error);
    const dbErr = getDbError();
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: dbErr
            ? `Database error: ${dbErr}`
            : "An unexpected error occurred",
        },
      },
      { status: 500 },
    );
  }
}
