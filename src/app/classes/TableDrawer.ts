import TableModel from './TableModel';

const LINE_WIDTH = 4;
const CIRCLE_RATIO = 0.9;

export default class TableDrawer {
    private _context:CanvasRenderingContext2D;

    constructor(public table:TableModel, public canvasId?:string) {
        if (this.canvasId) {
            const canvas = document.getElementById(this.canvasId);
            if (canvas) {
                this.context = (<HTMLCanvasElement>canvas).getContext('2d');
            } else {
                console.log('no canvas for ', this.canvasId);
            }
            this.draw();
        }
    }

    set context(val:CanvasRenderingContext2D) {
        this._context = val;
    }

    get context():CanvasRenderingContext2D {
        return this._context;
    }

    private _clearStage() {
        if (this.context) {
            this.context.clearRect(0, 0, this.table.width, this.table.height);
        }
    }

    draw() {
        if (this.context) {

            this._clearStage();

            for (let i = 0; i < this.table.columns; ++i) {
                this._drawLabel(this.table.columnLabel(i), i + 1, 0);
            }

            for (let j = 0; j < this.table.rows; ++j) {
                this._drawLabel(this.table.rowLabel(j), 0, j + 1);

                for (let i2 = 1; i2 <= this.table.columns; ++i2) {
                    this._drawCircle(this.table.cellState(i2, j + 1), i2, j + 1);
                }
            }
        }
    }

    private _drawCircle(state, i:number, j:number) {
        if (this.context) {
            const box = this.box(i, j);
            this.context.save();
            
            this.context.fillStyle = 'black';
            this.context.lineWidth = LINE_WIDTH;
            const radius = box.minRadius * CIRCLE_RATIO;
            this.context.fillStyle = 'black';
            this.context.beginPath();
            this.context.arc(box.centerX, box.centerY, radius, 0, 2 * Math.PI);
            this.context.closePath();
            this.context.fillStyle = 'blue';
            this.context.stroke();

            this.context.restore();
        }
    }

    public box(i, j) {
        const width:number = this.table.columnWidth;
        const height:number = this.table.rowHeight;
        const left:number = i * width;
        const top:number = j * height;
        const right:number = left + width;
        const bottom:number = top + height;
        const radWidth = Math.round(width / 2);
        const radHeight = Math.round(height / 2);
        const centerX:number = left + radWidth;
        const centerY:number = top + radHeight;
        const minRadius = Math.min(radWidth, radHeight);
        return {
            top,
            left,
            right,
            bottom,
            width,
            height,
            centerX,
            centerY,
            minRadius
        }
    }

    private _drawLabel(text:string, i:number, j:number) {
        if (this.context) {
            this.context.save();

            const box = this.box(i, j);

            this.context.textBaseline = 'middle';
            this.context.textAlign = 'center';
            this.context.font = `${box.height / 2}px Arial`;
            this.context.fillStyle = 'black';
            this.context.fillText(text, box.centerX, box.centerY);

            this.context.restore();
        }
    }
}
