import {CanvasManagerModel} from './canvas-manager.model';
import {CoordinateModel} from './coordinate.model';

/**
 * TODO: write documentation.
 */
export class PolylineModel {

    /**
     * TODO: write documentation.
     * @param {CoordinateModel[][]} coordinates
     * @param {string} strokeColor
     * @param {number} strokeWidth
     */
    constructor(public coordinates: CoordinateModel[][],
                public strokeColor: string,
                public strokeWidth: number) {
    }

    /**
     * TODO: write documentation.
     * @param {CanvasManagerModel} canvasManager
     */
    public drawToCanvases(canvasManager: CanvasManagerModel) {
    }
}
