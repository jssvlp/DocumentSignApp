<template>
    <div class="p-10">
        <div class="logo flex justify-center">
            <img height="250" width="250" src="https://www.mitur.gob.do/wp-content/uploads/2020/11/LogoMitur-2.svg" alt="">
        </div>
        <div v-if="data" class="flex bg-success p-3 rounded-lg mb-5 mt-10 justify-center">
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
            <div class="grid md:grid-cols-3 gap-3 grid-cols-1 mb-10" v-if="data">
                <div class="mt-4">
                    <span class="text-sm text-gray-400 mt-1">Número de solicitud</span>
                    <br>
                    <span class="text-xl mt-1"> {{data.solicitud}}</span>
                </div>
                <div class="mt-4">
                    <span class="text-sm text-gray-400 mt-1">Nombre del proyecto</span>
                    <br>
                    <span class="text-xl mt-1"> {{data.proyecto}}</span>
                </div>
                <div class="mt-4">
                    <span class="text-sm text-gray-400 mt-1">Respuesta otorgada</span>
                    <br>
                    <span class="text-xl mt-1"> {{data.respuestaOtorgada}}</span>
                </div>
                <div class="mt-4">
                    <span class="text-sm text-gray-400 mt-1">Fecha entrega</span>
                    <br>
                    <span class="text-xl mt-1"> {{data.fechaEntrega}}</span>
                </div>
                <div class="mt-4">
                    <span class="text-sm text-gray-400 mt-1">Tipo de proyecto</span>
                    <br>
                    <span class="text-xl mt-1"> {{data.tipoProyecto}}</span>
                </div>
                <div class="mt-4">
                    <span class="text-sm text-gray-400 mt-1">Provincia</span>
                    <br>
                    <span class="text-xl mt-1"> {{data.provincia}}</span>
                </div>
                <div class="mt-4">
                    <span class="text-sm text-gray-400 mt-1">Municipio</span>
                    <br>
                    <span class="text-xl mt-1"> {{data.municipio}}</span>
                </div>
                <div class="mt-4">
                    <span class="text-sm text-gray-400 mt-1">Dirección</span>
                    <br>
                    <span class="text-xl mt-1"> {{data.direccion}}</span>
                </div>
                <div class="mt-4">
                    <span class="text-sm text-gray-400 mt-1">Niveles</span>
                    <br>
                    <span class="text-xl mt-1"> {{data.niveles}}</span>
                </div>
                <div class="mt-4">
                    <span class="text-sm text-gray-400 mt-1">Cantidad de habitaciones</span>
                    <br>
                    <span class="text-xl mt-1"> {{data.habitaciones ? data.habitaciones : 'n/a'}}</span>
                </div>
                <div class="mt-4">
                    <span class="text-sm text-gray-400 mt-1">Densidad</span>
                    <br>
                    <span class="text-xl mt-1"> {{data.densidadHabitacionnal ? data.densidadHabitacionnal : 'n/a'}}</span>
                </div>
                <div class="mt-4">
                    <span class="text-sm text-gray-400 mt-1">Bloques de edificios</span>
                    <br>
                    <span class="text-xl mt-1"> {{data.bloquesDeEdificios}}</span>
                </div>
                <div class="mt-4">
                    <span class="text-sm text-gray-400 mt-1">Área</span>
                    <br>
                    <span class="text-xl mt-1"> {{data.area}} mt2</span>
                </div>
                <div class="mt-4">
                    <span class="text-sm text-gray-400 mt-1">Coordenadas UTM</span>
                    <br>
                    <span class="text-xl mt-1"> {{data.coordenadaUtmX1}},{{ data.coordenadaUtmX2 }}</span>
                </div>
                <div class="mt-4">
                    <span class="text-sm text-gray-400 mt-1">Área</span>
                    <br>
                    <span class="text-xl mt-1"> {{data.area}} mt2</span>
                </div>

                
            </div>
        </div>
        <div class="shadow-lg p-10 rounded-lg space-y-2 ">
            <span class="text-gray-400">Documentos relacionados a la solicitud</span>
            <div v-for="(document,index) in documents" :key="index" class="rounded-md border-2 p-2 flex justify-between">
                <div class="flex">
                    <PaperClipIcon class="h-5 w-5 mt-1 text-gray-500"/> <span>{{document.NMTITLE}}</span>
                </div>
                <a :href="getDocumentViewerUrl(document.IDDOCUMENT)" target="_blank" class="text-blue-400 cursor-pointer">Visualizar</a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { getDocumentData, getDocuments, getWorkflowData } from '../api/softexpert';
import { PaperClipIcon } from '@heroicons/vue/solid';
import { softexpertApi } from '../hosts';

const route = useRoute();
const data = ref(null);
const documents = ref([]);

const getDocumentViewerUrl = (document) => {
    return `${softexpertApi}/api/documents/${document}/viewer`;
}

onMounted(async () => {
    const {  solicitud,documento } = route.query;

    const service = solicitud.substring(0,5)
    
    if(service != 'DPP01'){
        const url = window.location.href;
        const redirect = url.replace('validate','validate-old')
        
        window.location.href = redirect
    }
    const { project }  = await getWorkflowData(solicitud)

    data.value = project

    const categories = ['DPPPLANOSDEFINITIVOS', 'DPPCERTDEF']
    const workflowDocuments = await getDocuments(solicitud,categories)

    console.log(workflowDocuments)

    documents.value = workflowDocuments;
});
</script>