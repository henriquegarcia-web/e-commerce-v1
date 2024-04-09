import { ICategoryGroup, IProduct } from '@/@types/store'

// ======================================= STORE CONTEXT

export interface IStoreContextData {
  storeDataIsLoading: boolean
  categoriesData: ICategoryGroup[] | null
  productsData: IProduct[] | null
}
