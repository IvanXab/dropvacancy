<template>
<div class="footer">
  <p class="footer__warning">© Dropvacancy 2022-2025. Все права защищены.</p>
  <div class="footer__links">
    <a target="_blank" href="https://github.com/IvanXab">
      <img class="footer__logo" src="../assets/images/github-mark-white.svg" alt="" />
    </a>
    <a target="_blank" href="https://vk.com/xab_xab">
      <img class="footer__logo" src="https://upload.wikimedia.org/wikipedia/commons/f/f3/VK_Compact_Logo_%282021-present%29.svg" alt="" />
    </a>
  </div>
</div>
</template>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 35px;
  box-shadow: 1px 1px 1px 1px rgba(127, 118, 118, 0.8);

  &__warning {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.76);
  }

  &__links {
    width: 120px;
    display: flex;
    justify-content: space-evenly;
  }

  &__logo {
    width: 27px;
  }

  @media screen and (max-width: 578px) {
    flex-direction: column;
    text-align: center;
    gap: 30px;
  }
}
</style>