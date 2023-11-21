"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var UI = /*#__PURE__*/function () {
  function UI() {
    _classCallCheck(this, UI);
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
  _createClass(UI, [{
    key: "updateProgress",
    value: function updateProgress(percent) {
      var $progressTrack = document.querySelector('.progress-track');
      var $progressText = document.querySelector('.progress-bar > span');
      $progressTrack.style.width = percent + '%';
      $progressText.textContent = percent + '%';
    }
  }, {
    key: "displayImage",
    value: function displayImage(file) {
      var _this = this;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        _this.setState('preview');
        var img = document.createElement('img');
        img.src = reader.result;
        img.style.width = '100%'; // For svg file

        // Alread has an image, replace that with new
        if (_this.preview.firstElementChild) {
          _this.preview.firstElementChild.src = reader.result;
        } else {
          _this.preview.appendChild(img);
        }
      };
      uiInstance.uploadButton.disabled = false;
    }
  }, {
    key: "updateShareIconLinks",
    value: function updateShareIconLinks(imageUrl) {
      var whatsappUrl = "whatsapp://send?text=Check out this image: ".concat(imageUrl, "L");
      var facebookUrl = "https://www.facebook.com/sharer/sharer.php?u=".concat(imageUrl);
      var twitterUrl = "https://twitter.com/intent/tweet?url=".concat(imageUrl, "&text=Check out this image:");
      var emailUrl = "mailto:?subject=Check%20out%20this%20image&body=Hey,%20I%20found%20this%20cool%20image:%20".concat(imageUrl);
      this.whatsapp.href = whatsappUrl;
      this.facebook.href = facebookUrl;
      this.twitter.href = twitterUrl;
      this.email.href = emailUrl;
    }
  }, {
    key: "setState",
    value: function setState() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
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
  }, {
    key: "defaultState",
    value: function defaultState() {
      this.innerHTML = '';
      this.uploadify.classList = 'uploadify';
    }
  }, {
    key: "previewState",
    value: function previewState() {
      this.uploadify.classList.add('state--preview');
    }
  }, {
    key: "uploadingSate",
    value: function uploadingSate() {
      this.uploadify.classList.remove('state--preview');
      this.uploadify.classList.add('state--uploading');
      this.uploadButton.disabled = true;
    }
  }, {
    key: "uploadedState",
    value: function uploadedState() {
      this.uploadify.classList.remove('state--uploading');
      this.uploadify.classList.add('state--uploaded');
    }
  }, {
    key: "displayCopyUrl",
    value: function displayCopyUrl(url) {
      this.copyLink.children[0].value = url;
    }
  }, {
    key: "displayNotice",
    value: function displayNotice() {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var _this = this;
      var icon;
      if (status === 'alert') {
        icon = '<svg viewBox="64 64 896 896" focusable="false" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path></svg>';
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
  }, {
    key: "clearNotice",
    value: function clearNotice() {
      if (this.notification.classList.contains('animation-slide-in')) {
        this.notification.classList.remove('animation-slide-in');
        this.notification.classList.add('animation-fade-out');
      }
    }
  }]);
  return UI;
}();