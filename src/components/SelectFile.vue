<script setup>
import { ref } from 'vue'
import { DocumentIcon } from '@heroicons/vue/solid'


const documentSelected = ref({});

defineProps({
  show: Boolean,
  documents: Array
})

const emit = defineEmits();

const selectDocument = () => {
    emit('selectDocument', documentSelected.value);
    console.log(documentSelected)
}

const setSelected = (document) => {
    documentSelected.value = document;
}

const count = ref(0)
</script>

<template>
<div class="modal" id="my-modal-2" v-bind:class="{'modal-open' : show}">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Seleccione un documento</h3>
      <ul v-if="documents" class="menu bg-base-100 w-full rounded-box mt-10">
        <li class="uppercase text-xs actice" v-bind:class="{'bg-secondary' : document.IDDOCUMENT == documentSelected.IDDOCUMENT}" @click="setSelected(document)" v-for="(document, index) in documents" :key="index">
            <a> 
              <DocumentIcon class="h-5 w-5 text-primary"/>{{document.NMTITLE}}.pdf
              <span class="font-bold text-2xs">{{document.IDDOCUMENT}}</span>
            </a>
          </li>
      </ul>
    <div class="modal-action">
      <button @click="selectDocument" class="btn text-gray-200">¡Continuar!</button>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>
