<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue';
import VacancyCard from '@/entities/vacancy/ui/vacancy-card.vue';
import { useVacanciesStore } from '@/entities/vacancy/model/vacancy-store';

const props = defineProps({
  isFavourites: Boolean,
});

const vacanciesStore = useVacanciesStore();
const page = ref(1);
const isFavourites = ref(props.isFavourites);

const handleLoadVacancy = ():void => {
  page.value++;
  vacanciesStore.setPage(page.value);
};

onMounted(async ():Promise<void> => {
  if (isFavourites.value){
    await vacanciesStore.setFromStorageVacancies()
  }
  else {
    await vacanciesStore.setVacancies();
  }
});
</script>

<template>
  <div class="vacancy-list">
    <el-scrollbar
        v-if="vacanciesStore.getVacancies"
        height="1050px"
    >
      <div class="vacancy-list__content">
        <vacancy-card
            v-for="vacancy in vacanciesStore.getVacancies"
            :key="vacancy.id"
            :vacancy="vacancy"
            :isFavourites="isFavourites"
            @remove="(id) => vacanciesStore.removeVacancyById(id)"
        />
        <template v-if="!isFavourites">
          <hr class="vacancy-list__line">
          <el-button
              size="default"
              type="primary"
              @click="handleLoadVacancy"
          >
            Показать еще
          </el-button>
        </template>
      </div>
    </el-scrollbar>
    <div
        v-if="!vacanciesStore.getCountVacancies"
        class="vacancy-list__loader"
        v-loading="true"
        element-loading-background="#7c7c7c26"
        element-loading-text="Загрузка..."
    >
    </div>
      <div v-if="vacanciesStore.getCountVacancies < 0" class="vacancy-list__empty">
        <el-empty description="Вакансии отсутствуют!"/>
      </div>
  </div>
</template>

<style lang="scss" >
.vacancy-list {
  display: flex;
  flex-direction: column;
  padding: 10px;
  max-width: 900px;
  width: 100%;

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 900px;
    width: 100%;
  }

  &__line {
    margin: 15px 0;
    opacity: 0.1;
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