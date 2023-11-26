"use strict";

var _UI = require("./UI.js");
var _Uploader = require("./Uploader.js");
var _Utility = require("./Utility.js");
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
var App = /*#__PURE__*/function () {
  function App() {
    var _this = this;
    _classCallCheck(this, App);
    _defineProperty(this, "stopPropagationn", function (event) {
      event.preventDefault();
      event.stopPropagation();
      _this.uiInstance.clearNotice();
    });
    _defineProperty(this, "dragOverHandler", function (event) {
      // Hilight the drop zone
      _this.uiInstance.dropArea.classList.add('hilight');
      _this.uiInstance.clearNotice();
    });
    _defineProperty(this, "dragLeaveHandler", function (event) {
      _this.uiInstance.dropArea.classList.remove('hilight');
    });
    _defineProperty(this, "dropHandler", function (event) {
      event.preventDefault();

      // Remove hilight
      _this.uiInstance.dropArea.classList.remove('hilight');

      // Remove any image previusly uploaded
      _this.uiInstance.preview.innerHTML = '';

      // Preview the image
      var files = event.dataTransfer.files;
      _toConsumableArray(files).forEach(function (value, index, arr) {
        if (index === 0 && _this.checkImage(value)) {
          _this.file = value;
          _this.uiInstance.displayImage(value);
        }
      });
    });
    _defineProperty(this, "pasteHandler", function (event) {
      var files = event.clipboardData.files; // get files list
      var text = '';
      if (files.length && _this.checkImage(files[0])) {
        _this.uiInstance.displayImage(files[0]);
      } else if (!files.length) {
        // eslint-disable-next-line no-unused-vars
        text = event.clipboardData.getData('text'); // text in the clipboard
        _this.uiInstance.displayNotice('There is no file in your clipboard!', 'alert');
      }
    });
    _defineProperty(this, "browseFilesHandler", function (event) {
      event.preventDefault();
      _this.uiInstance.fileInput.click();
    });
    _defineProperty(this, "manuallyAddImage", function (event) {
      var fileList = event.target.files;
      if (fileList.length > 0 && _this.checkImage(fileList[0])) {
        _this.uiInstance.displayImage(fileList[0]);
      }
    });
    _defineProperty(this, "uploadButtonHandler", function (event) {
      // Upload the file
      _this.uploaderInstance.uploadFile(_this.file);
    });
    _defineProperty(this, "uploadAnotherButtonHandler", function (event) {
      event.preventDefault();
      if (_this.uiInstance.uploadify.classList.contains('state--uploaded')) {
        _this.uiInstance.setState('default');
      }
    });
    _defineProperty(this, "copyLinkToClipboard", function (event) {
      event.preventDefault();
      var copyText = _this.uiInstance.copyLink.children[0];
      copyText.select();
      copyText.setSelectionRange(0, 99999); // For mobile devices
      navigator.clipboard.writeText(copyText.value);
      _this.uiInstance.tooltipText.textContent = 'Copied!';
    });
    _defineProperty(this, "dismissNotice", function (event) {
      // Outside of the notification element
      if (!_this.uiInstance.notification.contains(event.target)) {
        _this.uiInstance.clearNotice();
      }
    });
    // Create instances
    // eslint-disable-next-line no-undef
    this.uiInstance = new _UI.UI();

    // eslint-disable-next-line no-undef
    this.uploaderInstance = new _Uploader.Uploader();

    // File will be stored in this property
    this.file = '';

    // Max file size
    this.maxFileSize = 2; // MB
  }
  _createClass(App, [{
    key: "init",
    value: function init() {
      var _this2 = this;
      ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function (event) {
        _this2.uiInstance.dropArea.addEventListener(event, _this2.stopPropagationn);
      });

      // Add image drag/drop or paste
      this.uiInstance.dropArea.addEventListener('dragover', this.dragOverHandler);
      this.uiInstance.dropArea.addEventListener('dragleave', this.dragLeaveHandler);
      this.uiInstance.dropArea.addEventListener('drop', this.dropHandler);
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
      var isMatched = _Utility.Utility.arrayIntersect(allowedFiles, file.type.split('/'));
      var currentFileSize = (file.size / 1000000).toFixed(2); // MB

      if (!isMatched.length) {
        this.uiInstance.displayNotice('Invalid file', 'alert');
        return false;
      }
      if (currentFileSize > this.maxFileSize) {
        this.uiInstance.displayNotice("Maximum ".concat(this.maxFileSize, "MB is allowed!"), 'alert');
        return false;
      }
      this.file = file;
      return true;
    }
  }]);
  return App;
}();
var app = new App();
app.init();