var l=Object.defineProperty;var d=(o,e,t)=>e in o?l(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var n=(o,e,t)=>(d(o,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();class c{constructor(){this.uploadify=document.getElementById("uploadify"),this.dropArea=document.getElementById("drop-zone"),this.uploadButton=document.querySelector('button[type="submit"]'),this.preview=document.querySelector(".preview-image"),this.copyLink=document.querySelector(".copy-link"),this.copyLinkButton=document.querySelector(".button-copy-link"),this.uploadAnother=document.querySelector(".button-upload-another"),this.tooltipText=document.querySelector(".tooltiptext"),this.browseFile=document.querySelector(".browse-files"),this.fileInput=document.querySelector(".file-input"),this.whatsapp=document.querySelector(".whatsapp a"),this.facebook=document.querySelector(".facebook a"),this.twitter=document.querySelector(".twitter a"),this.email=document.querySelector(".email a"),this.notification=document.querySelector(".notification"),this.notificationIcon=document.querySelector(".notification-icon "),this.notificationMessage=document.querySelector(".notification-message"),this.setState("")}updateProgress(e){const t=document.querySelector(".progress-track"),i=document.querySelector(".progress-bar > span");t.style.width=e+"%",i.textContent=e+"%"}displayImage(e){const t=this,i=new FileReader;i.readAsDataURL(e),i.onloadend=function(){t.setState("preview");const s=document.createElement("img");s.src=i.result,s.style.width="100%",t.preview.firstElementChild?t.preview.firstElementChild.src=i.result:t.preview.appendChild(s)},this.uploadButton.disabled=!1}updateShareIconLinks(e){const t=`whatsapp://send?text=Check out this image: ${e}L`,i=`https://www.facebook.com/sharer/sharer.php?u=${e}`,s=`https://twitter.com/intent/tweet?url=${e}&text=Check out this image:`,a=`mailto:?subject=Check%20out%20this%20image&body=Hey,%20I%20found%20this%20cool%20image:%20${e}`;this.whatsapp.href=t,this.facebook.href=i,this.twitter.href=s,this.email.href=a}setState(e=""){switch(e){case"default":this.defaultState();break;case"preview":this.previewState();break;case"uploading":this.uploadingSate();break;case"uploaded":this.uploadedState();break}}defaultState(){this.innerHTML="",this.uploadify.classList="uploadify"}previewState(){this.uploadify.classList.add("state--preview")}uploadingSate(){this.uploadify.classList.remove("state--preview"),this.uploadify.classList.add("state--uploading"),this.uploadButton.disabled=!0}uploadedState(){this.uploadify.classList.remove("state--uploading"),this.uploadify.classList.add("state--uploaded")}displayCopyUrl(e){this.copyLink.children[0].value=e}displayNotice(e="",t=""){let i;t==="alert"?i='<svg viewBox="64 64 896 896" focusable="false" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path></svg>':i="",this.setState("default"),this.notification.classList.add(t),this.notification.classList.remove("d--none","animation-fade-out"),this.notification.classList.add("animation-slide-in"),this.notificationIcon.innerHTML=i,this.notificationMessage.textContent=e,console.log(e)}clearNotice(){this.notification.classList.contains("animation-slide-in")&&(this.notification.classList.remove("animation-slide-in"),this.notification.classList.add("animation-fade-out"))}}class u{constructor(){this.uiInstance=new c,this.apiEndpoint="https://api.imgbb.com/1/upload",this.apiKey="69e20fc50e2631b5b327fef0c291bb52",this.expiration=0}uploadFile(e){this.uiInstance.setState("uploading");const t=new FormData;t.append("expiration",this.expiration),t.append("key",this.apiKey),t.append("image",e);const i=new XMLHttpRequest;i.open("POST",this.apiEndpoint,!0),i.onreadystatechange=()=>{if(i.readyState===XMLHttpRequest.DONE)if(i.status===200){const a=JSON.parse(i.responseText).data.display_url;this.uiInstance.displayCopyUrl(a),this.uiInstance.updateProgress(100),setTimeout(()=>{this.uiInstance.setState("uploaded"),this.uiInstance.updateShareIconLinks(a)},300)}else i.status===404?this.uiInstance.displayNotice("Resource not found:"+i.responseText,"alert"):i.status===401?this.uiInstance.displayNotice("Unauthorized request:"+i.responseText,"alert"):this.uiInstance.displayNotice("Server error:"+i.responseText,"alert")},i.upload.onprogress=s=>{if(s.lengthComputable){const a=Math.round(s.loaded/s.total*100);a<100&&this.uiInstance.updateProgress(a)}},i.send(t)}}class p{static arrayIntersect(e,t){return!(e instanceof Array)||!(t instanceof Array)?[]:t.filter(function(s){return e.includes(s)?s:!1})}}class h{constructor(){n(this,"stopPropagationn",e=>{e.preventDefault(),e.stopPropagation(),this.uiInstance.clearNotice()});n(this,"dragOverHandler",e=>{this.uiInstance.dropArea.classList.add("hilight"),this.uiInstance.clearNotice()});n(this,"dragLeaveHandler",e=>{this.uiInstance.dropArea.classList.remove("hilight")});n(this,"dropHandler",e=>{e.preventDefault(),this.uiInstance.dropArea.classList.remove("hilight"),this.uiInstance.preview.innerHTML="",[...e.dataTransfer.files].forEach((i,s,a)=>{s===0&&this.checkImage(i)&&(this.file=i,this.uiInstance.displayImage(i))})});n(this,"pasteHandler",e=>{const t=e.clipboardData.files;t.length&&this.checkImage(t[0])?this.uiInstance.displayImage(t[0]):t.length||(e.clipboardData.getData("text"),this.uiInstance.displayNotice("There is no file in your clipboard!","alert"))});n(this,"browseFilesHandler",e=>{e.preventDefault(),this.uiInstance.fileInput.click()});n(this,"manuallyAddImage",e=>{const t=e.target.files;t.length>0&&this.checkImage(t[0])&&this.uiInstance.displayImage(t[0])});n(this,"uploadButtonHandler",e=>{this.uploaderInstance.uploadFile(this.file)});n(this,"uploadAnotherButtonHandler",e=>{e.preventDefault(),this.uiInstance.uploadify.classList.contains("state--uploaded")&&this.uiInstance.setState("default")});n(this,"copyLinkToClipboard",e=>{e.preventDefault();const t=this.uiInstance.copyLink.children[0];t.select(),t.setSelectionRange(0,99999),navigator.clipboard.writeText(t.value),this.uiInstance.tooltipText.textContent="Copied!"});n(this,"dismissNotice",e=>{this.uiInstance.notification.contains(e.target)||this.uiInstance.clearNotice()});this.uiInstance=new c,this.uploaderInstance=new u,this.file="",this.maxFileSize=2}init(){["drag","dragstart","dragend","dragover","dragenter","dragleave","drop"].forEach(e=>{this.uiInstance.dropArea.addEventListener(e,this.stopPropagationn)}),this.uiInstance.dropArea.addEventListener("dragover",this.dragOverHandler),this.uiInstance.dropArea.addEventListener("dragleave",this.dragLeaveHandler),this.uiInstance.dropArea.addEventListener("drop",this.dropHandler),document.addEventListener("paste",this.pasteHandler),this.uiInstance.browseFile.addEventListener("click",this.browseFilesHandler),this.uiInstance.fileInput.addEventListener("change",this.manuallyAddImage),this.uiInstance.uploadButton.addEventListener("click",this.uploadButtonHandler),this.uiInstance.uploadAnother.addEventListener("click",this.uploadAnotherButtonHandler),this.uiInstance.copyLinkButton.addEventListener("click",this.copyLinkToClipboard),document.addEventListener("click",this.dismissNotice)}checkImage(e){const t=["jpg","jpeg","png","webp","svg"],i=p.arrayIntersect(t,e.type.split("/")),s=(e.size/1e6).toFixed(2);return i.length?s>this.maxFileSize?(this.uiInstance.displayNotice(`Maximum ${this.maxFileSize}MB is allowed!`,"alert"),!1):(this.file=e,!0):(this.uiInstance.displayNotice("Invalid file","alert"),!1)}}const f=new h;f.init();
