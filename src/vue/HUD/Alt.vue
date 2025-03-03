<template>
<g>
    <path :d='[
        "M", 0, ty/2,
        "L", tx/2, 0,
        "H", tx*3,
        "V", ty,
        "H", tx/2,
        "L", 0, ty/2,
    ].join(" ")' fill="transparent" filter="url(#neon)"/>
    <text
        :x="tx*2.9" :y="ty*0.22"
        text-anchor="end"
        dominant-baseline="hanging"
        :font-size="ty"
    >{{ (alt).toFixed(0) }}</text>
    <text 
        :x="tx/2" :y="-ty*0.3"
        text-anchor="start"
        dominant-baseline="baseline"
        :font-size="ty"
    >ALT</text>
    <g :transform="'translate(0,'+(ty/2)+')'">
        <path :d='[
            "M", -tx*0.6-ty*0.8, -half_height,
            "H", -ty*0.8,
            "L", -ty*0.8, half_height,
            "L", -tx*0.6-ty*0.8, half_height,
        ].join(" ")' fill="transparent" filter="url(#neon)" />
    </g>
</g>
</template>
<script>
export default {
    props: ['tx', 'ty', 'alt', 'width', 'height'],
    computed: {
        half_height(){
            return this.ty * 6;
        }
    }
}
</script>