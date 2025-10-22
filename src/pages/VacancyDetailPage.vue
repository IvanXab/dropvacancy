<template>
  <div class="vacancy-detail-page">
    <div class="vacancy-detail-page__content">
      <div class="vacancy-detail-page__title">
        <div class="title-content">
          <h1>{{ vacancy?.name }}</h1>
          <img :src="vacancy?.employer?.logo_urls?.original" alt="" />
        </div>

        <h3 v-if="vacancy?.salary?.from">от {{ vacancy?.salary?.from }} руб. на руки</h3>
        <div>Требуемый опыт работы: {{ vacancy?.experience?.name }}</div>
        <div>Тип занятости: {{ vacancy?.employment?.name }}</div>
      </div>

      <h2>Описание:</h2>
      <div class="vacancy-detail-page__description" v-html="vacancy?.description" />

      <template v-if="vacancy?.key_skills.length">
        <h2>Ключевые навыки:</h2>
        <div class="vacancy-detail-page__tags">
          <ElTag
            v-for="skill in vacancy?.key_skills"
            :key="skill.name"
            class="ml-2"
            type="info"
            size="large"
            round
          >
            {{ skill.name }}
          </ElTag>
        </div>
      </template>

      <template v-if="vacancy?.address?.lat && vacancy?.address?.lng">
        <h2>Адрес</h2>
        <div class="vacancy-detail-page__tags">
          <YandexMap :settings="settings" :coordinates="[vacancy?.address?.lat, vacancy?.address?.lng]" :zoom="18" >
            <YandexMarker
              :coordinates="[vacancy?.address?.lat, vacancy?.address?.lng]"
              :marker-id="vacancy.id"
            />
          </YandexMap>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { YandexMap, YandexMarker } from "vue-yandex-maps";
import { vacanciesApi } from "@/entities/vacancy/api/vacancy-api";
import type { TVacancy } from "@/shared/types/TVacancy";

const route = useRoute();

const vacancy = ref<TVacancy | null>(null);

const settings = {
  apiKey: import.meta.env.VITE_YANDEX_MAP_KEY,
  lang: 'ru_RU',
  coordorder: 'latlong',
  debug: true,
  version: '2.1'
};

onMounted(async () => {
  const [error, response] = await vacanciesApi.getVacancyById(String(route.params.id))
  vacancy.value = response
})
</script>

<style lang="scss" scoped>
.vacancy-detail-page {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 25px;

  &__content {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 1080px;
    padding: 30px;
    background-color: rgba(63, 78, 105, 0.4);
    border-radius: 10px;

    @media screen and (max-width: 768px) {
      padding: 20px;
    }
  }

  &__title {
    display: flex;
    flex-direction: column;
    gap: 25px;

    .title-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      img {
        width: 50px;
      }
    }
  }

  &__description {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 15px;

    @media screen and (max-width: 768px) {
      padding: 0;
    }

    :deep(strong) {
      font-weight: bolder;
    }

    :deep(li) {
      margin-left: 15px;
      margin-bottom: 15px;
    }
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 10px;
  }

  @media screen and (max-width: 768px) {
    padding: 7px;
  }
}

.yandex-container {
  width: 100%;
  height: 300px;
}
</style>