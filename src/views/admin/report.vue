<script setup>
import { onMounted, ref, computed, reactive } from "vue";
import {
  getCollectionAllReport,
  deleteReport,
  validationReport,
} from "../../webservice/report";
import { sendFeedback } from "../../webservice/feedback";
import MapDialog from "./MapDialog.vue";
import ImageDialog from "./imageDialog.vue";
import FeedbackDialog from "../../components/feedbackDialog.vue";

const dialogData = reactive({
  username: "",
  address: "",
  description: "",
  name: "",
});
const showFeedbackDialog = ref(false);
const search = ref("");
const reports = ref([]);
const showDialogMap = ref(false);
const isshowDialogImage = ref(false);
const selectedReport = ref(null);
const latLang = ref([]);
const role = ref(null);
const filterVerify = ref("");

const setShowDialog = (index) => {
  latLang.value = [reports.value[index].lat, reports.value[index].lang];
  showDialogMap.value = true;
};

onMounted(() => {
  role.value = localStorage.getItem("role");
  getData();
});

const getData = async () => {
  try {
    const datas = await getCollectionAllReport();
    if (role.value == "3") {
      reports.value = datas.data.filter((r) => r.verify != 0 && r.verify !== 2);
      console.log(reports.value);
    } else {
      reports.value = datas.data;
    }
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

const filterableData = computed(() => {
  const find = reports.value.filter((report) =>
    report.verify.toString().includes(filterVerify.value)
  );
  return find.filter((report) =>
    report.address.toLowerCase().includes(search.value.toLowerCase())
  );
});

const doValidation = async (index, indexOfAction) => {
  reports.value[index].verify = indexOfAction;
  await validationReport(reports.value[index].reportId, indexOfAction);
};

const checkStatus = (numberStatus) => {
  switch (numberStatus) {
    case 0:
      return "Belum divalidasi";

    case 1:
      return "Laporan Valid";

    case 2:
      return "Laporan tidak valid";

    case 3:
      return "Laporan diproses";

    case 4:
      return "Laporan Selesai";

    default:
      return "Belum divalidasi";
  }
};

const showDialogFeedback = (index) => {
  showFeedbackDialog.value = true;
  dialogData.username = filterableData.value[index].userId;
  dialogData.address = filterableData.value[index].address;
  dialogData.name = filterableData.value[index].user;
};

const mutateFeedback = (value) => {
  dialogData.description = value;
};

const submitFeedback = async () => {
  await sendFeedback({
    to: dialogData.username,
    feedback: dialogData.description,
  });
  dialogData.username = "";
  dialogData.name = "";
  dialogData.address = "";
  dialogData.description = "";
  alert("Berhasil mengirim feedback");
};
</script>

<template>
  <FeedbackDialog
    :isShow="showFeedbackDialog"
    :name="dialogData.name"
    :address="dialogData.address"
    :text="dialogData.description"
    @submit="submitFeedback"
    @close="showFeedbackDialog = false"
    @description="mutateFeedback"
  />
  <div class="w-10/12 flex flex-col overflow-y-scroll">
    <div
      class="bg-white shadow-md rounded-lg mx-auto my-5 p-5 w-10/12 flex flex-col"
    >
      <div class="font-bold text-xl my-auto">Laporan Jalan Rusak</div>

      <div class="flex flex-row p-5 justify-between flex-wrap">
        <div
          class="w-1/4 shadow-md justify-between bg-gray-200 rounded-md my-auto flex flex-row"
        >
          <select
            v-model="filterVerify"
            class="px-5 py-2 bg-transparent focus:outline-none"
          >
            <option value="">Semua</option>
            <option value="0" v-if="role != 3">Belum divalidasi</option>
            <option value="1">Laporan Valid</option>
            <option value="2" v-if="role != 3">Laporan Tidak Valid</option>
            <option value="3">Proses Perbaikan</option>
            <option value="4">Perbaikan Selesai</option>
          </select>
        </div>
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
          <span
            :class="[
              report.verify == 0
                ? 'text-black'
                : report.verify == 1
                ? 'text-green-500'
                : report.verify == 2
                ? 'text-red-500'
                : report.verify == 3
                ? 'text-yellow-600'
                : 'text-green-500',
              'font-semibold',
            ]"
          >
            {{ checkStatus(report.verify) }}
          </span>
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
            v-if="role == '1'"
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
          <template v-else-if="role == '2' && report.verify === 0">
            <button
              @click="doValidation(i, 1)"
              class="p-5 text-green-500 text-sm font-semibold transform hover:scale-105 flex flex-col"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 my-auto mx-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              Valid
            </button>
            <button
              @click="doValidation(i, 2)"
              class="p-5 text-red-500 text-sm font-semibold transform hover:scale-105 flex flex-col"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 my-auto mx-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                />
              </svg>
              Tidak Valid
            </button>
          </template>
          <template v-else-if="role == '3'">
            <button
              v-if="report.verify == 1"
              @click="doValidation(i, 3)"
              class="p-5 text-green-500 text-sm font-semibold transform hover:scale-105 flex my-auto flex-col"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mx-auto my-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fill-rule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clip-rule="evenodd"
                />
              </svg>
              Proses Laporan
            </button>
            <button
              v-if="report.verify == 3"
              @click="doValidation(i, 4)"
              class="p-5 text-green-700 text-sm font-semibold transform hover:scale-105 flex flex-col"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 my-auto mx-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              Selesai
            </button>
          </template>
          <button
            @click="showDialogFeedback(i)"
            v-if="role != 3"
            class="p-5 text-blue-500 text-sm font-semibold transform hover:scale-105 flex flex-col"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 my-auto mx-auto"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                clip-rule="evenodd"
              />
            </svg>
            Feedback
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
