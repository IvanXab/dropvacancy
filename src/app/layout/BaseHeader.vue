<template>
  <div class="base-header">
    <RouterLink class="base-header__logo" to="/home">Dropvacancy</RouterLink>
    <ElRow :gutter="10" class="hidden-sm-and-down">
      <ElCol :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
        <div class="base-header__nav">
          <RouterLink class="base-header__link" to="/vacancies">
            Вакансии
          </RouterLink>

          <RouterLink class="base-header__link" to="/home">
            Аналитика
          </RouterLink>

          <RouterLink class="base-header__link" to="/favourites">
            Избранное
          </RouterLink>
        </div>
      </ElCol>
    </ElRow>

    <ElRow :gutter="10" class="hidden-md-and-up">
      <ElCol :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <ElIcon size="30px" color="white" @click="onOpenMenu">
          <Menu />
        </ElIcon>

        <ElDrawer v-model="isShowDrawer" size="100%">
          <div class="menu">
            <RouterLink class="base-header__link" to="/vacancies" @click="onCloseMenu">
              Вакансии
            </RouterLink>

            <RouterLink class="base-header__link" to="/home" @click="onCloseMenu">
              Аналитика
            </RouterLink>

            <RouterLink class="base-header__link" to="/favourites" @click="onCloseMenu">
              Избранное
            </RouterLink>
          </div>
        </ElDrawer>
      </ElCol>
    </ElRow>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import "element-plus/theme-chalk/display.css";

const isShowDrawer = ref(false);

const onOpenMenu = (): void => {
  isShowDrawer.value = true;
};

const onCloseMenu = (): void => {
  isShowDrawer.value = false;
};
</script>

<style lang="scss" scoped>
.base-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 164px;
  border-bottom: 1px dashed #1f1f1f;

  &__logo {
    font-size: 21px;
    font-weight: bold;
    text-transform: uppercase;
  }

  &__nav {
    display: flex;
    align-items: center;
  }

  &__link {
    margin: 0 15px;
    font-size: 16px;
    text-decoration: none;
    color: #ffffff;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
      color: rgba(206, 71, 92, 0.85);
    }
  }
}
</style>