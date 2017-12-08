import {join} from 'path';

/**
 * TODO: write documentation.
 */
export class ConfigModel {

    /**
     * TODO: write documentation.
     * @param {number[]} zooms
     * @param {string} out
     */
    constructor(public zooms?: number[],
                public out?: string) {

        this.zooms = zooms || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

        this.out = out || join(process.cwd(), 'steinmetz-out');
    }
}
