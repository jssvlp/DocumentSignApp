<template lang="">
    <div class="container">
        <iframe  
            ref="iframe"
            v-if="store.file"
            class="rounded-lg overlap" 
            scrolling="no" 
            :width="store.width" 
            :height="store.height" 
            :src="store.src +'#'+ 'toolbar=0&navpanes=&scrollbar=0&page=' + store.currentPage">
        </iframe> 
        <img id="qr" v-if="store.showQr"  v-bind:style="{left: store.position.x + 'px', top: store.position.y + 'px'}"  src="/qr.png" :width="store.size" :height="store.size" alt="">
    </div>
</template>

<script setup>
import { useDocumentStore } from '../stores/document';
import { ref } from 'vue'
import VuePdfEmbed from 'vue-pdf-embed'

const store = useDocumentStore();

</script>
<style scoped>
    .overlap{
        position:absolute;
        top:0;
        left:0 
    }
    .container{
        position:relative
    }
    #qr{
        position: absolute;
    }
    iframe{
        border-radius: 10px;
        pointer-events: none;
    }
    
</style>