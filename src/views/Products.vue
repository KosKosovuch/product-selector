<template>
  <VResponsive class="d-flex fill-height">
    <VRow class="d-flex align-center">
      <VCol
        v-for="product in products"
        :key="product.name"
        cols="12"
        sm="4"
      >
        <RouterLink
          class="text-decoration-none"
          :to="$route.path + '/' + product.to"
        >
          <VCard
            tag="span"
            class="mx-auto"
            width="auto"
          >
            <VImg
              class="align-end text-white"
              height="200"
              :src="product.imgSrc"
              cover
            >
              <VCardTitle class="text-black">{{ product.name }}</VCardTitle>
            </VImg>
          </VCard>
        </RouterLink>
      </VCol>
    </VRow>
  </VResponsive>
</template>

<script setup lang="ts">
  const products = [
    {
      name: 'Flyers',
      to: 'flyers',
      imgSrc: 'https://www.print.com/wp-content/uploads/2023/01/Flyers.jpg'
    },
    {
      name: 'Posters',
      to: 'posters',
      imgSrc: 'https://www.print.com/wp-content/uploads/2023/02/Flyers-chalkpaper-inspiration-768x768.jpg'
    },
    {
      name: 'Business cards',
      to: 'business-cards',
      imgSrc: 'https://www.print.com/wp-content/uploads/2023/01/Business-Cards.jpg'
    }
  ]
</script>

<style scoped></style>
