import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
import { useSettingsStore } from "../store/settingsStore";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const [ready, setReady] = useState(false);
  const loadUser = useUserStore((s) => s.loadUserProfile);
  const loadSettings = useSettingsStore((s) => s.loadSettings);

  useEffect(() => {
    async function boot() {
      await loadUser();
      await loadSettings();
      setReady(true);
    }
    boot();
  }, [loadUser, loadSettings]);

  if (!ready) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin mb-4" />
        <p className="font-semibold tracking-wider text-sm animate-pulse">BOOTING PATHSHALA AI OS...</p>
      </div>
    );
  }

  return <>{children}</>;
};
