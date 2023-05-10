<template>
  <VCard
    :elevation="3"
    width="auto"
  >
    <VCardItem>
      <VCardTitle class="mb-4">
        {{ title }}
      </VCardTitle>
      <VDivider />
    </VCardItem>

    <VCardItem>
      <ProductOptions
        :slug="slug"
        :model-value="modelValue"
        :type="type"
        :options="options"
        @change="$emit('addToCart', slug, $event)"
      />
    </VCardItem>
  </VCard>
</template>

<script setup lang="ts">
  import type { Option, ModelValue } from '@/types/interfaces'
  import ProductOptions from './ProductOptions.vue'

  defineProps<{
    modelValue?: ModelValue
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
  }>()

  defineEmits<{
    (e: 'addToCart', slug: string, payload: ModelValue): void
  }>()
</script>

<style scoped>
  .v-card {
    position: relative;
    height: 100%;
  }
</style>
