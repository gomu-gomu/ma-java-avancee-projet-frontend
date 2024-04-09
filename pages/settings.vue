<script setup lang="ts">
const { t } = useI18n();
const links = computed(() => [
  [
    {
      label: t('settings.tabs.general'),
      icon: 'i-heroicons-user-circle',
      to: '/settings',
      exact: true
    },
    {
      label: t('settings.tabs.notifications'),
      icon: 'i-heroicons-bell',
      to: '/settings/notifications'
    }
  ]
]);
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar :title="$t('settings.title')" />

      <UDashboardToolbar class="py-0 px-1.5 overflow-x-auto">
        <UHorizontalNavigation :links="links" />
      </UDashboardToolbar>

      <NuxtPage />
    </UDashboardPanel>
  </UDashboardPage>
</template>
