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
            :transform="'translate('+(width/2)+','+(ty*6.5)+')'"
            :width="width" :height="height" :tx="tx" :ty="ty" :bearing="bearing"
        ></Bearing>


        <Alt
            :transform="'translate('+(width/2+window_spacing_x/2)+','+(height/2-ty/2)+')'"
            :width="width" :height="height" :tx="tx" :ty="ty" :alt="alt"
        ></Alt>

        <Speed
            :transform="'translate('+(width/2-tx*3-window_spacing_x/2)+','+(height/2-ty/2)+')'"
            :width="width" :height="height" :tx="tx" :ty="ty" :speed="speed"
        >
        </Speed>

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
import Alt from "./Alt.vue";
import Speed from "./Speed.vue";

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
        Alt,
        Speed,
    }
}
</script>