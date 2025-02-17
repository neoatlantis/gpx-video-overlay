import moment from "moment";
import _ from "lodash";

class GPXTrack {
    /*
    Take a parsed GPX track object and provide some easy calculations.
    */

    #trackobj;
    #startMoment;

    constructor(track){
        this.#trackobj = track;
        console.log(track);

        this.#startMoment = moment(_.get(this.#trackobj, "duration.startTime"));

        this.#trackobj.points = this.#trackobj.points.map(p=>{
            p.moment = moment(p.time);
            p.secondsAfterStart = 
                p.moment.diff(this.#startMoment, "seconds", true);
            return p;
        });


    }

    momentSecondsAfterStart(seconds){
        return start.clone().add(seconds, "second");
    }

    elevation(second){
        let a0=0, t0=0,
            a1=0, t1=0;
        let point;
        for(let i=0; i<this.#trackobj.points.length; i++){
            point = this.#trackobj.points[i];
            let t = point.secondsAfterStart;

            if(t <= second){
                a0 = point.elevation;
                t0 = t;
            } else {
                a1 = point.elevation;
                t1 = t;
                break;
            }
        }

        if(t0 <= second && second <= t1){
            console.log(a0,t0,a1,t1);
            return a0 + (second - t0) / (t1-t0) * (a1-a0);
        } else {
            return point.elevation;
        }
    }




}

export default GPXTrack;