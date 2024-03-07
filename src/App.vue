<script setup>
import Header from "@/components/header.vue";
</script>


<template>
  <div class="w-4/5 bg-white mx-auto rounded-xl shadow-xl mt-14">
    <Header></Header>
    <div class="p-10">
        <router-view></router-view>
    </div>
  </div>
</template>

