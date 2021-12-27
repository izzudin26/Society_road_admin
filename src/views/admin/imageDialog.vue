<script setup>
import { getReport, url } from "../../webservice/report";
import {
  reactive,
  onMounted,
  computed,
  ref,
  defineProps,
  defineEmits,
} from "vue";
const props = defineProps(["reportId"]);
const emit = defineEmits(["close"]);
const scale = ref("scale-0")

const data = reactive({
  detail: {},
  images: [],
});
const selectedImage = ref(null);

const getData = async () => {
  try {
    const res = await getReport(props.reportId);
    data.detail = res.data;
    data.images = res.images;
    selectedImage.value = 0;
  } catch (error) {
    console.log(error);
  }
};

const networkImage = computed(() =>
  data.images.map((image) => {
    return `${url}/asset/${image.name}`;
  })
);

const close = () => {
  scale.value = "scale-0"
  setTimeout(() => {
    emit('close')
  }, 500)
}

onMounted(() => {
  getData();
  setTimeout(() => {
    scale.value = "scale-100"
  }, 100)
});
</script>
<template>
  <div
    class="w-screen h-screen top-0 left-0 absolute bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div
      class="bg-white rounded-lg w-2/3 h-2/3 flex flex-col justify-center transform transition duration-500 items-center"
      :class="scale"
    >
      <button
        @click="close"
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
      <div
        v-if="networkImage.length > 0"
        class="flex items-center justify-between"
      >
        <button
          v-if="selectedImage > 0"
          @click="selectedImage--"
          class="bg-gray-700 rounded-full text-white m-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-11 w-11"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <img :src="networkImage[selectedImage]" class="w-11/12 m-20" />
        <button
          v-if="selectedImage < networkImage.length - 1"
          @click="selectedImage++"
          class="bg-gray-700 rounded-full text-white m-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-11 w-11"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <svg
        v-else
        class="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-20"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  </div>
</template>
