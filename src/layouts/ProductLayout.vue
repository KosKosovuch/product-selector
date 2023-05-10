<template>
  <VAppBar>
    <VToolbar>
      <template v-slot:prepend>
        <VBtn
          color="primary"
          @click="() => $router.back()"
          icon="mdi-arrow-left"
        />
      </template>

      <VDialog
        v-if="isShownCart"
        v-model="dialog"
        width="auto"
        min-width="400"
      >
        <template v-slot:activator="{ props }">
          <VBtn
            v-bind="props"
            color="primary"
            :disabled="isCartDisabled"
            class="text-none"
            icon
          >
            <VBadge
              color="primary"
              :content="cartSize"
            >
              <VIcon>mdi-cart</VIcon>
            </VBadge>
          </VBtn>
        </template>

        <VCard title="Cart">
          <VList>
            <VListItem
              v-for="key in cartKeys"
              :key="key"
              :title="key"
            >
              <VCode>
                {{ cart.get(key) }}
              </VCode>
            </VListItem>
          </VList>

          <VCardActions>
            <VBtn
              color="error"
              variant="outlined"
              @click="dialog = false"
            >
              Close
            </VBtn>

            <VBtn
              color="green"
              variant="outlined"
              @click="onClearCart"
            >
              Clear cart
            </VBtn>
          </VCardActions>
        </VCard>
      </VDialog>
    </VToolbar>
  </VAppBar>

  <VContainer>
    <h1
      v-if="$route.meta.title"
      class="text-h2 py-8 font-weight-bold overflow-hidden"
      :key="$route.meta.title"
    >
      {{ $route.meta.title }}
    </h1>

    <RouterView />
  </VContainer>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { computed, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { useProductStore } from '@/store/product'

  const dialog = ref(false)

  const { clearCart } = useProductStore()
  const { cartSize, isCartDisabled, cartKeys, cart } = storeToRefs(useProductStore())

  const isShownCart = computed(() => useRoute().path.includes('/products/'))

  function onClearCart() {
    clearCart()
    dialog.value = false
  }
</script>
