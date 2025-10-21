<template>
  <div class="vacancies-map">
    <template v-if="vacanciesStore.getVacancies">
      <YandexMap :settings="settings" :coordinates="[55.45, 37.37]" :zoom="7" >
        <YandexClusterer :options="{ preset: 'islands#nightClusterIcons' }">
          <template v-for="vacancy in vacanciesStore.getVacancies">
            <template v-if="vacancy.address?.lat && vacancy.address?.lng" :key="vacancy.id">
                <YandexMarker
                  :properties="{ iconCaption: vacancy.name }"
                  :coordinates="[vacancy.address.lat, vacancy.address.lng]"
                  :marker-id="vacancy.id"
                >
                  <template #component>
                    <VacancyBalloon :vacancy="vacancy"/>
                  </template>
                </YandexMarker>
            </template>
          </template>
        </YandexClusterer>
      </YandexMap>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { YandexClusterer, YandexMap, YandexMarker } from "vue-yandex-maps"
import { useVacanciesStore } from "@/entities/vacancy/model/vacancy-store";
import VacancyBalloon from "@/entities/vacancy/ui/vacancy-balloon.vue";

const vacanciesStore = useVacanciesStore();
const route = useRoute();

const settings = {
  apiKey: import.meta.env.VITE_YANDEX_MAP_KEY,
  lang: 'ru_RU',
  coordorder: 'latlong',
  debug: true,
  version: '2.1',
};

onMounted(async () => {
  if (Object.keys(route.query).length) {
    await vacanciesStore.setFilter(route.query);
    await vacanciesStore.setVacanciesMap();
    return
  }
  await vacanciesStore.setVacancies();
});
</script>

<style lang="scss" scoped>
.vacancies-map {
  padding: 24px;
}
</style>