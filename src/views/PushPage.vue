<template>

<div>
      <!-- <div class="flex justify-between w-full px-4 py-1.5 text-sm font-medium text-left text-gray-900 bg-gray-200/50 focus:outline-none"><div class="space-x-2 flex flex-row py-0.5 items-center"><span class="w-5"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"></path></svg></span><p class="max-w-2xl truncate">Mobile Notifications</p></div>
      <button @click.prevent="cancelClick" type="button" class="bg-gray-150 py-2 px-4 border border-gray-290 rounded-md shadow-sm text-sm font-medium text-gray-600 hover:bg-gray-50 focus:outline-none">Home</button>
      </div> -->
      
      <div class="px-6 py-6"><div class="bg-white">
          <!-- 中间控件 begin -->
          <div>
              <div class="flex justify-between">
                <div><p class="text-base font-semibold text-gray-900">{{ pushTitle }}</p><p class="text-sm leading-5 text-gray-500">{{ pushDesc }}</p></div>
                <button @click="cancelClick" class="col-span-2 flex content-center justify-end py-2"><a rel="noopener noreferrer" class="btn font-semibold" title="Getting started guide">{{backStr}}</a></button>
              </div>
              
              <div class="container py-5">
                   <!-- 顶部二维码部分 -->
                   <div class="qrcode-section text-center">
                     <img :src="qrCodeUrl" alt="qrcode" class="qrcode" />
                     <img width="120px" @click="handleClick"  class="qrcode2" data-v-39bc96d3="" :src="appstoreurl" alt="Get Forms Mobile App from App Store">
                   </div>
                   <!-- 左右图文部分 -->
                   <div class="images-section flex">
                     <!-- 左侧部分 -->
                     <div class="image-box">
                       <img :src="leftImageUrl" alt="左侧图片" class="image" />
                       <p class="description">{{ appInstructions1 }}</p>
                     </div>
                     <!-- 右侧部分 -->
                     <div class="image-box">
                       <img :src="rightImageUrl" alt="右侧图片" class="image" />
                       <p class="description">{{ appInstructions2 }}</p>
                     </div>
                   </div>
              </div>
          </div>
          <!-- 中间控件 end -->
          <!-- 底部按钮 begin -->
          <div class="col-span-full">
              <div class="border-t border-gray-200 "><div class="flex items-center mt-4"><div class="flex justify-items-start">
                  <button @click.prevent="cancelClick" type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">{{backStr}}</button>
              </div><div class="flex justify-end flex-grow">
                  <!-- <button  @click="saveButtonClickPre" title="Save" type="button" class="ml-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none ">Save &amp; Continue</button> -->
              </div></div></div>
          </div>
          <!-- end -->
      </div></div>
  </div>
</template>
  
<script setup>
import { ref,onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFormStore } from '@/stores/form';
import { translateLocale } from '@/assets/language';

const router = useRouter()
const formStore = useFormStore();
const appstoreurl = 'https://image.addon.pipiform.com/appstoredownload.png';
const qrCodeUrl = 'https://image.addon.pipiform.com/appdown.png';
// const qrCodeDescription = 'Scan the QR code to download the app.';

const leftImageUrl = 'https://image.addon.pipiform.com/homepage.png';

const rightImageUrl = 'https://image.addon.pipiform.com/settings.png';
const downUrl = 'https://itunes.apple.com/us/app/id6468928038'

function handleClick(){
  window.open(downUrl, "_blank");
}
function cancelClick(){
  router.push({path:'/'})
}

const pushTitle = ref('')
const pushDesc = ref('')
const appInstructions1 = ref('')
const appInstructions2 = ref('')
const backStr = ref('')

function setLocalizing(){
  pushTitle.value = translate('Mobile (Push) Notifications')
  pushDesc.value = translate('Automatically send push notifications for Google Form responses with Forms Mobile App.')
  appInstructions1.value = translate('Open the App and go to the home page.')
  appInstructions2.value = translate('From the home page, select an item to view the form details. Click the settings button to access the settings page, and enable the push notification toggle.')
  backStr.value = translate('Back')
}
onMounted(()=>{
    setLocalizing()
});
function translate(key){
    return translateLocale(key, formStore.localeSelect)
}

</script>
  
<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

.qrcode {
  width: 150px;
  height: auto;
  margin: 0 auto;
}
.qrcode2{
  cursor: pointer;
  margin: 0 auto;
}

.images-section {
  display: flex;
  justify-content: space-between;
  /* background-color: red; */
}

.image-box {
  flex: 1;
  max-width: 50%;
  text-align: center;
  padding: 10px 10px 0 10px;
}

.image {
  width: 350px;
  height: auto; /* 高度自适应 */
  display: block;
  margin: 0 auto;
}

.description {
  margin-top: 10px;
  color: #6c757d; /* 淡灰色文案 */
  word-wrap: break-word;
  word-break: break-word;
}
</style>
  