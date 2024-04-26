<script lang="ts" setup>
import type { TProfile } from '~/types/profile';

import { RequestHelper } from '~/core/helpers/request.helper';



const { t } = useI18n();
const { data } = await RequestHelper.fetch<TProfile>('account/info');
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="flex items-center">
        <UIcon class="text-2xl" name="i-ph-student" />
        <span class="text-xl lfont-bold ml-2">{{ t('home.profile.title') }}</span>
      </h2>
    </template>

    <div class="flex items-center justify-center">
      <UAvatar :src="data?.avatar" alt="Profile Picture" size="3xl" />
    </div>

    <div class="info mt-6 text-center">
      <div class="field">
        <div class="label text-xs text-gray-400">{{ t('home.profile.email') }}</div>
        <div class="value text-sm font-bold">{{ data?.email }}</div>
      </div>

      <div class="field">
        <div class="label text-xs text-gray-400">{{ t('home.profile.firstName') }}</div>
        <div class="value text-sm font-bold">{{ data?.firstName }}</div>
      </div>

      <div class="field">
        <div class="label text-xs text-gray-400">{{ t('home.profile.lastName') }}</div>
        <div class="value text-sm font-bold">{{ data?.lastName }}</div>
      </div>

      <div v-if="data?.phone" class="field">
        <div class="label text-xs text-gray-400">{{ t('home.profile.phone') }}</div>
        <div class="value text-sm font-bold">{{ data?.phone }}</div>
      </div>

      <div v-if="data?.cin" class="field">
        <div class="label text-xs text-gray-400">{{ t('home.profile.cin') }}</div>
        <div class="value text-sm font-bold">{{ data?.cin }}</div>
      </div>

      <div v-if="data?.cne" class="field">
        <div class="label text-xs text-gray-400">{{ t('home.profile.cne') }}</div>
        <div class="value text-sm font-bold">{{ data?.cne }}</div>
      </div>
    </div>
  </UCard>
</template>