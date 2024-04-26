<script setup lang="ts">
import Header from '~/components/shared/Header.vue';
import AdminDashboard from '~/components/home/admin/AdminDashboard.vue';
import ParentDashboard from '~/components/home/parent/ParentDashboard.vue';
import TeacherDashboard from '~/components/home/teacher/TeacherDashboard.vue';
import StudentDashboard from '~/components/home/student/StudentDashboard.vue';

import { UserType } from '~/core/enums/user-type.enum';
import { UserHelper } from '~/core/helpers/user.helper';
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <Header :title="$t('home.title')" />

      <UDashboardPanelContent>
        <AdminDashboard v-if="UserHelper.allowFor(UserType.Admin)" />
        <ParentDashboard v-if="UserHelper.allowFor(UserType.Parent)" />
        <TeacherDashboard v-if="UserHelper.allowFor(UserType.Teacher)" />
        <StudentDashboard v-if="UserHelper.allowFor(UserType.Student)" />
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>