<template lang="">
    <img id="qr" v-bind:style="{left: store.position.x + '%', top: store.position.y + '%'}" :src="`https://chart.apis.google.com/chart?cht=qr&chs=${store.size}x${store.size}&chl=data`" alt="">
    <iframe class="rounded-lg" :src="`data:application/pdf;base64,${store.file}#toolbar=0&navpanes=0&scrollbar=0`" scrolling="no" width="100%" height="1200"></iframe>
</template>
<script setup>
import { useDocumentStore } from '../stores/document';

const store = useDocumentStore();
</script>
<style >
    iframe{
        border-radius: 10px;
        /* pointer-events: none; */
    }
    #qr{
        position: absolute;
    }
</style>