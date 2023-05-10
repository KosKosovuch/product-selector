import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import type { Product, ModelValue } from '@/types/interfaces'

interface ProductStoreState {
  isLoading: boolean
  productData: Product | null
  cart: Map<string, ModelValue>
}

export const useProductStore = defineStore('product', {
  state: (): ProductStoreState => ({
    isLoading: false,
    productData: null,
    cart: new Map()
  }),

  getters: {
    properties(state) {
      return state.productData?.properties ?? []
    },

    excludes(state) {
      return state.productData?.excludes ?? []
    },

    cartSize(state) {
      return state.cart.size
    },

    cartKeys(state) {
      return Array.from(state.cart.keys())
    },

    isCartDisabled(): boolean {
      return this.cartSize !== this.properties.length
    },

    modifiedExcludes(): Record<string, string[]>[] {
      return this.excludes?.map((excludes) => {
        return excludes.reduce<Record<string, string[]>>((acc, { property, options }) => {
          acc[property] = options
          return acc
        }, {})
      })
    },

    preparedDisabledOptions(): Record<string, string[]> {
      return this.cartKeys.reduce<Record<string, string[]>>((acc, cartSlug) => {
        const currentCartValue = this.cart.get(cartSlug)
        const matchedExcludes = this.modifiedExcludes.filter(
          (item) => item[cartSlug] && item[cartSlug].includes(currentCartValue?.slug ?? '')
        )

        matchedExcludes.forEach((exclude) => {
          Object.keys(exclude)
            .filter((key) => key !== cartSlug)
            .forEach((key) => (acc[key] ? acc[key].push(...exclude[key]) : (acc[key] = [...exclude[key]])))
        })

        return acc
      }, {})
    },

    getDisabledOptions() {
      return (propSlug: string, optionSlug: string) => {
        return this.preparedDisabledOptions[propSlug]?.includes(optionSlug)
      }
    }
  },

  actions: {
    async fetchProductData() {
      useProductStore().$reset()

      const route = useRoute()
      const page = route.path.split('/').pop()

      try {
        this.isLoading = true
        this.productData = await fetch(`/${page}.json`).then((res) => res.json())
      } catch (e) {
        this.productData = null
        console.error(e)
      } finally {
        this.isLoading = false
      }
    },

    addToCart(slug: string, payload: ModelValue): void {
      this.cart.set(slug, payload)
    },

    clearCart() {
      this.cart.clear()
    }
  }
})
