"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { ALL_TAGS, DEPARTMENTS, USERS } from "./data";
import { UserContext } from "./types";

type Ctx = {
  user: UserContext;
  setDepartment: (dep: string) => void;
  toggleInterest: (tag: string) => void;
  setUserById: (id: string) => void;
  allTags: string[];
  departments: string[];
  allUsers: UserContext[];
};

const AppCtx = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserContext>(USERS[0]);

  const value = useMemo<Ctx>(() => ({
    user,
    setDepartment: (dep) => setUser((u) => ({ ...u, department: dep })),
    toggleInterest: (tag) =>
      setUser((u) => ({
        ...u,
        interests: u.interests.includes(tag)
          ? u.interests.filter((t) => t !== tag)
          : [...u.interests, tag],
      })),
    setUserById: (id) => {
      const found = USERS.find((u) => u.id === id);
      if (found) setUser(found);
    },
    allTags: ALL_TAGS,
    departments: DEPARTMENTS,
    allUsers: USERS,
  }), [user]);

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
