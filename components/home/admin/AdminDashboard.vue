<script lang="ts" setup>
import { sub } from 'date-fns';
import { UserType } from '~/core/enums/user-type.enum';
import { RequestHelper } from '~/core/helpers/request.helper';
import { UserHelper } from '~/core/helpers/user.helper';
import type { Period, Range } from '~/types';



const { t } = useI18n();
const period = ref<Period>('daily');
const range = ref<Range>({ start: sub(new Date(), { days: 14 }), end: new Date() });

const { data } = await RequestHelper.fetch('users/count');
console.log(data.value?.admins);
</script>

<template>
  <!-- <UDashboardToolbar>
    <template #left>
      <HomeDateRangePicker v-model="range" class="-ml-2.5" />
      <HomePeriodSelect v-model="period" :range="range" />
    </template>
</UDashboardToolbar> -->

  <div class="grid lg:grid-cols-3 lg:items-start gap-4">
    <HomeChart :period="period" :range="range" class="col-span-2" />

    <div class="col-span-1 grid lg:grid-cols-2 lg:items-start gap-4">
      <ULandingCard :title="data?.admins + ' ' + t('home.types.admin')" icon="i-clarity-administrator-line"
        :color="UserHelper.getTypeColor(UserType.Admin) as any" />
      <ULandingCard :title="data?.teachers + ' ' + t('home.types.teacher')" icon="i-ph-chalkboard-teacher"
        :color="UserHelper.getTypeColor(UserType.Teacher) as any" />
      <ULandingCard :title="data?.parents + ' ' + t('home.types.parent')" icon="i-ri-parent-line"
        :color="UserHelper.getTypeColor(UserType.Parent) as any" />
      <ULandingCard :title="data?.students + ' ' + t('home.types.student')" icon="i-ph-student"
        :color="UserHelper.getTypeColor(UserType.Student) as any" />
    </div>
  </div>

  <div class="grid lg:grid-cols-2 lg:items-start gap-4 mt-4">
    <HomeSales />
    <HomeCountries />
  </div>
</template>