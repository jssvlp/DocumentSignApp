<template>
    <div class="flex justify-center custom-card">

        <div class="flex justify-center mt-16 shadow-lg rounded-lg p-5 md:w-1/3 bg-white border-2 border-indigo-500">
            <div class="text-center">
            <div class="flex justify-end mb-6 text-sm"><p class="mt-2 bg-secondary rounded-md p-1 font-bold  "> <span class="text-center p-2   rounded-md">{{project?.estado}}</span> </p></div>
            <p><span class="font-bold text-center text-lg ">{{project?.proyecto}}</span></p>
             
             <h1 class="mt-2 text-gray-500">Los datos del proyecto estarán visibles cuando la solicitud haya finalizado.</h1>
            </div>
         </div>
    </div>
</template>
<script setup>
const props = defineProps(['project'])
</script>
<style scoped>

</style>