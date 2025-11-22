<template>
    <!-- flex justify-end 右对齐 -->
    <div>
        <select @change="handleChange" v-model="langValue" id="m03oekpf" name="language" class="lang-arrow text-sm text-gray-700 pt-1.5 rounded-md border-gray-300 hover:bg-gray-50 cursor-pointer">
            <option v-for="(item, index) in langArray" :key="Object.keys(item)[0]" :value="Object.keys(item)[0]">{{ Object.values(item)[0] }}</option>
        </select>
    </div>
</template>

<script setup>
import { ref,watch,onMounted } from 'vue';
// import { ElButton,ElSelect } from 'element-plus';
// import 'element-plus/theme-chalk/base.css'
// import 'element-plus/theme-chalk/el-button.css'

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
// watch(langValue, (newVal, ) => {
//     emit('switchLanguage', newVal)
// });
const handleChange = (event) => {
//   console.log("选项切换为:", event.target.value);
  emit('switchLanguage', event.target.value)
  localStorage.setItem('form_selected_language', event.target.value);
};
onMounted(()=>{
    let language = localStorage.getItem('form_selected_language');  // 默认值为 'en'
    // console.log(language)
    if(language){
        changeLanguage(language)//设置当前的option
        emit('switchLanguage', language)// 通过UI更新
    }
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
}
defineExpose({
  changeLanguage
})

</script>