"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Uploader = /*#__PURE__*/function () {
  function Uploader() {
    _classCallCheck(this, Uploader);
    this.apiEndpoint = 'https://api.imgbb.com/1/upload';
    this.apiKey = '69e20fc50e2631b5b327fef0c291bb52';
    this.expiration = 600;
  }
  _createClass(Uploader, [{
    key: "uploadFile",
    value: function uploadFile(file) {
      uiInstance.setState('uploading');
      var formData = new FormData();
      formData.append('expiration', this.expiration);
      formData.append('key', this.apiKey);
      formData.append('image', file);
      var xhr = new XMLHttpRequest();
      xhr.open('POST', this.apiEndpoint, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            // Request was successful
            var response = JSON.parse(xhr.responseText);
            var imageUrl = response.data.display_url;
            uiInstance.displayCopyUrl(imageUrl);
            uiInstance.updateProgress(100);

            // Intentionally create a little delay to wait for showing 100%.(it take a few moment based on the network speed, while downloading the image after upload)
            setTimeout(function () {
              uiInstance.setState('uploaded');
              uiInstance.updateShareIconLinks(imageUrl);
            }, 300);
          } else {
            // Handle errors
            if (xhr.status === 404) {
              uiInstance.displayNotice('Resource not found:' + xhr.responseText, 'alert');
            } else if (xhr.status === 401) {
              uiInstance.displayNotice('Unauthorized request:' + xhr.responseText, 'alert');
            } else {
              uiInstance.displayNotice('Server error:' + xhr.responseText, 'alert');
            }
          }
        }
      };
      xhr.upload.onprogress = function (e) {
        if (e.lengthComputable) {
          var percent = Math.round(e.loaded / e.total * 100);
          if (percent < 100) {
            uiInstance.updateProgress(percent);
          }
        }
      };
      xhr.send(formData);
    }
  }]);
  return Uploader;
}();