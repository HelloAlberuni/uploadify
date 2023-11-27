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
}

export { Utility };
