<script setup lang="ts">
import { StackedBar } from '@unovis/ts';
import { VisXYContainer, VisStackedBar, VisAxis, VisTooltip } from '@unovis/vue';

import { RequestHelper } from '~/core/helpers/request.helper';

import type { TNullable } from '~/types/nullable';
import type { TCycleSuccess } from '~/types/cycleSuccess';



const { t } = useI18n();

const cardRef = ref<TNullable<HTMLElement>>(null);

const { data } = await RequestHelper.fetch<Array<TCycleSuccess>>('dashboard/cycleSuccess');
const cycleRange = getCycleRange(data.value);

const triggers = {
  [StackedBar.selectors.bar]: (d: TCycleSuccess) => `${d.cycleYear}: ${d.successPercentage}%`
}

const x = (d: TCycleSuccess) => d.cycleYear;
const y = (d: TCycleSuccess) => d.successPercentage;
const template = (d: TCycleSuccess) => `${d.cycleYear}: ${d.successPercentage}%`;

const xTicks = (i: number) => {
  const value = data.value;

  if (value == null) {
    return '';
  }

  return value[i]?.cycleYear;
}

function getCycleRange(data: TNullable<Array<TCycleSuccess>>) {
  if (data) {
    const firstCycle = data[0].cycleYear;
    const lastCycle = data.slice(0).reverse()[0].cycleYear;

    return `${firstCycle}/${lastCycle}`;
  }

  return '---';
};

function getColor(d: TCycleSuccess): string {
  const successRate = d.successPercentage;
  if (successRate >= 70) {
    return '#43de86';
  } else if (successRate >= 60) {
    return '#e0cb43';
  } else if (successRate >= 50) {
    return '#e08d43';
  } else {
    return '#e04343';
  }
}
</script>

<template>
  <UDashboardCard ref="cardRef" :ui="{ body: { padding: '!pb-3 !px-0' } as any }">
    <template #header>
      <div>
        <p class="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">
          {{ t('home.cycleSuccess.title') }}
        </p>
        <p class="text-3xl text-gray-900 dark:text-white font-semibold">
          {{ cycleRange }}
        </p>
      </div>
    </template>

    <div class="chart">
      <VisXYContainer :data="data" :padding="{ top: 10 }" :yDomain="[0, 100]" class="h-96">
        <VisTooltip :triggers="triggers" />
        <VisStackedBar :x="x" :y="y" :color="getColor" :bar-width="60" />

        <VisAxis type="x" :tick-format="xTicks" />
        <VisAxis type="y" :tick-format="xTicks" />
      </VisXYContainer>
    </div>
  </UDashboardCard>
</template>

<style lang="scss" scoped>
.unovis-xy-container {
  --vis-crosshair-line-stroke-color: rgb(var(--color-primary-500));
  --vis-crosshair-circle-stroke-color: #fff;

  --vis-axis-grid-color: rgb(var(--color-gray-200));
  --vis-axis-tick-color: rgb(var(--color-gray-200));
  --vis-axis-tick-label-color: rgb(var(--color-gray-400));

  --vis-tooltip-background-color: #fff;
  --vis-tooltip-border-color: rgb(var(--color-gray-200));
  --vis-tooltip-text-color: rgb(var(--color-gray-900));
}

.chart {
  padding: 0 20px;
}

.dark {
  .unovis-xy-container {
    --vis-crosshair-line-stroke-color: rgb(var(--color-primary-400));
    --vis-crosshair-circle-stroke-color: rgb(var(--color-gray-900));

    --vis-axis-grid-color: rgb(var(--color-gray-800));
    --vis-axis-tick-color: rgb(var(--color-gray-800));
    --vis-axis-tick-label-color: rgb(var(--color-gray-500));

    --vis-tooltip-background-color: rgb(var(--color-gray-900));
    --vis-tooltip-border-color: rgb(var(--color-gray-800));
    --vis-tooltip-text-color: #fff;
  }
}
</style>
