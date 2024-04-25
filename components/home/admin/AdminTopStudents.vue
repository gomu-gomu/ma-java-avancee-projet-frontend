<script setup lang="ts">
import { RequestHelper } from '~/core/helpers/request.helper';
import type { TBestStudentsResponse } from '~/types/bestStudent';



const MAX = 7;

const { t } = useI18n();

const { data } = await RequestHelper.fetch<TBestStudentsResponse>('dashboard/topStudents', { max: MAX });
</script>

<template>
  <UDashboardCard :title="t('home.topGlobalStudents.title')"
    :description="t('home.topGlobalStudents.description', { cycle: data?.latestCycleYear, max: MAX })"
    icon="i-heroicons-chart-bar-20-solid">
    <NuxtLink v-for="(student, index) in data?.bestStudents" :key="index"
      class="px-3 py-2 -mx-2 last:-mb-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer flex items-center gap-3 relative">
      <UAvatar v-bind="student.avatar" :alt="student.name" size="md" />

      <div class="text-sm flex-1">
        <div>
          <p class="text-gray-900 dark:text-white font-medium">
            {{ student.name }}
          </p>
          <p class="text-gray-500 dark:text-gray-400">
            {{ student.sector }}
          </p>
        </div>
      </div>

      <p class="text-gray-900 dark:text-white font-medium text-lg">
        {{ student.score }}
      </p>
    </NuxtLink>
  </UDashboardCard>
</template>