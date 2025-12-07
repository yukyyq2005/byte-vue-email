<template>
    <!-- flex justify-end 右对齐 -->
    <div class="relative inline-block">
        <select ref="selectRef" @change="handleChange" v-model="langValue" id="m03oekpf" name="language" class="bg-white lang-arrow text-sm text-gray-600 pt-1.5 rounded-md border-gray-300 hover:bg-gray-50 cursor-pointer">
            <option v-for="(item, index) in langArray" :key="Object.keys(item)[0]" :value="Object.keys(item)[0]">{{ Object.values(item)[0] }}</option>
        </select>
        <!-- 隐藏的 span 用于测量文本宽度 -->
        <span ref="measureRef" class="invisible absolute whitespace-nowrap text-sm" aria-hidden="true"></span>
    </div>
</template>

<script setup>
import { ref,watch,onMounted,nextTick } from 'vue';
// import { ElButton,ElSelect } from 'element-plus';
// import 'element-plus/theme-chalk/base.css'
// import 'element-plus/theme-chalk/el-button.css'

const selectRef = ref(null);
const measureRef = ref(null);

const langArray = ref([
  {"en": "English"},
  {"ja": "日本語"},
  {"zh_TW": "繁體中文"},
  {"zh_CN": "简体中文"},
  {"de": "Deutsch"},
  {"ar": "العربية"},
  {"da": "Dansk"},
  {"es": "español"},
  {"fr": "français"},
  {"hi": "हिन्दी"},
  {"it": "Italiano"},
  {"ko": "한국어"},
  {"nl": "Nederlands"},
  {"pl": "Polski"},
  {"pt": "Português"},
  {"ro": "Română"},
  {"ru": "Русский"},
  {"th": "ไทย"},
  {"tr": "Türkçe"}
]);

const langValue = ref('en')

const emit = defineEmits(['switchLanguage']);

// 根据当前选中的语言文本动态调整 select 宽度
function updateSelectWidth() {
    if (!selectRef.value || !measureRef.value) return;

    // 获取当前选中语言的显示文本
    const currentLang = langArray.value.find(item => Object.keys(item)[0] === langValue.value);
    if (!currentLang) return;

    const text = Object.values(currentLang)[0];
    measureRef.value.textContent = text;

    // 计算宽度：文本宽度 + padding + 下拉箭头空间
    const textWidth = measureRef.value.offsetWidth;
    const padding = 44; // 左右 padding + 下拉箭头空间
    selectRef.value.style.width = `${textWidth + padding}px`;
}
// watch(langValue, (newVal, ) => {
//     emit('switchLanguage', newVal)
// });
const handleChange = (event) => {
//   console.log("选项切换为:", event.target.value);
  emit('switchLanguage', event.target.value)
  localStorage.setItem('form_selected_language', event.target.value);
  nextTick(() => updateSelectWidth());
};
onMounted(()=>{
    let language = localStorage.getItem('form_selected_language');  // 默认值为 'en'
    // console.log(language)
    if(language){
        changeLanguage(language)//设置当前的option
        emit('switchLanguage', language)// 通过UI更新
    }
    // 初始化时设置宽度
    nextTick(() => updateSelectWidth());
})
function changeLanguage(language){
    if(!language){
        return
    }
    if(language == 'zh_HK'){
        language = 'zh_TW'
    }else if(language?.startsWith('pt')){
        language = 'pt'
    }
    let find = false
    for (const lang of langArray.value) {
        const code = Object.keys(lang)[0];
        if(language === code){
            find = true
        }
    }
    if(!find){
        // console.log('Not Found', language)
        return
    }
    langValue.value = language
    // console.log('change ', language)
    nextTick(() => updateSelectWidth());
}
defineExpose({
  changeLanguage
})

</script>