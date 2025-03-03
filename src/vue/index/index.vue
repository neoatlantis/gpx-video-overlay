<template><div class="container-fluid" style="padding: 0.5em">

Select GPX file: <input type="file" @change="readGPX" />
-> GPX starts at: {{ gpx_start_moment }}
Start offset: <input type="number" v-model="gpx_offset_seconds" width="4" /> seconds
Aligned start: {{ gpx_real_start_moment }}


<HUD
	:speed="hud_speed"
	:alt="hud_alt"
	:bearing="hud_bearing"
	:time="hud_time"
	style="width: 50vw; height: 50vh; position: fixed; left: 25vw; top: 20vh; z-index: 20; background: rgba(0,0,0,0.0)"
></HUD>

<div style="width: 60vw; height: 60vh; position: fixed; left: 20vw; top: 15vh; z-index: 10 ">
	<video style="width:100%; height: 100%" controls="controls" ref="vid">
		 <source type="video/mp4" src="static/test_video.mp4">
	</video>
</div>


</div></template>
<script>
import _ from "lodash";
import moment from "moment";
import { parseGPX } from "@we-gold/gpxjs";
import GPXTrack from "app/lib/GPXTrack.js";

import HUD from "sfc/HUD/HUD.vue";



function readFile(obj) {
	const [file] = obj.files;
	const reader = new FileReader();

	if (file) {
		let ret = new Promise((resolve, reject)=>{
			reader.addEventListener("load", ()=>{
				resolve(reader.result);
			}, false);
			reader.addEventListener("error", ()=>{
				reject();
			});
		});
		reader.readAsText(file);
		return ret;
	}
	return null;
}


var trackobj = null;

export default {
	mounted(){

		/*this.$refs["vid"].addEventListener("timeupdate", (event)=>{
			this.updateHUD(event.target.currentTime+6600);
		})*/

		setInterval(()=>{
			this.updateHUD(this.$refs["vid"].currentTime+this.gpx_offset_seconds);
		}, 100);

		let start_moment = localStorage.getItem("start_moment");
		if(!_.isNil(start_moment)) this.start_moment = start_moment;
	},

	methods: {
		async readGPX(e){
			let content = await readFile(e.target);
			const [parsedFile, error] = parseGPX(content);

			//console.log(parsedFile);

			let track = _.get(parsedFile, "tracks.0");
			if(_.isNil(track)) return;

			trackobj = new GPXTrack(track);
			this.gpx_start_moment = trackobj.startMoment.toISOString();
		},

		updateHUD(t){
			if(!trackobj) return null;

			this.hud_alt = trackobj.elevation(t);
			this.hud_speed = trackobj.speedMoment(t);
			this.hud_bearing = trackobj.bearing(t);
			this.hud_time = t;
		}
	},

	computed: {
		gpx_real_start_moment(){
			return moment(this.gpx_start_moment).add(this.gpx_offset_seconds, 's').toISOString();
		}
	},

	watch: {
		gpx_offset_seconds(){
			localStorage.setItem("gpx_offset_seconds", this.gpx_offset_seconds);
		}
	},

	data(){
		return {
			started: false,
			gpx_start_moment: "",
			gpx_offset_seconds: 0,

			hud_speed: 0,
			hud_alt: 0,
			hud_bearing: 0,
			hud_time: 0,
		}
	},

	components: {
		HUD,
	}
}
</script>