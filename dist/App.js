"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var uiInstance = new UI();
var App = /*#__PURE__*/function () {
  function App() {
    var _this2 = this;
    _classCallCheck(this, App);
    _defineProperty(this, "dropHandler", function (event) {
      event.preventDefault();
      var _this = _this2;

      // Remove hilight
      uiInstance.dropArea.classList.remove('hilight');

      // Remove any image previusly uploaded
      uiInstance.preview.innerHTML = '';

      // Preview the image
      var files = event.dataTransfer.files;
      _toConsumableArray(files).forEach(function (value, index, arr) {
        if (index == 0 && _this.checkImage(value)) {
          _this.file = value;
          uiInstance.displayImage(value);
        }
      });
    });
    _defineProperty(this, "pasteHandler", function (event) {
      var files = event.clipboardData.files; // get files list
      var text = '';
      if (files.length && _this2.checkImage(files[0])) {
        uiInstance.displayImage(files[0]);
      } else if (!files.length) {
        text = event.clipboardData.getData('text'); // text in the clipboard
        uiInstance.displayNotice('There is no file in your clipboard!', 'alert');
      }
    });
    _defineProperty(this, "manuallyAddImage", function (event) {
      var fileList = event.target.files;
      if (fileList.length > 0 && _this2.checkImage(fileList[0])) {
        uiInstance.displayImage(fileList[0]);
      }
    });
    _defineProperty(this, "uploadButtonHandler", function (event) {
      var uploaderInstance = new Uploader();

      // Upload the file
      uploaderInstance.uploadFile(_this2.file);
    });
    _defineProperty(this, "copyLinkToClipboard", function (event) {
      event.preventDefault();
      var copyText = uiInstance.copyLink.children[0];
      copyText.select();
      copyText.setSelectionRange(0, 99999); // For mobile devices
      navigator.clipboard.writeText(copyText.value);
      uiInstance.tooltipText.textContent = 'Copied!';
    });
    var self = this;

    // File will be stored in this property
    this.file = '';

    // Max file size
    this.maxFileSize = 2; // MB

    ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function (event) {
      uiInstance.dropArea.addEventListener(event, self.stopPropagationn);
    });

    // Add image drag/drop or paste
    uiInstance.dropArea.addEventListener('dragover', this.dragOverHandler);
    uiInstance.dropArea.addEventListener('dragleave', this.dragLeaveHandler);
    uiInstance.dropArea.addEventListener('drop', this.dropHandler);
    document.addEventListener('paste', this.pasteHandler);

    // Add image manually
    uiInstance.browseFile.addEventListener('click', this.browseFilesHandler);
    uiInstance.fileInput.addEventListener('change', this.manuallyAddImage);

    // Upload image button
    uiInstance.uploadButton.addEventListener('click', this.uploadButtonHandler);

    // Upload another image button
    uiInstance.uploadAnother.addEventListener('click', this.uploadAnotherButtonHandler);

    // Copy link after upload
    uiInstance.copyLinkButton.addEventListener('click', this.copyLinkToClipboard);

    // Dismiss notice
    document.addEventListener('click', this.dismissNotice);
  }
  _createClass(App, [{
    key: "stopPropagationn",
    value: function stopPropagationn(event) {
      event.preventDefault();
      event.stopPropagation();
      uiInstance.clearNotice();
    }
  }, {
    key: "dragOverHandler",
    value: function dragOverHandler(event) {
      // Hilight the drop zone
      uiInstance.dropArea.classList.add('hilight');
      uiInstance.clearNotice();
    }
  }, {
    key: "dragLeaveHandler",
    value: function dragLeaveHandler(event) {
      uiInstance.dropArea.classList.remove('hilight');
    }
  }, {
    key: "browseFilesHandler",
    value: function browseFilesHandler(event) {
      event.preventDefault();
      uiInstance.fileInput.click();
    }
  }, {
    key: "checkImage",
    value:
    /**
     * The function checks if an image file is valid based on its file type and size.
     * @param file - The `file` parameter is the image file that needs to be checked.
     * 
     * @returns boolean
     */
    function checkImage(file) {
      var allowedFiles = ['jpg', 'jpeg', 'png', 'webp', 'svg'];
      var isMatched = this.arrayIntersect(allowedFiles, file.type.split('/'));
      var currentFileSize = (file.size / 1000000).toFixed(2); // MB

      if (!isMatched.length) {
        uiInstance.displayNotice('Invalid file', 'alert');
        return false;
      }
      if (currentFileSize > this.maxFileSize) {
        uiInstance.displayNotice("Maximum ".concat(this.maxFileSize, "MB is allowed!"), 'alert');
        return false;
      }
      this.file = file;
      return true;
    }
  }, {
    key: "uploadAnotherButtonHandler",
    value: function uploadAnotherButtonHandler(event) {
      event.preventDefault();
      if (uiInstance.uploadify.classList.contains('state--uploaded')) {
        uiInstance.setState('default');
      }
    }

    /**
     * The function `arrayIntersect` takes two arrays as input and returns an array containing the
     * elements that are common to both arrays.
     * @param array1
     * @param array2
     * 
     * @returns array
     */
  }, {
    key: "arrayIntersect",
    value: function arrayIntersect(array1, array2) {
      // array2 is the array with fewer elements, so filter through this array
      var matchedElements = array2.filter(function (item) {
        if (array1.includes(item)) {
          return item;
        }
      });
      return matchedElements;
    }
  }, {
    key: "dismissNotice",
    value: function dismissNotice(event) {
      // Outside of the notification element
      if (!uiInstance.notification.contains(event.target)) {
        uiInstance.clearNotice();
      }
    }
  }]);
  return App;
}();
var app = new App();