class ImageService {
    getDimensions(base64) {
        return new Promise(function(resolved, rejected) {
            var i = new Image()
            i.onload = function() {
                resolved({ w: i.width, h: i.height })
            };
            i.src = base64
        })
    }

    /** 
     * Given an image and a wanted height, returns the new width
     * that preserves aspect ratio
     */
    getWidthFromNewHeight(base64, wantedHeight) {
        this.getDimensions(base64).then(function(dimension) {
            return Math.round(parseFloat(dimension.w) * parseFloat(wantedHeight) / parseFloat(dimension.h));
        })
    }

    createFilter(filterObject) {
        let filters = "brightness(" + filterObject.brightness + ") " +
            "contrast(" + filterObject.contrast + ") "

        if (filterObject.saturation == 0.0) {
            filters = filters + "grayscale(100%)"
        } else {
            filters = filters + "saturate(" + filterObject.saturation + ") "
        }

        return filters
    }
}

export default new ImageService()