"use client";

import { useState } from "react";
import { Member } from "@/types";
import { MemberCard } from "./MemberCard";
import { SearchBar } from "@/components";

interface MembersGridProps {
  members: Member[];
  onSelectMember?: (member: Member) => void;
}

export function MembersGrid({ members, onSelectMember }: MembersGridProps) {
  const [search, setSearch] = useState("");

  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <SearchBar placeholder="Search members..." onSearch={setSearch} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            onClick={() => onSelectMember?.(member)}
          />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No members found</p>
        </div>
      )}
    </div>
  );
}
