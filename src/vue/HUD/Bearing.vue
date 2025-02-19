<template>
<g>
    <clipPath id="clip">
        <rect :width="bar_width" :height="ty*4" :x="(width-bar_width)/2+bearing_calc_offset" :y="-ty*1.2"/>
        <!--<rect :width="width" :height="ty*3" :x="width/2+bearing_calc_offset" :y="-ty"/>-->
    </clipPath>

    <g :transform="'translate('+(bearing_bar_zero_offset-bearing_calc_offset)+')'" clip-path="url(#clip)">
        <template v-for="n in n_max">
            <line
                :x1="n*size_division" :y1="0"
                :x2="n*size_division" :y2="ty*0.6"
                fill="transparent"
                :stroke-width="direction_text[n]?2:1"
            />
            <text
                v-if="direction_text[n]"
                :x="n*size_division" :y="-ty"
                text-anchor="middle"
                dominant-baseline="hanging"
                :font-size="ty*0.9"
            >{{ direction_text[n] }}</text>
        </template>
    </g>
    <text 
        :x="0" :y="ty*0.9"
        text-anchor="middle"
        dominant-baseline="hanging"
        :font-size="ty*0.9"
    >{{ (bearing).toFixed(0) }}</text>
</g>
</template>
<script>
export default {
    props: ["bearing", "width", "height", "tx", "ty"],
    data(){ return {
        division: 72,
    }},
    computed: {
        bar_width(){
            return this.width * 0.35;
        },
        n_max(){ return this.division * 3 },
        direction_text(){
            let step_n = Math.floor(this.division / 8);
            let text_n = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
            let j = 0;
            let ret = [];
            for(let i=0; i<this.n_max; i++){
                if(i % step_n == 0){
                    ret.push(text_n[j]);
                    j = (j+1) % text_n.length;
                } else {
                    ret.push('');
                }
            }
            return ret;
        },
        size_division(){
            return this.width * 0.5 / this.division;
        },
        bearing_calc_offset(){
            return this.bearing / (360/this.division) * this.size_division;
        },
        bearing_bar_zero_offset(){
            return -this.division * this.size_division;
        }
    }
}
</script>