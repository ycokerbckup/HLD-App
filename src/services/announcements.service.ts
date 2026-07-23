import { sheets } from "@/lib/google-sheets";
import { Announcement, AnnouncementPriority, AnnouncementStatus } from "@/types";

const ANNOUNCEMENTS_SHEET_ID = process.env.NEXT_PUBLIC_ANNOUNCEMENTS_SHEET_ID!;

export class AnnouncementsService {
  static async getAll(): Promise<Announcement[]> {
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: ANNOUNCEMENTS_SHEET_ID,
        range: "Announcements!A2:G",
      });

      const rows = response.data.values || [];

      return rows.map((row: any[]): Announcement => ({
        id: row[0] || "",
        title: row[1] || "",
        content: row[2] || "",
        priority: (row[3] as AnnouncementPriority) || "medium",
        status: (row[4] as AnnouncementStatus) || "draft",
        pinned: row[5] === "true" || row[5] === true,
        createdBy: row[6] || "",
        createdAt: row[7] || new Date().toISOString(),
        updatedAt: row[8] || new Date().toISOString(),
      }));
    } catch (error) {
      console.error("Error fetching announcements:", error);
      throw error;
    }
  }

  static async getPublished(): Promise<Announcement[]> {
    const announcements = await this.getAll();
    return announcements.filter(
      (a) => a.status === "published"
    ).sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  static async getById(id: string): Promise<Announcement | null> {
    const announcements = await this.getAll();
    return announcements.find((a) => a.id === id) || null;
  }

  static async create(
    announcement: Omit<Announcement, "id" | "createdAt" | "updatedAt">
  ): Promise<Announcement> {
    try {
      const id = `ANN_${Date.now()}`;
      const now = new Date().toISOString();
      const values = [
        [
          id,
          announcement.title,
          announcement.content,
          announcement.priority,
          announcement.status,
          announcement.pinned ? "true" : "false",
          announcement.createdBy,
          now,
          now,
        ],
      ];

      await sheets.spreadsheets.values.append({
        spreadsheetId: ANNOUNCEMENTS_SHEET_ID,
        range: "Announcements!A:I",
        valueInputOption: "USER_ENTERED",
        requestBody: { values },
      });

      return { ...announcement, id, createdAt: now, updatedAt: now };
    } catch (error) {
      console.error("Error creating announcement:", error);
      throw error;
    }
  }

  static async update(
    id: string,
    updates: Partial<Announcement>
  ): Promise<Announcement | null> {
    try {
      const announcements = await this.getAll();
      const index = announcements.findIndex((a) => a.id === id);

      if (index === -1) return null;

      const updated = {
        ...announcements[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      const values = [
        [
          updated.id,
          updated.title,
          updated.content,
          updated.priority,
          updated.status,
          updated.pinned ? "true" : "false",
          updated.createdBy,
          updated.createdAt,
          updated.updatedAt,
        ],
      ];

      await sheets.spreadsheets.values.update({
        spreadsheetId: ANNOUNCEMENTS_SHEET_ID,
        range: `Announcements!A${index + 2}:I${index + 2}`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values },
      });

      return updated;
    } catch (error) {
      console.error("Error updating announcement:", error);
      throw error;
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      return !!(await this.update(id, { status: "archived" }));
    } catch (error) {
      console.error("Error deleting announcement:", error);
      throw error;
    }
  }
}
