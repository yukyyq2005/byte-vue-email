<!-- Toast组件 -->
<template>
  <transition name="toast">
    <div v-if="isShow"  class="toast1"  @mouseenter="pauseAutoDismiss" @mouseleave="resumeAutoDismiss">
      <div class="cont" style="text-align:center">{{ emailcontent }}</div>
    </div>
  </transition>

  <transition name="toast">
    <div v-if="isShowSuc"  class="toast2">
      <span class="message" @mouseenter="pauseAutoDismiss" @mouseleave="resumeAutoDismiss" >
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#25BD4B">
            <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
        </svg>
        {{ emailcontent }}
      </span>
    </div>  
  </transition>
</template>

<script setup>
import { ref } from "vue";
const emailcontent = ref('')

// const props = defineProps({
//   emailcontent:String
// });

const isShow = ref(false);
const isShowSuc = ref(false)
let timeoutId = null; 

function pauseAutoDismiss() {
  // console.log("pauseAutoDismiss")
  clearTimeout(timeoutId);
}
function resumeAutoDismiss() {
  // console.log("resumeAutoDismiss")
  startAutoDismiss();
}
function startAutoDismiss(){
  timeoutId = setTimeout(() => {
    hide()
  }, 3000);
}

const show = (content) => {
  emailcontent.value = content
  isShow.value = true;
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
  startAutoDismiss()
};

const showSuc = (content) => {
  emailcontent.value = content
  isShowSuc.value = true;
  clearTimeout(timeoutId)
  startAutoDismiss()
};

const hide = () => {
  isShow.value = false;
  isShowSuc.value = false;
};
defineExpose({
  show,
  showSuc
})
</script>

<style scoped>

/* 渐隐渐现效果 begin */
.toast-enter-active, .toast-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.8);
}
.toast-enter-to, .toast-leave-from {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}
/* 渐隐渐现效果 end */

.toast1 {
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    background: rgb(31,41,55);
    border-radius: 8px;
    padding: 10px;
    text-align: center;
    box-shadow: 0px 0px 2px #f1f1f1;
}
.cont{
    font-size: 14px;
    color: #fff;
    line-height: 20px;
}
/* .cont-success{
  display: flex;
  align-items: center;
  gap:10px;
} */

.toast2 {
  position: fixed;
  z-index: 99;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  width: 100%;
  text-align: center;
}
.message {
  display: inline-flex;
  align-items: center; 
  justify-content: center;
  border-radius: 8px;
  padding: 10px;
  background-color: rgb(31,41,55);
  font-size: 14px;
  color: #fff;
  gap: 5px;
  box-shadow: 0px 0px 12px #f1f1f1;
}
  
</style>
  
  