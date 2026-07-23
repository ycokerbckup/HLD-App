import { sheets } from "@/lib/google-sheets";
import { TrainingProgress, TrainingModule } from "@/types";

const TRAINING_SHEET_ID = process.env.NEXT_PUBLIC_TRAINING_SHEET_ID!;

export class TrainingService {
  static async getAll(): Promise<TrainingProgress[]> {
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: TRAINING_SHEET_ID,
        range: "Training!A2:F",
      });

      const rows = response.data.values || [];

      return rows.map((row: any[]): TrainingProgress => ({
        id: row[0] || "",
        memberId: row[1] || "",
        module: (row[2] as TrainingModule) || "propresenter",
        status: (row[3] as any) || "not_started",
        progress: parseInt(row[4]) || 0,
        completedAt: row[5],
      }));
    } catch (error) {
      console.error("Error fetching training progress:", error);
      throw error;
    }
  }

  static async getByMember(memberId: string): Promise<TrainingProgress[]> {
    const training = await this.getAll();
    return training.filter((t) => t.memberId === memberId);
  }

  static async getByModule(module: TrainingModule): Promise<TrainingProgress[]> {
    const training = await this.getAll();
    return training.filter((t) => t.module === module);
  }

  static async create(
    progress: Omit<TrainingProgress, "id">
  ): Promise<TrainingProgress> {
    try {
      const id = `TRAIN_${Date.now()}`;
      const values = [
        [
          id,
          progress.memberId,
          progress.module,
          progress.status,
          progress.progress,
          progress.completedAt || "",
        ],
      ];

      await sheets.spreadsheets.values.append({
        spreadsheetId: TRAINING_SHEET_ID,
        range: "Training!A:F",
        valueInputOption: "USER_ENTERED",
        requestBody: { values },
      });

      return { ...progress, id };
    } catch (error) {
      console.error("Error creating training progress:", error);
      throw error;
    }
  }

  static async update(
    id: string,
    updates: Partial<TrainingProgress>
  ): Promise<TrainingProgress | null> {
    try {
      const training = await this.getAll();
      const index = training.findIndex((t) => t.id === id);

      if (index === -1) return null;

      const updated = { ...training[index], ...updates };
      const values = [
        [
          updated.id,
          updated.memberId,
          updated.module,
          updated.status,
          updated.progress,
          updated.completedAt || "",
        ],
      ];

      await sheets.spreadsheets.values.update({
        spreadsheetId: TRAINING_SHEET_ID,
        range: `Training!A${index + 2}:F${index + 2}`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values },
      });

      return updated;
    } catch (error) {
      console.error("Error updating training progress:", error);
      throw error;
    }
  }
}
