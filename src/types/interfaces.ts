export interface Product {
  sku: string
  title: string
  properties: Property[]
  excludes: ExcludedProperty[][]
}

export interface Property {
  slug: string
  title: string
  locked: boolean
  options: Option[]
  viewMode?: {
    reseller?: string
    storefront?: string
  }
  type?: 'checkbox' | 'radio'
  optionsInSummary?: string[]
  parentOptions?: Option[]
}

export interface Option {
  disabled?: boolean
  slug: string
  name: string
  nullable: boolean
  width?: number
  height?: number
  parent?: string
  eco?: boolean
  enrichments?: string[]
}

export interface ExcludedProperty {
  options: string[]
  property: string
}

export interface ModelValue {
  slug: string
  name: string
}
