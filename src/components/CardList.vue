<script setup>
import Card from "@/components/card.vue";
import {inject} from "vue";

defineProps({
  items: Array,
})
const addToFavorite= inject('addToFavorite')


</script>
<template>
    <div v-auto-animate class="grid grid-cols-4 gap-5 ">
      <Card v-for="item in items"
            :key="item.id"
            :imageUrl="item.imageUrl "
            :title="item.title"
            :on-click-favorite = "() => addToFavorite(item)"
            :isFavorite="item.isFavorite">
      </Card>

    </div>
</template>

<style scoped>

</style>