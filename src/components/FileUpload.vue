<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useDocumentStore } from '../stores/document';
import {  appUrl  } from '../hosts';
import QRCode from 'qrcode'

const file = ref(null);
const store = useDocumentStore();

const createQr = async (url) => {
    var qr = await QRCode.toDataURL(url, {
        margin: 0,
        scale: 10
    });
    store.setQr(qr);
}

const handleFileUpload = async() => {
    // debugger;
    const url = URL.createObjectURL(file.value.files[0]);
    store.loadingMessage = 'Subiendo archivo...';
    store.showUploader = false;
    store.loading = true;

    await store.setFile(url);
    
    store.loading = false;
    store.showQr = true;

    //generate random string
    const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    store.document = { IDDOCUMENT:randomString, NMTITLE: file.value.files[0].name.replace('.pdf','') };

    const qrUrl = `${appUrl}/documents/validate?solicitud=${store.request}&documento=${randomString}`;
    createQr(qrUrl);
    store.validationUrl = qrUrl;
}
</script>

<template>
    <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
            <div class="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
                <div class="md:flex">
                    <div class="w-full">
                        <div class="p-3">
                            <div class="mb-2">
                                <div class="relative h-40 rounded-lg border-dashed border-2 border-gray-200 bg-white flex justify-center items-center hover:cursor-pointer">
                                    <div class="absolute">
                                        <div class="flex flex-col items-center "> <i class="fa fa-cloud-upload fa-3x text-gray-200"></i> <span class="block text-gray-400 font-normal">Arrastra un documento hasta aquí</span> <span class="block text-gray-400 font-normal">o</span> <span class="block text-blue-400 font-normal">búscalo en tus archivos</span> </div>
                                    </div> 
                                    <input ref="file"  v-on:change="handleFileUpload()" accept=".pdf"  type="file" class="h-full w-full opacity-0 cursor-pointer" name="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>