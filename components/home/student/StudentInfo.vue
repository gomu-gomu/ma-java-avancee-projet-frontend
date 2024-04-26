<script lang="ts" setup>
import type { TStudentInfo } from '~/types/studentInfo';

import { RequestHelper } from '~/core/helpers/request.helper';



const { t } = useI18n();
const { data } = await RequestHelper.fetch<TStudentInfo>('students/info');
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="flex items-center">
        <UIcon class="text-2xl" name="i-heroicons-information-circle" />
        <span class="text-xl lfont-bold ml-2">{{ t('home.info.title') }}</span>
      </h2>
    </template>

    <div class="info text-center">
      <div class="field">
        <div class="label text-xs text-gray-400">{{ t('home.info.grade') }}</div>
        <div class="value text-sm font-bold">{{ data?.grade }}</div>
      </div>

      <div class="field">
        <div class="label text-xs text-gray-400">{{ t('home.info.sector') }}</div>
        <div class="value text-sm font-bold">{{ data?.sector }}</div>
      </div>

      <div class="field">
        <div class="label text-xs text-gray-400">{{ t('home.info.class') }}</div>
        <div class="value text-sm font-bold">{{ data?.class }}</div>
      </div>

      <div class="field">
        <div v-if="data?.year" class="label text-xs text-gray-400">{{ t('home.info.cycle') }}</div>
        <div class="value text-sm font-bold">{{ data?.year }} / {{ (data?.year ?? 0) + 1 }}</div>
      </div>
    </div>
  </UCard>
</template>