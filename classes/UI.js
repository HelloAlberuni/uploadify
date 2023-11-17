class UI{
    constructor(){
        this.uploadify      = document.getElementById('uploadify');
        this.dropArea       = document.getElementById('drop-zone');
        this.uploadButton   = document.querySelector('button[type="submit"]');
        this.preview        = document.querySelector('.preview-image');
        this.copyLink       = document.querySelector('.copy-link');
        this.copyLinkButton = document.querySelector('.button-copy-link');
        this.uploadAnother  = document.querySelector('.button-upload-another');
        this.tooltipText    = document.querySelector('.tooltiptext');
        this.browseFile     = document.querySelector('.browse-files');
        this.fileInput      = document.querySelector('.file-input');

        this.whatsapp       = document.querySelector('.whatsapp a');
        this.facebook       = document.querySelector('.facebook a');
        this.twitter        = document.querySelector('.twitter a');
        this.email          = document.querySelector('.email a');

        // Set state
        this.setState( '' );
    }

    previewImage( file ){
        this.setState('preview');

        let reader = new FileReader();
    
        reader.readAsDataURL(file);
        let fileSize = (file.size / 1000000).toFixed(2); // MB
    
        if( fileSize > 2 ){
            this.setState('default');
            this.displayMessage('Maximum 2MB is allowed!', 'alert');
            return;
        }
    
        reader.onloadend = function(){
            let img             = document.createElement('img');
                img.src         = reader.result;
                img.style.width = '100%'; // For svg file
    
            // Alread has an image, replace that with new
            if( this.preview.firstElementChild ){
                this.preview.firstElementChild.src = reader.result;
            } else {
                this.preview.appendChild(img);
            }
        }
        
    }

    updateProgress(percent){
        let $progressTrack = document.querySelector('.progress-track');
        let $progressText = document.querySelector('.progress-bar > span');
            
        $progressTrack.style.width = percent + '%';
        $progressText.textContent = percent + '%';
    }

    displayImage( file ){
        const _this = this;
        let reader  = new FileReader();
        
        reader.readAsDataURL(file);
        reader.onloadend = function(){
            _this.setState('preview');

            let img             = document.createElement('img');
                img.src         = reader.result;
                img.style.width = '100%'; // For svg file
    
            // Alread has an image, replace that with new
            if( _this.preview.firstElementChild ){
                _this.preview.firstElementChild.src = reader.result;
            } else {
                _this.preview.appendChild(img);
            }
            
        }
    }

    updateShareIconLinks( imageUrl ){
        let whatsappUrl = `whatsapp://send?text=Check out this image: ${imageUrl}L`;
        let facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${imageUrl}`;
        let twitterUrl = `https://twitter.com/intent/tweet?url=${imageUrl}&text=Check out this image:`;
        let emailUrl = `mailto:?subject=Check%20out%20this%20image&body=Hey,%20I%20found%20this%20cool%20image:%20${imageUrl}`;
    
        this.whatsapp.href = whatsappUrl;
        this.facebook.href = facebookUrl;
        this.twitter.href  = twitterUrl;
        this.email.href    = emailUrl;
    }

    setState( state = '' ){
        switch ( state ) {
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

    defaultState(){        
        this.innerHTML             = '';
        this.uploadButton.disabled = false;
        this.uploadify.classList   = 'uploadify';
    }

    previewState(){        
        this.uploadify.classList.add('state--preview');
    }

    uploadingSate(){        
        this.uploadify.classList.remove('state--preview');
        this.uploadify.classList.add('state--uploading');
        this.uploadButton.disabled = true;
    }

    uploadedState(){        
        this.uploadify.classList.remove('state--uploading');
        this.uploadify.classList.add('state--uploaded');
    }

    displayMessage( message = '', status = '' ){
        this.setState('default');       
        
        console.log(message);
    }

    displayCopyUrl( url ){
        this.copyLink.children[0].value = url;
    }
}