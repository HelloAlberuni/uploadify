const $dropZone = document.getElementById('drop-zone');

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

function handleDragOver(e){
    // Hilight the drop zone
    $dropZone.classList.add('hilight');
}

function handleDragLeave(e){
    $dropZone.classList.remove('hilight');
}

function handleDrop(e){
    e.preventDefault();

    // Remove hilight
    $dropZone.classList.remove('hilight');
    
    // Upload the image
    let files = e.dataTransfer.files;
    handleFiles(files);
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
    // uploadingSate();
  
    let formData = new FormData();
    formData.append('expiration', 600);
    formData.append('key', '69e20fc50e2631b5b327fef0c291bb52');
    formData.append('image', file);
  
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // Request was successful
          const response = JSON.parse(xhr.responseText);
          console.log(response, response.data.display_url);
        //   uploadedState();
        } else {
          // Handle errors
          if (xhr.status === 404) {
            console.error('Resource not found');
          } else if (xhr.status === 401) {
            console.error('Unauthorized request');
          } else {
            console.error('Server error');
          }
        }
      }
    };

    xhr.upload.onprogress = function(e){
        console.log('total', e.total);
        console.log('loaded', e.loaded);
    }
  
    xhr.send(formData);
}  

function uploadFile(file){
    let url = 'https://api.imgbb.com/1/upload';

    uploadingSate();

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

        uploadedState();
    })
    .catch(error => {
        // Handle errors here
        console.error(error.message);
    });
}

function uploadingSate(){
    let $uploader = document.getElementById('drop-zone');
    $uploader.classList.add('uploading');
}

function uploadedState(){
    let $uploader = document.getElementById('drop-zone');
    $uploader.classList.remove('uploading').add('uploaded');
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