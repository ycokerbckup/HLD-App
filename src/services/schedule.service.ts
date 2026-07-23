import { sheets } from "@/lib/google-sheets";
import { ScheduleEntry, ActivityType } from "@/types";

const SCHEDULE_SHEET_ID = process.env.NEXT_PUBLIC_SCHEDULE_SHEET_ID!;

export class ScheduleService {
  static async getAll(): Promise<ScheduleEntry[]> {
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SCHEDULE_SHEET_ID,
        range: "Schedule!A2:E",
      });

      const rows = response.data.values || [];

      return rows.map((row: any[]): ScheduleEntry => ({
        id: row[0] || "",
        date: row[1] || "",
        type: (row[2] as ActivityType) || "sunday",
        description: row[3] || "",
        location: row[4],
        duration: parseInt(row[5]) || 120,
      }));
    } catch (error) {
      console.error("Error fetching schedule:", error);
      throw error;
    }
  }

  static async getUpcoming(days: number = 30): Promise<ScheduleEntry[]> {
    const schedule = await this.getAll();
    const now = new Date();
    const future = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    return schedule
      .filter((s) => {
        const date = new Date(s.date);
        return date >= now && date <= future;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  static async getById(id: string): Promise<ScheduleEntry | null> {
    const schedule = await this.getAll();
    return schedule.find((s) => s.id === id) || null;
  }

  static async create(
    entry: Omit<ScheduleEntry, "id">
  ): Promise<ScheduleEntry> {
    try {
      const id = `SCH_${Date.now()}`;
      const values = [
        [
          id,
          entry.date,
          entry.type,
          entry.description,
          entry.location || "",
          entry.duration,
        ],
      ];

      await sheets.spreadsheets.values.append({
        spreadsheetId: SCHEDULE_SHEET_ID,
        range: "Schedule!A:F",
        valueInputOption: "USER_ENTERED",
        requestBody: { values },
      });

      return { ...entry, id };
    } catch (error) {
      console.error("Error creating schedule entry:", error);
      throw error;
    }
  }

  static async update(
    id: string,
    updates: Partial<ScheduleEntry>
  ): Promise<ScheduleEntry | null> {
    try {
      const schedule = await this.getAll();
      const index = schedule.findIndex((s) => s.id === id);

      if (index === -1) return null;

      const updated = { ...schedule[index], ...updates };
      const values = [
        [
          updated.id,
          updated.date,
          updated.type,
          updated.description,
          updated.location || "",
          updated.duration,
        ],
      ];

      await sheets.spreadsheets.values.update({
        spreadsheetId: SCHEDULE_SHEET_ID,
        range: `Schedule!A${index + 2}:F${index + 2}`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values },
      });

      return updated;
    } catch (error) {
      console.error("Error updating schedule entry:", error);
      throw error;
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      const schedule = await this.getAll();
      const index = schedule.findIndex((s) => s.id === id);

      if (index === -1) return false;

      await sheets.spreadsheets.values.clear({
        spreadsheetId: SCHEDULE_SHEET_ID,
        range: `Schedule!A${index + 2}:F${index + 2}`,
      });

      return true;
    } catch (error) {
      console.error("Error deleting schedule entry:", error);
      throw error;
    }
  }
}
