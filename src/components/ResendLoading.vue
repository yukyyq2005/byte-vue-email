<template>
    <div v-if="isVisible" style="position: fixed; z-index: 9999; inset: 16px; pointer-events: none;">
        <div class="go4109123758" style="left: 0px; right: 0px; display: flex; position: absolute; transition: 230ms cubic-bezier(0.21, 1.02, 0.73, 1); transform: translateY(0px); bottom: 0px; justify-content: center;">
            <div class="go2072408551" style="background: rgb(31, 41, 55); color: rgb(255, 255, 255); max-width: 600px; animation: 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) 0s 1 normal forwards running go3223188581;">
                <div class="flex justify-around">
                  <span class="inline-flex"><div class="inline-flex items-center px-4 py-2 text-base leading-6 font-medium rounded-md text-gray-200 transition ease-in-out durationx-150 ">
                      <svg class="animate-spin -ml-1 mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      <div class="text-sm font-semibold text-gray-200">{{ loadText }}</div></div>
                  </span>
                </div>
            </div>
        </div>
    </div>
    <div v-if="isVisible" class="fixed inset-0 bg-gray-50 bg-opacity-25 z-50"></div>
</template>
<script setup>
import { ref,watch } from 'vue';

const props = defineProps({
    loadText:String
});

const isVisible = ref(!!props.loadText); // 初始状态由 loadText 值决定

watch(
    () => props.loadText,
    (newValue) => {
        isVisible.value = !!newValue;
    }
);
</script>