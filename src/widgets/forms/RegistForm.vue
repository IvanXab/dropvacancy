<template>
  <div class="regist-form">
    <ElForm
      :rules="RulesForm"
      :model="dataRegistForm"
      ref="ruleFormRef"
    >
      <ElFormItem prop="name">
        <ElInput v-model="dataRegistForm.name" placeholder="Ваше имя" />
      </ElFormItem>

      <ElFormItem prop="email">
        <ElInput v-model="dataRegistForm.email" placeholder="Ваша почта" />
      </ElFormItem>

      <ElFormItem prop="password">
        <ElInput
          v-model="dataRegistForm.password"
          type="password"
          placeholder="Пароль"
          show-password
        />
      </ElFormItem>

      <ElFormItem>
        <ElInput
          v-model="confirmPasswordInput"
          type="password"
          placeholder="Повторите пароль"
          show-password
        />
      </ElFormItem>
    </ElForm>

    <ElButton
      type="primary"
      round
      @click="onSubmitForm(ruleFormRef)"
      @keyup.enter="onSubmitForm(ruleFormRef)"
    >
      Зарегистрироваться
    </ElButton>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";
import type { FormInstance } from "element-plus";
import Cookies from "js-cookie";
import { authApi } from "@/entities/user/api/user-api";
import RulesForm from "@/shared/constants/RulesForm";
import type { TUser } from '@/shared/types/TUser';

const router = useRouter();

const dataRegistForm = reactive<TUser>({
  name: '',
  email: '',
  password: '',
});

const confirmPasswordInput = ref('');
const ruleFormRef = ref<FormInstance>();

const onSubmitForm = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl) return;

  await formEl.validate(async (valid) => {
    if (valid) {

      const [error, response] = await authApi.register(dataRegistForm);

      if (error) {
        error.message.forEach((error: string) => {
          ElNotification({
              title: error,
              type: 'error',
              position: 'bottom-right',
          });
        })
      }

      if (response) {
        ElNotification({
          title: 'Успех! Вы вошли',
          type: 'success',
          position: 'bottom-right',
        });
        Cookies.set('ID', response.user._id);
        Cookies.set('ACCESS_TOKEN_KEY', response.accessToken, { expires: 30 });
        await router.push({ path: '/vacancies' });
      }
      return;
    }
    ElNotification({
      title: 'Заполните правильно форму!',
      type: 'error',
      position: 'bottom-right',
    });
  });
}
</script>

<style lang="scss" scoped>
.regist-form {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  height: auto;

  .el-form {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
}
</style>