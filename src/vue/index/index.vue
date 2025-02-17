<template><div class="container-fluid" style="padding: 0.5em">

<input type="file" @change="readGPX" />

<HUD></HUD>


</div></template>
<script>
import _ from "lodash";
import { parseGPX } from "@we-gold/gpxjs";
import GPXTrack from "app/lib/GPXTrack.js";

import HUD from "./HUD.vue";



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




export default {
	mounted(){
	},

	methods: {
		async readGPX(e){
			let content = await readFile(e.target);
			const [parsedFile, error] = parseGPX(content);

			//console.log(parsedFile);

			let track = _.get(parsedFile, "tracks.0");
			if(_.isNil(track)) return;

			const trackobj = new GPXTrack(track);

		}
	},

	data(){
		return {
			started: false,
		}
	},

	components: {
		HUD,
	}
}
</script>