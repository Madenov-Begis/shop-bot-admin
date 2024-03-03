import { FieldWithLanguages } from '@/features/languages/types/field-with-langagues'

export type DynamicDataItem = Record<string, number | string>

export interface CategoryBody {
  name: FieldWithLanguages
}
