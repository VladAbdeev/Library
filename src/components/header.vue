<script setup>
import {ref} from "vue";
import axios from "axios";
import 'animate.css';

const login = ref('');
const password = ref('');
const passwordConfirm = ref('');
const selectedFile = ref(null);
const send = ref(false);
function onFileSelected(event) {
  selectedFile.value = URL.createObjectURL(event.target.files[0]);
  HideFile()
  HideFile2()

  }
function HideFile() {
  var element = document.getElementById("file_changer");
  if(selectedFile.value != null || selectedFile.value != 'null' || selectedFile.value != 'undefined') {
    element.style.color = "transparent";
  }
}
const change_password = async () => {

}
function HideFile2() {
  var element = document.getElementById("file_change");
  if(selectedFile.value != null || selectedFile.value != 'null' || selectedFile.value != 'undefined') {
    element.style.color = "transparent";
  }
}
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash;
    hash = Math.abs(hash);
  }
  return hash.toString(16);
}

function unhashString(hex) {
  const str = Array.from(hex, (hex) => {
    return `00${parseInt(hex, 16).toString(2)}`.slice(-8);
  }).join('');
  const chars = [];
  for (let i = 0; i < str.length; i += 8) {
    const charCode = parseInt(str.slice(i, i + 8), 2);
    chars.push(String.fromCharCode(charCode));
  }
  return chars.join('');
}

const SendItems = async () => {
  const obj = {
    login: login.value,
    hash_password: hashString(password.value)
  }
  try {
    const {data} = await axios.post('https://df04c498bfa8727c.mokky.dev/register', obj)
    send.value = true;
  } catch (err) {
    alert(err)
  }
}

function openNewWindow() {
  var el = document.getElementsByClassName("login-page");
  el[0].style.display = "flex";
}

async function closeNewWindow() {
  var el = document.getElementsByClassName("login-page");
  if (login.value != '' && password.value != '' && passwordConfirm.value != '') {
    if (password.value === passwordConfirm.value) {
      alert("Логин: " + login.value + "\nПароль: " + password.value)
      SendItems();
      el[0].style.display = "none";
      swap_profile()
    } else {
      alert("Пароли не совпадают")
    }

  } else {
    alert("Заполните все поля")
  }
}
function swap_profile(){
  var el = document.getElementsByClassName("profile");
  var el2 = document.getElementsByClassName("finished-login");
  el[0].style.display = "none";
  el2[0].style.display = "flex";
}

</script>

<template>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        rel="stylesheet"/>
  <header class="flex justify-between border-b border-slate-300 px-10 py-4">
    <router-link to="/">
      <div class="flex items-center gap-4">
        <img alt="Logo" class="w-24" src="/src/components/icons/source.png">
        <div>
          <h2 class="text-2xl font-bold uppercase">Vue Library</h2>
          <p class="text-slate-500">Лучшая онлайн библиотека</p>
        </div>
      </div>
    </router-link>
    <div class="login-page">
      <div
          class="animate__animated animate__fadeInRight absolute bg-white border border-slate-900 shadow-2xl  rounded-xl p-2 h-36 my-0 mr-4 w-[500px]">
        <div class="relative w-24 h-24 mt-2 rounded-full border border-slate-500">
          <div>
            <img
                v-if="selectedFile === null || selectedFile === undefined"
                class="w-12 mt-5 mx-6"
                src="/Users/vladabdeev/WebstormProjects/adsfadsfafds/src/components/icons/Camera.svg"/>
            <img
                v-else-if="selectedFile != null && selectedFile != undefined"
                :src="selectedFile"
                class="w-24 h-24 mt rounded-full border border-slate-500"/>
              <label id="file_change"for="file_changer"
                     class=" cursor-pointer text-xs text-slate-400 hover:text-slate-600 absolute top-5/6 left-1/2 transform -translate-x-1/2 translate-y-5/6 mt-8"
              >Добавить
              </label>
              <input
                  id="file_changer"
                  type="file"
                  class="invisible"
                  @change="onFileSelected"
                  accept="image/*"
              />
            </div>
        </div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <input
              v-model="login"
              class="border border-gray-300 h-8 rounded-md my-0.5 py-2 pl-4 pr-4 outline-none focus:border-gray-500"
              placeholder="Логин" type="text">
          <input
              v-model="password"
              class="border border-gray-300 h-8 rounded-md my-0.5 py-2 pl-4 pr-4 outline-none focus:border-gray-500"
              placeholder="Пароль" type="password">
          <input
              v-model="passwordConfirm"
              class="border border-gray-300 h-8 rounded-md my-0.5 text-base py-2 pl-4 pr-4 outline-none focus:border-gray-500"
              placeholder="Повторите пароль" type="password">
        </div>
        <div class="ml-4 absolute top-1/2 left-4/5 transform translate-x-96 -translate-y-1/2 mr-8 ">
          <img class="mt-8 mr-8 h-12 w-12"
               src="/Users/vladabdeev/WebstormProjects/adsfadsfafds/src/components/icons/person-arms-up.svg">
        </div>
        <div class="-ml-3 mt-0.5 absolute top-1/4 left-4/5 transform translate-x-96 -translate-y-1/4 mr-4 ">
          <button class="border border-gray-300 bg-slate-50 rounded-md p-1 hover:border-gray-500"
                  @click="closeNewWindow">Продолжить
          </button>
        </div>
      </div>
    </div>

    <ul class="flex items-center gap-10">
      <router-link to="/favorites">
        <li class="flex items-center gap-3 text-slate-500 cursor-pointer hover:text-black">
          <span class="material-symbols-outlined ">favorite</span>
          <span>Закладки</span>
        </li>
      </router-link>

      <div class="profile">
        <li class="flex items-center gap-3 text-slate-500 cursor-pointer hover:text-black">
          <span class="material-symbols-outlined">account_circle</span>
          <span @click="openNewWindow">Профиль</span>
        </li>
      </div>
      <div class="finished-login">
        <li class="flex items-center gap-3 text-slate-500 cursor-pointer hover:text-black">
          <img
              :src="selectedFile"
              class="w-10 h-10 mt rounded-full border border-slate-300 hover:border-slate-500"/>
          <span >{{ login }}</span>
        </li>

      </div>
      <div class="hidden">
        <p>Ваш логин: {{ login }}</p>
        <button @click="change_password" class="border border-gray-300 bg-slate-50 rounded-md p-1 hover:border-gray-500">Сменить пароль</button>
      </div>

    </ul>
  </header>
</template>

<style scoped>
.login-page {
  display: none;
}
.profile{
  display: flex;
}
.finished-login{
  display: none;
}
</style>