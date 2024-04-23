<script setup lang="ts">
import { Page } from '~/core/enums/page.enum';

import { AuthHelper } from '~/core/helpers/auth.helper';
import { UserHelper } from '~/core/helpers/user.helper';

import { useAuthStore } from '~/store/auth.store';



const route = useRoute();
const auth = useAuthStore();
const { t, locale } = useI18n();

watch(() => auth.isAuthenticated, (isAuthenticated) => {
  if (isAuthenticated) {
    AuthHelper.onLoggedIn(t);
  } else {
    AuthHelper.onLoggedOut(t);
  }
});

watch(locale, (language: string) => {
  useHead({
    htmlAttrs: {
      lang: language,
      dir: language === 'ar' ? 'rtl' : 'ltr'
    }
  });
});

const links = computed(() => (UserHelper.generateMenu([
  {
    id: 'home',
    label: t('home.title'),
    icon: 'i-heroicons-home',
    to: '/',
    tooltip: {
      text: t('home.title'),
      shortcuts: ['G', 'H']
    }
  },
  {
    id: 'inbox',
    label: t('inbox.title'),
    icon: 'i-heroicons-inbox',
    to: '/inbox',
    badge: '4',
    tooltip: {
      text: t('inbox.title'),
      shortcuts: ['G', 'I']
    }
  },
  {
    id: Page.Users,
    label: t('users.title'),
    icon: 'i-heroicons-user-group',
    to: '/users',
    tooltip: {
      text: t('users.title'),
      shortcuts: ['G', 'U']
    }
  },
  {
    id: 'settings',
    label: t('settings.title'),
    to: '/settings',
    icon: 'i-heroicons-cog-8-tooth',
    children: [
      {
        label: t('settings.title'),
        to: '/settings',
        exact: true
      },
      {
        label: t('settings.tabs.notifications'),
        to: '/settings/notifications'
      }
    ],
    tooltip: {
      text: t('settings.title'),
      shortcuts: ['G', 'S']
    }
  }
])));

const groups = [
  {
    key: 'links',
    label: 'Go to',
    commands: links.value.map(link => ({ ...link, shortcuts: link.tooltip?.shortcuts }))
  },
  {
    key: 'code',
    label: 'Code',
    commands: [
      {
        id: 'source',
        label: 'View page source',
        icon: 'i-simple-icons-github',
        click: () => {
          window.open(`https://github.com/nuxt-ui-pro/dashboard/blob/main/pages${route.path === '/' ? '/index' : route.path}.vue`, '_blank')
        }
      }
    ]
  }
];
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel v-if="$route.name !== 'login'" :width="250" :resizable="{ min: 200, max: 300 }" collapsible>
      <UDashboardNavbar class="!border-transparent" :ui="{ left: 'flex-1' }">
        <template #left>
          <div class="head">
            <img class="head__logo" src="~/public/imgs/logo.png" alt="The app's logo" />
            <h1 class="head__title">Student Management</h1>
          </div>
        </template>
      </UDashboardNavbar>

      <UDashboardSidebar>
        <template #header>
          <UDashboardSearchButton :label="$t('common.search') + '...'" />
        </template>

        <UDashboardSidebarLinks :links="links" />
        <UDivider class="sticky bottom-0" />
        <div class="flex-1" />

        <template #footer>
          <!-- ~/components/UserDropdown.vue -->
          <UserDropdown />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />
  </UDashboardLayout>
</template>

<style scoped lang="scss">
.head {
  display: flex;
  align-items: center;

  &__logo {
    width: 50px;
  }

  &__title {
    margin-left: 10px;
    font-weight: bold;
  }
}
</style>