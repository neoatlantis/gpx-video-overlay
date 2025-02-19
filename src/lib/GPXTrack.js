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


        // calculate delta_distance
        const deg2arc = Math.PI / 180.0;
        this.#trackobj.points[0].deltaDistance = 0;
        this.#trackobj.points[0].speedMoment = 0;
        this.#trackobj.points[0].bearing = 0;

        for(let i=1; i<this.#trackobj.points.length; i++){
            let p0 = this.#trackobj.points[i-1],
                p1 = this.#trackobj.points[i];

            let lat0 = p0.latitude * deg2arc, lng0 = p0.longitude * deg2arc,
                lat1 = p1.latitude * deg2arc, lng1 = p1.longitude * deg2arc,
                elv0 = p0.elevation,          elv1 = p1.elevation;

            p1.deltaDistance = this.#distanceByLatLngElv(
                lat0, lng0, elv0, lat1, lng1, elv1
            );
            p1.speedMoment = p1.deltaDistance / (p1.secondsAfterStart - p0.secondsAfterStart);
            p1.bearing = this.#bearingByLatLng(lat0, lng0, lat1, lng1);
        }

    }

    #distanceByLatLngElv(lat0, lng0, elv0, lat1, lng1, elv1){
        const avg_elv = (elv0+elv1)/2;
        const R = 6378000 + avg_elv;

        let d_lat = lat1 - lat0, d_lng = lng1 - lng0;
        let dist_lat = R * d_lat; // "latitude"-direction distance
        let dist_lng = R * Math.cos(lat0) * d_lng; // "longitude"-direction distance

        let dist_plane = Math.sqrt(dist_lat*dist_lat+dist_lng*dist_lng);
        let dist_vert = elv1 - elv0;
        let dist = Math.sqrt(dist_plane*dist_plane+dist_vert*dist_vert);
        return dist;
    }

    #bearingByLatLng(lat0, lng0, lat1, lng1){
        let d_lat = lat1 - lat0,
            d_lng = (lng1 - lng0) * Math.cos(lat0);
        let d = Math.sqrt(d_lat*d_lat+d_lng*d_lng);
        let d_lat_cos = Math.acos(d_lat/d);
        if(d_lng < 0){
            d_lat_cos = Math.PI*2-d_lat_cos;
        }
        return d_lat_cos / Math.PI * 180;
    }

    #interpolate(keyname, second){
        let a0=0, t0=0,
            a1=0, t1=0;
        let points = this.#trackobj.points;

        for(let i=1; i<points.length; i++){
            a0 = points[i-1][keyname];
            a1 = points[i][keyname];
            t0 = points[i-1].secondsAfterStart;
            t1 = points[i].secondsAfterStart;

            if(t0 <= second && second <= t1){
                return a0 + (second - t0) / (t1-t0) * (a1-a0);
            }
        }
        return -1;
    }

    momentSecondsAfterStart(seconds){
        return start.clone().add(seconds, "second");
    }

    elevation(second){
        return this.#interpolate("elevation", second);
    }

    speedMoment(second){
        return this.#interpolate("speedMoment", second);
    }

    bearing(second){
        return this.#interpolate("bearing", second);
    }


}

export default GPXTrack;