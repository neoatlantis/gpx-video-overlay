<template>
<div ref="hud">


    <BasicSVG :width="width" :height="height">
        <filter id="neon">
            <feFlood flood-color="rgb(128,255,128)" flood-opacity="0.3" in="SourceGraphic" />
            <feComposite operator="in" in2="SourceGraphic" />
            <feGaussianBlur stdDeviation="1" />
            <feComponentTransfer result="glow1">
            <feFuncA type="linear" slope="4" intercept="0" />
            </feComponentTransfer>
            <feMerge>
                <feMergeNode in="glow1" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        </filter>




        <Bearing
            :transform="'translate('+(width/2)+','+(ty*4.5)+')'"
            :width="width" :height="height" :tx="tx" :ty="ty" :bearing="bearing"
        ></Bearing>


        <g :transform="'translate('+(width/2+window_spacing_x/2)+','+(height/2-ty/2)+')'">
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
        </g>

        <g :transform="'translate('+(width/2-tx*3-window_spacing_x/2)+','+(height/2-ty/2)+')'">
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
        </g>

        <text
            :x="tx" :y="ty*2"
            text-anchor="start"
            dominant-baseline="baseline"
            :font-size="ty"
        >TIME: {{ time_display }}</text>
    </BasicSVG>

    

</div>
</template>
<script>
import _ from "lodash";
import BasicSVG from "./BasicSVG.vue";
import Bearing from "./Bearing.vue";

export default {

    props: {
        speed: {
            type: Number,
        },
        alt: {
            type: Number,
        },
        bearing: {
            type: Number,
        },
        time: {
            type: Number,
        }
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
        },
        time_display(){
            let ts = Math.floor(this.time);
            let hour   = Math.floor(ts / 3600),
                minute = Math.floor(Math.floor(ts % 3600) / 60),
                second = Math.floor(ts % 60);
            return (
                _.padStart(hour.toFixed(0).toString(), 2, '0') + ':' +
                _.padStart(minute.toFixed(0).toString(), 2, '0') + ':' +
                _.padStart(second.toFixed(0).toString(), 2, '0')
            );
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
        Bearing,
    }
}
</script>