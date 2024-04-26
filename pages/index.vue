<script setup lang="ts">
import AdminDashboard from '~/components/home/admin/AdminDashboard.vue';
import Header from '~/components/shared/Header.vue';

import { UserType } from '~/core/enums/user-type.enum';
import { UserHelper } from '~/core/helpers/user.helper';
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <Header :title="$t('home.title')" />

      <UDashboardPanelContent>
        <AdminDashboard v-if="UserHelper.allowFor(UserType.Admin)" />
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>