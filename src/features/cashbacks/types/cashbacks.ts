import { FieldWithLanguages } from '@/features/languages/types/field-with-langagues'

export interface Cashback {
  id: number
  name: string
  percentage: number
  created_at: string
  updated_at: string
}

export interface CashbackDetail extends Omit<Cashback, 'name'> {
  name: FieldWithLanguages
}

export interface CashbackBody {
  name: FieldWithLanguages
  percentage: number | undefined
}
