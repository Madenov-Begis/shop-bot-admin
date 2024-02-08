import { FieldWithLanguages } from '@/features/languages/types/field-with-langagues'

export interface Cashback {
  id: number
  name: FieldWithLanguages
  percentage: number
  created_at: string
  updated_at: string
}

export interface CashbackBody {
  name: FieldWithLanguages
  percentage: number | undefined
}
