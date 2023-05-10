<template>
  <VContainer class="fill-height">
    <VResponsive class="d-flex align-center text-center fill-height">
      <VImg
        height="250"
        src="https://www.print.com/wp-content/uploads/2022/09/printlogo.svg"
      />

      <h1 class="text-h1 font-weight-bold animate my-10">Product Selector</h1>

      <VMenu open-on-hover>
        <template v-slot:activator="{ props }">
          <VBtn
            v-bind="props"
            to="/products"
            color="primary"
            min-width="228"
            size="x-large"
            variant="flat"
          >
            <VIcon
              icon="mdi-speedometer"
              size="large"
              start
            />
            Products
          </VBtn>
        </template>

        <VList>
          <VListItem
            v-for="(route, index) in productRoutes"
            :key="index"
          >
            <VListItemTitle>
              <VBtn
                color="primary"
                variant="plain"
                :to="route.to"
              >
                {{ route.title }}
              </VBtn>
            </VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
    </VResponsive>
  </VContainer>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'

  const productRoutes = computed(() =>
    useRouter()
      .getRoutes()
      .filter((route) => route.path.includes('/products/'))
      .map((route) => ({
        title: route.meta.title ?? '',
        to: route.path
      }))
  )
</script>
