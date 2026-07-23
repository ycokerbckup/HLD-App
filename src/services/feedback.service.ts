import { sheets } from "@/lib/google-sheets";
import { Feedback, FeedbackType } from "@/types";

const FEEDBACK_SHEET_ID = process.env.NEXT_PUBLIC_FEEDBACK_SHEET_ID!;

export class FeedbackService {
  static async getAll(): Promise<Feedback[]> {
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: FEEDBACK_SHEET_ID,
        range: "Feedback!A2:H",
      });

      const rows = response.data.values || [];

      return rows.map((row: any[]): Feedback => ({
        id: row[0] || "",
        type: (row[1] as FeedbackType) || "general",
        title: row[2] || "",
        message: row[3] || "",
        memberId: row[4] || "",
        status: (row[5] as any) || "open",
        response: row[6],
        createdAt: row[7] || new Date().toISOString(),
      }));
    } catch (error) {
      console.error("Error fetching feedback:", error);
      throw error;
    }
  }

  static async getById(id: string): Promise<Feedback | null> {
    const feedback = await this.getAll();
    return feedback.find((f) => f.id === id) || null;
  }

  static async getByMember(memberId: string): Promise<Feedback[]> {
    const feedback = await this.getAll();
    return feedback.filter((f) => f.memberId === memberId);
  }

  static async create(
    feedback: Omit<Feedback, "id" | "createdAt">
  ): Promise<Feedback> {
    try {
      const id = `FB_${Date.now()}`;
      const now = new Date().toISOString();
      const values = [
        [
          id,
          feedback.type,
          feedback.title,
          feedback.message,
          feedback.memberId,
          feedback.status,
          feedback.response || "",
          now,
        ],
      ];

      await sheets.spreadsheets.values.append({
        spreadsheetId: FEEDBACK_SHEET_ID,
        range: "Feedback!A:H",
        valueInputOption: "USER_ENTERED",
        requestBody: { values },
      });

      return { ...feedback, id, createdAt: now };
    } catch (error) {
      console.error("Error creating feedback:", error);
      throw error;
    }
  }

  static async respond(
    id: string,
    response: string
  ): Promise<Feedback | null> {
    return this.update(id, { response, status: "addressed" });
  }

  static async update(
    id: string,
    updates: Partial<Feedback>
  ): Promise<Feedback | null> {
    try {
      const feedback = await this.getAll();
      const index = feedback.findIndex((f) => f.id === id);

      if (index === -1) return null;

      const updated = { ...feedback[index], ...updates };
      const values = [
        [
          updated.id,
          updated.type,
          updated.title,
          updated.message,
          updated.memberId,
          updated.status,
          updated.response || "",
          updated.createdAt,
        ],
      ];

      await sheets.spreadsheets.values.update({
        spreadsheetId: FEEDBACK_SHEET_ID,
        range: `Feedback!A${index + 2}:H${index + 2}`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values },
      });

      return updated;
    } catch (error) {
      console.error("Error updating feedback:", error);
      throw error;
    }
  }
}
