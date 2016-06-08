import Entry from './Entry';
import Location from './Location';
import Sample from './Sample';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

//@TODO: enforce integral values
const _wholeNumber = n => Math.max(1, Math.floor(n));

/**
 * note = the rows and columns represent the slots for data; because of the titles,
 * this diagram will have one more row and column than the entered values.
 */
export default class TableModel {
    private _width:number;
    private _height:number;
    private _rows:number;
    private _columns:number;
    
    private _samples = [];
    private _entries = [];

    constructor(public width:number, public height:number, public columns:number, public rows:number) {
    }

    get columnWidth():number {
        return Math.floor(this.width / (1 + this.columns));
    }

    get rowHeight():number {
        return Math.floor(this.height / (1 + this.rows));
    }

    columnLabel(i:number):string {
        return `${i + 1}`;
    }

    rowLabel(j:number):string {
        //@TODO: handle values higher than 26
        return ALPHABET[j];
    }

    cellState(i:number, j:number) {
        return {};
    }
    
    addEntry(location:string, size: number, name: string) {
        const sample = this.addSample(name);
        const entry = new Entry(Location.fromString(location), size, sample);
    }

    addSample(name: string) {
        return new Sample(name);
    }
}
