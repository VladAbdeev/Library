<script setup>
import {onMounted, provide, reactive, ref, watch} from "vue";
import axios from "axios";

import Header from "@/components/header.vue";
import CardList from "@/components/CardList.vue";


const items = ref([]);
const searchQuery = ref('')

const onChangeSearchQuery = event => {
  searchQuery.value = event.target.value
}
const fetchItems = async () => {
  try {
    const { data } = await axios.get('https://df04c498bfa8727c.mokky.dev/items')
    items.value = data.map(obj => ({
      ...obj,
      isFavorite: false
    }))
  } catch (err) {
    alert(err)
  }
};

watch(searchQuery, async () => {
  try {
    const { data } = await axios.get('https://df04c498bfa8727c.mokky.dev/items?title=*' + searchQuery.value + '*')
    items.value = data
  } catch (err) {
    alert(err)
  }
})
onMounted(async () => {
  await fetchItems();
  await fetchFavorites();
})
const addToFavorite = async (item) => {
  item.isFavorite = !item.isFavorite;

}
const fetchFavorites = async () => {
  try {
    const { data : favorites } = await axios.get('https://df04c498bfa8727c.mokky.dev/favorites')

    items.value = items.value.map(item => {
      const favorite = favorites.find(favorite => favorite.parentId === item.id)

      if(!favorite){
        return item;
      }

      return {
        ...item,
        isFavorite: true,
        favoriteID: favorite.id
      }
    })
  } catch (err) {
    alert(err)
  }
};

provide('addToFavorite', addToFavorite)
</script>


<template>
  <div class="w-4/5 bg-white mx-auto rounded-xl shadow-xl mt-14">
    <Header></Header>
    <div class="p-10">
      <div class="flex justify-between">
        <h2 class="text-3xl font-bold mb-8 ">Все Книги</h2>
        <div class="relative">
          <span class="material-symbols-outlined absolute left-3 top-2">search</span>
          <input @input ='onChangeSearchQuery'
                 class="border border-gray-300 rounded-md py-2 pl-12 pr-4 outline-none focus:border-gray-500"
                 placeholder="Поиск...">
        </div>
      </div>

      <div class="mt-10">
        <CardList :items="items"></CardList>

      </div>
    </div>
  </div>
</template>

