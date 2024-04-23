<script setup lang="ts">
import AdminDashboard from '~/components/home/admin/AdminDashboard.vue';
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar :title="$t('home.title')" />

      <UDashboardPanelContent>
        <AdminDashboard />
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>