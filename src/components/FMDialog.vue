<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>
      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <div class="mt-2">
                      <p class="text-sm text-gray-800">{{ delTitle }}<br>{{ delDesc }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button"
                  class="inline-flex w-full justify-center rounded-md bg-red-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  @click="onClickOk">{{ okStr }}</button>
                <button type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  @click="open = false" ref="cancelButtonRef">{{ cancenStr }}</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
  
<script setup>
// https://tailwindui.com/components/application-ui/overlays/modal-dialogs
import { ref,onMounted } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useFormStore } from '@/stores/form';
import { translateLocale } from '@/assets/language';
const emit = defineEmits(['dialogClickOk'])
const formStore = useFormStore()
const open = ref(false)
const params = ref({})
const delTitle = ref('')
const delDesc = ref('')
const cancenStr = ref('')
const okStr = ref('')

onMounted(()=>{
    setLocalizing()
})
function setLocalizing(){
  // console.log(formStore.localeSelect)
  delTitle.value = translate('Are you sure you want to delete?')
  delDesc.value = translate('This action cannot be undone.')
  cancenStr.value = translate('Cancel')
  okStr.value = translate('OK')
}
function translate(key){
  return translateLocale(key, formStore.localeSelect)
}
function setIsOpen(value, item) {
  open.value = value
  params.value = item
}
function onClickOk(){
  emit('dialogClickOk', params.value)
  open.value = false
}

defineExpose({
  setIsOpen,setLocalizing
})
</script>