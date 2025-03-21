<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { vacanciesApi } from "@/entities/vacancy/api/vacancy-api";
import { YandexMap, YandexMarker } from "vue-yandex-maps";
import type {TVacancy} from "@/shared/types/TVacancy";
const route = useRoute();

const vacancy = ref<TVacancy | null>(null);

onMounted(async () => {
  const [error, response] = await vacanciesApi.getVacancyById(String(route.params.id))
  vacancy.value = response
})

const settings = {
  apiKey: '5f1bb2b3-f21c-44d6-bfe9-f8adf1f153bf',
  lang: 'ru_RU',
  coordorder: 'latlong',
  debug: true,
  version: '2.1'
};
</script>

<template>
  <div class="vacancy-about">
    <div class="vacancy-about__content">
      <div class="vacancy-about__title">
        <div class="title-content">
          <h1>{{ vacancy?.name }}</h1>
          <img :src="vacancy?.employer?.logo_urls?.original" alt="" />
        </div>
        <h3 v-if="vacancy?.salary?.from">от {{ vacancy?.salary?.from }} руб. на руки</h3>
        <p>Требуемый опыт работы: {{ vacancy?.experience?.name }}</p>
        <p>Тип занятости: {{ vacancy?.employment?.name }}</p>
      </div>
      <h2>Описание:</h2>
      <div class="vacancy-about__description" v-html="vacancy?.description"></div>
      <template v-if="vacancy?.key_skills.length">
        <h2>Ключевые навыки:</h2>
        <div class="vacancy-about__tags">
          <el-tag
              v-for="skill in vacancy?.key_skills"
              :key="skill.name"
              class="ml-2"
              type="info"
              size="large"
              round
          >
            {{ skill.name }}
          </el-tag>
        </div>
      </template>
      <template v-if="vacancy?.address?.lat && vacancy?.address?.lng">
        <h2>Адрес</h2>
        <div class="vacancy-about__tags">
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

<style lang="scss">
.vacancy-about {
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

    strong {
      font-weight: bolder;
    }

    li {
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
