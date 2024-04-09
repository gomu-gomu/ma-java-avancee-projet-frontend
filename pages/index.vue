<script setup lang="ts">
const { data } = await useFetch('/api/users');
</script>

<template>
  <h1>Users</h1>

  <ul>
    <li v-for="user in data">{{ user.email }}</li>
  </ul>
</template>