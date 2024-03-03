import { FieldWithLanguages } from '@/features/languages/types/field-with-langagues'

export interface Products {
  id: number
  price: number
  image: string
  category_d: number
  title: FieldWithLanguages
  description: FieldWithLanguages
  category: FieldWithLanguages
}

export interface ProductBody {
  title: FieldWithLanguages
  description: FieldWithLanguages
  image: File[] | string[]
  price: number | undefined
  category_id: string | undefined
}
