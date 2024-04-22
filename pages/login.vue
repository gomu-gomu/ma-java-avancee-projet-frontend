<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '#ui/types';
import { useAuthStore } from '~/store/auth.store';
import type { TLoginResponse } from '~/types/login';



const { t } = useI18n();
const toast = useToast();
const { login } = useAuthStore();
const state = reactive({ email: '', password: '' });

function validate(state: any): Array<FormError> {
  const errors = [];

  if (!state.email) errors.push({ path: 'email', message: t('login.errors.email') });
  if (!state.password) errors.push({ path: 'password', message: t('login.errors.password') });

  return errors;
}

async function onSubmit(event: FormSubmitEvent<any>) {
  const { data } = await useFetch<TLoginResponse | false>('/api/login', { method: 'POST', body: event.data });

  if (data.value === false) {
    toast.add({ title: t('login.errors.invalid') /*  'Invalid credentials' */, color: 'red', icon: 'i-heroicons-x-circle' });
  } else {
    login(data.value as TLoginResponse);
  }
}
</script>

<template>
  <div class="page">
    <div class="form">
      <div class="content">
        <div class="head">
          <img class="logo" src="~/public/imgs/logo.png" alt="App Logo" />
          <h1 class="title">Student Management</h1>
          <p class="slogan">{{ t('login.slogan') }} </p>
        </div>

        <div class="body">
          <UForm :state="state" :validate="validate" :validate-on="['submit']" @submit="onSubmit">
            <div class="input">
              <UFormGroup name="email" :label="t('login.labels.email')" required>
                <UInput v-model="state.email" type="email" :placeholder="t('login.placeholders.email')"
                  autocomplete="off" icon="i-heroicons-envelope" size="lg" />
              </UFormGroup>
            </div>

            <div class="input">
              <UFormGroup name="password" :label="t('login.labels.password')" required>
                <UInput v-model="state.password" type="password" :placeholder="t('login.placeholders.password')"
                  autocomplete="off" icon="i-heroicons-key" size="lg" />
              </UFormGroup>
            </div>

            <div class="link">
              <a href="#">{{ t('login.labels.forgot') }}</a>
            </div>

            <div class="btn">
              <UButton type="submit" :label="t('login.labels.login')" color="blue" size="lg"
                icon="i-heroicons-arrow-left-end-on-rectangle-20-solid" />
            </div>
          </UForm>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.page {
  position: relative;

  display: flex;
  flex-direction: row;

  width: 100%;
  height: 100%;

  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('~/public/imgs/hero.jpg');

  .form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    padding: 80px;
    border-radius: 10px;
    text-align: center;

    backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, 0.8);

    display: flex;
    align-items: center;
    justify-content: center;

    .content {
      width: 100%;
      height: 65%;

      .head {
        margin-bottom: 80px;

        .logo {
          margin: auto;
          width: 120px;
          margin-bottom: 10px;
        }

        .title {
          font-size: 26px;
          font-weight: bold;
        }

        .slogan {
          font-style: italic;
        }
      }

      .body {
        margin: auto;
        max-width: 300px;

        .input {
          &:first-of-type {
            margin-bottom: 20px;
          }
        }

        .link {
          text-align: right;

          margin-top: 5px;
          margin-bottom: 20px;

          opacity: 0.8;
          font-size: 14px;

          transition-duration: 0.2s;
          transition-property: color;

          &:hover {
            color: rgb(43, 100, 255);
          }
        }
      }
    }
  }

}
</style>