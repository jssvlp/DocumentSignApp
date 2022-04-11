<template lang="">
    <span v-if="store.allRequestDocuments.length > 0">Documentos disponibles:</span>
    <div class="flex  mb-2">
        <!-- <div @click="setType('QR')" class="flex bg-gray-200 rounded-md p-2 cursor-pointer">
            <QrcodeIcon class="h-5 w-5 text-primary"/> <span class="text-xs mt-1">Insertar QR</span>
        </div>
        <div @click="setType('Iniciales')" class="flex bg-gray-200 rounded-md p-2 ml-2 cursor-pointer">
            <UserGroupIcon class="h-5 w-5 text-primary"/> <span class="text-xs mt-1">Insertar iniciales firmantes</span>
        </div> -->
        <div>
            <ul class="flex space-x-2">
                <li class="bg-gray-200 p-2 rounded-md cursor-pointer" @click="changeCurrentDocument(document)" v-for="(document, index) in store.allRequestDocuments" :key="index">
                    <span class="text-xs uppercase font-bold">{{ document.NMTITLE}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import { QrcodeIcon } from '@heroicons/vue/solid'
import { UserGroupIcon } from '@heroicons/vue/solid'
import { useDocumentStore } from '../stores/document';
import { ref } from 'vue';

const selectedDocument = ref('');
const store = useDocumentStore();

const emit = defineEmits();

// const setType = (type) => {
//     emit('setType', type);
// }

const changeCurrentDocument = () => {
    emit('changeCurrentDocument', selectedDocument.value);
}
</script>
<style lang="">
    
</style>