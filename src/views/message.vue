<script setup>
import { onMounted, ref } from "vue";
import { getUsername } from "../webservice/auth";
import { getMessageByOpponent, sendMessage } from "../webservice/message";
import { useRoute } from "vue-router";

const chats = ref([]);
const currentUsername = ref("");
const text = ref("");
const opponent = ref("");

onMounted(() => {
  opponent.value = useRoute().params.opponent;
  getChats();
  setInterval(() => {
    getChats();
  }, 5000);
  currentUsername.value = getUsername();
});

const getChats = async () => {
  const messages = await getMessageByOpponent(opponent.value);
  chats.value = messages.data;
};

const submitMessage = async () => {
  await sendMessage({ to: opponent.value, description: text.value });
  getChats();
  text.value = "";
};
</script>
<template>
  <div class="flex flex-col w-10/12 justify-end justify-self-end self-end">
    <div class="flex space-x-5 flex-row px-10 w-full p-5 fixed top-0 bg-white">
      <img
        src="../assets/lamonganmegilan.png"
        class="rounded-full w-12 my-auto h-12"
        alt=""
      />
      <h1 class="text-2xl my-auto font-semibold">{{ opponent }}</h1>
    </div>
    <div class="flex flex-col w-full p-10 space-y-5 bg-blue-200 h-full">
      <div
        v-for="(chat, i) in chats"
        :key="i"
        :class="`flex w-auto max-w-lg bg-white p-2 rounded-lg ${
          chat.to == currentUsername ? 'self-start' : 'self-end'
        }`"
      >
        {{ chat.description }}
      </div>
    </div>
    <form
      @submit.prevent="submitMessage"
      class="flex flex-row w-full bottom-0 bg-white justify-between px-5"
    >
      <div class="flex w-full space-x-5 p-3">
        <input
          v-model="text"
          type="text"
          class="bg-gray-200 rounded-lg focus:outline-none w-full p-3"
          id=""
        />
      </div>
      <button
        type="submit"
        class="bg-white border rounded-full my-auto border-blue-500 w-10 h-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mx-auto my-auto"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
          />
        </svg>
      </button>
    </form>
  </div>
</template>
