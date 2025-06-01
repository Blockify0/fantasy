import { en } from './en';
import { ar } from './ar';
import { bg } from './bg';
import type { Translations } from '../types';

export type Language = 'en' | 'ar' | 'bg';

export const translations = {
    en,
    ar,
    bg
} as const; 