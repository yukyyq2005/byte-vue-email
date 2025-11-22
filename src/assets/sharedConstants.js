// colors.js

import { useFormStore } from '@/stores/form';
import { transformNotiType } from './funUtils';
import { translateLocale } from './language';
export const fm_colors = ["indigo", "green", "blue", "pink", "yellow", "purple"];


const SELECT_FIELD = "Select field...";
const SELECT_CONDITION = "Select condition...";

// sharedConstants.js
export const FM_CONSTANTS = {
    SELECT_FIELD,
    SELECT_CONDITION,
    allOptionConditions:[SELECT_CONDITION, "Equals", "Any of", "None of", "Contains", "Does not contain", "Is Empty", "Is Not Empty", "Equal to ==", "Not equal to !=", "Greater than", "Lesser than", "(RegEx) Matches", "(RegEx) Does not match"],
    // 单选多选下拉，单选网格，多选网格
    optionConditions1:[SELECT_CONDITION, "Equals", "Any of", "None of", "Contains", "Does not contain", "Is Empty", "Is Not Empty", "(RegEx) Matches", "(RegEx) Does not match"],
    // 文件
    optionConditions2:[SELECT_CONDITION, "Is Empty", "Is Not Empty"],
    // 线性量变
    optionConditions3:[SELECT_CONDITION, "Is Empty", "Is Not Empty", "Equal to ==", "Not equal to !=", "Greater than", "Lesser than", "(RegEx) Matches", "(RegEx) Does not match"],
    CHOICE:"CHOICE"
  };
  
  export function getCommonOption(){
    // const fields = []
    // formContents.forEach(name =>{
    //     fields.push({id:1, type:"", name:name})
    // })
    // fields.push({id:1, type:"MULTIPLE_CHOICE", name:"单选"}, {id:2, type:"FILE_UPLOAD", name:"文件上传"})
    // const fields = formStore.allFormList;
    // console.log(fields)
    // list存储的是color弹窗选择的内容 filedSelectedIndex
    const commomItem = {selectedField:"0", selectedCondition:SELECT_CONDITION, optionConditions:FM_CONSTANTS.allOptionConditions,
     content:"", input:"", isRequired:true, showPlaceholder:true, isShowMoreBtn:false, isShowSelectValue:false,
     colorArray:[], list:[]}
     return commomItem
}

export function stringToArray(str) {
  return Array.from(new Set(
    str.trim().split(',').map(item => item.trim()).filter(item => item !== '')
  ));
}
export function isChoiceOption(id, optionFields){
  // console.log(optionFields);
  for (let element of optionFields){
    // console.log(element.id);
    // console.log(id);
    if (element.id == id){
      const type = element.type;
      // console.log('eee');
      if (type==="MULTIPLE_CHOICE" || type==="CHECKBOX" || type==="LIST" || type==="GRID" || type==="CHECKBOX_GRID"){
        return "CHOICE"
      }else if (type ===  "FILE_UPLOAD"){
        return type;
      }else if (type === "SCALE"){
        return type;
      }
    }
  }
  // console.log('ufaufu');
  return "";
}
export function handerField(type, el, list){
  if (type === FM_CONSTANTS.CHOICE){
    el.optionConditions = FM_CONSTANTS.optionConditions1;
    if (el.colorArray){
      el.colorArray.splice(0, el.colorArray.length);
    }else{
      el.colorArray = []
    }
    const colors = fm_colors;
    // console.log(list);
    for(var i=0; i<list.length; i++){
      const item = list[i];
      const curColor = colors[i%colors.length];
      el.colorArray.push({color:curColor, title:item.title, id:item.id});
    }
  }else if (type === "FILE_UPLOAD"){
    el.optionConditions = FM_CONSTANTS.optionConditions2;
  }else if (type === "SCALE"){
    el.optionConditions = FM_CONSTANTS.optionConditions3;
  }
}
export function handerCondition(type, el, list){
  const newSelectedCondition = el.selectedCondition;
  if(newSelectedCondition === 'Is Empty' || newSelectedCondition === 'Is Not Empty'){
      el.isRequired = false;
  }else if (type === FM_CONSTANTS.CHOICE){
      if(newSelectedCondition==='Any of' || newSelectedCondition==='None of'){
          el.isShowMoreBtn = true;
      }
      el.optionValues = [{id:"75ab8ef3-e4e0-4f23-a624-66820f045f8e", title:"Select value..."}, ...list];
      if (Array.isArray(el.optionValues) && el.optionValues.length>0){
        //如果有，但是在列表中没有找到
        if (el.selectedValue && !el.optionValues.some(old => old.id===el.selectedValue)){
          el.selectedValue = el.optionValues[0].id
          console.log('如果列表中没有找到value, 默认第一个')
        }else if (!el.selectedValue){
          el.selectedValue = el.optionValues[0].id
          console.log('如果value是未定义的话, 默认第一个')
        }
      }
      console.log('选择题')
  }
  if(newSelectedCondition==='Any of' || newSelectedCondition==='None of'){
    console.log('input用数组列表显示')
    el.isShowArray = true;
  }
}
export function handerDashArray(list){
  if (!list || list.length == 0){
    // console.log('首页没有数据')
    return
  }
  const formStore = useFormStore();
  formStore.dashArray.splice(0)
  const colors = fm_colors
  for(var i=0; i<list.length; i++){
      const item = list[i];
      item.color = colors[i%colors.length];
      let time = null;
      if(item.update_time){
          time = 'updated on ' + timeAgo(new Date(item.update_time))
      }else{
          time = 'created on ' + timeAgo(new Date(item.create_time))
      }
      item.type = transformNotiType(item) + ' notification'
      let newType = ''
      if(item.type.toLowerCase().includes('email')){
        newType = translateLocale("Email notification", formStore.localeSelect)
      }else if(item.type.toLowerCase().includes('webhook')){
        newType = translateLocale("Webhook notification", formStore.localeSelect)
      }else if(item.type.toLowerCase().includes('slack')){
        newType = translateLocale("Slack notification", formStore.localeSelect)
      }else if(item.type.toLowerCase().includes('sms')){
        newType = translateLocale("SMS notification", formStore.localeSelect)
      }else if(item.type.toLowerCase().includes('discord')){
        newType = translateLocale("Discord notification", formStore.localeSelect)
      }else if(item.type.toLowerCase().includes('google')){
        newType = translateLocale("Google Chat notification", formStore.localeSelect)
      }
      item.show_time = newType + ', ' + time
      if (item.notification_name){
          item.firstChar = item.notification_name[0]
      }
      item.time = time
      formStore.dashArray.push(item);
  }
}
export function timeAgo(date) {
  const now = new Date();
  const secondsAgo = Math.floor((now - date) / 1000);
  const intervals = {
      year: 31536000, // 60 * 60 * 24 * 365
      month: 2592000, // 60 * 60 * 24 * 30
      week: 604800, // 60 * 60 * 24 * 7
      day: 86400, // 60 * 60 * 24
      hour: 3600, // 60 * 60
      minute: 60,
      second: 1,
  };
  if (secondsAgo >= intervals.year) {
      // 如果超过一年，显示完整日期
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } else if (secondsAgo >= intervals.month) {
      // 超过1个月但不足1年，显示具体的月和日
      return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  }
  for (let interval in intervals) {
      const duration = intervals[interval];
      if (secondsAgo >= duration) {
          const count = Math.floor(secondsAgo / duration);
          return count === 1
              ? `${count} ${interval} ago`
              : `${count} ${interval}s ago`;
      }
  }
  return "just now";
}