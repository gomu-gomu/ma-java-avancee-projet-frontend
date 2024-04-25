<script lang="ts" setup>
import AdminCycles from '~/components/home/admin/AdminCycles.vue';
import AdminTopClasses from '~/components/home/admin/AdminTopClasses.vue';
import AdminTopStudents from '~/components/home/admin/AdminTopStudents.vue';

import { sub } from 'date-fns';
import { UserType } from '~/core/enums/user-type.enum';

import type { Period, Range } from '~/types';

import { UserHelper } from '~/core/helpers/user.helper';
import { RequestHelper } from '~/core/helpers/request.helper';



const { t } = useI18n();
const period = ref<Period>('daily');
const range = ref<Range>({ start: sub(new Date(), { days: 14 }), end: new Date() });

const { data } = await RequestHelper.fetch('dashboard/count');

function getCountLabel(type: string) {
  const key = type.endsWith('s') ? `${type}es` : `${type}s`;
  return data.value[key] + ' ' + t(`home.count.${type}`);
}
</script>

<template>
  <div class="grid lg:grid-cols-3 lg:items-start gap-4">
    <AdminCycles :period="period" :range="range" class="col-span-2" />

    <div class="col-span-1 grid lg:grid-cols-2 lg:items-start gap-4">
      <ULandingCard :title="getCountLabel('admin')" icon="i-clarity-administrator-line"
        :color="UserHelper.getTypeColor(UserType.Admin) as any" />
      <ULandingCard :title="getCountLabel('teacher')" icon="i-ph-chalkboard-teacher"
        :color="UserHelper.getTypeColor(UserType.Teacher) as any" />
      <ULandingCard :title="getCountLabel('parent')" icon="i-ri-parent-line"
        :color="UserHelper.getTypeColor(UserType.Parent) as any" />
      <ULandingCard :title="getCountLabel('student')" icon="i-ph-student"
        :color="UserHelper.getTypeColor(UserType.Student) as any" />

      <UDivider class="col-span-2" />

      <ULandingCard :title="getCountLabel('class')" icon="i-mdi-google-classroom" color="primary" />
      <ULandingCard :title="getCountLabel('grade')" icon="i-streamline-quality-education" color="primary" />
      <ULandingCard :title="getCountLabel('sector')" icon="i-carbon-category" color="primary" />
      <ULandingCard :title="getCountLabel('subject')" icon="i-uil-books" color="primary" />
    </div>
  </div>

  <div class="grid lg:grid-cols-2 lg:items-start gap-4 mt-4">
    <AdminTopStudents />
    <AdminTopClasses />
  </div>
</template>