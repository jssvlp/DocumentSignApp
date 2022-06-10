<template lang="">
    <div class="p-10 relative">
        <Overlay v-if="store.loading"/>
        <ToolsBar class="mb-3"/>
        <SelectFile v-if="!documentSelected" :show="documents.length > 0" :documents="documents" @selectDocument="setSelectedDocument"/>
        <div class="flex space-x-2">
            <Options class="shadow-lg"/>
            <Viewer class="" v-if="!store.loading" />
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
    store.loadingMessage = 'Descargando documento...';
    const files = await downloadFile(_document.IDDOCUMENT);
    //store.file = files[0].route;
    setFile( files[0].route);
    store.showQr = true;
    //store.file = "http://127.0.0.1:8000/storage/LPFnOMfu5B.pdf";
}

const addText = (text) => {
    store.addText(text);
}

const setType = (e) => {
    type.value = e
}

onMounted( async () =>{
    const route = useRoute();
    requestId.value = route.query.request
    store.documentData =  route.query.data
    store.company = route.query.company
    store.request = route.query.request

    documents.value =  await getDocuments( store.request, route.query.filter );

    store.setAllRequestDocuments(documents.value);

    store.loading = false
    
});


</script>
<style lang="">
    
</style>