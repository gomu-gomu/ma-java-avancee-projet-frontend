<script setup lang="ts">
import { RequestHelper } from '~/core/helpers/request.helper';

import type { TBestClassesResponse } from '~/types/bestClass';


const MAX = 5;

const { t } = useI18n();

const { data } = await RequestHelper.fetch<Array<TBestClassesResponse>>('dashboard/topClasses', { max: MAX });

const colors = ['red', 'orange', 'yellow', 'green', 'teal', 'blue', 'indigo', 'pink', 'black', 'brown'];
</script>

<template>
  <UDashboardCard :title="t('home.topGlobalClasses.title')"
    :description="t('home.topGlobalClasses.description', { cycle: data.latestCycleYear, max: MAX })"
    icon="i-heroicons-chart-bar-20-solid">
    <div class="space-y-2">
      <UMeter v-for="(class_, index) in data.topClasses" :key="index" :value="class_.value" :label="class_.label"
        :color="colors[index % colors.length]" size="lg" indicator />
    </div>
  </UDashboardCard>
</template>
