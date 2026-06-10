import { getCurrentUser } from "@/lib/auth";
import { apiSuccess, handleApiError } from "../shared";

export async function GET() {
  try {
    const user = await getCurrentUser();
    return apiSuccess({ authenticated: !!user, user });
  } catch (error) {
    return handleApiError("auth/session", error);
  }
}