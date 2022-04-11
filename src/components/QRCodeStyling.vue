<template>
    <span>hola</span>
    <div id="qr-code" :ref="qr"> </div>
</template>

<script setup>
import QRCodeStyling, {
  DrawType,
  TypeNumber,
  Mode,
  ErrorCorrectionLevel,
  DotType,
  CornerSquareType,
  CornerDotType,
  
} from 'qr-code-styling';
import { onMounted, ref, watch } from 'vue';
import { useDocumentStore } from '../stores/document';

const store = useDocumentStore();

const qr = ref(null);

const options = ref({
      width: store.size,
      height: store.size,
      type: 'svg' ,
      data: store.qrData,
      image: '/favicon.ico',
      margin: 10,
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'Q' 
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.5,
        margin: 10,
        crossOrigin: 'anonymous',
      },
      dotsOptions: {
        color: '#202A5E',
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 0,
        //   colorStops: [{ offset: 0, color: '#8688B2' }, { offset: 1, color: '#77779C' }]
        // },
        type: 'rounded'
      },
      backgroundOptions: {
        color: '#ffffff',
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 0,
        //   colorStops: [{ offset: 0, color: '#ededff' }, { offset: 1, color: '#e6e7ff' }]
        // },
      },
      cornersSquareOptions: {
        color: '#EC8F01',
        type: 'extra-rounded',
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 180,
        //   colorStops: [{ offset: 0, color: '#25456e' }, { offset: 1, color: '#4267b2' }]
        // },
      },
      cornersDotOptions: {
        color: '#202A5E',
        type: 'dot',
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 180,
        //   colorStops: [{ offset: 0, color: '#00266e' }, { offset: 1, color: '#4060b3' }]
        // },
      }
    });
  const extension = 'svg';
  const  qrCode = new QRCodeStyling(options);

  watch(() => options.data, () => {
      qrCode.update(options);
  });

  onMounted(() => {
      qrCode.append(qr);
  });

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
