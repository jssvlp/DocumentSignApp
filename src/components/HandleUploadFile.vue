<script setup>
import FileUpload from '../components/FileUpload.vue'

defineProps({
    show: Boolean,
})
</script>
<template>
    <div class="modal" id="my-modal-2" v-bind:class="{'modal-open' : show}">
        <div class="modal-box">
            <h3 class="font-bold text-lg">Suba un documento desde su computador</h3>
            <FileUpload />
            
            <button  @click="selectDocument" class="btn text-gray-200">¡Continuar!</button>
        </div>
    </div>
</template>