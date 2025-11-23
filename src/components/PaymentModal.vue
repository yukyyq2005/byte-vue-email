<template>
    <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- 半透明蒙版背景 -->
      <div class="absolute inset-0" style="background-color: rgba(0, 0, 0, 0.5);"></div>
      <!-- 白色弹窗内容 -->
      <div class="relative bg-white rounded-lg shadow-xl" style="margin: 0 24px; width: calc(100% - 48px); max-width: 320px;">
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ paymentModalTitle }}</h3>
          <p class="text-sm text-gray-500 mb-6">{{ paymentModalDesc }}</p>
          <div class="flex flex-col space-y-3">
            <button @click="refreshPaymentStatus" class="relative w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md flex items-center justify-center space-x-2">
              <svg v-if="isRefreshing" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span>{{ refreshStatusStr }}</span>
            </button>
            <button @click="closeModal" class="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-md">
              {{ closeModalStr }}
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted,inject } from 'vue';
import { useFormStore } from '@/stores/form';
import { translateLocale } from '@/assets/language';
const showSucToast = inject('showSucToast-key')
const formStore = useFormStore();
const isVisible = ref(false);
const isRefreshing = ref(false);

const paymentModalTitle = ref('');
const paymentModalDesc = ref('');
const refreshStatusStr = ref('');
const closeModalStr = ref('');

function setLocalizing() {
    paymentModalTitle.value = translate('Payment Processing');
    paymentModalDesc.value = translate('After completing the payment, please click the button below to refresh your subscription status.');
    refreshStatusStr.value = translate('Refresh Payment Status');
    closeModalStr.value = translate('Close');
}

onMounted(() => {
    setLocalizing();
});

function translate(key) {
    return translateLocale(key, formStore.localeSelect);
}

function show() {
    setLocalizing();
    isVisible.value = true;
}

function closeModal() {
    isVisible.value = false;
}

async function refreshPaymentStatus() {
    isRefreshing.value = true;
    await formStore.refreshUserProStatus();
    isRefreshing.value = false;
    showSucToast(translate("Subscription status refreshed"));
    closeModal();
}

defineExpose({
    show,
    closeModal
});
</script>
