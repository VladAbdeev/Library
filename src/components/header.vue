<script setup>

</script>

<template>

    <header class="flex justify-between border-b border-slate-300 px-10 py-8">
      <div class="flex items-center gap-4">
        <img alt="Logo" class="w-24" src="/src/components/icons/source.png">
        <div>
          <h2 class="text-2xl font-bold uppercase">Vue Library</h2>
          <p class="text-slate-500">Лучшая онлайн библиотека</p>
        </div>
      </div>

      <ul class="flex items-center gap-10">
        <li class="flex items-center gap-3 text-slate-500 cursor-pointer hover:text-black">
          <span class="material-symbols-outlined ">favorite</span>
          <span>Закладки</span>
        </li>
        <li class="flex items-center gap-3 text-slate-500 cursor-pointer hover:text-black">
          <span class="material-symbols-outlined">account_circle</span>
          <span>Профиль</span>
        </li>
      </ul>
    </header>
</template>

<style scoped>

</style>