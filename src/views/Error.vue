<template>
  <VContainer class="fill-height">
    <VResponsive class="d-flex text-center">
      <h1 class="text-h1 pt-10 mb-5 font-weight-bold">404</h1>
      <h2 class="text-h3 mb-15 font-weight-bold">Page Not Found</h2>

      <VRow class="d-flex align-center justify-center">
        <VCol cols="auto">
          <VBtn
            to="/products"
            color="secondary"
            min-width="150"
            variant="flat"
            @click="() => $router.go(-1)"
          >
            Back
          </VBtn>
        </VCol>
      </VRow>
    </VResponsive>
  </VContainer>
</template>
