<template>
    <div class="p-10">
        <div class="logo flex justify-center">
            <img height="250" width="250" src="https://www.mitur.gob.do/wp-content/uploads/2020/11/LogoMitur-2.svg" alt="">
        </div>
        <div class="flex shadow-lg bg-success p-5 rounded-lg mb-5 mt-10 justify-center">
            <span class="font-bold text-white text-2xl">¡Datos validados correctamente!</span>
        </div>
        
        <div class="shadow-md p-10">
            <div class="flex justify-center mt-3">
            <span class="text-xl font-bold mb-2">Datos del documento</span>
        </div>
            <div v-for="(field, index) in fields" :key="index">
                <div class="flex justify-self-auto">
                    <span class="text-lg font-bold mt-1">{{field.key.replace('”','')}}</span>
                    <span class="text-lg mt-1">: {{field.value.replace('”','')}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { getDocumentData } from '../api/softexpert';

const route = useRoute();
const fields = ref([]);


onMounted(async () => {
    const { documento, solicitud } = route.query;
    
    const data = await getDocumentData(documento, solicitud);

    fields.value = JSON.parse( data.data.data)
    
});
</script>