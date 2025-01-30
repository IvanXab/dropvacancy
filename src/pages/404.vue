<template>
  <div class="not-found-warning">
    <h1>Ошибка 404</h1>
    <p>Страница не найдена :(</p>
    <router-link class="not-found-warning__link" to="/vacancies">
      Вернуться к просмотру вакансий
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.not-found-warning {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 100vh;
  font-size: 36px;
  text-align: center;

  &__link {
    text-align: center;
    color: #5a8dce;

    &:hover {
      color: #61a5fc;
    }
  }
}
</style>