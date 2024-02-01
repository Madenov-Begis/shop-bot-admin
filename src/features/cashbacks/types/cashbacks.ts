export interface Cashback {
  id: number
  name: Record<string, string>
  percentage: number
  created_at: string
  updated_at: string
}

export interface CashbackBody {
  name: Record<string, string>
  percentage: number | null
}
