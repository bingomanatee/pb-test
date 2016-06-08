interface Location {
    row: string;
    column: number;
}

interface Sample {
    name: string;
}

export default class Entry {
    constructor (public location: Location, public reactionTime:number, public sample:Sample) {

    }
}
