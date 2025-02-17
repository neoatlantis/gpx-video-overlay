<template>
<svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" style="position: absolute; left: 0; top: 0">
    <slot :width="width" :height="height"></slot>
</svg>
</template>
<script>
export default {
    props: {
        height: {
            type: Number,
        },
        width: {
            type: Number,
        }
    }
}


</script>