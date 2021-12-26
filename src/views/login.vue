<script setup>
import { ref } from "vue";
import { login } from "../webservice/auth";
import { useRouter } from "vue-router";
const username = ref("");
const password = ref("");
const isShowPassword = ref(false);
const scale = ref("scale-0");
const router = useRouter();

setTimeout(() => {
  scale.value = "scale-100";
}, 100);

const handleLogin = async () => {
  try {
    await login({ username: username.value, password: password.value });
    router.replace("/");
  } catch (error) {
    alert(error);
  }
};
</script>

<template>
  <div
    class="h-screen w-full items-center content-center justify-center flex flex-col space-y-5"
  >
    <img
      src="@/assets/lamonganmegilan.png"
      :class="`w-1/6 ${scale} transform transition-transform duration-500`"
    />
    <div class="w-1/4 shadow-sm bg-gray-200 rounded-lg flex flex-row">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-7 w-7 my-auto mx-3"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
          clip-rule="evenodd"
        />
      </svg>
      <input
        type="text"
        placeholder="Username"
        v-model="username"
        class="focus:outline-none bg-transparent w-full rounded-lg p-2"
      />
    </div>
    <div class="w-1/4 shadow-sm bg-gray-200 rounded-lg flex flex-row">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-7 w-7 my-auto mx-3"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
          clip-rule="evenodd"
        />
      </svg>
      <input
        :type="isShowPassword ? 'text' : 'password'"
        placeholder="Password"
        v-model="password"
        class="focus:outline-none bg-transparent w-full rounded-lg p-2"
      />
      <button
        @click="isShowPassword = !isShowPassword"
        class="focus:outline-none"
      >
        <svg
          v-if="isShowPassword"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 my-auto mx-3 text-blue-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path
            fill-rule="evenodd"
            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 my-auto mx-3 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
            clip-rule="evenodd"
          />
          <path
            d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
          />
        </svg>
      </button>
    </div>
    <button
      @click="handleLogin()"
      class="p-2 text-center focus:outline-none bg-blue-400 text-white font-bold rounded-md w-1/4 shadow-md"
    >
      Login
    </button>
  </div>
</template>

<style></style>
