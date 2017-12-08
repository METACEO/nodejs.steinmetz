import {eachSeries, series} from 'async';
import {lstatSync, mkdirSync} from 'fs';
import {forEach, get, isError, toString} from 'lodash';
import * as path from 'path';

import {CanvasManagerModel, ConfigModel, PointModel, PolygonModel, PolylineModel} from './models';

/**
 * TODO: write documentation.
 */
export class Steinmetz {

    /**
     * TODO: write documentation.
     * @type {any[]}
     */
    public points: PointModel[] = [];

    /**
     * TODO: write documentation.
     * @type {any[]}
     */
    public polylines: PolylineModel[] = [];

    /**
     * TODO: write documentation.
     * @type {any[]}
     */
    public polygons: PolygonModel[] = [];

    /**
     * TODO: write documentation.
     * @param {number[]} zooms
     * @param {string} out
     * @constructor
     */
    static CreateZoomDirectories(zooms: number[], out: string) {

        const outDir = lstatSync(out);

        if (!outDir.isDirectory()) {
            throw new Error(`The out path (${outDir}) is not a valid directory.`);
        }

        forEach(zooms, zoom => {
            const zoomPath = path.join(out, zoom.toString());
            let zoomError: Error;

            try {
                const zoomDir = lstatSync(zoomPath);

                if (!zoomDir.isDirectory()) {
                    zoomError = new Error(`The zoom path (${zoomPath}) is not a directory.`);
                }

            } catch (error) {
                if (get(error, 'code') === 'ENOENT') {

                    try {
                        mkdirSync(zoomPath);
                    } catch (mkdirError) {

                        console.error(mkdirError);

                        throw new Error(`Failed to create the zoom path (${zoomPath}) directory.`);
                    }

                } else {
                    zoomError = error;
                }
            }

            if (zoomError) {
                throw zoomError;
            }

        });
    }

    /**
     * TODO: write documentation.
     * @param {ConfigModel} config
     */
    constructor(public config?: ConfigModel) {

        this.config = {...new ConfigModel(), ...(config || {})};

        if (!path.isAbsolute(this.config.out)) {
            this.config.out = path.resolve(process.cwd(), this.config.out)
        }

        Steinmetz.CreateZoomDirectories(this.config.zooms, this.config.out);
    }

    /**
     * TODO: write documentation.
     * @param {Function} callback
     */
    public render(callback?: Function) {
        eachSeries(
            this.config.zooms,
            (zoom, next) => {

                const canvasManager = new CanvasManagerModel(this.config, zoom);

                series(
                    [
                        (next) => canvasManager.drawPolygons(this.polygons, next),
                        (next) => canvasManager.drawPolylines(this.polylines, next),
                        (next) => canvasManager.drawPoints(this.points, next),
                        (next) => canvasManager.renderCanvases(next)
                    ],
                    next
                );
            },
            error => {
                if (callback) {
                    callback(error || null);
                } else {
                    if (error) {
                        throw isError(error) ? error : new Error(toString(error));
                    }
                }
            }
        );
    }
}

/**
 * TODO: write documentation.
 */
export * from './models';
