import { FieldWithLanguages } from '@/features/languages/types/field-with-langagues'

export interface Publisher {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export interface PublisherDetail extends Omit<Publisher, 'name'> {
  name: FieldWithLanguages
}

export interface PublisherBody {
  name: FieldWithLanguages
}
