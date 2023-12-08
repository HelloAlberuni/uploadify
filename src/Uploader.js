import { UI } from './UI.js';

// eslint-disable-next-line no-unused-vars
class Uploader {
    constructor() {
        // Instances
        // eslint-disable-next-line no-undef
        this.uiInstance = new UI();

        this.apiEndpoint = 'https://api.imgbb.com/1/upload';
        this.apiKey = '69e20fc50e2631b5b327fef0c291bb52';
        this.expiration = 0;
    }

    uploadFile(file) {
        this.uiInstance.setState('uploading');

        const formData = new FormData();
        formData.append('expiration', this.expiration);
        formData.append('key', this.apiKey);
        formData.append('image', file);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', this.apiEndpoint, true);
        xhr.setRequestHeader('Accept', '/');

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // Request was successful
                    const response = JSON.parse(xhr.responseText);
                    const imageUrl = response.data.display_url;

                    this.uiInstance.displayCopyUrl(imageUrl);
                    this.uiInstance.updateProgress(100);

                    // Intentionally create a little delay to wait for showing 100%.(it take a few moment based on the network speed, while downloading the image after upload)
                    setTimeout(() => {
                        this.uiInstance.setState('uploaded');
                        this.uiInstance.updateShareIconLinks(imageUrl);
                    }, 300);
                } else {
                    // Handle errors
                    if (xhr.status === 404) {
                        this.uiInstance.displayNotice(
                            'Resource not found:' + xhr.responseText,
                            'alert'
                        );
                    } else if (xhr.status === 401) {
                        this.uiInstance.displayNotice(
                            'Unauthorized request:' + xhr.responseText,
                            'alert'
                        );
                    } else {
                        this.uiInstance.displayNotice(
                            'Unexpected error from server. Please check your browser console.' +
                                xhr.responseText,
                            'alert'
                        );
                        console.log(xhr.responseText);
                    }
                }
            }
        };

        xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
                const percent = Math.round((e.loaded / e.total) * 100);

                if (percent < 100) {
                    this.uiInstance.updateProgress(percent);
                }
            }
        };

        xhr.send(formData);
    }
}

export { Uploader };
