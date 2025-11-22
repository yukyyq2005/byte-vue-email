<template>
    <div id="page-1">
        <!-- <div class="flex justify-between w-full px-4 py-3 text-sm font-medium text-left text-gray-900 bg-gray-200/50 focus:outline-none"><div class="space-x-2 flex flex-row py-0.5"><span class="w-5"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"></path></svg></span><p class="max-w-2xl truncate">{{emailEdit}}</p></div></div> -->
        <div class="px-6 py-6">
            <!-- Notification Name -->
            <label class="block text-sm font-medium text-gray-700">{{notiName}}</label>
            <div class="mt-1"><input v-model="stored.notification_name" name="Rule Name" type="text" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-gray-300 rounded-md"></div>
            <p class="mt-2 text-xs text-gray-500">{{ notiDesc }}</p>
            
            <!-- line -->
            <br>
            <div class="border-t border-gray-200"></div>
            <br>

            <!-- Sender's Name flex space-x-5 flex-1 space-y-1 -->
            <div class="grid gap-x-5 grid-cols-3">
                <div class="col-span-1 space-y-1">
                    <label class="block text-sm font-medium text-gray-700">{{ senderName }}</label>
                    <input v-model="stored.sender_name" name="Sender Name" type="text" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-gray-300 rounded-md">
                </div>
                <div class="col-span-1 space-y-1">
                    <label class="block text-sm font-medium text-gray-700">{{ senderEmail }}</label>
                    <div class="block w-full pl-3 py-2 border border-gray-300 text-sm rounded-md bg-gray-50 text-gray-700 truncate">
                        {{ stored.sender_email_address || formStore.activeEmail }}
                    </div>
                </div>
                <div class="col-span-1 space-y-1">
                    <label class="block text-sm font-medium text-gray-700">{{ replyEmail }}</label>
                    <Popover class="relative shadow-sm rounded-md mt-1">
                        <PopoverButton @click="colorClick(1)" title="Add Variable Field" class="cursor-pointer absolute inset-y-0 right-1.5 flex mt-2 h-5 focus:outline-none z-50" aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:r4c:"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="size-5 text-gray-300 hover:text-gray-400 transition duration-200"><path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"></path></svg></PopoverButton>
                        <div class="block w-full space-y-0.5 border border-gray-300 py-0.5 px-0 text-sm rounded-md bg-white css-ywad9z-container">
                            <div class="flex ml-1 flex-wrap mr-7 items-center overflow-hidden">
                                <div class="ml-1 overflow-hidden" v-for="(item,index) in stored.reply_email_address_array" :key="index">
                                    <ButtonClose :btnContent="item.title" @closeButtonAction="closeAction(index)" />
                                </div>
                                <input class="flex-1" v-model="inputValue1" @input="checkComma" @blur="addConditions" @keydown.enter="addConditions" type="text" style="color: inherit; background: 0px center; opacity: 1; grid-area: 1 / 2 / auto / auto; font: inherit; min-width: 20px; border: 0px; margin: 0px; outline: 0px; padding: 5px;">
                            </div>
                        </div>
                        <PopoverColor @colorBtnClick="colorBtnClick1"  :colorArray="colorArray1" />
                    </Popover>
                </div>
            </div>

            <!-- line -->
            <br>
            <div class="border-t border-gray-200  mt-2"></div>
            <br>
            <!-- The Message -->
            <p class="text-base font-semibold text-gray-900">{{ theMsg }}</p>
            <p class="text-sm leading-5 text-gray-500">{{ theMsgDesc }}</p>
            <br>
            <!-- Email Subject -->
            <div class="flex space-x-5">
                <div class="flex-1" >
                    <label for="Email Subject" class="block text-sm font-medium text-gray-700">{{ emailSub }}</label>
                    <Popover class="relative shadow-sm rounded-md mt-1" data-headlessui-state="">
                        <PopoverButton @click="colorClick(2)" title="Add Variable Field" class="cursor-pointer absolute inset-y-0 right-1.5 flex items-center focus:outline-none" aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:r4c:"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="h-5 w-5 text-gray-300 hover:text-gray-400 transition duration-200"><path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"></path></svg></PopoverButton>
                        <!-- <div class="ml-1 overflow-hidden" v-for="(item,index) in dataArray2" :key="index">
                            <ButtonClose :btnContent="item" @closeButtonAction="closeAction(index)" />
                        </div> -->
                        <input v-model="stored.email_subject" ref="subjectInput"  id="Email Subject" name="Email Subject" type="text" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-gray-300 pr-8 rounded-md" value="">
                        <PopoverColor @colorBtnClick="colorBtnClick2"  :colorArray="colorArray2" />
                    </Popover>
                </div>
                <!-- <div class="editor-type space-y-1">
                    <label for="m04okuxd" class="block text-sm font-medium text-gray-700">Editor Type</label>
                    <select @change="handleSelectChange($event)" id="m04okuxd" name="emailEditor" class="yq-arrow block w-full pl-3 py-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm rounded-md">
                        <option value="" disabled >Choose template editor...</option>
                        <option value="WYSIWYG" selected>WYSIWYG</option>
                        <option value="HTML">HTML</option>
                    </select>
                </div> -->
            </div>
            <br>
            <!-- Email Body -->
             <div>
                <label class="block text-sm font-medium leading-5 text-gray-700 mb-1">{{ emailBody }}</label>
                <Popover class="relative">
                    <PopoverButton @click="colorClick(3)" class="email-markers rounded ring-1 ring-black ring-opacity-5 px-4 bg-gray-100 hover:bg-gray-200 group" id="headlessui-popover-button-:r4c:">
                        <span class="flex w-full justify-between items-center"><span class="flex min-w-0 items-center justify-between space-x-2"><span class="h-4 w-4 bg-green-100 rounded-full flex items-center justify-center" aria-hidden="true"><span class="h-2 w-2 bg-green-400 rounded-full"></span></span><span class="flex-1 flex flex-col min-w-0"><span class="text-gray-900 text-sm font-medium truncate">{{marker}}</span></span></span><svg class="ml-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" x-description="Heroicon name: solid/selector" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></span>
                    </PopoverButton>
                    <PopoverColor2 @colorBtnClick="colorBtnClick3" :colorArray="colorArray3"/>
                    <QuillEditor @selection-change="handleSelectionChange" ref="quillEditor" v-model:content="stored.email_body" contentType="html" theme="snow" :toolbar="toolbar" style="height: 250px;"/>
                    <input type="file" hidden accept="image/*" ref="fileInput"  @change="handerFileChange">
                </Popover>
             </div>

            <br>

            <div class="flex justify-between">
                <a @click.prevent="gotoDashboardClick" title="Discard changes and go to the dashboard" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none" href="/">{{cancelStr}}</a>
                <button @click="continueButtonClick" type="button" class="ml-6 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none ">{{ continueStr }}</button>
            </div>

        </div>
    </div>
