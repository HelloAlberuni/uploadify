const $uploadify     = document.getElementById('uploadify');
const $dropZone     = document.getElementById('drop-zone');
const $uploadButton = document.querySelector('button[type="submit"]');
const $preview = document.querySelector('.preview-image');
const $copyLink = document.querySelector('.copy-link');
const $copyLinkButton = document.querySelector('.button-copy-link');
const $uploadAnother = document.querySelector('.button-upload-another');
const $tooltipText = document.querySelector('.tooltiptext');
const $browseFile = document.querySelector('.browse-files');
const $fileInput = document.querySelector('.file-input');

const $whatsapp = document.querySelector('.whatsapp a');
const $facebook = document.querySelector('.facebook a');
const $twitter = document.querySelector('.twitter a');
const $email = document.querySelector('.email a');

const tempFile = {};

['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function(event) {
    $dropZone.addEventListener(event, function(e) {
      e.preventDefault();
      e.stopPropagation();
    });
  });

// When dragging over the drop-zone
$dropZone.addEventListener('dragover', handleDragOver);
$dropZone.addEventListener('dragleave', handleDragLeave);
$dropZone.addEventListener('drop', handleDrop);
$uploadButton.addEventListener('click', uploadClickHandler);
$copyLinkButton.addEventListener('click', copyLinkHanlder);
$uploadAnother.addEventListener('click', handleUploadAnother);
$fileInput.addEventListener('change', fileChangeHandler);
document.addEventListener('keydown', keyPressHandler);

function keyPressHandler(event){
    const isCmdOrCtrl = (event.metaKey || event.ctrlKey); // Support for both windows + mac
    const isVKey = (event.key === 'v' || event.key === 'V');

    if ( isCmdOrCtrl && isVKey ) {

    }
}

function isMacOS() {
    const userAgent = navigator.userAgent;
    
    let os;

    if (userAgent.indexOf('Win') !== -1) {
        os = 'Windows';
    } else if (userAgent.indexOf('Mac') !== -1) {
        os = 'MacOS';
    } else if (userAgent.indexOf('Linux') !== -1) {
        os = 'Linux';
    } else if (userAgent.indexOf('Android') !== -1) {
        os = 'Android';
    } else if (userAgent.indexOf('iOS') !== -1) {
        os = 'iOS';
    } else {
        os = 'Unknown';
    }

    return os;
}

function fileChangeHandler( e ){
    console.log('file changed');
    console.log($fileInput.files);
    
    if( $fileInput.files.length > 0 ){
        let selectedFile = $fileInput.files[0];

        // check if image
        if( selectedFile.type.match('image') ){
            previewFile(selectedFile);
        }
    }
}

$browseFile.addEventListener('click', browseFilesHandler);

function browseFilesHandler(e){

    // console.log('browseFilesHandler');
    // console.log($fileInput);

    $fileInput.click();
}

function copyLinkHanlder(e){
    e.preventDefault();

    copyLink();
}

function handleDragOver(e){
    // Hilight the drop zone
    $dropZone.classList.add('hilight');
}

function handleDragLeave(e){
    $dropZone.classList.remove('hilight');
}

function previewFile(file){
    initPreviewState();
    let reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = function(){
        let img = document.createElement('img');
            img.src = reader.result;

        $preview.appendChild(img);
    }
    
}

function handleDrop(e){
    e.preventDefault();

    // Remove hilight
    $dropZone.classList.remove('hilight');

    // Remove any image previusly uploaded
    $preview.innerHTML = '';

    // Preview the image
    let files = e.dataTransfer.files;
    [...files].forEach(function(value, index, arr){
        if(index == 0){
            previewFile(value);
            tempFile.file = value;
        }
    });
}

function uploadClickHandler(){
    // Get the file
    const file = tempFile.file;

    // Upload the file
    uploadFile(file);
}

function handleUploadAnother(e){
    e.preventDefault();

    if( $uploadify.classList.contains('state--uploaded') ){
        initDefaultState();
    }
}

function initPreviewState(){
    $uploadify.classList.add('state--preview');
}

function uploadFile(file) {
    let url = 'https://api.imgbb.com/1/upload';
    initUploadingSate();
    console.log('init uploading state');
  
    let formData = new FormData();
    formData.append('expiration', 600);
    formData.append('key', '69e20fc50e2631b5b327fef0c291bb52');
    formData.append('image', file);
  
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // Request was successful
          const response = JSON.parse(xhr.responseText);
          console.log(response);
          $copyLink.children[0].value = response.data.display_url;

          updateProgress( 100 );

          // Intentionally create a little delay to wait for showing 100%.(it take a few moment based on the network speed, while downloading the image after upload)
          setTimeout(function(){
            initUploadedState();
            updateShareIconLinks(response.data.display_url);
          }, 300 );
        } else {
          // Handle errors
          if (xhr.status === 404) {
            console.error('Resource not found:' + xhr.responseText);
          } else if (xhr.status === 401) {
            console.error('Unauthorized request:' + xhr.responseText);
          } else {
            console.error('Server error:' + xhr.responseText);
          }
        }
      }
    };

    xhr.upload.onprogress = function(e){
        if ( e.lengthComputable ) {
            
            let percent = Math.round( (e.loaded / e.total) * 100 );
            console.log('e.loaded', e.loaded + '/' + e.total);
            console.log(percent);

            if( percent < 100 ){
                updateProgress( percent );
            }
        }
    }
  
    xhr.send(formData);
}

function updateProgress(percent){
    let $progressTrack = document.querySelector('.progress-track');
    let $progressText = document.querySelector('.progress-bar > span');

    console.log(percent);
    $progressTrack.style.width = percent + '%';
    $progressText.textContent = percent + '%';
}

function initUploadingSate(){
    $uploadify.classList.remove('state--preview');
    $uploadify.classList.add('state--uploading');
    $uploadButton.disabled = true;
}

function initUploadedState(){
    $uploadify.classList.remove('state--uploading');
    $uploadify.classList.add('state--uploaded');
}

function initDefaultState(){
    $preview.innerHTML = '';
    $uploadButton.disabled = false;
    $uploadify.classList = 'uploadify';
}

function updateShareIconLinks( imageUrl ){
    let whatsappUrl = `whatsapp://send?text=Check out this image: ${imageUrl}L`;
    let facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${imageUrl}`;
    let twitterUrl = `https://twitter.com/intent/tweet?url=${imageUrl}&text=Check out this image:`;
    let emailUrl = `mailto:?subject=Check%20out%20this%20image&body=Hey,%20I%20found%20this%20cool%20image:%20${imageUrl}`;

    $whatsapp.href = whatsappUrl;
    $facebook.href = facebookUrl;
    $twitter.href  = twitterUrl;
    $email.href    = emailUrl;
}

function copyLink(){
    var copyText = $copyLink.children[0];
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(copyText.value);

    $tooltipText.textContent = 'Copied!';
}