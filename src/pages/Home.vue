<script setup>

import CardList from "@/components/CardList.vue";
import {onMounted, provide, ref, watch} from "vue";
import axios from "axios";
import debounce from "lodash.debounce";
const items = ref([]);
const searchQuery = ref('')

const onChangeSearchQuery = debounce(event => {
  searchQuery.value = event.target.value
},210)
watch(searchQuery, async () => {
  try {
    const { data } = await axios.get('https://df04c498bfa8727c.mokky.dev/items?title=*' + searchQuery.value + '*')
    items.value = data
  } catch (err) {
    alert(err)
  }
})
const addToFavorite = async (item) => {
  try {
    if(!item.isFavorite){
      const obj ={
        parentId: item.id,
        item
      };
      item.isFavorite = true;

      const { data } = await axios.post('https://df04c498bfa8727c.mokky.dev/favorites', obj)

      item.favoriteID = data.id;
    } else {
      item.isFavorite = false;
      await axios.delete(`https://df04c498bfa8727c.mokky.dev/favorites/${item.favoriteID}`)
      item.favoriteID = null;
    }
  } catch (err){
    alert(err)
  }
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
const fetchItems = async () => {
  try {
    const { data } = await axios.get('https://df04c498bfa8727c.mokky.dev/items')
    items.value = data.map(obj => ({
      ...obj,
      favoriteID: null,
      isFavorite: false
    }))
  } catch (err) {
    alert(err)
  }
};
onMounted(async () => {
  await fetchItems();
  await fetchFavorites();
})
provide("addToFavorite", addToFavorite)

</script>
<template>
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
</template>