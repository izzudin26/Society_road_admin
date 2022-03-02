<script setup>
import { defineProps, defineEmits } from "vue";
import {
  Dialog,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";

const props = defineProps({
  isShow: Boolean,
  name: String,
  address: String,
  text: String,
});

const emit = defineEmits(["close", "submit", "description"]);

const close = () => {
  emit("close");
  console.log(props.isShow);
};

const submitFeedback = () => {
  emit("close");
  emit("submit");
};

const changeDescriptionVal = (e) => {
  emit("description", e.target.value);
};
</script>
<template>
  <TransitionRoot appear :show="props.isShow">
    <Dialog as="div" :open="props.isShow" @close="close">
      <div
        class="inset-0 fixed flex z-10 bg-black bg-opacity-50 overflow-y-auto"
      >
        <div
          class="min-h-screen flex w-full justify-items-center mx-auto items-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="flex flex-col p-8 w-2/5 mx-auto bg-white rounded-lg">
              <DialogTitle as="h3" class="font-semibold text-xl text-blue-500"
                >Feedback</DialogTitle
              >
              <div class="flex flex-col space-y-5 mt-5">
                <div class="flex flex-col space-y-1">
                  <label for="username" class="font-medium">Username</label>
                  <input
                    :value="props.name"
                    type="text"
                    class="w-full rounded-md p-2 shadow focus:outline-none bg-gray-200"
                    name="username"
                    readonly
                    id=""
                  />
                </div>
                <div class="flex flex-col space-y-1">
                  <label for="address" class="font-medium"
                    >Alamat Laporan</label
                  >
                  <input
                    :value="props.address"
                    type="text"
                    class="w-full rounded-md p-2 shadow focus:outline-none bg-gray-200"
                    name="address"
                    readonly
                    id=""
                  />
                </div>
                <div class="flex flex-col space-y-1">
                  <label for="feedback" class="font-medium"
                    >Tulis Feedback</label
                  >
                  <textarea
                    @keyup="changeDescriptionVal"
                    type="text"
                    rows="3"
                    class="w-full rounded-md p-2 shadow focus:outline-none bg-gray-200"
                    name="feedback"
                    :value="props.text"
                  ></textarea>
                </div>
              </div>
              <div class="flex flex-row space-x-2 items-end justify-end">
                <button
                  @click="close"
                  class="p-2 rounded-lg bg-red-500 font-medium w-auto mt-5 text-white"
                >
                  Tutup
                </button>
                <button
                  @click="submitFeedback"
                  class="p-2 rounded-lg bg-green-500 font-medium w-auto mt-5 text-white"
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
