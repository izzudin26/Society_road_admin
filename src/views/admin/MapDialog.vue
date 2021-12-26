<script setup>
import { defineEmits, ref, onMounted, defineProps } from "vue";
const emit = defineEmits(["close"]);
const props = defineProps(["latLang"]);
const scaleMap = ref("scale-0");

const closeDialog = () => {
  scaleMap.value = "scale-0";
  setTimeout(() => {
    emit("close");
  }, 550);
};
onMounted(() => {
  setTimeout(() => {
    scaleMap.value = "scale-100";
  }, 100);
});
</script>

<template>
  <div
    @click="closeDialog"
    class="absolute z-10 bg-black bg-opacity-50 w-full h-screen top-0 left-0 flex justify-center items-center"
  >
    <div
      class="w-1/2 h-2/3 bg-white rounded-xl transform transition duration-500"
      :class="scaleMap"
      id="map"
    >
      <button
        @click="closeDialog"
        class="absolute text-red-500 bg-white rounded-full -top-4 -right-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <iframe
        width="100%"
        class="rounded-xl"
        height="100%"
        id="gmap_canvas"
        :src="`https://www.google.com/maps?q=${props.latLang[0]},${props.latLang[1]}&output=embed`"
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
      ></iframe>
    </div>
  </div>
</template>
