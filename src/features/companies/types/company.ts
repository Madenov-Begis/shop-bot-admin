import { FieldWithLanguages } from "@/features/languages/types/field-with-langagues"

export interface Company {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export interface CompanyDeatil {
  id: number
  name: FieldWithLanguages
}

export interface CompanyBody {
  name: FieldWithLanguages
}
