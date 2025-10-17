<template>
  <div class="base-layout">
    <BaseHeader />
    <div class="base-layout__content">
      <RouterView />
    </div>
    <BaseFooter />
  </div>
</template>

<script setup lang="ts">
import BaseHeader from "@/app/layout/BaseHeader.vue";
import BaseFooter from "@/app/layout/BaseFooter.vue";
</script>

<style lang="scss" scoped>
.base-layout {
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100%;
  }
}
</style>