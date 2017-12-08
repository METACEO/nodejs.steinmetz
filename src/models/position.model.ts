import {CoordinateModel} from './coordinate.model';

/**
 * TODO: write documentation.
 */
export class PositionModel {

    /**
     * TODO: write documentation.
     */
    public pixel: CoordinateModel;

    /**
     * TODO: write documentation.
     */
    public tile: CoordinateModel;

    /**
     * TODO: write documentation.
     */
    public world: CoordinateModel;

    /**
     * TODO: write documentation.
     * @param {CoordinateModel} coordinate
     * @param {number} zoom
     */
    constructor(public coordinate: CoordinateModel,
                public zoom: number) {

        const scale = 1 << zoom;
        const sinY = Math.min(Math.max(Math.sin(coordinate.latitude * Math.PI / 180), -0.9999), 0.9999);

        this.world = new CoordinateModel(
            256 * (0.5 + coordinate.longitude / 360),
            256 * (0.5 - Math.log((1 + sinY) / (1 - sinY)) / (4 * Math.PI))
        );

        const total = new CoordinateModel(
            Math.floor(this.world.latitude * scale),
            Math.floor(this.world.longitude * scale)
        );

        this.tile = new CoordinateModel(
            Math.floor(total.latitude / 256),
            Math.floor(total.longitude / 256)
        );

        this.pixel = new CoordinateModel(
            total.latitude - this.tile.latitude * 256,
            total.longitude - this.tile.longitude * 256
        );
    }
}
