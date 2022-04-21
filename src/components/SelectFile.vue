<script setup>
import { ref } from 'vue'
import { DocumentIcon } from '@heroicons/vue/solid'
import { useDocumentStore } from '../stores/document';
import { useRoute } from 'vue-router';
import QRCode from 'qrcode'
import {  appUrlLocal,appUrlDev  } from '../hosts';

const store = useDocumentStore();
const documentSelected = ref({});

const host = appUrlDev;

defineProps({
  show: Boolean,
  documents: Array,
})

const emit = defineEmits();

const selectDocument = () => {
    if( documentSelected.value.IDDOCUMENT ){
      emit('selectDocument', documentSelected.value);
      const url = `${host}/documents/validate?solicitud=${store.request}&documento=${documentSelected.value.IDDOCUMENT}`;
      store.validationUrl = url;
      console.log( url );
      createQr( url );
    }else {
      alert('¡No ha seleccionado ningún documento!');
    }
    
}

const setSelected = (document) => {
    documentSelected.value = document;
    
}

const createQr = async (url) => {
    var qr = await QRCode.toDataURL(url, {
        margin: 0,
        scale: 10
    });
    store.setQr(qr);
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
    {{documentSelected.value}}
      <button  @click="selectDocument" class="btn text-gray-200">¡Continuar!</button>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>
