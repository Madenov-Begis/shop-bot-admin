export interface Catalog {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export interface CatalogBody {
  name: {
    uz: string
    ru: string
  }
}
