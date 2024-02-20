import { FieldWithLanguages } from '@/features/languages/types/field-with-langagues'

export interface Category {
  id: number
  name: FieldWithLanguages
  childrens: Category[]
  created_at: string
  updated_at: string
  parent_id: number
}

export interface CategoryBody {
  parent_id: string | null
  name: FieldWithLanguages
}

export interface CategoryList {
  id: number
  name: string
}
