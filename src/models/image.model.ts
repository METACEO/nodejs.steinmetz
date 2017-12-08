import * as Canvas from 'canvas';
import {readFileSync} from 'fs';

/**
 * TODO: write documentation.
 */
export class ImageModel {

    /**
     * TODO: write documentation.
     */
    public image: Canvas.Image;

    /**
     * TODO: write documentation.
     */
    public height: number;

    /**
     * TODO: write documentation.
     */
    public heightHalf: number;

    /**
     * TODO: write documentation.
     */
    public width: number;

    /**
     * TODO: write documentation.
     */
    public widthHalf: number;

    /**
     * TODO: write documentation.
     */
    public source: Buffer;

    /**
     * TODO: write documentation.
     * @param {Buffer} buffer
     * @param {string} location
     */
    constructor(public buffer: Buffer,
                public location: string) {

        if (!buffer && !location) {
            throw new Error('No image provided.');
        }

        if (buffer) {
            this.source = buffer;
        }

        if (location) {
            this.source = readFileSync(location);
        }

        this.image = new Canvas.Image;
        this.image.src = this.source;

        this.height = this.image.height;
        this.heightHalf = this.height / 2;

        this.width = this.image.width;
        this.widthHalf = this.width / 2;
    }
}
