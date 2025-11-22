<template>
  <div class="rounded-t-xl overflow-hidden p-10"><div class="flex justify-around"><span class="inline-flex"><div class="inline-flex items-center px-4 py-2 text-base leading-6 font-medium rounded-md text-gray-600 transition ease-in-out durationx-150 "><svg class="animate-spin -ml-1 mr-3 h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>{{ localLoadStr }}...</div></span></div></div>
</template>

<script setup>
import { onMounted,ref } from 'vue';
import { translateLocale } from '@/assets/language';
import { useFormStore } from '@/stores/form';

const formStore = useFormStore()
const props = defineProps({loadStr:String})
const localLoadStr = ref(props.loadStr); // 复制一份到本地状态

onMounted(() => {
  const licenseKeyInput = document.getElementById('licenseKey');
  let language = localStorage.getItem('form_selected_language');  // 默认值为 'en'
  const text = 'Loading, please wait'
  if(language){
    localLoadStr.value = translateLocale(text, language)
  }else if (licenseKeyInput && licenseKeyInput.value) {
    localLoadStr.value = translateLocale(text, licenseKeyInput.value)
  }else if(!localLoadStr.value){
    localLoadStr.value = text
  }
})
</script>