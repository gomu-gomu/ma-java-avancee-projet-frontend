<script setup lang="ts">
import { useAuthStore } from '~/store/auth.store';
import { UserType } from '~/core/enums/user-type.enum';
import { UserHelper } from '~/core/helpers/user.helper';



const { t } = useI18n();
const auth = useAuthStore();
const { metaSymbol } = useShortcuts();
const { isHelpSlideoverOpen } = useDashboard();
const { isDashboardSearchModalOpen } = useUIState();
const avatar = computed(() => UserHelper.generateAvatar(auth.user?.id as string));

function onLogout() {
  auth.logout();
}

const items = computed(() => [
  [
    {
      slot: 'account',
      label: '',
      disabled: true
    }
  ],
  [
    {
      label: t('login.labels.logout'),
      click: onLogout,
      icon: 'i-heroicons-arrow-left-on-rectangle'
    }
  ]
]);
</script>

<template>
  <UDropdown v-if="auth.isAuthenticated" mode="hover" :items="items"
    :ui="{ width: 'w-full', item: { disabled: 'cursor-text select-text' } }"
    :popper="{ strategy: 'absolute', placement: 'top' }" class="w-full">
    <template #default="{ open }">
      <UButton color="gray" variant="ghost" class="w-full" :label="auth.user?.username"
        :class="[open && 'bg-gray-50 dark:bg-gray-800']">
        <template #leading>
          <UAvatar :src="avatar" size="2xs" />
        </template>

        <template #trailing>
          <UBadge :label="t(UserHelper.getTypeLabel(auth.user?.type as UserType))"
            :color="UserHelper.getTypeColor(auth.user?.type as UserType)" variant="subtle" size="sm"
            class="capitalize badge" />
          <UIcon name="i-heroicons-ellipsis-vertical" class="w-5 h-5 ml-auto" />
        </template>
      </UButton>
    </template>

    <template #account>
      <div class="text-left">
        <p>
          {{ t('login.labels.signedInAs') }}
        </p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ auth.user?.email }}
        </p>
      </div>
    </template>
  </UDropdown>
</template>

<style lang="scss">
.badge {
  margin-left: auto;
}

.i-heroicons-ellipsis-vertical {
  margin-left: 0;
}
</style>