import { FieldWithLanguages } from '@/features/languages/types/field-with-langagues'

export interface News {
  id: number
  title: string
  description: string
  content: string
  author: string
}

export interface NewsBody {
  name: FieldWithLanguages
  title: FieldWithLanguages
  description: FieldWithLanguages
  content: FieldWithLanguages
  author: FieldWithLanguages
}
