import Location from './Location';

interface Sample {
    name:string;
}

export default class Entry {
    constructor(public location:Location, public reactionTime:number, public sample:Sample) {
    }

    get index() {
        return this.location.index;
    }
}
