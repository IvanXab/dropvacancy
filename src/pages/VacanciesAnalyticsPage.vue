<template>
  <div class="vacancies-analytics-page">
    <div class="vacancies-analytics-page__title">
      Аналитика
    </div>

    <div
      v-if="isLoading"
      class="vacancies-analytics-page__loader"
      v-loading="isLoading"
      element-loading-background="#7c7c7c26"
    />

    <div v-else class="vacancies-analytics-page__content">
      <div class="vacancies-analytics-page__bars">
        <h3>Самая популярная специализация на сегодняшний день</h3>
        <div class="vacancies-analytics-page__bar">
          <Bar :data="specialtiesData" :options="optionsBar" />
        </div>

        <h3>Количество открытых вакансий у популярных IT компаний в России</h3>
        <div class="vacancies-analytics-page__bar">
          <Pie :data="companyData" :options="optionsPie" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { Bar, Pie } from "vue-chartjs"
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { specialtiesList } from "@/shared/constants/SpecialtiesList";
import { companiesList } from "@/shared/constants/CompaniesList";
import axios from "axios";

const countVacancies = ref<any[]>([]);
const countCompanyVacancies = ref<number[]>([]);
const isLoading = ref(false);

const specialtiesData = computed<any>(() => ({
  labels: specialtiesList.map((s: any) => s.label),
  datasets: [
    {
      backgroundColor: specialtiesList.map((s: any) => s.color),
      data: countVacancies.value,
    },
  ],
}));

const companyData = computed<any>(() => ({
  labels: companiesList.map((s: any) => s.label),
  datasets: [
    {
      backgroundColor: companiesList.map((s: any) => s.color),
      data: countCompanyVacancies.value,
    },
  ],
}));

const optionsBar = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const optionsPie = {
  responsive: true,
  maintainAspectRatio: false,
};

onMounted(async () => {
  isLoading.value = true;
  let temp: number[] = [];

  for (let company of companiesList) {
    const res = await axios.get(company.url);
    temp.push(res.data?.open_vacancies);
  }

  countCompanyVacancies.value = [...temp];

  temp = [];

  for (let spec of specialtiesList) {
    const res = await axios.get(spec.url);
    temp.push(res.data?.found);
  }

  countVacancies.value = [...temp]
  isLoading.value = false
});

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);
</script>

<style lang="scss" scoped>
.vacancies-analytics-page {
  display: flex;
  justify-content: space-between;
  max-width: 1280px;
  width: 100%;
  gap: 24px;
  padding: 32px;

  &__title {
    font-size: 32px;
    font-weight: bold;
  }

  &__content {
    display: flex;
    justify-content: center;
    gap: 12px;
    max-width: 900px;
    width: 100%;
    padding: 32px;
  }

  &__bars {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 50px;
    width: 100%;
  }

  &__bar {
    width: 100%;
    height: 430px;
  }

  &__loader {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
}
</style>