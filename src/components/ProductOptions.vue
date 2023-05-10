<template>
  <div class="actions-wrapper">
    <VRadioGroup
      v-if="type === 'radio'"
      :model-value="modelValue"
      column
      @update:modelValue="onUpdate"
    >
      <VRadio
        v-for="{ name, slug } in localOptions"
        :key="name"
        :label="name"
        :value="{ slug, name }"
        :disabled="getDisabledOptions(props.slug, slug)"
        color="primary"
      />
    </VRadioGroup>

    <VBtnToggle
      v-else-if="type === 'checkbox'"
      :model-value="modelValue"
      color="primary"
      mandatory
      @update:modelValue="onUpdate"
    >
      <VBtn
        v-for="{ name, slug } in localOptions"
        :key="name"
        :text="name"
        :disabled="getDisabledOptions(props.slug, slug)"
        :value="{ slug, name }"
      />
    </VBtnToggle>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { computed } from 'vue'
  import type { Option, ModelValue } from '@/types/interfaces'
  import { useProductStore } from '@/store/product'

  const { getDisabledOptions } = storeToRefs(useProductStore())

  const props = defineProps<{
    slug: string
    modelValue?: ModelValue
    type?: 'checkbox' | 'radio'
    options?: Option[]
  }>()

  const emit = defineEmits<{
    (e: 'change', ev: ModelValue): void
  }>()

  const localOptions = computed(() => props.options?.filter(({ slug, name }) => slug !== 'custom' && name))

  function onUpdate(ev: ModelValue) {
    emit('change', ev)
  }
</script>

<style scoped>
  .v-card-actions .v-btn ~ .v-btn {
    margin-inline-start: 0 !important;
  }

  .actions-wrapper {
    width: 100%;
    height: 210px;
    overflow: hidden auto;
  }
</style>
