import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const rsvpsTable = pgTable("rsvps", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  attending: text("attending").notNull(),
  guests: integer("guests").notNull().default(1),
  message: text("message"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertRsvpSchema = createInsertSchema(rsvpsTable).omit({ id: true, createdAt: true });
export type InsertRsvp = z.infer<typeof insertRsvpSchema>;
export type Rsvp = typeof rsvpsTable.$inferSelect;
