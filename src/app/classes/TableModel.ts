import Entry from './Entry';
import Location from './Location';
import Sample from './Sample';

/**
 * note = the rows and columns represent the slots for data; because of the titles,
 * this diagram will have one more row and column than the entered values.
 */
export default class TableModel {

    private _samples = [];
    private _entries = <Map<string, Entry>>(new Map());

    constructor(public width:number, public height:number, public columns:number, public rows:number) {
    }

    get columnWidth():number {
        return Math.floor(this.width / (1 + this.columns));
    }

    get rowHeight():number {
        return Math.floor(this.height / (1 + this.rows));
    }

    columnLabel(i:number):string {
        return Location.columnFor(i);
    }

    rowLabel(j:number):string {
        //@TODO: handle values higher than 26
        return Location.rowFor(j);
    }

    cellState(i:number, j:number) {
        return {};
    }

    getLocation(i:number, j:number) {
        return `${this.rowLabel(i - 1)}${this.columnLabel(j - 1)}`;
    }

    addEntryAtIJ(i:number, j:number, size:number, name:string) {
        const sample = this.addSample(name);
        const entry = new Entry(new Location(i, j), size, sample);
        this.entries.set(entry.index, entry);
    }

    addEntry(location:string, size:number, name:string) {
        const sample = this.addSample(name);
        const entry = new Entry(Location.fromString(location), size, sample);

        this.entries.set(entry.index, entry);

    }

    get entryList() {
        return Array.from(this.entries.values());
    }

    hasEntry(index: string) {
        return this.entries.has(index);
    }

    hasEntryAtIJ(i:number, j:number):boolean {
        const index:string = Location.indexFor(i, j);
        return this.hasEntry(index);
    }

    getEntryAtIJ(i:number, j:number):Entry {
        const index:string = Location.indexFor(i, j);
        return this.entries.get(index);
    }

    addSample(name:string):Sample {
        // @TODO: deduplicate samples
        return new Sample(name);
    }

    get entries():Map<string, Entry> {
        return this._entries;
    }

    remove(index: string) {
        let i: string = index.toUpperCase();

        if (this.hasEntry(i)){
            this.entries.delete(i);
        }
    }
}
