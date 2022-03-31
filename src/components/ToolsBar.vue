<template lang="">
    <div class="flex ">
        <div class="flex bg-gray-200 rounded-md p-2">
            <QrcodeIcon class="h-5 w-5 text-primary"/> <span class="text-xs mt-1">Insertar QR</span>
        </div>
        <div class="flex bg-gray-200 rounded-md p-2 ml-2">
            <UserGroupIcon class="h-5 w-5 text-primary"/> <span class="text-xs mt-1">Insertar iniciales firmantes</span>
        </div>
    </div>
</template>
<script>
import { QrcodeIcon } from '@heroicons/vue/solid'
import { UserGroupIcon } from '@heroicons/vue/solid'
export default {
    components:{
        QrcodeIcon,
        UserGroupIcon
    }
}
</script>
<style lang="">
    
</style>