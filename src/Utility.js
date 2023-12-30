class Utility {
    /**
     * The function `arrayIntersect` takes two arrays as input and returns an array containing the
     * elements that are common to both arrays.
     * @param array1
     * @param array2
     *
     * @returns array
     */
    static arrayIntersect(array1, array2) {
        if (!(array1 instanceof Array) || !(array2 instanceof Array)) {
            return [];
        }

        // array2 is the array with fewer elements, so filter through this array
        const matchedElements = array2.filter(function (item) {
            if (array1.includes(item)) {
                return item;
            } else {
                return false;
            }
        });

        return matchedElements;
    }

    /**
     * The function checks if an image file is valid based on its file type and size.
     * @param file - The `file` parameter is the image file that needs to be checked.
     *
     * @returns boolean
     */
    static checkImage(file) {
        const allowedFiles = ['jpg', 'jpeg', 'png', 'webp', 'svg'];
        const isMatched = Utility.arrayIntersect(allowedFiles, file.type.split('/'));
        const currentFileSize = (file.size / 1000000).toFixed(2); // MB

        if (!isMatched.length) {
            // this.uiInstance.displayNotice('Invalid file', 'alert');
            return false;
        }

        if (currentFileSize > this.maxFileSize) {
            // this.uiInstance.displayNotice(`Maximum ${this.maxFileSize}MB is allowed!`, 'alert');
            return false;
        }

        // this.file = file;

        return true;
    }
}

export { Utility };
