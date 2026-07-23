import { sheets } from "@/lib/google-sheets";
import { TechnicalReport, ReportPriority, ReportStatus } from "@/types";

const REPORTS_SHEET_ID = process.env.NEXT_PUBLIC_REPORTS_SHEET_ID!;

export class ReportsService {
  static async getAll(): Promise<TechnicalReport[]> {
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: REPORTS_SHEET_ID,
        range: "Reports!A2:J",
      });

      const rows = response.data.values || [];

      return rows.map((row: any[]): TechnicalReport => ({
        id: row[0] || "",
        title: row[1] || "",
        description: row[2] || "",
        equipment: row[3] || "",
        priority: (row[4] as ReportPriority) || "medium",
        status: (row[5] as ReportStatus) || "open",
        assignedTo: row[6],
        createdBy: row[7] || "",
        createdAt: row[8] || new Date().toISOString(),
        resolvedAt: row[9],
      }));
    } catch (error) {
      console.error("Error fetching reports:", error);
      throw error;
    }
  }

  static async getById(id: string): Promise<TechnicalReport | null> {
    const reports = await this.getAll();
    return reports.find((r) => r.id === id) || null;
  }

  static async getOpen(): Promise<TechnicalReport[]> {
    const reports = await this.getAll();
    return reports.filter((r) => r.status !== "closed");
  }

  static async create(
    report: Omit<TechnicalReport, "id" | "createdAt">
  ): Promise<TechnicalReport> {
    try {
      const id = `REP_${Date.now()}`;
      const now = new Date().toISOString();
      const values = [
        [
          id,
          report.title,
          report.description,
          report.equipment,
          report.priority,
          report.status,
          report.assignedTo || "",
          report.createdBy,
          now,
          report.resolvedAt || "",
        ],
      ];

      await sheets.spreadsheets.values.append({
        spreadsheetId: REPORTS_SHEET_ID,
        range: "Reports!A:J",
        valueInputOption: "USER_ENTERED",
        requestBody: { values },
      });

      return { ...report, id, createdAt: now };
    } catch (error) {
      console.error("Error creating report:", error);
      throw error;
    }
  }

  static async update(
    id: string,
    updates: Partial<TechnicalReport>
  ): Promise<TechnicalReport | null> {
    try {
      const reports = await this.getAll();
      const index = reports.findIndex((r) => r.id === id);

      if (index === -1) return null;

      const updated = { ...reports[index], ...updates };
      const values = [
        [
          updated.id,
          updated.title,
          updated.description,
          updated.equipment,
          updated.priority,
          updated.status,
          updated.assignedTo || "",
          updated.createdBy,
          updated.createdAt,
          updated.resolvedAt || "",
        ],
      ];

      await sheets.spreadsheets.values.update({
        spreadsheetId: REPORTS_SHEET_ID,
        range: `Reports!A${index + 2}:J${index + 2}`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values },
      });

      return updated;
    } catch (error) {
      console.error("Error updating report:", error);
      throw error;
    }
  }
}
