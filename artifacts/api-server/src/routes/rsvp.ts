import { Router, type IRouter } from "express";
import { db, rsvpsTable } from "@workspace/db";
import { SubmitRsvpBody } from "@workspace/api-zod";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

router.post("/rsvps", async (req, res): Promise<void> => {
  const parsed = SubmitRsvpBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [rsvp] = await db
    .insert(rsvpsTable)
    .values(parsed.data)
    .returning();

  req.log.info({ rsvpId: rsvp.id, name: rsvp.name }, "New RSVP submitted");
  res.status(201).json(rsvp);
});

router.get("/rsvps", async (req, res): Promise<void> => {
  const rsvps = await db
    .select()
    .from(rsvpsTable)
    .orderBy(desc(rsvpsTable.createdAt));

  res.json(rsvps);
});

export default router;
