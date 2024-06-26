<script lang="ts" setup>
import { format } from 'date-fns';
import type { TUIUser } from '~/types';
import type { TPage } from '~/types/page';
import type { TUser } from '~/types/user';
import { UserType } from '~/core/enums/user-type.enum';
import { UserHelper } from '~/core/helpers/user.helper';
import { RequestHelper } from '~/core/helpers/request.helper';


const { t } = useI18n();
const toast = useToast();

const defaultColumns = [
  {
    key: 'email',
    label: t('users.email'),
    sortable: true
  },
  {
    key: 'type',
    label: t('users.type')
  },
  {
    key: 'createdAt',
    label: t('users.created'),
    sortable: true
  },
  {
    key: 'updatedAt',
    label: t('users.updated'),
    sortable: true
  }
];

const q = ref('');
const page = ref(1);
const isNewUserModalOpen = ref(false);
const selected = ref<Array<TUIUser>>([]);
const selectedColumns = ref(defaultColumns);
const input = ref<{ input: HTMLInputElement }>();
const sort = ref({ column: 'createdAt', direction: 'asc' as const });
const selectedTypes = ref<Array<{ value: UserType, label: string }>>([]);

const columns = computed(() => defaultColumns.filter((column) => selectedColumns.value.includes(column)));
const query = computed(() => ({
  q: q.value,
  page: page.value,
  sort: sort.value.column,
  order: sort.value.direction,
  types: selectedTypes.value.map(e => e.value)
}));

const { data: response, pending, refresh } = await RequestHelper.fetch<TPage<Array<TUIUser>>>('users', undefined, { query, default: () => [] });
const defaultTypes = Object.keys(UserType).filter(e => isNaN(Number(e))).map(e => ({ value: UserType[e], label: t(`users.types.${e.toLowerCase()}`) }));

async function onDelete(): Promise<void> {
  for (const user of selected.value) {
    const userObj = {
      id: user.id,
      type: user.type,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    } as TUser;

    const { data } = await RequestHelper.fetch<TPage<Array<TUIUser>>>('users/delete', userObj);

    if (data) {
      toast.add({
        id: 'user_deleted',
        icon: 'i-heroicons-check',
        title: t('users.toasts.delete.title'),
        description: t('users.toasts.delete.description.success'),
      });

      refresh();
    } else {
      toast.add({
        id: 'user_deleted',
        icon: 'i-heroicons-x-mark',
        title: t('users.toasts.delete.title'),
        description: t('users.toasts.delete.description.failure')
      });
    }
  }
}

defineShortcuts({
  '/': () => {
    input.value?.input?.focus();
  }
});
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar :title="$t('users.title')"
        :badge="response?.data.length + ' / ' + response?.page.totalElements">
        <template #right>
          <UInput ref="input" v-model="q" icon="i-heroicons-funnel" autocomplete="off" :placeholder="$t('users.filter')"
            class="hidden lg:block" @keydown.esc="$event.target.blur()">
            <template #trailing>
              <UKbd value="/" />
            </template>
          </UInput>

          <UButton :label="$t('users.new')" trailing-icon="i-heroicons-plus" color="gray"
            @click="isNewUserModalOpen = true" />

          <UButton v-if="selected.length > 0" :label="$t('users.delete')" trailing-icon="i-heroicons-trash" color="red"
            @click="onDelete" />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <USelectMenu v-model="selectedTypes" icon="i-heroicons-check-circle" :placeholder="$t('users.type')" multiple
            :options="defaultTypes" :ui-menu="{ option: { base: 'capitalize' } }" />
        </template>

        <template #right>
          <USelectMenu v-model="selectedColumns" icon="i-heroicons-adjustments-horizontal-solid"
            :options="defaultColumns" multiple class="hidden lg:block">
            <template #label>
              {{ $t('users.columns') }}
            </template>
          </USelectMenu>
        </template>
      </UDashboardToolbar>

      <UDashboardModal v-model="isNewUserModalOpen" :title="$t('users.new')" :description="$t('users.description')"
        :ui="{ width: 'sm:max-w-md' }">
        <!-- ~/components/users/UsersForm.vue -->
        <UsersForm @close="isNewUserModalOpen = false" />
      </UDashboardModal>

      <UTable v-model="selected" v-model:sort="sort" :rows="response?.data" :columns="columns" :loading="pending"
        sort-mode="manual" class="w-full" :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }">
        <template #email-data="{ row }">
          <div class="flex items-center gap-3">
            <UAvatar v-bind="row.avatar" :alt="row.email" size="xs" />
            <span class="text-gray-900 dark:text-white font-medium">{{ row.email }}</span>
          </div>
        </template>

        <template #type-data="{ row }">
          <UBadge :label="t(UserHelper.getTypeLabel(row.type))" :color="UserHelper.getTypeColor(row.type)"
            variant="subtle" class="capitalize" />
        </template>

        <template #createdAt-data="{ row }">
          {{ format(new Date(row.createdAt), 'yyyy-MM-dd') }}
        </template>

        <template #updatedAt-data="{ row }">
          {{ format(new Date(row.updatedAt), 'yyyy-MM-dd') }}
        </template>
      </UTable>

      <div class="flex justify-center px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
        <UPagination v-model="page" :page-count="response?.page.size" :total="response?.page.totalElements" />
      </div>
    </UDashboardPanel>
  </UDashboardPage>
</template>