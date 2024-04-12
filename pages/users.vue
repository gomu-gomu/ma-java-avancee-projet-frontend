<script lang="ts" setup>
import { format } from 'date-fns';
import type { TUIUser } from '~/types';
import type { TPage } from '~/types/page';
import { UserType } from '~/types/user-type';


const { t } = useI18n();
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

function getType(type: UserType): string {
  switch (type) {
    case UserType.Admin: return t('users.types.admin');
    case UserType.Teacher: return t('users.types.teacher');
    case UserType.Parent: return t('users.types.parent');
    case UserType.Student: return t('users.types.student');
    default: return t('users.types.unknown');
  }
}

function getColor(type: UserType): string {
  switch (type) {
    case UserType.Admin: return 'red';
    case UserType.Teacher: return 'orange';
    case UserType.Parent: return 'green';
    case UserType.Student: return 'blue';
    default: return 'gray';
  }
}

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

const { data, pending } = await useFetch<TPage<Array<TUIUser>>>('/api/users', { query, default: () => [] });
const defaultTypes = Object.keys(UserType).filter(e => isNaN(Number(e))).map(e => ({ value: UserType[e], label: t(`users.types.${e.toLowerCase()}`) }));

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
          <UInput ref="input" v-model="q" icon="i-heroicons-funnel" autocomplete="off" :placeholder="$t('users.filter')"
            class="hidden lg:block" @keydown.esc="$event.target.blur()">
            <template #trailing>
              <UKbd value="/" />
            </template>
          </UInput>

          <UButton :label="$t('users.new')" trailing-icon="i-heroicons-plus" color="gray"
            @click="isNewUserModalOpen = true" />
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

      <UTable v-model="selected" v-model:sort="sort" :rows="data.content" :columns="columns" :loading="pending"
        sort-mode="manual" class="w-full" :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }" @select="onSelect">
        <template #email-data="{ row }">
          <div class="flex items-center gap-3">
            <UAvatar v-bind="row.avatar" :alt="row.email" size="xs" />
            <span class="text-gray-900 dark:text-white font-medium">{{ row.email }}</span>
          </div>
        </template>

        <template #type-data="{ row }">
          <UBadge :label="getType(row.type)" :color="getColor(row.type)" variant="subtle" class="capitalize" />
        </template>

        <template #createdAt-data="{ row }">
          {{ format(new Date(row.createdAt), 'yyyy-MM-dd') }}
        </template>

        <template #updatedAt-data="{ row }">
          {{ format(new Date(row.updatedAt), 'yyyy-MM-dd') }}
        </template>
      </UTable>

      <div class="flex justify-center px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
        <UPagination v-model="page" :page-count="data.size" :total="data.totalElements" />
      </div>
    </UDashboardPanel>
  </UDashboardPage>
</template>