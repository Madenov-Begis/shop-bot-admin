import { FieldWithLanguages } from '@/features/languages/types/field-with-langagues'

export type DynamicDataItem = Record<string, number | string>

export interface CategoryBody {
  name: FieldWithLanguages
}

export interface Categories {
  id: number
  name: FieldWithLanguages
  is_main: boolean
  created_at: string
  updated_at: string
}
