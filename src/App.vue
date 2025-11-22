<style>

</style>

<template>

  <ResendToast ref="resendToast"/>
  <loading v-if="isShowLoading" v-model:active="isLoading" :width="55" :height="55"/>
  <!-- https://github.com/ankurk91/vue-loading-overlay -->

  <!-- <AIStudioPage/> -->
  <header>
  
  </header>

  

  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { ref,provide } from "vue";
import FMToast from './components/FMToast.vue';
import { useFormStore } from './stores/form';
import loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import TestDemo from "./components/TestDemo.vue";
import AIStudioPage from "./views/AIStudioPage.vue";
import ResendToast from "./components/ResendToast.vue";
// import LimitExceed from "./components/LimitExceed.vue";
provide('checkEmail-key', checkEmail);
provide('startLoading-key', startLoading);
provide('endLoading-key', endLoading);
provide('showSucToast-key', onShowSucToast);
provide('fmToastTip-key', fmToastTip);

const isLoading = ref(true)
const isShowLoading = ref(false)
const formStore = useFormStore();
// const myToast = ref(null)
const resendToast = ref(null)

function checkEmail(email){
  resendToast.value.show(email + " is an invalid Email")
}
function fmToastTip(content){
  resendToast.value.show(content)
}
function startLoading(){
    isShowLoading.value = true
}
function endLoading(){
  isShowLoading.value = false
}
function onShowSucToast(msg){
  if (!msg){
    msg = 'Workflow saved successfully'
  }
  resendToast.value.show(msg)
}

</script>
