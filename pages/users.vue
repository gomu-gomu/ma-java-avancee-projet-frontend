<script lang="ts" setup>
import type { TUIUser } from '~/types';

const defaultColumns = [
  {
    key: 'name',
    label: 'Name',
    sortable: true
  },
  {
    key: 'email',
    label: 'Email',
    sortable: true
  },
  {
    key: 'status',
    label: 'Status'
  }
];

const q = ref('');
const selected = ref<Array<TUIUser>>([]);
const selectedColumns = ref(defaultColumns);
const selectedTypes = ref([]);
const sort = ref({ column: 'id', direction: 'asc' as const });
const input = ref<{ input: HTMLInputElement }>();
const isNewUserModalOpen = ref(false);

const columns = computed(() => defaultColumns.filter((column) => selectedColumns.value.includes(column)));
const query = computed(() => ({ q: q.value, statuses: selectedTypes.value, sort: sort.value.column, order: sort.value.direction }));
const { data: users, pending } = await useFetch<Array<TUIUser>>('/api/users', { query, default: () => [] });

const defaultTypes = users.value.reduce((acc, user) => {
  if (!acc.includes(user.type)) {
    acc.push(user.type);
  }

  return acc;
}, [] as string[]);

function onSelect(row: TUIUser) {
  const index = selected.value.findIndex((item) => item.id === row.id);

  if (index === -1) {
    selected.value.push(row);
  } else {
    selected.value.splice(index, 1);
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
      <UDashboardNavbar :title="$t('welcome')" :badge="users.length">
        <template #right>
          <UInput ref="input" v-model="q" icon="i-heroicons-funnel" autocomplete="off"
            placeholder="Filtrer les utilisateurs..." class="hidden lg:block" @keydown.esc="$event.target.blur()">
            <template #trailing>
              <UKbd value="/" />
            </template>
          </UInput>

          <UButton label="Nouvel utilisateur" trailing-icon="i-heroicons-plus" color="gray"
            @click="isNewUserModalOpen = true" />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <USelectMenu v-model="selectedTypes" icon="i-heroicons-check-circle" placeholder="Status" multiple
            :options="defaultTypes" :ui-menu="{ option: { base: 'capitalize' } }" />
        </template>

        <template #right>
          <USelectMenu v-model="selectedColumns" icon="i-heroicons-adjustments-horizontal-solid"
            :options="defaultColumns" multiple class="hidden lg:block">
            <template #label>
              Display
            </template>
          </USelectMenu>
        </template>
      </UDashboardToolbar>

      <UDashboardModal v-model="isNewUserModalOpen" title="New user" description="Add a new user to your database"
        :ui="{ width: 'sm:max-w-md' }">
        <!-- ~/components/users/UsersForm.vue -->
        <UsersForm @close="isNewUserModalOpen = false" />
      </UDashboardModal>

      <UTable v-model="selected" v-model:sort="sort" :rows="users" :columns="columns" :loading="pending"
        sort-mode="manual" class="w-full" :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }" @select="onSelect">
        <template #name-data="{ row }">
          <div class="flex items-center gap-3">
            <UAvatar v-bind="row.avatar" :alt="row.name" size="xs" />

            <span class="text-gray-900 dark:text-white font-medium">{{ row.name }}</span>
          </div>
        </template>

        <template #status-data="{ row }">
          <UBadge :label="row.status"
            :color="row.status === 'subscribed' ? 'green' : row.status === 'bounced' ? 'orange' : 'red'"
            variant="subtle" class="capitalize" />
        </template>
      </UTable>
    </UDashboardPanel>
  </UDashboardPage>
</template>