<script setup>
import axios from "axios";
import {inject, onMounted, ref} from "vue";
import CardList from "@/components/CardList.vue";

const favorites = ref([]);
const addToFavorite= inject('addToFavorite')
onMounted(async () => {
  try {
    const { data } = await axios.get('https://df04c498bfa8727c.mokky.dev/favorites')

    favorites.value = data.map(obj => obj.item);
  } catch (err) {
    alert(err)
  }
})
</script>

<template>
  <h2 class="text-3xl font-bold mb-8 " v-auto-animate>Мои закладки</h2>
  <CardList :items="favorites"></CardList>
</template>
