<template>
    <!-- class="m-0.5 rounded shadow ring-1 ring-black ring-opacity-5" -->
    <div id="page-3">
        <!-- <div class="flex justify-between w-full px-4 py-3 text-sm font-medium text-left text-gray-900 bg-gray-200/50 focus:outline-none"><div class="space-x-2 flex flex-row py-0.5"><span class="w-5"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon"><path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"></path></svg></span><p class="max-w-2xl truncate">PDFs & Attachments</p></div></div> -->
        <div class="px-6 py-6">
            <p class="text-base font-semibold text-gray-900">{{ pdfAttach }}</p>
            <p class="text-sm leading-5 text-gray-500">{{ pdfDesc }}</p>
            <br>
            <!-- pdf start-->
            <div class="flex items-center"><input v-model="stored.is_generate_pdf_file" id="m0dv33pv" name="PDF" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-0 focus:ring-offset-0 border-gray-300 rounded" value="false"><label for="m0dv33pv" class="ml-2 block text-sm text-gray-600">{{generatePdf}}</label></div>
            <div v-show="stored.is_generate_pdf_file">
                <PdfTemplate/>
            </div>
            <!-- pdf end -->
            <br>
            <div class="col-span-full border-t border-gray-200 my-2"></div>
            <br>
            <p class="text-base font-semibold text-gray-900">{{ embedDrive }}</p>
            <p class="text-sm leading-5 text-gray-500">{{ embbedDesc }}</p>
            <br>
            <label class="block text-sm font-medium text-gray-700">{{ driveUrl }}</label>
            <p class="text-sm leading-5 text-gray-500">{{ driveDesc }}</p>
            <div class="mt-1">
                <input v-model="stored.google_drive_url" name="Files" type="text" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-gray-300 rounded-md" placeholder="e.g., https://drive.google.com/file/d/xyz/view">
            </div>

            <br>
            <div class="flex justify-between">
                <a @click.prevent="previousButtonClick" title="Go to the previous screen" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none" href="/">{{previousStr}}</a>
                <div class="flex justify-end flex-grow"><a @click.prevent="cancelButtonClick" title="Discard all changes" type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none" href="/">{{ cancelStr }}</a><button @click="saveButtonClick" title="Save Workflow" type="button" class="ml-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none " v-html="saveContinueStr"></button></div>
            </div>

        </div>
    </div>
</template>
<script setup>
import PdfTemplate from './PdfTemplate.vue';
import { ref,watch,onMounted } from 'vue';
import { useFormStore } from '@/stores/form';
import { useRouter } from 'vue-router';
import { translateLocale } from '@/assets/language';

const router = useRouter()
const formStore = useFormStore()
const stored = formStore.serverData;
const emit = defineEmits(['previousPage', 'saveButtonClick']);

const pdfAttach = ref('')
const pdfDesc = ref('')
const generatePdf = ref('')
const embedDrive = ref('')
const embbedDesc = ref('')
const driveDesc = ref('')
const driveUrl = ref('')
const previousStr = ref('')
const cancelStr = ref('')
const saveContinueStr = ref('')

function setLocalizing(){
    pdfAttach.value = translate('Create PDF Attachment')
    pdfDesc.value = translate('Would you like to convert the Google Form response into a PDF file?')
    generatePdf.value = translate('Generate PDF file')
    embedDrive.value = translate('Embed Google Drive Files')
    embbedDesc.value = translate('Would you like attach one or more files from Google Drive to the email message?')
    driveUrl.value = translate('Enter Drive URLs (comma separated)')
    driveDesc.value = translate('Ensure that this file is shared with anyone with the link')
    previousStr.value = translate('Previous')
    cancelStr.value = translate('Cancel')
    saveContinueStr.value = translate('Save &amp; Continue')
}
function translate(key){
    return translateLocale(key, formStore.localeSelect)
}
onMounted(()=>{
    setLocalizing()
})
function previousButtonClick(){
    emit('previousPage');
}
function cancelButtonClick(){
    router.push({path:'/'})
}
function saveButtonClick(){
    emit('saveButtonClick')
}
</script>