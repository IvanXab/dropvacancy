<template>
  <div class="auth-page">
    <div class="auth-page__forms">
      <div class="auth-page__welcome">
        <h1>Добро пожаловать на Dropvacancy!</h1>
        <div class="auth-page__info">
          Персональные подборки проверенных IT-вакансий
        </div>
      </div>

      <ElTabs v-model="activeTab">
        <ElTabPane label="Регистрация" name="regist">
          <RegistForm/>
        </ElTabPane>

        <ElTabPane label="Авторизация" name="auth">
          <AuthForm />
        </ElTabPane>
      </ElTabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import RegistForm from "@/widgets/forms/RegistForm.vue";
import AuthForm from "@/widgets/forms/AuthForm.vue";

const activeTab = ref<'regist' | 'auth'>('regist');
</script>

<style lang="scss" scoped>
.auth-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  gap: 50px;
  padding: 32px;

  &__welcome {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    border-radius: 10px;
    gap: 20px;
    text-align: center;
  }

  &__info {
    font-size: 17px;
    color: #cccccc;
  }

  &__forms {
    max-width: 550px;
    width: 100%;
    height: auto;
    padding: 25px;
    background-color: #111111;
    border-radius: 20px;
  }

  @media screen and (max-width: 810px) {
    flex-direction: column;
    padding: 10px;
    gap: 30px;
  }
}
</style>