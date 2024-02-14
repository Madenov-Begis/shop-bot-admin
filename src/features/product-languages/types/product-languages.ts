import { FieldWithLanguages } from '@/features/languages/types/field-with-langagues'

export interface ProductLanguages {
  id: string
  name: FieldWithLanguages
}

export interface ProductLanguagesBody {
  name: FieldWithLanguages
}
