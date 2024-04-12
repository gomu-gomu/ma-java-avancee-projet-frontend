<script lang="ts" setup>
import type { TUIUser } from '~/types';
import type { TPage } from '~/types/page';
import { UserType } from '~/types/user-type';



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
    key: 'type',
    label: 'Type'
  }
];

function getType(type: UserType): string {
  switch (type) {
    case UserType.Admin: return 'Admin';
    case UserType.Teacher: return 'Teacher';
    case UserType.Parent: return 'Parent';
    case UserType.Student: return 'Student';
    default: return 'Unknown';
  }
}

function getColor(type: UserType): string {
  switch (type) {
    case UserType.Admin: return 'red';
    case UserType.Teacher: return 'orange';
    case UserType.Parent: return 'green';
    case UserType.Student: return 'blue';
    default: return 'Unknown';
  }
}

const q = ref('');
const isNewUserModalOpen = ref(false);
const selected = ref<Array<TUIUser>>([]);
const selectedColumns = ref(defaultColumns);
const input = ref<{ input: HTMLInputElement }>();
const sort = ref({ column: 'createdAt', direction: 'asc' as const });
const selectedTypes = ref<Array<{ value: UserType, label: string }>>([]);

const columns = computed(() => defaultColumns.filter((column) => selectedColumns.value.includes(column)));
const query = computed(() => ({
  q: q.value,
  sort: sort.value.column,
  order: sort.value.direction,
  types: selectedTypes.value.map(e => e.value)
}));

const { data, pending } = await useFetch<TPage<Array<TUIUser>>>('/api/users', { query, default: () => [] });
const defaultTypes = data.value?.content.reduce((acc, user) => {
  if (!acc.find(e => e.value === user.type)) {
    acc.push({ value: user.type, label: getType(user.type) });
  }

  return acc;
}, [] as Array<{ value: UserType, label: string }>);

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
      <UDashboardNavbar :title="$t('users.title')" :badge="data.content.length + ' / ' + data.totalElements">
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
          <USelectMenu v-model="selectedTypes" icon="i-heroicons-check-circle" placeholder="Type" multiple
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

      <UTable v-model="selected" v-model:sort="sort" :rows="data.content" :columns="columns" :loading="pending"
        sort-mode="manual" class="w-full" :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }" @select="onSelect">
        <template #name-data="{ row }">
          <div class="flex items-center gap-3">
            <UAvatar v-bind="row.avatar" :alt="row.name" size="xs" />

            <span class="text-gray-900 dark:text-white font-medium">{{ row.name }}</span>
          </div>
        </template>

        <template #type-data="{ row }">
          <UBadge :label="getType(row.type)" :color="getColor(row.type)" variant="subtle" class="capitalize" />
        </template>
      </UTable>
    </UDashboardPanel>
  </UDashboardPage>
</template>