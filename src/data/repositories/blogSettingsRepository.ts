import type { BlogSettings } from '@/types/blog';
import { blogSettingsSeed } from '@/data/seed/blogSettings.seed';
import { notifyStorageUpdated, readStorage, writeStorage } from './storage';

export const BLOG_SETTINGS_STORAGE_KEY = 'infimind_blog_settings_v1';

/**
 * Blog Settings is a single object, not a keyed collection, so it doesn't fit
 * createCollectionRepository — this is the same readStorage/writeStorage
 * pattern applied to one record instead of an array.
 */
export const blogSettingsRepository = {
  get(): BlogSettings {
    return readStorage<BlogSettings>(BLOG_SETTINGS_STORAGE_KEY, blogSettingsSeed);
  },
  update(patch: Partial<BlogSettings>): BlogSettings {
    const next = { ...blogSettingsRepository.get(), ...patch };
    writeStorage(BLOG_SETTINGS_STORAGE_KEY, next);
    notifyStorageUpdated(BLOG_SETTINGS_STORAGE_KEY);
    return next;
  },
};