</template>

<script setup>
// https://juejin.cn/post/7337592190330339391
import { ref, watch,inject,onMounted, onBeforeUnmount, provide, toRaw } from 'vue'
import { QuillEditor, Quill } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import ButtonClose from './ButtonClose.vue';
import PopoverColor from './PopoverColor.vue';
import PopoverColor2 from './PopoverColor2.vue';
import { fm_colors } from '@/assets/sharedConstants';
import { useFormStore } from '../stores/form';
import validator from 'validator';
import { useRoute, useRouter } from 'vue-router';
import { uploadBodyFile } from '@/assets/http';
import { stringToArray } from '@/assets/sharedConstants';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { translateLocale } from '@/assets/language';

const router = useRouter()
const emit = defineEmits(['pageContinue']);
const formStore = useFormStore();
const stored = formStore.serverData;
const toolbar = ref([['bold', 'italic', 'underline', 'strike'], ['link', 'image'], [{ 'list': 'ordered'}, { 'list': 'bullet' }], [{ 'header': [1, 2, 3, 4, 5, 6, false] }], [{ 'align': [] }], [{ 'direction': 'rtl' }], ['clean']]);
const quillEditor = ref(null);
const inputValue1 = ref('');
const colorArray1 = ref([])
const colorArray2 = ref([])
const colorArray3 = ref([])
const chooseSender = ref('')
const senderEmailArray = ref([chooseSender, ...formStore.formSenderEmailArray])
const savedSelection = ref({ index: 0, length: 0 });
const invalidEmailTip = inject('checkEmail-key');
const fmToastTip = inject('fmToastTip-key')
const fileInput = ref(null);  // 引用文件输入元素
const placeholderSrc = 'https://i.imgur.com/LGStkGJ.gif';
const subjectInput = ref(null)

