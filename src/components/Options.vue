<template lang="">
    <div class="card w-96 bg-neutral text-neutral-content">
    <div class="card-body">
        <h2 class="card-title">Opciones</h2>

        <label for="">Izquierda/Derecha</label>
        <input id="xposition" type="range" min="0" max="100" value="30" class="range range-xs"> 
        <label for="">Arriba/Abajo</label>
        <input id="xposition" type="range" min="0" max="100" value="30" class="range range-xs"> 
        
        <label for="">Tamaño</label>
        <input id="xposition" type="range" min="0" max="100" value="50" class="range range-xs"> 
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
            
            
        </div>
        
        <div class="divider"></div>
        <div class="card-actions justify-end mt-10">
            <button class="btn btn-primary">Finalizar</button>
            <button class="btn btn-ghost">Cancelar</button>
        </div>
    </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useDocumentStore } from '../stores/document';

const store = useDocumentStore();

const setCurrentPage = (page) => {
    store.setCurrentPage(page);
}


// export default {
//     data: ()=>({
//         samePosition: true,
//         insertInAllPages: true,
//         currentPage: 1,
//         countPages: 2
//     }),
// }
</script>
<style lang="">
    
</style>