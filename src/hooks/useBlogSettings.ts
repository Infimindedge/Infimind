import { useCallback, useEffect, useState } from 'react';
import { blogSettingsRepository, BLOG_SETTINGS_STORAGE_KEY } from '@/data/repositories/blogSettingsRepository';
import { STORAGE_EVENT } from '@/data/repositories/storage';
import type { BlogSettings } from '@/types/blog';

/** Mirrors useCollection's live-update behaviour for the single-object Blog Settings record. */
export function useBlogSettings(): BlogSettings {
  const [settings, setSettings] = useState<BlogSettings>(() => blogSettingsRepository.get());

  const refresh = useCallback(() => {
    setSettings(blogSettingsRepository.get());
  }, []);

  useEffect(() => {
    const handleStorageUpdated = (event: Event) => {
      const detail = (event as CustomEvent<{ key: string }>).detail;
      if (!detail || detail.key === BLOG_SETTINGS_STORAGE_KEY) {
        refresh();
      }
    };
    window.addEventListener(STORAGE_EVENT, handleStorageUpdated);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(STORAGE_EVENT, handleStorageUpdated);
      window.removeEventListener('storage', refresh);
    };
  }, [refresh]);

  return settings;
}