const notiName = ref('')
const notiDesc = ref('')
const senderName = ref('')
const senderEmail = ref('')
const replyEmail = ref('')
const theMsg = ref('')
const theMsgDesc = ref('')
const emailSub = ref('')
const emailBody = ref('')
const emailBodyDesc = ref('')
const marker = ref('')
const cancelStr = ref('')
const continueStr = ref('')

function setLocalizing(){
    notiName.value = translate("Notification Name")
    notiDesc.value = translate('A brief description of the notification, which appears in the list of notifications.')
    senderName.value = translate("Sender's Name")
    senderEmail.value = translate("Sender's Email Address")
    chooseSender.value = translate("Choose Sender")
    replyEmail.value = translate("Reply-to Email Address")
    theMsg.value = translate('The Message')
    theMsgDesc.value = translate("Specify the subject line and body of your message.")
    emailSub.value = translate('Email Subject')
    emailBody.value = translate("Email Body")
    emailBodyDesc.value = translate('Enter email body here...')
    marker.value = translate('Markers')
    cancelStr.value = translate('Cancel')
    continueStr.value = translate('Continue')
}

onMounted(()=>{
    setLocalizing()
    const quill = quillEditor.value.getQuill();
    // quill.setOption("placeholder","ddd")
    quill.root.dataset.placeholder = emailBodyDesc.value
    quill.getModule('toolbar').addHandler('image', () => {
        console.log('插入了图片')
        fileInput.value.click();  // 触发文件选择对话框
    });
})

