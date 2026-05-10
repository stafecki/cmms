export interface DetailedLocation {
  id: string
  name: string
  type: string
  parentId: string | null
  children: any[]
  machines: any[]
}