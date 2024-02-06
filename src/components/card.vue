<script setup>
const props = defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  isFavorite: Boolean,
  onClickFavorite: Function
})


</script>

<template>
  <div class="relative bg-white border border-slate-200 rounded-2xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition">
    <img @click="onClickFavorite"
         :src="!isFavorite ? '/src/components/icons/Add-to-favorite.svg' : '/src/components/icons/In-Favorite.svg'"
         alt="Like 1"
         class="absolute top-2 left-2">
    <img :src="imageUrl" class="w-24">
    <p class="mt-2">{{ title }} </p>

    <div class="flex justify-between">
      <div class="flex justify-center mt-5">
        <span>Скачать</span>
        <img src="/src/components/icons/download.svg" alt="Download">
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>