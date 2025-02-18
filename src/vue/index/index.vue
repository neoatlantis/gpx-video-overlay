<template><div class="container-fluid" style="padding: 0.5em">

<input type="file" @change="readGPX" />

<HUD
	:speed="hud_speed"
	:alt="hud_alt"
	:bearing="hud_bearing"
	style="width: 60vw; height: 50vh; position: fixed; left: 20vw; top: 15vh; z-index: 20; background: rgba(0,0,0,0.1)"
></HUD>

<div style="width: 60vw; height: 60vh; position: fixed; left: 20vw; top: 15vh; z-index: 10 ">
	<video style="width:100%; height: 100%" controls="controls" ref="vid">
		 <source type="video/mp4" src="static/test_video.mp4">
	</video>
</div>


</div></template>
<script>
import _ from "lodash";
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

		this.$refs["vid"].addEventListener("timeupdate", (event)=>{
			this.updateHUD(event.target.currentTime+6600);
		})
	},

	methods: {
		async readGPX(e){
			let content = await readFile(e.target);
			const [parsedFile, error] = parseGPX(content);

			//console.log(parsedFile);

			let track = _.get(parsedFile, "tracks.0");
			if(_.isNil(track)) return;

			trackobj = new GPXTrack(track);
		},

		updateHUD(t){
			if(!trackobj) return null;

			this.hud_alt = trackobj.elevation(t);
			this.hud_speed = trackobj.speedMoment(t);
			this.hud_bearing = trackobj.bearing(t);
		}
	},

	data(){
		return {
			started: false,

			hud_speed: 0,
			hud_alt: 0,
			hud_bearing: 0,
		}
	},

	components: {
		HUD,
	}
}
</script>