<template>
<div ref="hud">


    <BasicSVG :width="width" :height="height">
        <g :transform="'translate('+(width/2+window_spacing_x/2)+','+(height/2-ty/2)+')'">
            <path :d='[
                "M", 0, ty/2,
                "L", tx/2, 0,
                "H", tx*3,
                "V", ty,
                "H", tx/2,
                "L", 0, ty/2,
            ].join(" ")' fill="transparent"/>
            <text 
                :x="tx*2.9" :y="0"
                text-anchor="end"
                dominant-baseline="hanging"
                font-family="monospace"
                :font-size="ty*0.9"
            >{{ alt.toFixed(0) }}</text>
            <text 
                :x="tx/2" :y="-ty*0.3"
                text-anchor="start"
                dominant-baseline="baseline"
                font-family="monospace"
                :font-size="ty*0.9"
            >ALT</text>
        </g>

        <g :transform="'translate('+(width/2-tx*3-window_spacing_x/2)+','+(height/2-ty/2)+')'">
            <path :d='[
                "M", tx*3.0, ty/2,
                "L", tx*2.5, 0,
                "H", 0,
                "V", ty,
                "H", tx*2.5,
                "L", tx*3, ty/2,
            ].join(" ")' fill="transparent"/>
            <text 
                :x="tx*0.25" :y="0"
                text-anchor="start"
                dominant-baseline="hanging"
                font-family="monospace"
                :font-size="ty*0.9"
            >{{ speed.toFixed(0) }}</text>
            <text 
                :x="0" :y="-ty*0.3"
                text-anchor="start"
                dominant-baseline="baseline"
                font-family="monospace"
                :font-size="ty*0.9"
            >SPEED</text>
        </g>
    </BasicSVG>

    

</div>
</template>
<script>
import BasicSVG from "./BasicSVG.vue";
export default {

    props: {
        speed: {
            type: Number,
        },
        alt: {
            type: Number,
        },
    },

    mounted(){
        window.addEventListener("resize", (event)=>{
            this.onResize();
        });
        this.onResize();
    },

    data(){
        return {
            width: 0,
            height: 0,
        }
    },

    computed: {
        ty(){
            return this.height / 30;
        },
        tx(){
            return this.width / 50;
        },
        window_spacing_x(){
            return this.width * 0.35;
        }
    },

    methods: {
        onResize(){
            let el = this.$refs["hud"];
            let w = el.clientWidth, h = el.clientHeight;
            this.width = w; this.height = h;
        }
    },

    components: {
        BasicSVG,
    }
}
</script>