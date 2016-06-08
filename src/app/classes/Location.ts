const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const LOC_STR_RE = /^([A-Z])([\d]+)$/i;

export default class Location {
    private _invalid:boolean;

    constructor(public i:number, public j:number, invalid:boolean = false) {
        this.invalid = invalid || false;
    }

    set invalid(val) {
        this._invalid = val;
    }

    get invalid() {
        return this._invalid;
    }

    static validString(s: string) : boolean {
        return LOC_STR_RE.test(s);
    }

    static fromString(str:string):Location {
        var m = LOC_STR_RE.exec(str);
        let out:Location;
        if (!m) {
            out = new Location(0, 0, true);
        } else {
            out = new Location(Location.columnFrom(m[2]), Location.rowFrom(m[1]));
        }

        return out;
    }

    get index() {
        return Location.indexFor(this.i, this.j);
    }

    static indexFor(i:number, j:number) : string {
        return `${Location.rowFor(j)}${Location.columnFor(i)}`;
    }

    static columnFrom(s:string):number {
        if (!s) {
            return -1;
        }

        return parseInt(s) - 1;
    }

    static rowFrom(s:string):number {
        const su = s.toUpperCase();
        if (!s) {
            return -1;
        }
        for (let i = 0; i < ALPHABET.length; ++i) {
            if (ALPHABET[i] === su) {
                return i;
            }
        }
        return -1;
    }

    static columnFor(i:number):string {
        return `${i + 1}`;
    }

    static rowFor(j:number):string {
        return ALPHABET[j];
    }
}
