export default class Location {
    private _valid: boolean;
    
    constructor(public row:string, public column:number) {
        this.valid = true;
    }

    set valid(val) {
        this._valid = val;
    }

    get valid() {
        return this._valid;
    }
    

    static fromString(str:string): Location {
        var m = /([A-Z])([\d]+)/i.exec(str);
        let out: Location;
        if (!m) {
            out = new Location('', 0);
            out.valid = false;
        } else {
            out = new Location(m[1].toUpperCase(), parseInt(m[2]));
        }

        return out;
    }

}
