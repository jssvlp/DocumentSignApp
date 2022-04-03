<template lang="">
    <div class="flex ">
        <div @click="setType('QR')" class="flex bg-gray-200 rounded-md p-2 cursor-pointer">
            <QrcodeIcon class="h-5 w-5 text-primary"/> <span class="text-xs mt-1">Insertar QR</span>
        </div>
        <div @click="setType('Iniciales')" class="flex bg-gray-200 rounded-md p-2 ml-2 cursor-pointer">
            <UserGroupIcon class="h-5 w-5 text-primary"/> <span class="text-xs mt-1">Insertar iniciales firmantes</span>
        </div>
    </div>
</template>
<script setup>
import { QrcodeIcon } from '@heroicons/vue/solid'
import { UserGroupIcon } from '@heroicons/vue/solid'

const emit = defineEmits();

const setType = (type) => {
    emit('setType', type);
}
</script>
<style lang="">
    
</style>