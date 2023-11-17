const uiInstance       = new UI();

class App{
    constructor(){
        const self = this;
    
        ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function(event) {
            uiInstance.dropArea.addEventListener(event, self.stopPropagationn);
        });

        // Add image drag/drop or paste
        uiInstance.dropArea.addEventListener('dragover', this.dragOverHandler);
        uiInstance.dropArea.addEventListener('dragleave', this.dragLeaveHandler);

        this.dropHandler = this.dropHandler.bind(this);
        uiInstance.dropArea.addEventListener('drop', this.dropHandler);

        this.pasteHandler = this.pasteHandler.bind(this);
        document.addEventListener('paste', this.pasteHandler);

        // Add image manually
        uiInstance.browseFile.addEventListener('click', this.browseFilesHandler);

        this.manuallyAddImage = this.manuallyAddImage.bind(this);
        uiInstance.fileInput.addEventListener('change', this.manuallyAddImage);

        // Upload image button
        this.uploadButtonHandler = this.uploadButtonHandler.bind(this);
        uiInstance.uploadButton.addEventListener('click', this.uploadButtonHandler);

        // Upload another image button
        uiInstance.uploadAnother.addEventListener('click', this.uploadAnotherButtonHandler);

        // Copy link after upload
        this.copyLinkToClipboard = this.copyLinkToClipboard.bind(this);
        uiInstance.copyLinkButton.addEventListener('click', this.copyLinkToClipboard);

        // File will be stored in this property
        this.file = '';
    }

    stopPropagationn( event ){
        event.preventDefault();
        event.stopPropagation();
    }

    dragOverHandler( event ){        
        // Hilight the drop zone
        uiInstance.dropArea.classList.add('hilight');
    }
    
    dragLeaveHandler( event ){        
        uiInstance.dropArea.classList.remove('hilight');
    }

    dropHandler( event ){
        event.preventDefault();
        const _this = this;
    
        // Remove hilight
        uiInstance.dropArea.classList.remove('hilight');
    
        // Remove any image previusly uploaded
        uiInstance.preview.innerHTML = '';
    
        // Preview the image
        let files = event.dataTransfer.files;
        [...files].forEach(function(value, index, arr){
            if(index == 0 && _this.checkImage(value)){
                _this.file = value;
                uiInstance.displayImage(value);
            }
        });
    }

    pasteHandler( event ){
        const files = event.clipboardData.files // get files list
        let text    = '';
    
        if( files.length && this.checkImage( files[0] ) ){
            uiInstance.displayImage( files[0] );
        } else if( !files.length ) {
            text = event.clipboardData.getData('text');            
        }
    }

    browseFilesHandler( event ){
        event.preventDefault();
        uiInstance.fileInput.click();
    }

    manuallyAddImage( event ){
        const fileList = event.target.files;
        
        if( fileList.length > 0 && this.checkImage(fileList[0]) ){
            uiInstance.displayImage(fileList[0]);
        }
    }

    checkImage( file ){
        const allowedFiles = ['jpg', 'jpeg', 'png', 'webp', 'svg'];
        let isMatched      = this.arrayIntersect( allowedFiles,  file.type.split('/') );
        let fileSize       = (file.size / 1000000).toFixed(2); // MB

        if( !isMatched.length ){
            uiInstance.displayMessage('Invalid file', 'alert');
            return false;
        }

        if( fileSize > 2 ){
            uiInstance.displayMessage('Maximum 2MB is allowed!', 'alert');
            return false;
        }

        this.file = file;

        return true;
    }

    uploadButtonHandler( event ){
        const uploaderInstance = new Uploader();

        // Upload the file
        uploaderInstance.uploadFile( this.file );
    }

    uploadAnotherButtonHandler( event ){
        event.preventDefault();
    
        if( uiInstance.uploadify.classList.contains('state--uploaded') ){
            uiInstance.setState('default');
        }
    }

    arrayIntersect( array1,  array2){
        // array2 is the array with fewer elements, so filter through this array
        const matchedElements = array2.filter(function(item){
            if( array1.includes(item) ){
                return item;
            }
        });
    
        return matchedElements;
    }

    copyLinkToClipboard( event ){
        event.preventDefault();

        var copyText = uiInstance.copyLink.children[0];
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices
        navigator.clipboard.writeText(copyText.value);
    
        uiInstance.tooltipText.textContent = 'Copied!';
    }
}

let app = new App();

