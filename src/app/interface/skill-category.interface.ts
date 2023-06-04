export interface Category {
  id: number
  name: string
  longName: string
  tabName: string
  subcategory: Subcategory[]
}

export interface Subcategory {
  id: number
  name: string
}
