

import { timeAgo } from "./sharedConstants"

export function resetStoreData(stored){
    // console.log('resetStoreData')
    stored.email_subject = ''
    stored.email_body = ''
    stored.to_recipients_array = []
    stored.pdf_file_name = ''
    stored.pdf_template = ''
    stored.send_condition_array = []
}
export function editFinish(formStore, data){
    const index = formStore.dashArray.findIndex(existingItem => existingItem.id == data.id);
    if (index !== -1) {
        // console.log('找到了 ' + data.id)
        const oldItem = formStore.dashArray[index]
        for (const key in data) {
            oldItem[key] = data[key]
        }
        const [replacedItem] = formStore.dashArray.splice(index, 1);
        formStore.dashArray.unshift(replacedItem);// 将对象添加到最前面
        for (const item of formStore.dashArray) {
            let time = null;
            if (item.update_time) {
                time = 'updated on ' + timeAgo(new Date(item.update_time))
            } else {
                time = 'created on ' + timeAgo(new Date(item.create_time))
            }
            // let type = transformNotiType(item)+' notification'
            item.time = time
            item.show_time = item.type+', '+time
        }
    }
}
export function transformNotiType(item){
    let type = 'Email'
    if (item.ext1){
        type = capitalizeFirstLetter(item.ext1)
        if(item.ext1 == 'sms'){
            type = 'SMS'
        }else if(item.ext1 == 'chat'){
            type = 'Google Chat'
        }
    }
    return type
}
function capitalizeFirstLetter(str) {
    if (str.length === 0) return str; // 如果字符串为空，返回空字符串
    return str.charAt(0).toUpperCase() + str.slice(1);
  }