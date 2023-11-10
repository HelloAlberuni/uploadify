const $uploadify     = document.getElementById('uploadify');
const $dropZone     = document.getElementById('drop-zone');
const $uploadButton = document.querySelector('button[type="submit"]');
const $preview = document.querySelector('.preview-image');
const $copyLink = document.querySelector('.copy-link');
const $copyLinkButton = document.querySelector('.button-copy-link');
const $uploadAnother = document.querySelector('.button-upload-another');
const $tooltipText = document.querySelector('.tooltiptext');

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

    // Preview the image
    initPreviewState();
    let files = e.dataTransfer.files;
    [...files].forEach(function(value, index, arr){
        if(index == 0){
            previewFile(value);
            tempFile.file = value;
        }
    });

    
    // Upload the image
    // let files = e.dataTransfer.files;
    // handleFiles(files);
}

function uploadClickHandler(){
    // Get the file
    const file = tempFile.file;

    // Upload the file
    uploadFile2(file);
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

function handleFiles(files){
    // console.log([...files]);
    [...files].forEach(function(value, index, arr){
        if(index == 0){
            uploadFile2(value);
        }
    });
}

function uploadFile2(file) {
    let url = 'https://api.imgbb.com/1/upload';
    initUploadingSate();
    console.log('init uploading state');
  
    let formData = new FormData();
    formData.append('expiration', 600);
    formData.append('key', '69e20fc50e2631b5b327fef0c291bb52');
    formData.append('image', file);
  
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);

    console.log(xhr);
  
    xhr.onreadystatechange = function () {
        console.log('onreadystatechange');
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // Request was successful
          const response = JSON.parse(xhr.responseText);
          console.log(response, response.data.display_url);
          $copyLink.children[0].value = response.data.display_url;
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
        let percent = Math.round( (e.loaded / e.total) * 100 );
        updateProgress( percent );

        if( percent == 100 ){
            initUploadedState();
        }
    }
  
    xhr.send(formData);
}  

function uploadFile(file){
    let url = 'https://api.imgbb.com/1/upload';

    initUploadingSate();

    let formData = new FormData();
    formData.append('expiration', 600);
    formData.append('key', '69e20fc50e2631b5b327fef0c291bb52');
    formData.append('image', file);

    // Upload the file and get the link
    fetch(url,{
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Resource not found');
            } else if (response.status === 401) {
                throw new Error('Unauthorized request');
            } else {
                throw new Error('Server error');
            }
        }

        return response.json();
    })
    .then(response => {
        // Handle the data on a successful response
        console.log(response, response.data.display_url);

        initUploadedState();
    })
    .catch(error => {
        // Handle errors here
        console.error(error.message);
    });
}

function updateProgress(percent){
    let $progressTrack = document.querySelector('.progress-track');
    let $progressText = document.querySelector('.progress-bar > span');

    $progressTrack.style.width = percent + '%';
    $progressText.textContent = percent + '%';
}

function initUploadingSate(){
    $uploadify.classList.remove('state--preview');
    $uploadify.classList.add('state--uploading');
}

function initUploadedState(){
    $uploadify.classList.remove('state--uploading');
    $uploadify.classList.add('state--uploaded');
}

function initDefaultState(){
    $uploadify.classList = 'uploadify';
}

function copyLink(){
    var copyText = $copyLink.children[0];
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(copyText.value);

    $tooltipText.textContent = 'Copied!';
}

// When drop is complete

// let arr = [8,4,5,1, 3, 4, 6, 8];
// let obj = {0: 4, 1:6, 2:8};
// const myArr = [[1,2,1, [8,9,10]],[3,4],[5,6]];
// let words = ["spray", "limit", "exuberant", "destruction", "elite", "present"];


// let p1 = fetch('https://jsonplaceholder.typicode.com/posts').then(value => value.json());
// let p2 = fetch('https://jsonplaceholder.typicode.com/todos').then(value => value.json());

// Promise.race([p1, p2])
// .then(
//     function(values){
//         console.log(values);
//         // return valuesNew;
//     },
//     function(){}
// ).then(
//     function(data){
//         console.log(data);
//     },
//     function(){}
// )


// let promise1 = fetch('https://jsonplaceholder.typicode.com/posts');
// let x = promise1.then(
//     function(response){
//         return fetch('https://jsonplaceholder.typicode.com/todos');
//     }
// );

// console.log(x); // guess the output:1

// let promise1 = fetch('https://jsonplaceholder.typicode.com/posts');
// let x = promise1.then(
//     function(response){
//         return 999;
//     }
// );

// console.log(x); // guess the output:2