<script setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const sectionRoute = reactive([
  {
    label: "Laporan",
    route: "/",
  },
]);

const additionalAdminRoute = reactive([
  {
    label: "Pesan ke Survey",
    route: "/message/opponent/survey",
  },
  {
    label: "Pesan ke Kontraktor",
    route: "/message/opponent/kontraktor",
  },
]);

const role = computed(() => {
  return localStorage.getItem("role");
});

const logout = () => {
  localStorage.removeItem("token");
  router.replace("login");
};
</script>

<template>
  <div
    class="min-h-screen flex flex-row justify-end justify-items-end bg-gray-100"
  >
    <div
      class="flex flex-col w-1/6 fixed left-0 top-0 h-screen bg-white rounded-r-3xl overflow-hidden"
    >
      <div class="flex items-center justify-center h-20 shadow-md">
        <h1 class="text-xl uppercase text-indigo-500">Society Road</h1>
      </div>
      <ul class="flex flex-col py-4">
        <li v-for="(section, i) in sectionRoute" :key="i">
          <router-link
            :to="section.route"
            class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
          >
            <span
              class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"
              ><i class="bx bx-home"></i
            ></span>
            <span class="text-sm font-medium">{{ section.label }}</span>
          </router-link>
        </li>
        <template v-if="role == '1'">
          <li v-for="(section, i) in additionalAdminRoute" :key="i">
            <router-link
              :to="section.route"
              class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
              <span
                class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"
                ><i class="bx bx-home"></i
              ></span>
              <span class="text-sm font-medium">{{ section.label }}</span>
            </router-link>
          </li>
        </template>
        <li v-if="role != 1">
          <router-link
            to="/message/admin"
            class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
          >
            <span
              class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"
              ><i class="bx bx-home"></i
            ></span>
            <span class="text-sm font-medium">Pesan ke Admin</span>
          </router-link>
        </li>
        <button
          @click="logout"
          class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
        >
          <span
            class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"
            ><i class="bx bx-home"></i
          ></span>
          <span class="text-sm font-medium">Logout</span>
        </button>
      </ul>
    </div>
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<style></style>
