<script setup lang="ts">
const { t } = useI18n();
const state = reactive<{ [key: string]: boolean }>({
  email: true,
  desktop: false,
  product_updates: true,
  weekly_digest: false,
  important_updates: true
});

const sections = computed(() => [
  {
    title: t('settings.notifications.title'),
    description: t('settings.notifications.description'),
    fields: [
      {
        name: 'email',
        label: t('settings.notifications.email.title'),
        description: t('settings.notifications.email.description')
      },
      {
        name: 'desktop',
        label: t('settings.notifications.desktop.title'),
        description: t('settings.notifications.desktop.description')
      }
    ]
  }
]);

async function onChange() {
  console.log(state);
}
</script>

<template>
  <UDashboardPanelContent class="p-0 pb-24 divide-y divide-gray-200 dark:divide-gray-800">
    <UDashboardSection v-for="(section, index) in sections" :key="index" :title="section.title"
      :description="section.description" orientation="horizontal" class="px-4 py-6">
      <UCard :ui="{ body: { base: 'divide-y divide-gray-200 dark:divide-gray-800 gap-4 flex flex-col' } }">
        <UFormGroup v-for="field in section.fields" :key="field.name" :name="field.name" :label="field.label"
          :description="field.description" class="flex items-center justify-between pt-4 first:pt-0 gap-2"
          :ui="{ container: 'flex' }">
          <UToggle v-model="state[field.name]" size="md" @update:model-value="onChange" />
        </UFormGroup>
      </UCard>
    </UDashboardSection>
  </udashboardpanelcontent>
</template>