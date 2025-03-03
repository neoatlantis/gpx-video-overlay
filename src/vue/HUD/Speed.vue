<template>
<g>
    <path :d='[
        "M", tx*3.0, ty/2,
        "L", tx*2.5, 0,
        "H", 0,
        "V", ty,
        "H", tx*2.5,
        "L", tx*3, ty/2,
    ].join(" ")' fill="transparent" filter="url(#neon)"/>
    <text 
        :x="tx*0.25" :y="ty*0.22"
        text-anchor="start"
        dominant-baseline="hanging"
        :font-size="ty"
    >{{ (speed*3.6).toFixed(1) }}</text>
    <text 
        :x="0" :y="-ty*0.3"
        text-anchor="start"
        dominant-baseline="baseline"
        :font-size="ty"
    >SPEED</text>
    <g :transform="'translate('+(tx*4.5)+','+(ty/2)+')'">
        <path :d='[
            "M", tx*0.6-ty*0.8, -half_height,
            "H", -ty*0.8,
            "L", -ty*0.8, half_height,
            "L", tx*0.6-ty*0.8, half_height,
        ].join(" ")' fill="transparent" filter="url(#neon)" />
    </g>
</g>
</template>
<script>
export default {
    props: ['tx', 'ty', 'speed', 'width', 'height'],
    computed: {
        half_height(){
            return this.ty * 6;
        }
    }
}
</script>