"use client";

import { Member } from "@/types";
import { Card } from "lucide-react";
import Image from "next/image";

interface MemberCardProps {
  member: Member;
  onClick?: () => void;
}

export function MemberCard({ member, onClick }: MemberCardProps) {
  return (
    <div
      onClick={onClick}
      className="rounded-lg border border-border bg-card p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              width={48}
              height={48}
              className="rounded-full"
            />
          ) : (
            <span className="text-lg font-semibold">{member.name.charAt(0)}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">{member.name}</h3>
          <p className="text-xs text-muted-foreground truncate">{member.email}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
              {member.role}
            </span>
            <span className="inline-flex items-center rounded-md bg-blue-100 dark:bg-blue-900 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-200">
              {member.trainingStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
