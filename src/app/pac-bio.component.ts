import {Component} from '@angular/core';
import TableModel from './classes/TableModel';
import TableDrawer from './classes/TableDrawer';
import {NgForm}    from '@angular/common';
import Entry from './classes/Entry';
import Location from './classes/Location';

const MIN_REACTION_TIME = 5;
const MAX_REACTION_TIME = 90;

@Component({
    moduleId: module.id,
    selector: 'pac-bio-app',
    templateUrl: 'pac-bio.component.html',
    styleUrls: ['pac-bio.component.css']
})
export class PacBioAppComponent {
    private _table:TableModel;
    private _drawer:TableDrawer;
    private _location:string;
    private _locationPristine:boolean;
    private _reactionTime;
    private _reactionTimePristine:boolean;
    private _sampleName:string;
    private _sampleNamePristine:boolean;

    title = 'pac-bio works!';

    constructor() {
        this.table = new TableModel(1300, 900, 12, 8);
        this.location = '';
        this._locationPristine = true;
        this._reactionTimePristine = true;
        this._sampleNamePristine = true;
    }

    get canAdd() {
        return (!this._locationPristine)
            && (!this._reactionTimePristine)
            && (!this._sampleNamePristine)
            && (!this.locationState)
            && (!this.reactionTimeState)
            && (!this.sampleNameState);
    }

    set location(val) {
        if (val !== this._location) {
            this._locationPristine = false;
        }
        this._location = val;
    }

    get location() {
        return this._location;
    }

    get locationState() {
        if (this._locationPristine) {
            return '';
        } else if (!this.location) {
            return 'required';
        } else if (/^[A-Z][\d]+$/i.test(this.location)) {
            return '';
        } else {
            return 'Please format the location as A1, D12, etc.';
        }
    }

    set reactionTime(val:any) {
        if (val !== this._reactionTime) {
            this._reactionTimePristine = false;
        }

        this._reactionTime = val;
    }

    get reactionTime() {
        return this._reactionTime;
    }

    get reactionTimeState() {
        if (this._reactionTimePristine) {
            return '';
        } else if (isNaN(this.reactionTime)) {
            return 'numeric value required';
        } else if (this.reactionTime !== (Math.max(MIN_REACTION_TIME, Math.min(MAX_REACTION_TIME, this.reactionTime)))) {
            return `reactionTime must be between ${MIN_REACTION_TIME} and ${MAX_REACTION_TIME} (inclusive)`;
        } else {
            return '';
        }
    }

    set sampleName(val:string) {
        this._sampleNamePristine = false;
        this._sampleName = val;
    }

    get sampleName() {
        return this._sampleName;
    }

    get sampleNameState() {
        if (this._sampleNamePristine) {
            return '';
        } else if (!this.sampleName) {
            return 'required';
        } else if (this.sampleName.length > 64) {
            return `max characters: 64 (${this.sampleName.length - 64} characters over)`;
        } else if (!/^[ \w]+$/.test(this.sampleName)) {
            return 'only letters, spaces and numbers allowed';
        } else {
            return '';
        }
    }

    set table(val) {
        this._table = val;
    }

    get table():TableModel {
        return this._table;
    }

    set drawer(val) {
        this._drawer = val;
    }

    get drawer() {
        return this._drawer;
    }

    ngAfterViewInit() {
        this.drawer = new TableDrawer(this.table, 'grid');
    }

    gridStyle() {
        return {
            color: 'red'
        };
    }

    addEntry() {
        this.table.addEntry(this.location, this.reactionTime, this.sampleName);
        this.drawer.draw();
        this.reactionTime = null;
        this._reactionTimePristine = true;
    }

    removeEntry() {
        this.table.remove(this.location);
        this.drawer.draw();
    }

    get canClear():boolean {
        return Location.validString(this.location) && this.table.hasEntry(this.location);
    }

    canvasClick($event) {
        let i = Math.floor($event.offsetX / this.table.columnWidth);
        let j = Math.floor($event.offsetY / this.table.rowHeight);
        if (i && j) {
            --i;
            --j;
            if (this.table.hasEntryAtIJ(i, j)) {
                const entry:Entry = this.table.getEntryAtIJ(i, j);
                this.location = entry.index;
                this.sampleName = entry.sample.name;
                this.reactionTime = entry.reactionTime;
            } else {
                this.location = Location.indexFor(i, j);
            }
        }
    }
}
