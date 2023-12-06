import './styles/main.scss';

import { UI } from './UI.js';
import { Uploader } from './Uploader.js';
import { Utility } from './Utility.js';

class App {
    constructor() {
        // Create instances
        // eslint-disable-next-line no-undef
        this.uiInstance = new UI();

        // eslint-disable-next-line no-undef
        this.uploaderInstance = new Uploader();

        // File will be stored in this property
        this.file = '';

        // Max file size
        this.maxFileSize = 2; // MB
    }

    init() {
        ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(
            (event) => {
                this.uiInstance.body.addEventListener(event, this.stopPropagationn);
            }
        );

        // Add image drag/drop or paste
        this.uiInstance.body.addEventListener('dragover', this.dragOverHandler);
        this.uiInstance.body.addEventListener('dragleave', this.dragLeaveHandler);
        this.uiInstance.body.addEventListener('drop', this.dropHandler);
        document.addEventListener('paste', this.pasteHandler);

        // Add image manually
        this.uiInstance.browseFile.addEventListener('click', this.browseFilesHandler);
        this.uiInstance.fileInput.addEventListener('change', this.manuallyAddImage);

        // Upload image button
        this.uiInstance.uploadButton.addEventListener('click', this.uploadButtonHandler);

        // Upload another image button
        this.uiInstance.uploadAnother.addEventListener('click', this.uploadAnotherButtonHandler);

        // Copy link after upload
        this.uiInstance.copyLinkButton.addEventListener('click', this.copyLinkToClipboard);

        // Dismiss notice
        document.addEventListener('click', this.dismissNotice);
    }

    stopPropagationn = (event) => {
        event.preventDefault();
        event.stopPropagation();

        this.uiInstance.clearNotice();
    };

    dragOverHandler = (event) => {
        // Hilight the drop zone
        this.uiInstance.dropArea.classList.add('hilight');

        this.uiInstance.clearNotice();
    };

    dragLeaveHandler = (event) => {
        this.uiInstance.dropArea.classList.remove('hilight');
    };

    dropHandler = (event) => {
        event.preventDefault();

        // Remove hilight
        this.uiInstance.dropArea.classList.remove('hilight');

        // Remove any image previusly uploaded
        this.uiInstance.preview.innerHTML = '';

        // Preview the image
        const files = event.dataTransfer.files;
        [...files].forEach((value, index, arr) => {
            if (index === 0 && this.checkImage(value)) {
                this.file = value;
                this.uiInstance.displayImage(value);
            }
        });
    };

    pasteHandler = (event) => {
        const files = event.clipboardData.files; // get files list
        let text = '';

        if (files.length && this.checkImage(files[0])) {
            this.uiInstance.displayImage(files[0]);
        } else if (!files.length) {
            // eslint-disable-next-line no-unused-vars
            text = event.clipboardData.getData('text'); // text in the clipboard
            this.uiInstance.displayNotice('There is no file in your clipboard!', 'alert');
        }
    };

    browseFilesHandler = (event) => {
        event.preventDefault();
        this.uiInstance.fileInput.click();
    };

    manuallyAddImage = (event) => {
        const fileList = event.target.files;

        if (fileList.length > 0 && this.checkImage(fileList[0])) {
            this.uiInstance.displayImage(fileList[0]);
        }
    };

    /**
     * The function checks if an image file is valid based on its file type and size.
     * @param file - The `file` parameter is the image file that needs to be checked.
     *
     * @returns boolean
     */
    checkImage(file) {
        const allowedFiles = ['jpg', 'jpeg', 'png', 'webp', 'svg'];
        const isMatched = Utility.arrayIntersect(allowedFiles, file.type.split('/'));
        const currentFileSize = (file.size / 1000000).toFixed(2); // MB

        if (!isMatched.length) {
            this.uiInstance.displayNotice('Invalid file', 'alert');
            return false;
        }

        if (currentFileSize > this.maxFileSize) {
            this.uiInstance.displayNotice(`Maximum ${this.maxFileSize}MB is allowed!`, 'alert');
            return false;
        }

        this.file = file;

        return true;
    }

    uploadButtonHandler = (event) => {
        // Upload the file
        this.uploaderInstance.uploadFile(this.file);
    };

    uploadAnotherButtonHandler = (event) => {
        event.preventDefault();

        if (this.uiInstance.uploadify.classList.contains('state--uploaded')) {
            this.uiInstance.setState('default');
        }
    };

    copyLinkToClipboard = (event) => {
        event.preventDefault();

        const copyText = this.uiInstance.copyLink.children[0];
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices
        navigator.clipboard.writeText(copyText.value);

        this.uiInstance.tooltipText.textContent = 'Copied!';
    };

    dismissNotice = (event) => {
        // Outside of the notification element
        if (!this.uiInstance.notification.contains(event.target)) {
            this.uiInstance.clearNotice();
        }
    };
}

const app = new App();
app.init();
