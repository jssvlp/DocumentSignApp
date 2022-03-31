<template lang="">
    <div class="p-10 relative">
        <Overlay v-if="loading"/>
        <ToolsBar class="mb-3"/>
        <div class="flex space-x-2">
            <Options class="shadow-lg"/>
            <Viewer class="shadow-lg" v-if="!loading" />
        </div>

    </div>
</template>
<script setup>
import Viewer from '../components/Viewer.vue'
import ToolsBar from '../components/ToolsBar.vue'
import Options from '../components/Options.vue'
import Overlay from '../components/Overlay.vue'
import axios from 'axios'
import { useDocumentStore} from '../stores/document'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import QRCode from 'qrcode'
import { downloadFile} from '../api/softexpert.js'

const document = useDocumentStore();
const loading = ref(true);

const setFile = (file) => {
    document.setFile(file);
    loading.value = false;
}

const setPages = (pages) => {
    document.setPages = pages;
}

const setCurrentPage = (page) => {
    document.setCurrentPage = page;
}
const addText = (text) => {
    document.addText(text);
}

const createQr = async (request) => {
    const url = `google.com/search?q=${request}`;
    var qr = await QRCode.toDataURL(url, {
        margin: 0,
        scale: 10
    });

    document.setQr(qr);
    
}

onMounted( async () =>{
    const route = useRoute();
    const files = await downloadFile(route.query.document);
    setFile( files[0].encode)
    createQr(route.query.request);
    loading.value = false
});


</script>
<style lang="">
    
</style>