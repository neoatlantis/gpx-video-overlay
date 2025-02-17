import moment from "moment";
import _ from "lodash";

class GPXTrack {
    /*
    Take a parsed GPX track object and provide some easy calculations.
    */

    #trackobj;
    constructor(track){
        this.#trackobj = track;
        console.log(track);

        this.#trackobj.points = this.#trackobj.points.map(p=>{
            p.moment = moment(p.time);
            return p;
        });

        
    }

    momentSecondsAfterStart(seconds){
        let start = moment(_.get(this.#trackobj, "duration.startTime"));
        return start.clone().add(seconds, "second");
    }





}

export default GPXTrack;