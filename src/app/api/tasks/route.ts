import { NextRequest } from "next/server";
import { eq, and } from "drizzle-orm";
import { getDb } from "@/lib/db/connection";
import { tasks as tasksSchema } from "@/lib/db/schema";
import {
  apiSuccess,
  handleApiError,
  dbNotConfiguredResponse,
  unauthorizedResponse,
  requireUser,
  badRequestResponse,
  mapTask,
} from "../auth/shared";

export async function GET() {
  try {
    const user = await requireUser();
    if (!user) return unauthorizedResponse();

    const db = getDb();
    if (!db) return dbNotConfiguredResponse();

    const rows = await db.select().from(tasksSchema).where(eq(tasksSchema.userId, user.id));
    return apiSuccess(rows.map(mapTask));
  } catch (error) {
    return handleApiError("api/tasks", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireUser();
    if (!user) return unauthorizedResponse();

    const body = await request.json();
    const { taskId, title, completed, priority, category, pollenUnits, columnId, notes, dueDate } =
      body;

    if (!taskId || !title) return badRequestResponse("taskId and title are required");

    const db = getDb();
    if (!db) return dbNotConfiguredResponse();

    await db.insert(tasksSchema).values({
      userId: user.id,
      taskId,
      title,
      completed: completed ?? false,
      priority: priority ?? "MEDIUM",
      category: category ?? "",
      pollenUnits: pollenUnits ?? 1,
      columnId: columnId ?? "todo",
      notes: notes ?? null,
      dueDate: dueDate ?? null,
    });

    return apiSuccess({ taskId }, 201);
  } catch (error) {
    return handleApiError("api/tasks", error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await requireUser();
    if (!user) return unauthorizedResponse();

    const body = await request.json();
    const { taskId, ...updates } = body;
    if (!taskId) return badRequestResponse("taskId is required");

    const db = getDb();
    if (!db) return dbNotConfiguredResponse();

    const allowedFields = [
      "title", "completed", "priority", "category",
      "pollenUnits", "columnId", "notes", "dueDate",
    ] as const;
    const updateData: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (updates[field] !== undefined) updateData[field] = updates[field];
    }

    if (Object.keys(updateData).length === 0) return badRequestResponse("No fields to update");

    await db
      .update(tasksSchema)
      .set(updateData)
      .where(and(eq(tasksSchema.userId, user.id), eq(tasksSchema.taskId, taskId)));

    return apiSuccess({ taskId });
  } catch (error) {
    return handleApiError("api/tasks", error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await requireUser();
    if (!user) return unauthorizedResponse();

    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get("taskId");
    if (!taskId) return badRequestResponse("taskId query param is required");

    const db = getDb();
    if (!db) return dbNotConfiguredResponse();

    await db
      .delete(tasksSchema)
      .where(and(eq(tasksSchema.userId, user.id), eq(tasksSchema.taskId, taskId)));

    return apiSuccess(null);
  } catch (error) {
    return handleApiError("api/tasks", error);
  }
}