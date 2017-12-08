import {PositionModel} from './position.model';

/**
 * TODO: write documentation.
 */
export class TileCursorModel {

    /**
     * TODO: write documentation.
     */
    public max: number;

    /**
     * TODO: write documentation.
     * @param {PositionModel} position
     * @returns {TileCursorModel}
     * @constructor
     */
    static NewFromPosition(position: PositionModel) {
        return new TileCursorModel(
            position.tile.latitude,
            position.tile.longitude,
            position.zoom
        );
    }

    /**
     * TODO: write documentation.
     * @param {number} latitude
     * @param {number} longitude
     * @param {number} zoom
     */
    constructor(public latitude: number,
                public longitude: number,
                public zoom: number) {

        this.max = Math.pow(2, zoom);

        this.tileLeft(0);
        this.tileUp(0);
        this.tileRight(0);
        this.tileDown(0);
    }

    /**
     * TODO: write documentation.
     * @param {number} startYPixel
     * @param {number} pixelsDown
     * @returns {number}
     */
    public pixelDown(startYPixel: number, pixelsDown: number = 1) {

        let position = startYPixel + pixelsDown;

        while (position > 256) {
            position -= 256;
            this.tileDown();
        }

        return position;
    }

    /**
     * TODO: write documentation.
     * @param {number} startXPixel
     * @param {number} pixelsLeft
     * @returns {number}
     */
    public pixelLeft(startXPixel: number, pixelsLeft: number = 1) {

        let position = startXPixel - pixelsLeft;

        while (position < 1) {
            position += 256;
            this.tileLeft();
        }

        return position;
    }

    /**
     * TODO: write documentation.
     * @param {number} startXPixel
     * @param {number} pixelsRight
     * @returns {number}
     */
    public pixelRight(startXPixel: number, pixelsRight: number = 1) {

        let position = startXPixel + pixelsRight;

        while (position > 256) {
            position -= 256;
            this.tileRight();
        }

        return position;
    }

    /**
     * TODO: write documentation.
     * @param {number} startYPixel
     * @param {number} pixelsUp
     * @returns {number}
     */
    public pixelUp(startYPixel: number, pixelsUp: number = 1) {

        let position = startYPixel - pixelsUp;

        while (position < 1) {
            position += 256;
            this.tileUp();
        }

        return position;
    }

    /**
     * TODO: write documentation.
     * @param {number} tiles
     */
    public tileDown(tiles: number = 1) {

        this.longitude += Math.round(tiles);

        while (this.longitude >= this.max) {
            this.longitude -= this.max;
        }
    }

    /**
     * TODO: write documentation.
     * @param {number} tiles
     */
    public tileLeft(tiles: number = 1) {

        this.latitude -= Math.round(tiles);

        while (this.latitude < 0) {
            this.latitude += this.max;
        }
    }

    /**
     * TODO: write documentation.
     * @param {number} tiles
     */
    public tileRight(tiles: number = 1) {

        this.latitude += Math.round(tiles);

        while (this.latitude >= this.max) {
            this.latitude -= this.max;
        }
    }

    /**
     * TODO: write documentation.
     * @param {number} tiles
     */
    public tileUp(tiles: number = 1) {

        this.longitude -= Math.round(tiles);

        while (this.longitude < 0) {
            this.longitude += this.max;
        }
    }
}
