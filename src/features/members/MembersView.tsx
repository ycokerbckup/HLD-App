"use client";

import { useState, useEffect } from "react";
import { Member } from "@/types";
import { MembersGrid, MemberDetail } from "@/features/members/components";
import { LoadingSkeleton } from "@/components";

export function MembersView() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await fetch("/api/members");
        if (response.ok) {
          const data = await response.json();
          setMembers(data);
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMembers();
  }, []);

  if (loading) return <LoadingSkeleton />;

  return (
    <>
      <MembersGrid members={members} onSelectMember={setSelectedMember} />
      {selectedMember && (
        <MemberDetail member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}
    </>
  );
}
