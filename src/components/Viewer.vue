<template lang="">
    <iframe
            :src="`data:application/pdf;base64,${store.file}`"
            width="100%"
            height="1000"
            frameborder="0" >
    </iframe>
</template>
<script setup>
import { useDocumentStore } from '../stores/document';

const store = useDocumentStore();

// export default {
//     data: () =>({
//         src: "",
//         base64String: "",
//     }),
    
//     methods: {
//         async testLibrary(){
//             const url = 'test.pdf'
//             const existißngPdfBytes = await fetch(url).then(res => res.arrayBuffer())

//             const pdfDoc = await PDFDocument.load(existingPdfBytes)
//             const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

//             const pages = pdfDoc.getPages()
//             const firstPage = pages[0]
//             const { width, height } = firstPage.getSize()
//             firstPage.drawText('This text was added with JavaScript!', {
//                 x: 5,
//                 y: height / 2 + 300,
//                 size: 50,
//                 font: helveticaFont,
//                 color: rgb(0.95, 0.1, 0.1),
//                 rotate: degrees(-45),
//             })

//             const pdfBytes = await pdfDoc.save()
//             var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(pdfBytes)));

//             const blob = this.base64ToBlob( base64String, "application/pdf");
//             this.src = URL.createObjectURL( blob );

//         },
//         base64ToBlob( base64, type = "application/octet-stream" ) {
//             const binStr = atob( base64 );
//             const len = binStr.length;
//             const arr = new Uint8Array(len);
//             for (let i = 0; i < len; i++) {
//                 arr[ i ] = binStr.charCodeAt( i );
//             }
//             return new Blob( [ arr ], { type: type } );
//         }
        
//     },
//     watch: {
//         file( newFile ){
//             console.log( newFile, 'newFile')
//             this.base64String = newFile
//             this.src = "data:application/pdf;base64," + newFile
//         }
//     }
// }
</script>
<style >
    iframe{
        border-radius: 10px;
    }
</style>