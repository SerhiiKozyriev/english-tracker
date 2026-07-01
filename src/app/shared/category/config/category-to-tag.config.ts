import { TagVariant } from '@shared/components/tag/tag.component';

import { TopicCategory } from '../models/category.model';

export interface CategoryConfigItem {
  label: string;
  variant: TagVariant;
}

export const categoryToTagMap: Record<TopicCategory, CategoryConfigItem> = {
  grammar: { label: 'Grammar', variant: 'info' },
  listening: { label: 'Listening', variant: 'success' },
  speaking: { label: 'Speaking', variant: 'warning' },
  reading: { label: 'Reading', variant: 'accent' },
  vocabulary: { label: 'Vocabulary', variant: 'danger' },
  writing: { label: 'Writing', variant: 'default' },
};
