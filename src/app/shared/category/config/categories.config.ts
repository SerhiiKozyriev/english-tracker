export interface CategoryConfig {
  label: string;
  intent: 'default' | 'success' | 'info' | 'warning' | 'danger' | 'accent';
}

export const CATEGORIES_CONFIG: Record<string, CategoryConfig> = {
  grammar: {
    label: 'Grammar',
    intent: 'info',
  },
  listening: {
    label: 'Listening',
    intent: 'success',
  },
  speaking: {
    label: 'Speaking',
    intent: 'warning',
  },
  reading: {
    label: 'Reading',
    intent: 'accent',
  },
  vocabulary: {
    label: 'Vocabulary',
    intent: 'danger',
  },
  writing: {
    label: 'Writing',
    intent: 'default',
  },
};
