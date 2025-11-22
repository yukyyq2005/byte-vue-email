<style scoped>
.box {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 100%;
    text-align: center;
}

.message {
    display: inline-flex; /* 使用 inline-flex 布局 */
    align-items: center; /* 垂直居中对齐 */
    justify-content: center; /* 水平居中对齐 */
    padding: 10px 12px;
    background-color: rgba(37, 44, 65, 0.8);
    font-size: 14px;
}

.message svg {
    margin-right: 8px; /* 图标和文本之间的间距 */
}
</style>

<template>
   <div class="box">
        <span class="message">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#25BD4B">
                <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
            </svg>
            你好啊s你好啊s你好啊s你好啊s你好啊s你好啊s你好啊s你好啊s
        </span>
   </div>
</template>
