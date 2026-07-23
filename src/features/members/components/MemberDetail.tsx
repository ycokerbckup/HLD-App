"use client";

import { Member } from "@/types";
import { X } from "lucide-react";
import Image from "next/image";

interface MemberDetailProps {
  member: Member;
  onClose: () => void;
}

export function MemberDetail({ member, onClose }: MemberDetailProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        <div className="inline-block align-bottom bg-card rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-card px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                  ) : (
                    <span className="text-2xl font-semibold">{member.name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{member.name}</h2>
                  <p className="text-muted-foreground">{member.email}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone</p>
                <p className="mt-1">{member.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Role</p>
                <p className="mt-1 inline-block bg-primary/10 px-3 py-1 rounded text-sm font-medium text-primary">
                  {member.role}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Training Status</p>
                <p className="mt-1 inline-block bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded text-sm font-medium text-blue-700 dark:text-blue-200">
                  {member.trainingStatus}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Join Date</p>
                <p className="mt-1">{new Date(member.joinDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
