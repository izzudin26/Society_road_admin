<script setup>
import { reactive } from "vue";
// import { url } from "../../webservice/report";
const reports = reactive([
  {
    reportId: 17,
    address: "Jl. KH. Ahmad Dahlan No.14 - Tumenggungan - Kecamatan Lamongan",
    lang: "112.4152672",
    lat: "-7.1219543",
    city: "Kabupaten Lamongan",
    province: "Jawa Timur",
    description: "",
    thumbnail: "1dSZY5au5j2p-9-wJLcu21638859980178.jpg",
    user: "azidarmor",
    userId: "FCBICLlovNXUJIxlFqUBSLyKsZq1",
  },
]);
</script>

<template>
  <div
    class="h-screen w-11/12 items-center content-center justify-center flex flex-col"
  >
    <div class="bg-white shadow-md rounded-lg p-5 w-10/12 flex flex-col">
      <div class="flex flex-row p-5 justify-between">
        <div class="font-bold text-xl my-auto">Laporan Jalan Rusak</div>
        <div
          class="w-1/4 shadow-md justify-between bg-gray-200 rounded-md my-auto flex flex-row"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mx-3 my-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Cari"
            class="py-3 w-full text-sm bg-transparent block rounded-lg focus:outline-none"
            id=""
          />
        </div>
      </div>
      <div
        class="mx-auto p-5 w-11/12 shadow-lg rounded-md flex flex-row"
        v-for="(report, i) in reports"
        :key="i"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mx-auto my-auto"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clip-rule="evenodd"
          />
        </svg>
        <div class="text-lg font-semibold mx-5">{{ report.address }}</div>
      </div>
    </div>
  </div>
</template>

<style></style>
