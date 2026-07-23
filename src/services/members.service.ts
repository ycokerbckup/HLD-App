import { sheets } from "@/lib/google-sheets";
import { Member } from "@/types";

const MEMBERS_SHEET_ID = process.env.NEXT_PUBLIC_MEMBERS_SHEET_ID!;

interface MemberRow {
  [key: string]: string | number | undefined;
  id?: string;
  email?: string;
  name?: string;
  phone?: string;
  role?: string;
  trainingStatus?: string;
  joinDate?: string;
}

export class MembersService {
  static async getAll(): Promise<Member[]> {
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: MEMBERS_SHEET_ID,
        range: "Members!A2:H",
      });

      const rows = response.data.values || [];
      const headers = [
        "id",
        "email",
        "name",
        "phone",
        "role",
        "trainingStatus",
        "joinDate",
        "image",
      ];

      return rows.map((row: any[]): Member => ({
        id: row[0] || "",
        email: row[1] || "",
        name: row[2] || "",
        phone: row[3] || "",
        role: (row[4] as any) || "member",
        trainingStatus: (row[5] as any) || "observation",
        softwareProficiency: {},
        joinDate: row[6] || new Date().toISOString(),
        image: row[7],
      }));
    } catch (error) {
      console.error("Error fetching members:", error);
      throw error;
    }
  }

  static async getById(id: string): Promise<Member | null> {
    const members = await this.getAll();
    return members.find((m) => m.id === id) || null;
  }

  static async getByEmail(email: string): Promise<Member | null> {
    const members = await this.getAll();
    return members.find((m) => m.email === email) || null;
  }

  static async create(member: Omit<Member, "id">): Promise<Member> {
    try {
      const id = `MEM_${Date.now()}`;
      const values = [
        [
          id,
          member.email,
          member.name,
          member.phone,
          member.role,
          member.trainingStatus,
          member.joinDate,
          member.image || "",
        ],
      ];

      await sheets.spreadsheets.values.append({
        spreadsheetId: MEMBERS_SHEET_ID,
        range: "Members!A:H",
        valueInputOption: "USER_ENTERED",
        requestBody: { values },
      });

      return { ...member, id };
    } catch (error) {
      console.error("Error creating member:", error);
      throw error;
    }
  }

  static async update(
    id: string,
    updates: Partial<Member>
  ): Promise<Member | null> {
    try {
      const members = await this.getAll();
      const memberIndex = members.findIndex((m) => m.id === id);

      if (memberIndex === -1) return null;

      const updated = { ...members[memberIndex], ...updates };
      const values = [
        [
          updated.id,
          updated.email,
          updated.name,
          updated.phone,
          updated.role,
          updated.trainingStatus,
          updated.joinDate,
          updated.image || "",
        ],
      ];

      await sheets.spreadsheets.values.update({
        spreadsheetId: MEMBERS_SHEET_ID,
        range: `Members!A${memberIndex + 2}:H${memberIndex + 2}`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values },
      });

      return updated;
    } catch (error) {
      console.error("Error updating member:", error);
      throw error;
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      const members = await this.getAll();
      const memberIndex = members.findIndex((m) => m.id === id);

      if (memberIndex === -1) return false;

      // Mark as deleted instead of removing
      await this.update(id, { status: "inactive" as any });
      return true;
    } catch (error) {
      console.error("Error deleting member:", error);
      throw error;
    }
  }
}
