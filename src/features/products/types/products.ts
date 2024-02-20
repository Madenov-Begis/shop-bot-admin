import { FieldWithLanguages } from '@/features/languages/types/field-with-langagues'
import { Dayjs } from 'dayjs'

export interface Product {
  id: number
  company: string
  catalog: string
  category: string
  publisher: string
  audience: string
  language: string
  deliver: string
  cashback: string
  created_by: string
  index: string
  name: string
  period: number
  price: number
  exist_periods: {
    may: boolean
    july: boolean
    june: boolean
    april: boolean
    march: boolean
    august: boolean
    january: boolean
    october: boolean
    december: boolean
    february: boolean
    november: boolean
    september: boolean
  }
}

export interface ProductBody {
  id?: number | undefined
  company_id: string | null
  catalog_id: string | null
  category_id: string | null
  publisher_id: string | null
  audience_id: string | null
  language_id: string | null
  deliver_id: string | null
  cashback_id: string | null
  published_at: Date | null
  index: string | null
  name?: FieldWithLanguages
  periods?: number | undefined
  pages?: number | undefined
  description?: string
  images?: File[] | string[] 
  price?: number | undefined
  exist_periods?: {
    may: boolean
    july: boolean
    june: boolean
    april: boolean
    march: boolean
    august: boolean
    january: boolean
    october: boolean
    december: boolean
    february: boolean
    november: boolean
    september: boolean
  }
}

export interface ProductUpdate {
  id: number
  category_id: number
  catalog_id: number
  company_id: number
  publisher_id: number
  audience_id: number
  language_id: number
  deliver_id: number
  cashback_id: number
  published_at: Dayjs
  index: number
  name: FieldWithLanguages | undefined
  periods: number
  pages: number
  description: string
  images: string[]
  price: number
  exist_periods: {
    may: boolean
    july: boolean
    june: boolean
    april: boolean
    march: boolean
    august: boolean
    january: boolean
    october: boolean
    december: boolean
    february: boolean
    november: boolean
    september: boolean
  }
}
