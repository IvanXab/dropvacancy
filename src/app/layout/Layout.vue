<script setup lang="ts">
import HeaderComponent from '@/app/layout/HeaderComponent.vue';
import FooterComponent from '@/app/layout/FooterComponent.vue';
</script>

<template>
  <header-component/>
    <div class="main">
      <router-view/>
    </div>
  <footer-component/>
</template>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;
}
</style>