<template lang="">
    <div class="card w-96 bg-neutral text-neutral-content">
    <div class="card-body">
        <h2 class="card-title">Opciones {{type}}</h2>

        <label for="">Izquierda/Derecha</label>
        <input id="xposition" v-model="x" type="range" min="32" max="77" step="0.5" class="range range-xs"> 
        <label for="">Arriba/Abajo</label>
        <input id="xposition" v-model="y" type="range" min="9" max="75" step="0.5" class="range range-xs"> 
        
        <label for="">Tamaño</label>
        <input id="xposition" type="range" min="30" max="150" step="0.5" v-model="size" class="range range-xs"> 
        <div class="divider"></div>
        <div class="form-control">
            <label class="label cursor-pointer">
                <span class="label-text text-white">Incrustar en todas las páginas</span>
                <input v-model="store.insertInAllPages" type="checkbox" class="toggle toggle-primary">
            </label>
            <label class="label cursor-pointer">
                <span class="label-text text-white">Misma posición en todas las páginas</span>
                <input v-model="store.samePosition" type="checkbox" class="toggle toggle-primary" >
            </label>
            <div class="flex space-x-1 mb-2 mt-2">
                <button v-if="!store.samePosition" v-bind:class="store.currentPage < 1 ? 'btn-disabled text-gray-500' : 'btn-secondary'" @click="store.prev()" class="btn btn-xs  btn-outline">Anterior</button>
                <button v-if="!store.samePosition" v-bind:class="store.currentPage == store.pages - 1 ? 'btn-disabled text-gray-500': 'btn-secondary'" @click="store.next()" class="btn btn-xs  btn-outline">Siguiente</button>
            </div>
            <div v-if="!store.samePosition">
                <span class="text-white text-xs">Pagina actual {{store.currentPage + 1}}/{{store.pages}}</span>
            </div>
            <div class="flex mt-4">
                <button  @click="store.updateQr()" class="btn btn-sm btn-secondary w-full">Insertar</button>
            </div>
            <div class="flex mt-4">
                <button  @click="store.downloadDocument()" class="btn btn-sm w-full">Descargar</button>
            </div>
            
            
        </div>
        
        <div class="divider"></div>
        <div class="card-actions justify-end mt-10">
            <button class="btn btn-primary" @click="upload">Finalizar</button>
            <button class="btn btn-ghost">Cancelar</button>
        </div>
    </div>
    </div>
</template>
<script setup>
import { ref,watch } from 'vue';
import { useDocumentStore } from '../stores/document';
import { saveDocumentData, uploadFile } from '../api/softexpert';


const x = ref(32);
const y = ref(10);
const size = ref(150);
const props = defineProps({
    type: String
});

const store = useDocumentStore();

const setCurrentPage = (page) => {
    store.setCurrentPage(page);
}

//watchers

watch(x, (newVal, oldVal) => {
    store.position.x = parseInt(newVal)
});

watch(y, (newVal, oldVal) => {
    store.position.y = parseInt(newVal)
});

watch(size, (newVal, oldVal) => {
    store.size = parseInt(newVal)
});

const updatePosition = (e) => {
    position.value.x = e.clientX;
    position.value.y = e.clientY;
}

const moveVertical = (e) => {
    console.log( e)
}

const emit = defineEmits({
    setType: String,
    setLoading: Boolean,
});

const upload = async () => {
    store.loadingMessage = 'Subiendo documento...';
    store.loading = true ;
    const result = await uploadFile(store.file, store.document)

    const upload = await saveDocumentData( store.documentData, store.request, store.document.IDDOCUMENT)
    store.loading = false;
    alert(result.message)
}
</script>
<style lang="">
    
</style>