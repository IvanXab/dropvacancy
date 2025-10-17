<template>
  <div class="vacancies-list">
    <ElScrollbar
      v-if="vacanciesStore.getVacancies"
      height="1050px"
    >
      <div class="vacancies-list__content">
        <VacancyCard
          v-for="vacancy in vacanciesStore.getVacancies"
          :key="vacancy.id"
          :vacancy="vacancy"
          :isFavourites="isFavourites"
          @remove="vacanciesStore.removeVacancyById"
        />

        <template v-if="!isFavourites">
          <hr class="vacancies-list__line">
          <ElButton class="vacancies-list__more" @click="onLoadMoreVacancies">
            Показать еще
          </ElButton>
        </template>
      </div>
    </ElScrollbar>

    <div
      v-loading="true"
      v-if="!vacanciesStore.getCountVacancies"
      class="vacancies-list__loader"
      element-loading-background="#7c7c7c26"
      element-loading-text="Загрузка..."
    />
      <div v-if="vacanciesStore.getCountVacancies < 0" class="vacancies-list__empty">
      <ElEmpty description="Вакансии отсутствуют!"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useVacanciesStore } from "@/entities/vacancy/model/vacancy-store";
import VacancyCard from "@/entities/vacancy/ui/VacancyCard.vue";

interface IProps {
  isFavourites?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  isFavourites: false,
});

const vacanciesStore = useVacanciesStore();
const page = ref(1);

const onLoadMoreVacancies = (): void => {
  page.value++;
  vacanciesStore.setPage(page.value);
};

onMounted(() => {
  if (props.isFavourites){
    vacanciesStore.setFromStorageVacancies();
    return;
  }
  vacanciesStore.setVacancies();
});
</script>


<style lang="scss" scoped>
.vacancies-list {
  display: flex;
  flex-direction: column;
  max-width: 900px;
  width: 100%;

  &__content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 900px;
    width: 100%;
  }

  &__line {
    max-width: 855px;
    margin: 15px 0;
    opacity: 0.1;
  }

  &__more {
    max-width: 855px;
  }

  &__loader {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 750px;
  }

  &__empty {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 350px;
  }
}
</style>