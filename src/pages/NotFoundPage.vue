<template>
  <div class="not-found-page">
    <h1>404</h1>
    <div class="not-found-page__message">Страница не найдена :(</div>

    <RouterLink class="not-found-page__link" to="/vacancies">
      Вернуться к просмотру вакансий
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.not-found-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  height: 100vh;
  font-size: 36px;
  text-align: center;

  &__message {
    font-size: 18px;
  }

  &__link {
    font-size: 16px;
    text-align: center;
    color: #5a8dce;

    &:hover {
      color: #61a5fc;
    }
  }
}
</style>