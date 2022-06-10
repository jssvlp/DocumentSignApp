<template>
    <div class="p-10">
        <div class="logo flex justify-center">
            <img height="250" width="250" src="https://www.mitur.gob.do/wp-content/uploads/2020/11/LogoMitur-2.svg" alt="">
        </div>
        <div class="flex bg-success p-3 rounded-lg mb-5 mt-10 justify-center">
            <span class="font-bold text-white text-2xl">¡Datos validados correctamente!</span>
        </div>
        
        <div class="shadow-lg p-10 rounded-lg">
            <div class=" mt-3 mb-4">
                <span class="text-xl font-semibold mb-2">Información del documento</span>
                <br>
                <span class="text-sm text-gray-400">
                    Aquí encontrarás los datos del documeento
                </span>
            </div>
            <div class="divider"></div>
            <div class="grid md:grid-cols-3 gap-3 grid-cols-1 mb-10">    
                <div v-for="(field, index) in fields" :key="index">
                    <div class="mt-4">
                        <span class="text-sm text-gray-400 mt-1">{{field.key}}</span>
                        <br>
                        <span class="text-xl mt-1"> {{field.value}}</span>
                    </div>
                </div>
            </div>
            <!-- <span class="text-gray-400">Documento</span>
            <div class="rounded-md border-2 p-2 flex justify-between">
                <div class="flex">
                    <PaperClipIcon class="h-5 w-5 mt-1 text-gray-500"/> <span>Certificación de no Objeción</span>
                </div>
                <span class="text-blue-400 cursor-pointer">Descargar</span>
            </div> -->
        </div>
    </div>
</template>

<script setup>
import { onMounted } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { getDocumentData } from '../api/softexpert';
import { PaperClipIcon } from '@heroicons/vue/solid';

const route = useRoute();
const fields = ref([]);


onMounted(async () => {
    const { documento, solicitud } = route.query;

    console.log(documento, solicitud);
    return
    
    const { data } = await getDocumentData(documento, solicitud);

    const parsed = JSON.parse(data.data);

    console.log( parsed )

   fields.value = parsed
    
});
</script>