<template lang="">
    <div class="p-10 relative">
        <Overlay v-if="store.loading"/>
        <ToolsBar class="mb-3"/>
        <SelectFile v-if="!documentSelected" :show="documents.length > 0" :documents="documents" @selectDocument="setSelectedDocument"/>
        <div class="flex space-x-2">
            <Options class="shadow-lg"/>
            <Viewer class="shadow-lg" v-if="!store.loading && store.file" />
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

    const files = await downloadFile(_document.IDDOCUMENT);

    // store.file = files[0].encode;
    setFile( files[0].encode);
}

const addText = (text) => {
    store.addText(text);
}

const filterDocuments = (documents, filters) => {
    const _filters = filters.split(',');
    console.log(_filters)

    return documents.filter(document => {
        return _filters.some(filter => {
            return document.IDCATEGORY.includes(filter);
        });
    });
    const _documents = documents.filter(document => {
        return document.NMTITLE.toLowerCase().includes(filter.toLowerCase());
    });

    return _documents;
}

const getData = ( data ) =>{
    const splited = data.split(',');
    var fields = [];

    splited.map( field => {
        const current = field.split(':')
        const obj = { "key" : current[0],"value" : current[1] }
        fields.push( obj )
    });

    //ecode to base 64  
    return btoa(unescape(encodeURIComponent(JSON.stringify(fields))));
    
}

const setType = (e) => {
    type.value = e
}


onMounted( async () =>{
    const route = useRoute();
    requestId.value = route.query.request
    store.documentData = getData( route.query.data )
    store.company = route.query.company
    store.request = route.query.request
    
    const _documents =  await getDocuments( requestId.value );

    documents.value = filterDocuments(_documents, route.query.filter);

    store.setAllRequestDocuments(documents.value);

    // const files = await downloadFile(route.query.document);
    // setFile( files[0].encode)
    // const url = `http://localhost:3000/documents/${company}/validate?`;
    // createQr( url );
    store.loading = false
});


</script>
<style lang="">
    
</style>