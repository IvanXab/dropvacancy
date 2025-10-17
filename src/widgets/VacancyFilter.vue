<template>
  <div :class="wrapperClass">
    <ElScrollbar height="700px">
      <div class="vacancy-filter__item">
        <p class="vacancy-filter__name">Специализация</p>

        <ElSelect
          v-model="specialty"
          placeholder="Выбрать"
          :reserve-keyword="false"
          multiple
          filterable
          allow-create
          default-first-option
        >
          <ElOption
            v-for="specialty in specialtiesList"
            :key="specialty.value"
            :label="specialty.label"
            :value="specialty.value"
          />
        </ElSelect>
      </div>

      <div class="vacancy-filter__item">
        <p class="vacancy-filter__name">Уровень дохода</p>
        <ElRadioGroup v-model="income">
          <ElRadio :label="25000">От 25000 руб</ElRadio>
          <ElRadio :label="85000">От 85000 руб</ElRadio>
          <ElRadio :label="150000">От 150 000 руб</ElRadio>
          <ElRadio :label="210000">От 210 000 руб</ElRadio>
          <ElRadio :label="275000">От 275 000 руб</ElRadio>
        </ElRadioGroup>
      </div>

      <div class="vacancy-filter__item">
        <p class="vacancy-filter__name">Локация</p>
        <ElRadioGroup v-model="city">
          <ElRadio :label="1">Москва</ElRadio>
          <ElRadio :label="4">Новосибирск</ElRadio>
        </ElRadioGroup>
      </div>

      <div class="vacancy-filter__item">
        <p class="vacancy-filter__name">График работы</p>
        <ElRadioGroup v-model="schedule">
          <ElRadio :label="'remote'">Удаленая работа</ElRadio>
          <ElRadio :label="'fullDay'">Полный рабочий день</ElRadio>
          <ElRadio :label="'flexible'">Гибкий график</ElRadio>
        </ElRadioGroup>
      </div>
    </ElScrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useVacanciesStore } from "@/entities/vacancy/model/vacancy-store";
import { specialtiesList } from "@/shared/constants/SpecialtiesList";

interface IProps {
  isDrawer?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  isDrawer: false,
});

const vacanciesStore = useVacanciesStore();

const specialty = ref<string[]>([]);
const income = ref<number>();
const city = ref<string>();
const level = ref<string>();
const schedule = ref<string[]>();

const wrapperClass = computed(() => props.isDrawer ? 'vacancy-filter-draw' : 'vacancy-filter')

const onChangeFilter = (): void => {
  const optionsFilter = {
    text: specialty?.value.join(' OR '),
    schedule: schedule?.value,
    salary: income?.value,
    area: city?.value,
  }
  vacanciesStore.setFilter(optionsFilter);
};

watch([specialty, income, city, level, schedule], onChangeFilter);
</script>

<style lang="scss">
.vacancy-filter {
  max-width: 300px;
  height: 610px;
  padding: 10px;
  background-color: #111111;
  border-radius: 10px;

  &__item {
    margin: 10px;
    padding: 10px;
  }

  &__name {
    font-size: 21px;
    font-weight: bolder;
    margin-bottom: 10px;
  }

  @media screen and (max-width: 678px) {
    display: none;
  }
}

.vacancy-filter-draw {
  width: 300px;
  padding: 20px;
  margin: 10px;

  .vacancy-filter__item {
    margin: 10px;
    padding: 10px;
  }

  .vacancy-filter__name {
    font-size: 21px;
    font-weight: bolder;
    margin-bottom: 10px;
  }
}
</style>