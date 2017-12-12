import {forEachOfSeries} from 'async';
import * as Canvas from 'canvas';
import {createWriteStream, lstat, writeFile} from 'fs';
import {forEach, once} from 'lodash';
import * as path from 'path';
import * as sharp from 'sharp';

import {ConfigModel} from './config.model';
import {CoordinateModel} from './coordinate.model';
import {PointModel} from './point.model';
import {PolygonModel} from './polygon.model';
import {PolylineModel} from './polyline.model';
import {TileCursorModel} from './tile-cursor.model';

/**
 * TODO: write documentation.
 */
export class CanvasManagerModel {

    /**
     * TODO: write documentation.
     * @type {sharp.SharpInstance | Promise<Buffer>}
     */
    emptyCanvasBuffer: Buffer = (new Canvas(256, 256)).toBuffer('raw');

    /**
     * TODO: write documentation.
     * @type {{}}
     */
    canvases: { [latitude: string]: { [longitude: string]: Canvas } } = {};

    /**
     * TODO: write documentation.
     * @param {ConfigModel} steinmetzConfig
     * @param {number} zoom
     */
    constructor(public steinmetzConfig: ConfigModel,
                public zoom: number) {
    }

    /**
     * TODO: write documentation.
     * @param {CoordinateModel[]} coordinates
     */
    public createNewCanvases(coordinates: CoordinateModel[]) {
        forEach(coordinates, coordinate => {
            if (this.canvases[coordinate.latitude] === undefined) {
                this.canvases[coordinate.latitude] = {};
            }
            if (this.canvases[coordinate.latitude][coordinate.longitude] === undefined) {
                this.canvases[coordinate.latitude][coordinate.longitude] = new Canvas(256, 256);
            }
        });
    }

    /**
     * TODO: write documentation.
     * @param {CoordinateModel} coordinate
     * @returns {CanvasRenderingContext2D}
     */
    public getCanvasContext(coordinate: CoordinateModel): CanvasRenderingContext2D {

        const normalizedTile = new TileCursorModel(coordinate.latitude, coordinate.longitude, this.zoom);

        const normalizedCoordinate = normalizedTile.getTileCoordinate();

        this.createNewCanvases([normalizedCoordinate]);

        return this.canvases[normalizedCoordinate.latitude][normalizedCoordinate.longitude].getContext('2d');
    }

    /**
     * TODO: write documentation.
     * @param {PointModel[]} points
     * @param {(error: Error) => void} callback
     */
    public drawPoints(points: PointModel[],
                      callback: (error: Error) => void) {

        forEach(points, point => point.drawToCanvases(this));

        callback(null);
    }

    /**
     * TODO: write documentation.
     * @param {PolylineModel[]} polylines
     * @param {(error: Error) => void} callback
     */
    public drawPolylines(polylines: PolylineModel[],
                         callback: (error: Error) => void) {

        forEach(polylines, polyline => polyline.drawToCanvases(this));

        callback(null);
    }

    /**
     * TODO: write documentation.
     * @param {PolygonModel[]} polygons
     * @param {(error: Error) => void} callback
     */
    public drawPolygons(polygons: PolygonModel[],
                        callback: (error: Error) => void) {

        forEach(polygons, polygon => polygon.drawToCanvases(this));

        callback(null);
    }

    /**
     * TODO: write documentation.
     * @param {(error: Error) => void} callback
     */
    public renderCanvases(callback: (error: Error) => void) {
        forEachOfSeries(
            this.canvases,
            (canvases, x: string, next) => {
                forEachOfSeries(
                    canvases,
                    (canvas: Canvas, y: string, next) => {

                        // If the canvas is a bad value then skip.
                        if (!canvas) {
                            return next();
                        }

                        // If the canvas was initiated but never drawn on, then skip.
                        if (this.emptyCanvasBuffer.equals(canvas.toBuffer('raw'))) {
                            return next();
                        }

                        // Use this file path for checks and output.
                        const filePath = path.join(this.steinmetzConfig.out, this.zoom.toString(), `${x}-${y}.png`);

                        // Check to see if the file path exists already.
                        lstat(filePath, (error, stats) => {

                            let merge = null;

                            if (error) {
                                if (error.code === 'ENOENT') {
                                    // The file does not yet exist.
                                    merge = false;
                                } else {
                                    // Some other error occurred.
                                    merge = error;
                                }
                            } else {
                                // Something exists at the file path.
                                if (stats.isFile()) {
                                    // It is an existing file we should merge together.
                                    merge = true;
                                } else {
                                    // It is not a file type, return an error.
                                    merge = new Error(`The file path (${filePath}) is not a valid file.`);
                                }
                            }

                            switch (merge) {
                                case true: {
                                    // Use sharp to merge the previous file with the canvas buffer.
                                    sharp(filePath)
                                        .overlayWith(
                                            canvas.toBuffer(),
                                            {left: 0, top: 0}
                                        )
                                        .toBuffer()
                                        .then((outBuffer) => {
                                            writeFile(
                                                filePath,
                                                outBuffer,
                                                (error) => next(error || null)
                                            );
                                        });

                                    break;
                                }
                                case false: {
                                    // Write the canvas buffer to a new file.
                                    const out = createWriteStream(filePath);
                                    const stream = canvas.pngStream();
                                    const callOnce = once(next);
                                    stream.on('data', (chunk) => out.write(chunk));
                                    stream.on('end', () => {
                                        out.end();
                                        callOnce()
                                    });

                                    // Return any errors:
                                    stream.on('error', (error) => callOnce(error));

                                    break;
                                }
                                default: {
                                    // If an error occurred when checking the file, return it.
                                    next(merge);
                                }
                            }
                        });
                    },
                    next
                )
            },
            (error) => callback(<Error>error || null)
        );
    }

}
