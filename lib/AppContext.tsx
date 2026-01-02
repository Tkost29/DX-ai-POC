"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "@/app/_data/types";
import { DEFAULT_USER } from "@/app/_data/mockData";

/**
 * アプリケーション状態の型定義
 */
interface AppContextType {
  user: User;
  setDepartment: (department: string) => void;
  toggleInterest: (tag: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

/**
 * グローバル状態プロバイダー
 * ユーザー設定（部署・関心タグ）を管理
 */
export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(DEFAULT_USER);

  const setDepartment = (department: string) => {
    setUser((prev) => ({ ...prev, department }));
  };

  const toggleInterest = (tag: string) => {
    setUser((prev) => ({
      ...prev,
      interests: prev.interests.includes(tag)
        ? prev.interests.filter((t) => t !== tag)
        : [...prev.interests, tag],
    }));
  };

  return (
    <AppContext.Provider value={{ user, setDepartment, toggleInterest }}>
      {children}
    </AppContext.Provider>
  );
}

/**
 * アプリケーション状態を使用するフック
 */
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
