import {CanvasManagerModel} from './canvas-manager.model';
import {CoordinateModel} from './coordinate.model';

/**
 * TODO: write documentation.
 */
export class PolygonModel {

    /**
     * TODO: write documentation.
     * @param {CoordinateModel[][]} coordinates
     * @param {string} strokeColor
     * @param {string} strokeWidth
     * @param {string} fillColor
     * @param {number} fillOpacity
     */
    constructor(public coordinates: CoordinateModel[][],
                public strokeColor: string,
                public strokeWidth: string,
                public fillColor: string,
                public fillOpacity: number) {
    }

    /**
     * TODO: write documentation.
     * @param {CanvasManagerModel} canvasManager
     */
    public drawToCanvases(canvasManager: CanvasManagerModel) {
    }
}
