<script setup>
import { reactive } from "vue";
const sectionRoute = reactive([
  {
    label: "Laporan",
    route: "/laporan",
  },
  {
    label: "Tersimpan",
    route: "save",
  },
]);
</script>

<template>
  <div class="min-h-screen flex flex-row bg-gray-100">
    <div class="flex flex-col w-56 bg-white rounded-r-3xl overflow-hidden">
      <div class="flex items-center justify-center h-20 shadow-md">
        <h1 class="text-3xl uppercase text-indigo-500">Society Road</h1>
      </div>
      <ul class="flex flex-col py-4">
        <li v-for="(section, i) in sectionRoute" :key="i">
          <router-link
            to="#"
            class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
          >
            <span
              class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"
              ><i class="bx bx-home"></i
            ></span>
            <span class="text-sm font-medium">{{ section.label }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<style></style>
