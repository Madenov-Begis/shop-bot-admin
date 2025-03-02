import { FieldWithLanguages } from '@/features/languages/types/field-with-langagues'

export interface Products {
  id: number
  name: FieldWithLanguages
  description: FieldWithLanguages
  image: string
  price: string
  is_active: boolean
  category: Category
  created_at: string
  updated_at: string
}

interface Category {
  id: number
  name: FieldWithLanguages
  is_main: boolean
  created_at: string
  updated_at: string
}

export interface ProductBody {
  title: FieldWithLanguages
  description: FieldWithLanguages
  image: File[] | string[]
  price: number | undefined
  category_id: string | undefined
  is_active: boolean
}
