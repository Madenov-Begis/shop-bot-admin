import { FieldWithLanguages } from "@/features/languages/types/field-with-langagues"

export interface Catalog {
  id: number
  name: FieldWithLanguages
  created_at: string
  updated_at: string
}

export interface CatalogBody {
  name: FieldWithLanguages
}
