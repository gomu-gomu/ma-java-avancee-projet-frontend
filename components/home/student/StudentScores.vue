<script setup lang="ts">
import { StackedBar } from '@unovis/ts';
import { VisXYContainer, VisStackedBar, VisAxis, VisTooltip } from '@unovis/vue';

import { RequestHelper } from '~/core/helpers/request.helper';

import type { TNullable } from '~/types/nullable';
import type { TStudentScore } from '~/types/studentScore';



const { t } = useI18n();

const cardRef = ref<TNullable<HTMLElement>>(null);

const { data } = await RequestHelper.fetch<Array<TStudentScore>>('dashboard/studentScores');
const cycleRange = getCycleRange(data.value);

const triggers = {
  [StackedBar.selectors.bar]: (d: TStudentScore) => `${d.subject}: ${d.score}/20`
}

const y = (d: TStudentScore) => d.score;
const x = (_: TStudentScore, i: number) => i;

const xTicks = (i: number) => {
  const value = data.value;

  if (value == null) {
    return '';
  }

  return value[i]?.subject;
}

const yTicks = (i: number) => {
  return i;
}

function getCycleRange(data: TNullable<Array<TStudentScore>>) {
  if (data) {
    const year = data[0].year;
    return `${year}/${year + 1}`;
  }

  return '---';
};

function getColor(d: TStudentScore): string {
  const successRate = d.score;

  if (successRate >= 17) {
    return '#43de86';
  } else if (successRate >= 15) {
    return '#e0cb43';
  } else if (successRate >= 10) {
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
          {{ t('home.studentScores.title') }}
        </p>
        <p class="text-3xl text-gray-900 dark:text-white font-semibold">
          {{ cycleRange }}
        </p>
      </div>
    </template>

    <div class="chart">
      <VisXYContainer :data="data" :padding="{ top: 10 }" :yDomain="[0, 20]" class="h-96">
        <VisTooltip :triggers="triggers" />
        <VisStackedBar :x="x" :y="y" :color="getColor" />

        <VisAxis type="x" :tick-format="xTicks" />
        <VisAxis type="y" :tick-format="yTicks" />
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
