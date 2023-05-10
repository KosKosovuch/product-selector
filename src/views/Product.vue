<template>
  <VFadeTransition mode="out-in">
    <div
      v-if="isLoading"
      class="text-center"
    >
      <VProgressLinear
        indeterminate
        color="primary"
      />
    </div>

    <VRow
      v-else
      class="d-flex"
    >
      <VCol
        v-for="item in properties"
        :key="item.slug"
        cols="12"
        sm="4"
      >
        <ProductConstructor
          v-bind="item"
          :model-value="cart.get(item.slug)"
          @add-to-cart="addToCart"
        />
      </VCol>
    </VRow>
  </VFadeTransition>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { onBeforeMount } from 'vue'
  import { useProductStore } from '@/store/product'
  import ProductConstructor from '@/components/ProductConstructor.vue'

  const { fetchProductData, addToCart } = useProductStore()
  const { cart, properties, isLoading } = storeToRefs(useProductStore())

  onBeforeMount(fetchProductData)
</script>
