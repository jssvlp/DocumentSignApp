<template lang="">
    <div class="p-10 relative">
        <Overlay v-if="store.loading"/>
        <ToolsBar class="mb-3" @setType="setType"/>
        <SelectFile v-if="!documentSelected" :show="documents.length > 0" :documents="documents" @selectDocument="setSelectedDocument"/>
        <div class="flex space-x-2">
            <Options :type="type" class="shadow-lg"/>
            <Viewer class="shadow-lg" v-if="!loading && store.file" />
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
import { downloadFile, getDocuments} from '../api/softexpert.js'
import SelectFile from '../components/SelectFile.vue'
import { extractIdentifiers } from '@vue/compiler-core'

const store = useDocumentStore();
const type = ref('QR');
const documents = ref([]);
const documentSelected = ref(false);
const requestId = ref('');

const setFile = (file) => {
    store.setFile(file);
    store.loading = false;
}

const setPages = (pages) => {
    store.setPages = pages;
}

const setCurrentPage = (page) => {
    store.setCurrentPage = page;
}

const setSelectedDocument = async (_document) => {
    documentSelected.value = true;
    store.loading = true;
    store.document = _document

    const files = await downloadFile(_document.IDDOCUMENT);

    console.log( files[0])
    setFile( files[0].encode)
    
    createQr(requestId);
}

const addText = (text) => {
    store.addText(text);
}

const createQr = async (request) => {
    const url = `google.com/search?q=${request}`;
    var qr = await QRCode.toDataURL(url, {
        margin: 0,
        scale: 10
    });

    store.setQr(qr);
    
}

const setType = (e) => {
    console.log( e);
    type.value = e
}


onMounted( async () =>{
    const route = useRoute();
    requestId.value = route.query.request
    documents.value =  await getDocuments( requestId.value );

    store.setAllRequestDocuments(documents.value);

    // const files = await downloadFile(route.query.document);
    // setFile( files[0].encode)
    // createQr(route.query.request);
    store.loading = false
});


</script>
<style lang="">
    
</style>