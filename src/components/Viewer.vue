<template lang="">
    <img id="qr" v-bind:style="{left: store.position.x + '%', top: store.position.y + '%'}" src="https://chart.apis.google.com/chart?cht=qr&chs=100x100&chl=data" alt="">
    <embed class="rounded-lg" :src="`data:application/pdf;base64,${store.file}#toolbar=0&navpanes=0&scrollbar=0`" width="100%" height="1000">
</template>
<script setup>
import { useDocumentStore } from '../stores/document';

const store = useDocumentStore();

const props = defineProps({
    location: {
        type: Object,
        default: {
            x: 32,
            y: 10
        }
    }
});

// const updateQrPosition = () => {
//     const qr = document.getElementById('qr');
//     const viewer = document.getElementsByClassName('pdfViewer')[0];
//     const viewerWidth = viewer.clientWidth;
//     const viewerHeight = viewer.clientHeight;
//     const qrWidth = qr.clientWidth;
//     const qrHeight = qr.clientHeight;
//     const x = viewerWidth / 2 - qrWidth / 2;
//     const y = viewerHeight / 2 - qrHeight / 2;
//     qr.style.left = `${x}px`;
//     qr.style.top = `${y}px`;
// }
</script>
<style >
    iframe{
        border-radius: 10px;
    }
    #qr{
        position: absolute;
    }
</style>