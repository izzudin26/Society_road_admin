<script setup>
import { onMounted, ref, computed } from "vue";
import { getCollectionAllReport, deleteReport } from "../../webservice/report";
import MapDialog from "./MapDialog.vue";
import ImageDialog from "./imageDialog.vue";

const search = ref("");
const reports = ref([]);
const showDialogMap = ref(false);
const isshowDialogImage = ref(false);
const selectedReport = ref(null);
const latLang = ref([]);

const setShowDialog = (index) => {
  latLang.value = [reports.value[index].lat, reports.value[index].lang];
  showDialogMap.value = true;
};

onMounted(() => {
  getData();
});

const getData = async () => {
  try {
    const datas = await getCollectionAllReport();
    reports.value = datas.data;
  } catch (error) {
    alert(error);
  }
};

const showDialogImage = (index) => {
  selectedReport.value = reports.value[index].reportId;
  isshowDialogImage.value = true;
};

const closeDialogImage = () => {
  selectedReport.value = null;
  isshowDialogImage.value = false;
};

const closeDialogMap = () => {
  showDialogMap.value = false;
};

const deletes = async (index) => {
  await deleteReport(reports.value[index].reportId);
  reports.value.splice(index, 1);
};

const filterableData = computed(() =>
  reports.value.filter((report) =>
    report.address.toLowerCase().includes(search.value.toLowerCase())
  )
);
</script>

<template>
  <div
    class="h-screen w-11/12 items-center content-center justify-center flex flex-col"
  >
    <div class="bg-white shadow-md rounded-lg p-5 w-10/12 flex flex-col">
      <div class="flex flex-row p-5 justify-between flex-wrap">
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
            v-model="search"
            placeholder="Cari"
            class="py-3 w-full text-sm bg-transparent block rounded-lg focus:outline-none"
            id=""
          />
        </div>
      </div>
      <div
        class="mx-auto p-5 shadow-lg rounded-md flex flex-col lg:flex-row w-full justify-between"
        v-for="(report, i) in filterableData"
        :key="i"
      >
        <div class="text-md font-semibold mx-5 my-auto flex flex-wrap flex-col">
          {{ report.address }}
          <span class="text-sm">
            {{ report.city }} - {{ report.province }}</span
          >
        </div>
        <div class="flex flex-row flex-wrap lg:flex-nowrap">
          <button
            id="showmap"
            @click="setShowDialog(i)"
            class="p-5 text-blue-600 text-xs transform hover:scale-105 font-bold flex flex-col"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mx-auto my-auto"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z"
                clip-rule="evenodd"
              />
            </svg>
            Maps
          </button>
          <button
            id="showimage"
            @click="showDialogImage(i)"
            class="p-5 text-green-600 text-xs transform hover:scale-105 font-bold flex flex-col"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mx-auto my-auto"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clip-rule="evenodd"
              />
            </svg>
            Photo
          </button>
          <button
            @click="deletes(i)"
            class="p-5 text-red-500 text-xs transform hover:scale-105 font-bold flex flex-col"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 my-auto mx-auto"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            Hapus
          </button>
        </div>
      </div>
    </div>
    <MapDialog
      v-if="showDialogMap"
      :latLang="latLang"
      @close="closeDialogMap"
    />
    <ImageDialog
      v-if="isshowDialogImage"
      @close="closeDialogImage"
      :reportId="selectedReport"
    />
  </div>
</template>

<style></style>
