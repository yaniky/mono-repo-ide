<template>
  <div class="page">
    hellow
  </div>
</template>
<script setup lang="ts">
import { testFun } from "test-pkg";

testFun();

function a(i: number) {
    console.log(i);
}
a(1);
</script>
<style lang="scss" scoped>
  .page {
    color: red;
  }
</style>