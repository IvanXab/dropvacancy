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

    <div class="vacancy-card__info">
      {{ props.vacancy?.salary?.from }}
      {{ props.vacancy?.salary?.to ? '- ' + props.vacancy?.salary?.to : '' }}
      {{ props.vacancy?.salary?.currency }}
    </div>

    <div v-if="props.vacancy?.address?.city" class="vacancy-card__info">
      Локация: {{ props.vacancy?.address?.city }}
    </div>

    <div class="vacancy-card__info">
      {{ props.vacancy?.employer?.name }}
    </div>

    <div class="vacancy-card__footer">
      <div class="vacancy-card__group">
        <ElButton type="primary" @click="onRedirectToDetail">
          Подробнее
        </ElButton>

        <ElButton
          v-if="isFavourites"
          type="warning"
          :icon="Star"
          @click="onRemoveVacancy"
        >
          Удалить из избранного
        </ElButton>

        <ElButton
          v-else
          :icon="Star"
          @click="onSaveVacancy"
        >
          В избраное
        </ElButton>
      </div>
      <p class="vacancy-card__date">Опубликовано: {{ publishedAt.toLocaleDateString() }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";
import { Star } from "@element-plus/icons-vue";
import type { TVacancy } from "@/shared/types/TVacancy";

interface IProps {
  vacancy: TVacancy;
  isFavourites?: boolean;
}

interface IEmits {
  (e: 'remove', id: string): void;
}

const props = withDefaults(defineProps<IProps>(), {
  isFavourites: false,
});

const emit = defineEmits<IEmits>();

const router = useRouter();

const isFavourites = ref(props.isFavourites);
const publishedAt = ref(new Date(props.vacancy!.published_at));

const onSaveVacancy = (): void => {
  localStorage.setItem(`${props.vacancy?.id}`, props.vacancy!.id);
  isFavourites.value = true;

  ElNotification({
    title: 'Вакансия добавлена в избранное',
    type: 'success',
    position: 'bottom-right',
  });
};

const onRemoveVacancy = (): void => {
  localStorage.removeItem(`${props.vacancy?.id}`);
  isFavourites.value = false;
  emit('remove', props.vacancy?.id);
};

const onRedirectToDetail = (): void => {
  router.push({ path: `/vacancy/${props.vacancy?.id}` })
};

onMounted(() => {
  const vacancyByKey = localStorage.getItem(`${props.vacancy?.id}`);

  if (vacancyByKey) {
    isFavourites.value = true;
  }
});
</script>

<style lang="scss" scoped>
.vacancy-card {
  max-width: 855px;
  padding: 20px;
  background-color: #111111;
  border-radius: 10px;

  &:hover {
    transition: 0.55s;
    transform: scale(1.01);
  }

  @media screen and (max-width: 678px) {
    margin: 10px 0
  }

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
}
</style>