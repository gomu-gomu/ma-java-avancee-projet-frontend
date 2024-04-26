<script lang="ts" setup>
import StudentInfo from '~/components/home/student/StudentInfo.vue';
import CommonProfile from '~/components/home/common/CommonProfile.vue';
</script>

<template>
  <div class="grid lg:grid-cols-3 lg:items-start gap-4">
    <div class="col-span-2">
      ...
    </div>

    <div class="col-span-1 grid lg:grid-cols-1 lg:items-start gap-4">
      <CommonProfile />
      <StudentInfo />
    </div>
  </div>
</template>

<style lang="scss">
.info {
  .field:not(:last-of-type) {
    margin-bottom: 10px;
  }
}
</style>