<template>
<div class="vacancies-page">
  <VacanciesPanel />
  <div class="vacancies-page__content">
    <VacancyFilter />
    <VacanciesList />
  </div>
</div>
</template>

<script setup lang="ts">
import VacancyFilter from "@/widgets/VacancyFilter.vue";
import VacanciesPanel from "@/widgets/VacanciesPanel.vue";
import VacanciesList from "@/widgets/VacanciesList.vue";
</script>

<style lang="scss" scoped>
.vacancies-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 35px;

  &__content {
    display: flex;
    justify-content: space-between;
    gap: 24px;
    max-width: 1280px;
    width: 100%;

    @media screen and (max-width: 678px) {
      flex-direction: column-reverse;
      align-items: center;
    }
  }

  @media screen and (max-width: 678px) {
    padding: 5px;
  }
}
</style>