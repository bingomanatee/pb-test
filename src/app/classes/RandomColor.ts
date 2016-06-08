import HSL from './HSL';

const HUE_MAX = 360;
const HUE_MIN = 0;
const HUE_INCS = 8;
const HUE_CHUNKS = (HUE_MAX - HUE_MIN) / HUE_INCS;
const SAT_MIN = 20;
const SAT_MAX = 1;
const SAT_INCS = 4;
const SAT_CHUNKS = (SAT_MAX - SAT_MIN) / SAT_INCS;

const LIGHT_MIN = 20;
const LIGHT_MAX = 80;
const LIGHT_INCS = 4;
const LIGHT_CHUNKS = (LIGHT_MAX - LIGHT_MIN) / LIGHT_INCS;

const _r = (chunks:number, incs:number, min:number, max:number) => {
    const n = Math.floor(Math.random() * incs);
    const value = min + (chunks * n);
    return Math.min(max, Math.max(min, value));
};

export default (): HSL => {
    const hue = _r(HUE_CHUNKS, HUE_INCS, HUE_MIN, HUE_MAX);
    const light = _r(LIGHT_CHUNKS, LIGHT_INCS, LIGHT_MIN, LIGHT_MAX);
    const sat = _r(SAT_CHUNKS, SAT_INCS, SAT_MIN, SAT_MAX)
    return new HSL(hue, sat, light);
}
