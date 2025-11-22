<style>
.go2072408551 {
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
}
@keyframes go3223188581 {
  0% {
    transform: translate3d(0, -200%, 0) scale(0.6);
    opacity: 0.5;
  }
  100% {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
    visibility: visible;
  }
}
@keyframes go502128938 {
  0% {
    transform: translate3d(0, 0, -1px) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, -150%, -1px) scale(0.6);
    opacity: 0;
    visibility: hidden;
  }
}
@keyframes go502128939 {
  0% {
    transform: translate3d(0, 0, -1px) scale(1);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, -150%, -1px) scale(0.6);
    opacity: 0;
    /* 20250528 不加的话，第一次会导致他toast后面的内容无法点击*/
    visibility: hidden;
  }
}
</style>

<template>
    <div style="position: fixed; z-index: 9999; inset: 16px; pointer-events: none;">
      <div class="go41091237583" style="left: 0px; right: 0px; display: flex; position: absolute; transition: 230ms cubic-bezier(0.21, 1.02, 0.73, 1); transform: translateY(0px); bottom: 0px; justify-content: center;">
        <div class="go2072408551" 
          @mouseenter="pauseAutoDismiss" @mouseleave="resumeAutoDismiss" 
          @animationend="handleAnimationEnd"
          :style="{
          background: 'rgb(31, 41, 55)',
          color: 'rgb(255, 255, 255)',
          maxWidth: '600px',
          animation: `0.35s cubic-bezier(0.21, 1.02, 0.73, 1) 0s 1 normal forwards running ${animateString}`,
          }">
          <div class="text-sm font-semibold bg-gray-800 p-1.5"><div v-html="toastText"></div></div>
          <div @click="closeButtonClick" class="ml-4 focus:outline-none cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" class="h-4 w-4"><path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"></path></svg></div>
      </div>
    </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
let dismissTimeout = null;
const animateString = ref('go502128939')
const toastText = ref('')

function startAutoDismiss() {
  dismissTimeout = setTimeout(() => {
    animateString.value = 'go502128938';
  }, 7000);
}
function pauseAutoDismiss() {
  clearTimeout(dismissTimeout);
}
function resumeAutoDismiss() {
  if(toastText.value){
    startAutoDismiss();
  }
}
function handleAnimationEnd(event){
  if (event.animationName === 'go502128938') {
    toastText.value = ''
  }else if (event.animationName === 'go502128939') {
    toastText.value = ''
  }
}
function closeButtonClick(){
  clearTimeout(dismissTimeout);
  animateString.value = 'go502128938'
}
const show = (content) => {
  if(!content?.trim()){
    return
  }
  stopToast()

  setTimeout(() => {
    animateString.value = 'go3223188581';
    toastText.value = content
    resumeAutoDismiss()
  }, 50);
};
function stopToast(){
  clearTimeout(dismissTimeout);
  animateString.value = 'go502128939'
}
defineExpose({
    show,
    stopToast
})
</script>
