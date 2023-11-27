// eslint-disable-next-line no-unused-vars
class UI {
    constructor() {
        this.uploadify = document.getElementById('uploadify');
        this.dropArea = document.getElementById('drop-zone');
        this.uploadButton = document.querySelector('button[type="submit"]');
        this.preview = document.querySelector('.preview-image');
        this.copyLink = document.querySelector('.copy-link');
        this.copyLinkButton = document.querySelector('.button-copy-link');
        this.uploadAnother = document.querySelector('.button-upload-another');
        this.tooltipText = document.querySelector('.tooltiptext');
        this.browseFile = document.querySelector('.browse-files');
        this.fileInput = document.querySelector('.file-input');

        this.whatsapp = document.querySelector('.whatsapp a');
        this.facebook = document.querySelector('.facebook a');
        this.twitter = document.querySelector('.twitter a');
        this.email = document.querySelector('.email a');

        this.notification = document.querySelector('.notification');
        this.notificationIcon = document.querySelector('.notification-icon ');
        this.notificationMessage = document.querySelector('.notification-message');

        // Set state
        this.setState('');
    }

    updateProgress(percent) {
        const $progressTrack = document.querySelector('.progress-track');
        const $progressText = document.querySelector('.progress-bar > span');

        $progressTrack.style.width = percent + '%';
        $progressText.textContent = percent + '%';
    }

    displayImage(file) {
        const _this = this;
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend = function () {
            _this.setState('preview');

            const img = document.createElement('img');
            img.src = reader.result;
            img.style.width = '100%'; // For svg file

            // Alread has an image, replace that with new
            if (_this.preview.firstElementChild) {
                _this.preview.firstElementChild.src = reader.result;
            } else {
                _this.preview.appendChild(img);
            }
        };

        this.uploadButton.disabled = false;
    }

    updateShareIconLinks(imageUrl) {
        const whatsappUrl = `whatsapp://send?text=Check out this image: ${imageUrl}L`;
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${imageUrl}`;
        const twitterUrl = `https://twitter.com/intent/tweet?url=${imageUrl}&text=Check out this image:`;
        const emailUrl = `mailto:?subject=Check%20out%20this%20image&body=Hey,%20I%20found%20this%20cool%20image:%20${imageUrl}`;

        this.whatsapp.href = whatsappUrl;
        this.facebook.href = facebookUrl;
        this.twitter.href = twitterUrl;
        this.email.href = emailUrl;
    }

    setState(state = '') {
        switch (state) {
            case 'default':
                this.defaultState();
                break;

            case 'preview':
                this.previewState();
                break;

            case 'uploading':
                this.uploadingSate();
                break;

            case 'uploaded':
                this.uploadedState();
                break;

            default:
                break;
        }
    }

    defaultState() {
        this.innerHTML = '';
        this.uploadify.classList = 'uploadify';
    }

    previewState() {
        this.uploadify.classList.add('state--preview');
    }

    uploadingSate() {
        this.uploadify.classList.remove('state--preview');
        this.uploadify.classList.add('state--uploading');
        this.uploadButton.disabled = true;
    }

    uploadedState() {
        this.uploadify.classList.remove('state--uploading');
        this.uploadify.classList.add('state--uploaded');
    }

    displayCopyUrl(url) {
        this.copyLink.children[0].value = url;
    }

    displayNotice(message = '', status = '') {
        let icon;
        if (status === 'alert') {
            icon =
                '<svg viewBox="64 64 896 896" focusable="false" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path></svg>';
        } else {
            icon = '';
        }

        this.setState('default');
        this.notification.classList.add(status);
        this.notification.classList.remove('d--none', 'animation-fade-out');
        this.notification.classList.add('animation-slide-in');

        this.notificationIcon.innerHTML = icon;
        this.notificationMessage.textContent = message;

        console.log(message);
    }

    clearNotice() {
        if (this.notification.classList.contains('animation-slide-in')) {
            this.notification.classList.remove('animation-slide-in');
            this.notification.classList.add('animation-fade-out');
        }
    }
}

export { UI };
