<template>
  <div class="vacancies-panel">
    <div class="vacancies-panel__content">
      <h3>Найдено вакансий: {{ vacanciesStore.getCountVacancies }}</h3>
      <ElSelect
        v-model="selectedOrderBy"
        placeholder="Сортировать по"
        @change="onVacanciesOrderBy"
      >
        <ElOption
          v-for="options in optionsOrderBy"
          :key="options.name"
          :label="options.name"
          :value="options.id"
        />
      </ElSelect>

      <div class="vacancies-panel__actions">
        <ElButton :icon="Location" @click="onRedirectToMap">
          Показать на карте
        </ElButton>

        <ElButton :icon="Star" @click="onRedirectToFavourites">
          Избранное
        </ElButton>

        <ElButton :icon="Expand" @click="onOpenFilter">
          Фильтр
        </ElButton>
      </div>

      <ElDrawer
        v-model="isDrawer"
        title="Фильтр"
        :direction="'ttb'"
        :size="'100%'"
      >
        <VacancyFilter is-drawer />
      </ElDrawer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useVacanciesStore } from "@/entities/vacancy/model/vacancy-store";
import { Location, Star, Expand } from "@element-plus/icons-vue"
import { optionsOrderBy } from "@/shared/constants/OptionsOrderBy";
import VacancyFilter from "@/widgets/VacancyFilter.vue";

const router = useRouter();
const vacanciesStore = useVacanciesStore();

const selectedOrderBy = ref('');
const isDrawer = ref(false);

const onRedirectToMap = (): void => {
  router.push({ path: '/map', query: vacanciesStore.getSettingsFilter });
};

const onRedirectToFavourites = (): void => {
  router.push({ path: '/favourites' });
};

const onVacanciesOrderBy = (): void => {
  vacanciesStore.setOrderBy(selectedOrderBy.value);
};

const onOpenFilter = (): void => {
  isDrawer.value = true;
};

onMounted(() => {
  vacanciesStore.setCountVacancies();
});
</script>

<style lang="scss" scoped>
.vacancies-panel {
  max-width: 1280px;
  width: 100%;

  &__content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    padding: 20px 50px;
    background-color: #111111;
    border-radius: 10px;

    @media screen and (max-width: 510px) {
      padding: 20px 10px;
      justify-content: center;
    }
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    @media screen and (max-width: 510px) {
      flex-direction: column;
      justify-content: center;
    }
  }
}
</style>