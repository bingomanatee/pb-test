import randomColor from './randomColor';
interface HSL {
    hue: number;
    sat: number;
    light: number;
}

export default class Sample {
    private _color: HSL;
    constructor(public name: string) {
        this.color = randomColor();
    }

    set color(val: HSL) {
        this._color = val;
    }

    get color() : HSL{
        return this._color;
    }
}