function translate(key){
    return translateLocale(key, formStore.localeSelect)
}
async function handerFileChange(event){
    const file = event.target.files[0];
    fileInput.value.value = ''
    const maxSizeMB = 4 * 1024 * 1024;
    if (file) {
        if (file.size > maxSizeMB) {
            fmToastTip('Please upload a file that is 4MB or smaller.')
            return
        }
        const uniqueId = `img_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
        console.log(uniqueId)
        const editor = quillEditor.value.getQuill();
        const range = editor.getSelection();
        editor.insertEmbed(range.index, 'image', placeholderSrc);
        const imgElements = editor.container.querySelectorAll(`img[src="${placeholderSrc}"]`);
        const imgElement = imgElements[imgElements.length - 1]; // 找到最新插入的占位符图片，通常是最后一个 img 元素
        if (imgElement) {
            imgElement.setAttribute('data-img-id', uniqueId);  // 设置唯一ID
            editor.setSelection(range.index + 1, 0);  // 设置光标位置到图片后面
            const imageUrl = await uploadBodyFile(file, formStore.fmAccessToken);
            if (imageUrl){
                const placeholderImage = editor.container.querySelector(`img[data-img-id="${uniqueId}"]`);
                if(placeholderImage){
                    placeholderImage.src = imageUrl;  // 替换占位图片的 src
                    placeholderImage.removeAttribute('data-img-id');  // 清除ID
                }
                // imgElement.src = imageUrl;// 替换占位图片
            }else{
                console.log('没有获取到图片url')
            }
        }
    }
}
// onBeforeUnmount(()=>{
    // console.log("清空数据")
    //QuillEditor控件比较奇怪，必须要在这里清理一下，不然新增的时候还会显示上一次编辑的内容，因为resetServerData里面的函数不起作用
    // const quill = quillEditor.value.getQuill(); // Get Quill instance
    // quill.setText('')
// })
function colorBtnClick2(index){
    const title2 = colorArray2.value[index]?.title
    if (title2){
        const cursorPos = subjectInput.value.selectionStart
        const frontValue = stored.email_subject.slice(0, cursorPos)
        let insertValue = `{{${title2}}}`
        if (frontValue.slice(-1).trim() !== ''){//如果最后一个字符串是空格
            insertValue = ' ' + insertValue
        }
        if(stored.email_subject.slice(cursorPos, cursorPos+1).trim() !== ''){
            insertValue = insertValue + ' '
        }
        stored.email_subject = frontValue + insertValue + stored.email_subject.slice(cursorPos)
    }
}
function colorBtnClick3(index){
    const title3 = colorArray3.value[index]?.title
    if (title3){
        let newTitle = `{{${title3}}}`
        const quill = quillEditor.value.getQuill(); // Get Quill instance
        let selection = quill.getSelection();
        if (!selection && savedSelection.value){
            selection = savedSelection.value;
        }
        if (selection) {
            const cursorPosition = selection.index;
            const textBeforeCursor = quill.getText(0, cursorPosition); // 获取光标前的文本内容
            const textAfterCursor = quill.getText(cursorPosition); // 获取光标后的文本内容
            if (!textAfterCursor.startsWith('\n\n')){
                newTitle = newTitle+"\n";
            }
            if (textBeforeCursor && !textBeforeCursor.endsWith('\n')) {
                newTitle = "\n"+newTitle;
            }
            quill.insertText(cursorPosition, newTitle);
            quill.setSelection(cursorPosition + newTitle.length);
            if(savedSelection.value){
                savedSelection.index = newTitle.length;
            }
        }    
        // setTimeout(()=>{
        //     quill.setSelection(quill.getLength(), 0);
        // },1)
    }
}
// color 弹窗
function colorClick(index){
    // console.log('colorClick' +index)
    let curArray = colorArray1
    let list = formStore.textFormList;
    if (index === 1){
        // isShowColorPover1.value = !isShowColorPover1.value;
        // isShowColorPover2.value = false
        // isShowMarker.value = false
    }else if (index === 2){
        curArray = colorArray2;
        list = formStore.allFormList;
        // isShowColorPover2.value = !isShowColorPover2.value;
        // isShowColorPover1.value = false
        // isShowMarker.value = false
    }else if (index === 3){
        curArray = colorArray3;
        list = formStore.emailBodyFormList;
        // isShowMarker.value = !isShowMarker.value;
        // isShowColorPover1.value = false
        // isShowColorPover2.value = false
    }
    curArray.value.splice(0, curArray.value.length);
    const colors = fm_colors;
    
    for(var i=0; i<list.length; i++){
        const item = list[i];
        const curColor = colors[i%colors.length];
        curArray.value.push({color:curColor, title:item.title, id:item.id});
    }
}
function closeAction(index){
  stored.reply_email_address_array.splice(index,1);
}
// Reply-to Email Address
function colorBtnClick1(index){
    const item = colorArray1.value[index]
    if (item && !stored.reply_email_address_array.some(old => old.id === item.id)){
        stored.reply_email_address_array.push({id:String(item.id), title:item.title})
    }
}
const checkComma = () => {
  if (inputValue1.value.includes(',')){
    addConditions()
  }
};
function addConditions(){
    const newItems = stringToArray(inputValue1.value)
    for(let value of newItems){
        if(value && !validator.isEmail(value)){
            invalidEmailTip(value);
        }else if (value && !stored.reply_email_address_array.some(old => old.title === value)){
            stored.reply_email_address_array.push({title:value});
        }
    }
    inputValue1.value = ''; 
}
// function handleSelectChange(event){
//     toolbar.value = [[]]
//     console.log('handleSelectChange')
// }
function handleSelectionChange(range){
    if (range?.range){
        savedSelection.value = range.range
    }
}
function continueButtonClick(){
    if(!stored.notification_name){
        fmToastTip('Please provide a name for your notification')
        return
    }
    if(!stored.sender_name){
        fmToastTip("Please enter the email Sender's name")
        return
    }
    if(!stored.email_subject){
        fmToastTip('Please enter the email subject line')
        return
    }
    emit('pageContinue');
}
function gotoDashboardClick(){
    router.push({path:'/'})
}
</script>

<style>
@import '../assets/email-body.css'
</style>


