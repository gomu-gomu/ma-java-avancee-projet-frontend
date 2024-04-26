<script setup lang="ts">
import { RequestHelper } from '~/core/helpers/request.helper';


const { t } = useI18n();

const props = defineProps(['title']);
const { data } = await RequestHelper.fetch<number>('common/latestCycleYear');

function getYearRange() {
  const year = data.value as number;
  return `${year} / ${year + 1}`;
}
</script>

<template>
  <UDashboardNavbar :title="props.title">
    <template #right>
      <span class="text-gray-400">
        {{ t('common.cycleYear') }}
      </span>
      <UBadge variant="subtle" :label="getYearRange()" />
    </template>
  </UDashboardNavbar>
</template>