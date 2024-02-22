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
  company_id: string | null
  catalog_id: string | null
  category_id: string | null
  publisher_id: string | null
  audience_id: string | null
  language_id: string | null
  deliver_id: string | null
  cashback_id: string | null
  index: number | undefined
  name: FieldWithLanguages
  periods: number | undefined
  pages: number | undefined
  price: number | undefined
  published_at: Dayjs | null
  description: string
  images: File[] | string[]
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

export interface ProductDetail {
  id: number
  company_id: number
  catalog_id: number
  category_id: number
  publisher_id: number
  audience_id: number
  language_id: number
  deliver_id: number
  cashback_id: number
  index: string
  name: FieldWithLanguages
  periods: number
  pages: number
  price: number
  published_at: string
  description: string
  images: string[]
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
