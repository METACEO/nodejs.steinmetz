import {CanvasManagerModel} from './canvas-manager.model';
import {CoordinateModel} from './coordinate.model';
import {ImageModel} from './image.model';
import {PositionModel} from './position.model';
import {TileCursorModel} from './tile-cursor.model';

/**
 * TODO: write documentation.
 */
export class PointModel {

    /**
     * TODO: write documentation.
     * @param {CoordinateModel} coordinate
     * @param {ImageModel} image
     */
    constructor(public coordinate: CoordinateModel,
                public image: ImageModel) {
    }

    /**
     * TODO: write documentation.
     * @param {CanvasManagerModel} canvasManager
     */
    public drawToCanvases(canvasManager: CanvasManagerModel) {

        const position = new PositionModel(this.coordinate, canvasManager.zoom);

        const cursor = TileCursorModel.NewFromPosition(position);

        const left = cursor.pixelLeft(position.pixel.latitude, this.image.widthHalf);
        const top = cursor.pixelUp(position.pixel.longitude, this.image.heightHalf);

        const right = left + this.image.width > 256
            ? Math.ceil((this.image.width - (256 - left)) / 256)
            : 0;

        const down = top + this.image.height > 256
            ? Math.ceil((this.image.height - (256 - top)) / 256)
            : 0;

        let origin_ref = new CoordinateModel(left, top);

        for (let longitude = cursor.longitude, longitude_end = cursor.longitude + down; longitude <= longitude_end; longitude++) {

            const original_latitude = origin_ref.latitude;

            for (let latitude = cursor.latitude, latitude_end = cursor.latitude + right; latitude <= latitude_end; latitude++) {

                const context = canvasManager.getCanvasContext(new CoordinateModel(latitude, longitude));

                context.drawImage(
                    this.image.image,
                    origin_ref.latitude,
                    origin_ref.longitude,
                    this.image.width,
                    this.image.height
                );

                origin_ref.latitude -= 256;
            }

            origin_ref.latitude = original_latitude;
            origin_ref.longitude -= 256;
        }

    }
}
