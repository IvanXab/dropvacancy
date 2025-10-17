<template>
<div class="base-footer">
  <div class="base-footer__warning">
    © Dropvacancy 2022-2025. Все права защищены.
  </div>
</div>
</template>

<style lang="scss" scoped>
.base-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 164px;
  border-top: 1px dashed #1f1f1f;

  &__warning {
    font-size: 16px;
    color: #ffffff;
  }

  @media screen and (max-width: 578px) {
    flex-direction: column;
    text-align: center;
    gap: 30px;
  }
}
</style>