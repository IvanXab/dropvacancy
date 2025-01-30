<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Star } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus';
import type { PropType } from 'vue'
import type { TVacancy } from '@/shared/types/TVacancy';

const props = defineProps({
  vacancy: Object as PropType<TVacancy>,
  isFavourites: Boolean,
});

const emit = defineEmits(['remove']);
const router = useRouter();

const isFavourites = ref(props.isFavourites);
const publishedAt = ref(new Date(props.vacancy!.published_at));

onMounted(() => {
  const vacancyByKey = localStorage.getItem(`${props.vacancy?.id}`);

  if (vacancyByKey) {
    isFavourites.value = true;
  }
});

const handleSaveVacancy = (): void => {
  localStorage.setItem(`${props.vacancy?.id}`, props.vacancy!.id);
  isFavourites.value = true;
  ElNotification({
    title: 'Вакансия добавлена в избранное',
    type: 'success',
    position: 'bottom-right',
  })
};

const handleRemoveVacancy = (): void => {
  localStorage.removeItem(`${props.vacancy?.id}`);
  isFavourites.value = false;
  emit('remove', props.vacancy?.id);
};
</script>

<template>
  <div class="vacancy-card">
    <img
        class="vacancy-card__logo"
        :src="props.vacancy?.employer?.logo_urls?.original"
        alt=""
    />
    <h2 class="vacancy-card__name">
      <a :href="props.vacancy?.alternate_url">
        {{ props.vacancy?.name }}
      </a>
    </h2>
    <p class="vacancy-card__info">
      {{ props.vacancy?.salary?.from }}
      {{ props.vacancy?.salary?.to ? '- ' + props.vacancy?.salary?.to : '' }}
      {{ props.vacancy?.salary?.currency }}
    </p>
    <p v-if="props.vacancy?.address?.city" class="vacancy-card__info">
      Локация: {{ props.vacancy?.address?.city }}
    </p>
    <p class="vacancy-card__info">
      {{ props.vacancy?.employer?.name }}
    </p>
    <div class="vacancy-card__footer">
      <div class="vacancy-card__group">
        <el-button
            @click="router.push({ path: `/vacancy/${props.vacancy?.id}` })"
            type="primary"
        >
          Подробнее
        </el-button>
        <el-button
            v-if="isFavourites"
            type="warning"
            :icon="Star"
            color="#b94b4b"
            @click="handleRemoveVacancy"
        >
          Удалить из избранного
        </el-button>
        <el-button
            v-else
            type="warning"
            :icon="Star"
            color="#b94b4b"
            @click="handleSaveVacancy"
        >
          В избраное
        </el-button>
      </div>
      <p class="vacancy-card__date">Опубликовано: {{ publishedAt.toLocaleDateString() }}</p>
    </div>
  </div>
</template>

<style lang="scss">
.vacancy-card {
  max-width: 855px;
  padding: 20px;
  margin: 20px;
  background-image: linear-gradient(136.68deg, #192136 23.51%, #131b31 87.44%);
  border-radius: 10px;

  &__logo {
    width: 50px;
    margin-bottom: 10px;
  }

  &__info {
    margin-bottom: 20px;
    color: #bebebe;
  }

  &__date {
    text-align: left;
    color: #bebebe;
  }

  &__name {
    margin-bottom: 25px;
    font-weight: bolder;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__group {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }

  &:hover {
    transition: 0.55s;
    transform: scale(1.01);
  }

  @media screen and (max-width: 678px) {
    margin: 10px 0px
  }
}
</style>