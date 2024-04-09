<script setup lang="ts">
defineOptions({
  inheritAttrs: false
});

const colorMode = useColorMode();
const { t, setLocale, locale } = useI18n();

const options = computed(() => [
  { label: t('settings.language.options.en'), value: 'en', icon: 'i-heroicons-language' },
  { label: t('settings.language.options.fr'), value: 'fr', icon: 'i-heroicons-language' }
]);

const language = computed({
  get() {
    return options.value.find(option => option.value === locale.value) || options.value[0];
  },
  set(option) {
    setLocale(option.value);
  }
});
</script>

<template>
  <ClientOnly>
    <USelectMenu v-bind="$attrs" v-model="language" :leading-icon="language.icon" :options="options">
      <template #label>
        <span class="truncate">{{ language.label }}</span>
      </template>
    </USelectMenu>

    <template #fallback>
      <USelectMenu v-bind="$attrs" :model-value="options[0]" :leading-icon="options[0].icon" disabled />
    </template>
  </ClientOnly>
</template>