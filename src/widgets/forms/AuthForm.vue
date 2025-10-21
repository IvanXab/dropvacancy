<template>
  <div class="auth-form">
    <ElForm
      :rules="RulesForm"
      :model="dataAuthForm"
      ref="ruleFormRef"
      :size="'default'"
    >
      <ElFormItem prop="email">
        <ElInput v-model="dataAuthForm.email" placeholder="Почта" />
      </ElFormItem>

      <ElFormItem prop="password">
        <ElInput
          v-model="dataAuthForm.password"
          type="password"
          placeholder="Пароль"
          show-password
        />
      </ElFormItem>
    </ElForm>

    <ElButton
      type="primary"
      round
      @click="onSubmitForm(ruleFormRef)"
    >
      Войти
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
import type { TUser }  from "@/shared/types/TUser";

const dataAuthForm = reactive<TUser>({
  email: '',
  password: '',
});

const ruleFormRef = ref<FormInstance>();
const router = useRouter();

const onSubmitForm = async (formEl: FormInstance | undefined): Promise<void> => {
  if (!formEl) return;

  await formEl.validate(async (valid) => {
    if (valid) {
      const [error, response] = await authApi.login(dataAuthForm);

      if (error) {
        if (Array.isArray(error.message)) {
          error.message.forEach((error: string) => {
            ElNotification({
              title: error,
              type: 'error',
              position: 'bottom-right',
            });
          });
          return;
        }

        ElNotification({
          title: error.message,
          type: 'error',
          position: 'bottom-right',
        });
      }

      if (response) {
        ElNotification({
          title: 'Успех! Вы вошли!',
          type: 'success',
          position: 'bottom-right',
        });

        Cookies.set('ID', response.user._id)
        Cookies.set('ACCESS_TOKEN_KEY', response.accessToken, { expires: 30 })
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
};
</script>

<style lang="scss" scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;

  &__link {
    font-size: 14px;
    color: #99c5ff;
    text-decoration: underline;

    &:hover {
      cursor: pointer;
      color: #5a8dce;
    }
  }

  .el-form {
    display: flex;
    flex-direction: column;
  }
}
</style>