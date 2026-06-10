import { NextRequest } from "next/server";
import { z } from "zod";
import { resetPasswordWithToken } from "@/lib/auth";
import { validatePassword } from "@/lib/password-validation";
import {
  apiSuccess,
  apiError,
  handleApiError,
  validationErrorResponse,
  weakPasswordResponse,
} from "../shared";

const schema = z.object({
  token: z.string().min(1),
  password: z.string().min(8).max(128),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return validationErrorResponse("Invalid input");

    const { token, password } = parsed.data;
    const pwCheck = validatePassword(password);
    if (!pwCheck.valid) return weakPasswordResponse(pwCheck.errors);

    const result = await resetPasswordWithToken(token, password);
    if (!result.success) return apiError(400, "RESET_FAILED", result.error);

    return apiSuccess({ message: "Password reset successfully" });
  } catch (error) {
    return handleApiError("auth/reset-password", error);
  }
}