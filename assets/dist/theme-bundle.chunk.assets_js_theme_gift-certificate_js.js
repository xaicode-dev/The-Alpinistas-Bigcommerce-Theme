"use strict";
(self["webpackChunkElevate"] = self["webpackChunkElevate"] || []).push([["assets_js_theme_gift-certificate_js"],{

/***/ "./assets/js/theme/common/gift-certificate-validator.js":
/*!**************************************************************!*\
  !*** ./assets/js/theme/common/gift-certificate-validator.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(cert) {
  if (typeof cert !== 'string') {
    return false;
  }

  // Add any custom gift certificate validation logic here
  return true;
}

/***/ }),

/***/ "./assets/js/theme/common/models/forms.js":
/*!************************************************!*\
  !*** ./assets/js/theme/common/models/forms.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var forms = {
  email: function email(value) {
    var re = /^.+@.+\..+/;
    return re.test(value);
  },
  /**
   * Validates a password field
   * @param value
   * @returns {boolean}
   */
  password: function password(value) {
    return this.notEmpty(value);
  },
  /**
   * validates if a field is empty
   * @param value
   * @returns {boolean}
   *
   */
  notEmpty: function notEmpty(value) {
    return value.length > 0;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./assets/js/theme/gift-certificate.js":
/*!*********************************************!*\
  !*** ./assets/js/theme/gift-certificate.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GiftCertificate)
/* harmony export */ });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/gift-certificate-validator */ "./assets/js/theme/common/gift-certificate-validator.js");
/* harmony import */ var _common_models_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/models/forms */ "./assets/js/theme/common/models/forms.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var GiftCertificate = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(GiftCertificate, _PageManager);
  function GiftCertificate(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    var $certBalanceForm = $('#gift-certificate-balance');
    var purchaseModel = {
      recipientName: function recipientName(val) {
        return val.length;
      },
      recipientEmail: function recipientEmail() {
        return _common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"].email.apply(_common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"], arguments);
      },
      senderName: function senderName(val) {
        return val.length;
      },
      senderEmail: function senderEmail() {
        return _common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"].email.apply(_common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"], arguments);
      },
      customAmount: function customAmount(value, min, max) {
        return value && value >= min && value <= max;
      },
      setAmount: function setAmount(value, options) {
        var found = false;
        options.forEach(function (option) {
          if (option === value) {
            found = true;
            return false;
          }
        });
        return found;
      }
    };
    var $purchaseForm = $('#gift-certificate-form');
    var $customAmounts = $purchaseForm.find('input[name="certificate_amount"]');
    var purchaseValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: '#gift-certificate-form input[type="submit"]',
      delay: 300
    });
    if ($customAmounts.length) {
      var $element = $purchaseForm.find('input[name="certificate_amount"]');
      var min = $element.data('min');
      var minFormatted = $element.data('minFormatted');
      var max = $element.data('max');
      var maxFormatted = $element.data('maxFormatted');
      purchaseValidator.add({
        selector: '#gift-certificate-form input[name="certificate_amount"]',
        validate: function validate(cb, val) {
          var numberVal = Number(val);
          if (!numberVal) {
            cb(false);
          }
          cb(numberVal >= min && numberVal <= max);
        },
        errorMessage: "You must enter a certificate amount between " + minFormatted + " and " + maxFormatted + "."
      });
    }
    purchaseValidator.add([{
      selector: '#gift-certificate-form input[name="to_name"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.recipientName(val);
        cb(result);
      },
      errorMessage: _this.context.toName
    }, {
      selector: '#gift-certificate-form input[name="to_email"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.recipientEmail(val);
        cb(result);
      },
      errorMessage: _this.context.toEmail
    }, {
      selector: '#gift-certificate-form input[name="from_name"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.senderName(val);
        cb(result);
      },
      errorMessage: _this.context.fromName
    }, {
      selector: '#gift-certificate-form input[name="from_email"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.senderEmail(val);
        cb(result);
      },
      errorMessage: _this.context.fromEmail
    }, {
      selector: '#gift-certificate-form input[name="certificate_theme"]:first-of-type',
      triggeredBy: '#gift-certificate-form input[name="certificate_theme"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="certificate_theme"]:checked').val();
        cb(typeof val === 'string');
      },
      errorMessage: _this.context.certTheme
    }, {
      selector: '#gift-certificate-form input[name="agree"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="agree"]').get(0).checked;
        cb(val);
      },
      errorMessage: _this.context.agreeToTerms
    }, {
      selector: '#gift-certificate-form input[name="agree2"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="agree2"]').get(0).checked;
        cb(val);
      },
      errorMessage: _this.context.agreeToTerms
    }]);
    if ($certBalanceForm.length) {
      var balanceVal = _this.checkCertBalanceValidator($certBalanceForm);
      $certBalanceForm.on('submit', function () {
        balanceVal.performCheck();
        if (!balanceVal.areAll('valid')) {
          return false;
        }
      });
    }
    $purchaseForm.on('submit', function (event) {
      purchaseValidator.performCheck();
      if (!purchaseValidator.areAll('valid')) {
        return event.preventDefault();
      }
    });
    $('#gift-certificate-preview').click(function (event) {
      event.preventDefault();
      purchaseValidator.performCheck();
      if (!purchaseValidator.areAll('valid')) {
        return;
      }
      var modal = (0,_global_modal__WEBPACK_IMPORTED_MODULE_5__.defaultModal)();
      var previewUrl = $(event.currentTarget).data('previewUrl') + "&" + $purchaseForm.serialize();
      modal.open();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__.api.getPage(previewUrl, {}, function (err, content) {
        if (err) {
          return modal.updateContent(_this.context.previewError);
        }
        modal.updateContent(content, {
          wrap: true
        });
      });
    });
    return _this;
  }
  var _proto = GiftCertificate.prototype;
  _proto.checkCertBalanceValidator = function checkCertBalanceValidator($balanceForm) {
    var balanceValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: $balanceForm.find('input[type="submit"]')
    });
    balanceValidator.add({
      selector: $balanceForm.find('input[name="giftcertificatecode"]'),
      validate: function validate(cb, val) {
        cb((0,_common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_2__["default"])(val));
      },
      errorMessage: 'You must enter a certificate code.'
    });
    return balanceValidator;
  };
  return GiftCertificate;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9naWZ0LWNlcnRpZmljYXRlX2pzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSw2QkFBZSxvQ0FBVUEsSUFBSSxFQUFFO0VBQzNCLElBQUksT0FBT0EsSUFBSSxLQUFLLFFBQVEsRUFBRTtJQUMxQixPQUFPLEtBQUs7RUFDaEI7O0VBRUE7RUFDQSxPQUFPLElBQUk7QUFDZjs7Ozs7Ozs7Ozs7Ozs7QUNQQSxJQUFNQyxLQUFLLEdBQUc7RUFDVkMsS0FBSyxXQUFBQSxNQUFDQyxLQUFLLEVBQUU7SUFDVCxJQUFNQyxFQUFFLEdBQUcsWUFBWTtJQUN2QixPQUFPQSxFQUFFLENBQUNDLElBQUksQ0FBQ0YsS0FBSyxDQUFDO0VBQ3pCLENBQUM7RUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0VBQ0lHLFFBQVEsV0FBQUEsU0FBQ0gsS0FBSyxFQUFFO0lBQ1osT0FBTyxJQUFJLENBQUNJLFFBQVEsQ0FBQ0osS0FBSyxDQUFDO0VBQy9CLENBQUM7RUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDSUksUUFBUSxXQUFBQSxTQUFDSixLQUFLLEVBQUU7SUFDWixPQUFPQSxLQUFLLENBQUNLLE1BQU0sR0FBRyxDQUFDO0VBQzNCO0FBQ0osQ0FBQztBQUVELGlFQUFlUCxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFCcUI7QUFDVjtBQUNtQztBQUNwQjtBQUNHO0FBQ0g7QUFBQSxJQUV6QmMsZUFBZSwwQkFBQUMsWUFBQTtFQUFBQyxjQUFBLENBQUFGLGVBQUEsRUFBQUMsWUFBQTtFQUNoQyxTQUFBRCxnQkFBWUcsT0FBTyxFQUFFO0lBQUEsSUFBQUMsS0FBQTtJQUNqQkEsS0FBQSxHQUFBSCxZQUFBLENBQUFJLElBQUEsT0FBTUYsT0FBTyxDQUFDO0lBRWQsSUFBTUcsZ0JBQWdCLEdBQUdDLENBQUMsQ0FBQywyQkFBMkIsQ0FBQztJQUV2RCxJQUFNQyxhQUFhLEdBQUc7TUFDbEJDLGFB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QUFBLENBQUF1RSxTQUFBO0VBQUFELE1BQUEsQ0FFRGxCLHlCQUF5QixHQUF6QixTQUFBQSwwQkFBMEJvQixZQUFZLEVBQUU7SUFDcEMsSUFBTUMsZ0JBQWdCLEdBQUc5RSx1REFBRyxDQUFDO01BQ3pCaUMsTUFBTSxFQUFFNEMsWUFBWSxDQUFDOUMsSUFBSSxDQUFDLHNCQUFzQjtJQUNwRCxDQUFDLENBQUM7SUFFRitDLGdCQUFnQixDQUFDdkMsR0FBRyxDQUFDO01BQ2pCQyxRQUFRLEVBQUVxQyxZQUFZLENBQUM5QyxJQUFJLENBQUMsbUNBQW1DLENBQUM7TUFDaEVVLFFBQVEsV0FBQUEsU0FBQ0MsRUFBRSxFQUFFM0IsR0FBRyxFQUFFO1FBQ2QyQixFQUFFLENBQUN6Qyw4RUFBZSxDQUFDYyxHQUFHLENBQUMsQ0FBQztNQUM1QixDQUFDO01BQ0Q4QixZQUFZLEVBQUU7SUFDbEIsQ0FBQyxDQUFDO0lBRUYsT0FBT2lDLGdCQUFnQjtFQUMzQixDQUFDO0VBQUEsT0FBQXpFLGVBQUE7QUFBQSxFQTlMd0NOLHFEQUFXIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vRWxldmF0ZS8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vZ2lmdC1jZXJ0aWZpY2F0ZS12YWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vRWxldmF0ZS8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vbW9kZWxzL2Zvcm1zLmpzIiwid2VicGFjazovL0VsZXZhdGUvLi9hc3NldHMvanMvdGhlbWUvZ2lmdC1jZXJ0aWZpY2F0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoY2VydCkge1xuICAgIGlmICh0eXBlb2YgY2VydCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEFkZCBhbnkgY3VzdG9tIGdpZnQgY2VydGlmaWNhdGUgdmFsaWRhdGlvbiBsb2dpYyBoZXJlXG4gICAgcmV0dXJuIHRydWU7XG59XG4iLCJjb25zdCBmb3JtcyA9IHtcbiAgICBlbWFpbCh2YWx1ZSkge1xuICAgICAgICBjb25zdCByZSA9IC9eLitALitcXC4uKy87XG4gICAgICAgIHJldHVybiByZS50ZXN0KHZhbHVlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGVzIGEgcGFzc3dvcmQgZmllbGRcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBwYXNzd29yZCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub3RFbXB0eSh2YWx1ZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIHZhbGlkYXRlcyBpZiBhIGZpZWxkIGlzIGVtcHR5XG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICpcbiAgICAgKi9cbiAgICBub3RFbXB0eSh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUubGVuZ3RoID4gMDtcbiAgICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZm9ybXM7XG4iLCJpbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi9wYWdlLW1hbmFnZXInO1xuaW1wb3J0IG5vZCBmcm9tICcuL2NvbW1vbi9ub2QnO1xuaW1wb3J0IGdpZnRDZXJ0Q2hlY2tlciBmcm9tICcuL2NvbW1vbi9naWZ0LWNlcnRpZmljYXRlLXZhbGlkYXRvcic7XG5pbXBvcnQgZm9ybU1vZGVsIGZyb20gJy4vY29tbW9uL21vZGVscy9mb3Jtcyc7XG5pbXBvcnQgeyBhcGkgfSBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgeyBkZWZhdWx0TW9kYWwgfSBmcm9tICcuL2dsb2JhbC9tb2RhbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdpZnRDZXJ0aWZpY2F0ZSBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKGNvbnRleHQpO1xuXG4gICAgICAgIGNvbnN0ICRjZXJ0QmFsYW5jZUZvcm0gPSAkKCcjZ2lmdC1jZXJ0aWZpY2F0ZS1iYWxhbmNlJyk7XG5cbiAgICAgICAgY29uc3QgcHVyY2hhc2VNb2RlbCA9IHtcbiAgICAgICAgICAgIHJlY2lwaWVudE5hbWUodmFsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbC5sZW5ndGg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVjaXBpZW50RW1haWwoLi4uYXJncykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtTW9kZWwuZW1haWwoLi4uYXJncyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VuZGVyTmFtZSh2YWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsLmxlbmd0aDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZW5kZXJFbWFpbCguLi5hcmdzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1Nb2RlbC5lbWFpbCguLi5hcmdzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjdXN0b21BbW91bnQodmFsdWUsIG1pbiwgbWF4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlICYmIHZhbHVlID49IG1pbiAmJiB2YWx1ZSA8PSBtYXg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0QW1vdW50KHZhbHVlLCBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBvcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0ICRwdXJjaGFzZUZvcm0gPSAkKCcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtJyk7XG4gICAgICAgIGNvbnN0ICRjdXN0b21BbW91bnRzID0gJHB1cmNoYXNlRm9ybS5maW5kKCdpbnB1dFtuYW1lPVwiY2VydGlmaWNhdGVfYW1vdW50XCJdJyk7XG4gICAgICAgIGNvbnN0IHB1cmNoYXNlVmFsaWRhdG9yID0gbm9kKHtcbiAgICAgICAgICAgIHN1Ym1pdDogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbdHlwZT1cInN1Ym1pdFwiXScsXG4gICAgICAgICAgICBkZWxheTogMzAwLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoJGN1c3RvbUFtb3VudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCAkZWxlbWVudCA9ICRwdXJjaGFzZUZvcm0uZmluZCgnaW5wdXRbbmFtZT1cImNlcnRpZmljYXRlX2Ftb3VudFwiXScpO1xuICAgICAgICAgICAgY29uc3QgbWluID0gJGVsZW1lbnQuZGF0YSgnbWluJyk7XG4gICAgICAgICAgICBjb25zdCBtaW5Gb3JtYXR0ZWQgPSAkZWxlbWVudC5kYXRhKCdtaW5Gb3JtYXR0ZWQnKTtcbiAgICAgICAgICAgIGNvbnN0IG1heCA9ICRlbGVtZW50LmRhdGEoJ21heCcpO1xuICAgICAgICAgICAgY29uc3QgbWF4Rm9ybWF0dGVkID0gJGVsZW1lbnQuZGF0YSgnbWF4Rm9ybWF0dGVkJyk7XG5cbiAgICAgICAgICAgIHB1cmNoYXNlVmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJjZXJ0aWZpY2F0ZV9hbW91bnRcIl0nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBudW1iZXJWYWwgPSBOdW1iZXIodmFsKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIW51bWJlclZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2IoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2IobnVtYmVyVmFsID49IG1pbiAmJiBudW1iZXJWYWwgPD0gbWF4KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogYFlvdSBtdXN0IGVudGVyIGEgY2VydGlmaWNhdGUgYW1vdW50IGJldHdlZW4gJHttaW5Gb3JtYXR0ZWR9IGFuZCAke21heEZvcm1hdHRlZH0uYCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVyY2hhc2VWYWxpZGF0b3IuYWRkKFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cInRvX25hbWVcIl0nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwdXJjaGFzZU1vZGVsLnJlY2lwaWVudE5hbWUodmFsKTtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQudG9OYW1lLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cInRvX2VtYWlsXCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcHVyY2hhc2VNb2RlbC5yZWNpcGllbnRFbWFpbCh2YWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC50b0VtYWlsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cImZyb21fbmFtZVwiXScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHB1cmNoYXNlTW9kZWwuc2VuZGVyTmFtZSh2YWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5mcm9tTmFtZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJmcm9tX2VtYWlsXCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcHVyY2hhc2VNb2RlbC5zZW5kZXJFbWFpbCh2YWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5mcm9tRW1haWwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwiY2VydGlmaWNhdGVfdGhlbWVcIl06Zmlyc3Qtb2YtdHlwZScsXG4gICAgICAgICAgICAgICAgdHJpZ2dlcmVkQnk6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJjZXJ0aWZpY2F0ZV90aGVtZVwiXScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSAkcHVyY2hhc2VGb3JtLmZpbmQoJ2lucHV0W25hbWU9XCJjZXJ0aWZpY2F0ZV90aGVtZVwiXTpjaGVja2VkJykudmFsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IodHlwZW9mICh2YWwpID09PSAnc3RyaW5nJyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5jZXJ0VGhlbWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwiYWdyZWVcIl0nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gJHB1cmNoYXNlRm9ybS5maW5kKCdpbnB1dFtuYW1lPVwiYWdyZWVcIl0nKS5nZXQoMCkuY2hlY2tlZDtcblxuICAgICAgICAgICAgICAgICAgICBjYih2YWwpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQuYWdyZWVUb1Rlcm1zLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cImFncmVlMlwiXScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSAkcHVyY2hhc2VGb3JtLmZpbmQoJ2lucHV0W25hbWU9XCJhZ3JlZTJcIl0nKS5nZXQoMCkuY2hlY2tlZDtcblxuICAgICAgICAgICAgICAgICAgICBjYih2YWwpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQuYWdyZWVUb1Rlcm1zLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSk7XG5cbiAgICAgICAgaWYgKCRjZXJ0QmFsYW5jZUZvcm0ubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBiYWxhbmNlVmFsID0gdGhpcy5jaGVja0NlcnRCYWxhbmNlVmFsaWRhdG9yKCRjZXJ0QmFsYW5jZUZvcm0pO1xuXG4gICAgICAgICAgICAkY2VydEJhbGFuY2VGb3JtLm9uKCdzdWJtaXQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYmFsYW5jZVZhbC5wZXJmb3JtQ2hlY2soKTtcblxuICAgICAgICAgICAgICAgIGlmICghYmFsYW5jZVZhbC5hcmVBbGwoJ3ZhbGlkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJHB1cmNoYXNlRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgcHVyY2hhc2VWYWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XG5cbiAgICAgICAgICAgIGlmICghcHVyY2hhc2VWYWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJyNnaWZ0LWNlcnRpZmljYXRlLXByZXZpZXcnKS5jbGljayhldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBwdXJjaGFzZVZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcblxuICAgICAgICAgICAgaWYgKCFwdXJjaGFzZVZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG1vZGFsID0gZGVmYXVsdE1vZGFsKCk7XG4gICAgICAgICAgICBjb25zdCBwcmV2aWV3VXJsID0gYCR7JChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdwcmV2aWV3VXJsJyl9JiR7JHB1cmNoYXNlRm9ybS5zZXJpYWxpemUoKX1gO1xuXG4gICAgICAgICAgICBtb2RhbC5vcGVuKCk7XG5cbiAgICAgICAgICAgIGFwaS5nZXRQYWdlKHByZXZpZXdVcmwsIHt9LCAoZXJyLCBjb250ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbW9kYWwudXBkYXRlQ29udGVudCh0aGlzLmNvbnRleHQucHJldmlld0Vycm9yKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBtb2RhbC51cGRhdGVDb250ZW50KGNvbnRlbnQsIHsgd3JhcDogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjaGVja0NlcnRCYWxhbmNlVmFsaWRhdG9yKCRiYWxhbmNlRm9ybSkge1xuICAgICAgICBjb25zdCBiYWxhbmNlVmFsaWRhdG9yID0gbm9kKHtcbiAgICAgICAgICAgIHN1Ym1pdDogJGJhbGFuY2VGb3JtLmZpbmQoJ2lucHV0W3R5cGU9XCJzdWJtaXRcIl0nKSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYmFsYW5jZVZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgc2VsZWN0b3I6ICRiYWxhbmNlRm9ybS5maW5kKCdpbnB1dFtuYW1lPVwiZ2lmdGNlcnRpZmljYXRlY29kZVwiXScpLFxuICAgICAgICAgICAgdmFsaWRhdGUoY2IsIHZhbCkge1xuICAgICAgICAgICAgICAgIGNiKGdpZnRDZXJ0Q2hlY2tlcih2YWwpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdZb3UgbXVzdCBlbnRlciBhIGNlcnRpZmljYXRlIGNvZGUuJyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGJhbGFuY2VWYWxpZGF0b3I7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbImNlcnQiLCJmb3JtcyIsImVtYWlsIiwidmFsdWUiLCJyZSIsInRlc3QiLCJwYXNzd29yZCIsIm5vdEVtcHR5IiwibGVuZ3RoIiwiUGFnZU1hbmFnZXIiLCJub2QiLCJnaWZ0Q2VydENoZWNrZXIiLCJmb3JtTW9kZWwiLCJhcGkiLCJkZWZhdWx0TW9kYWwiLCJHaWZ0Q2VydGlmaWNhdGUiLCJfUGFnZU1hbmFnZXIiLCJfaW5oZXJpdHNMb29zZSIsImNvbnRleHQiLCJfdGhpcyIsImNhbGwiLCIkY2VydEJhbGFuY2VGb3JtIiwiJCIsInB1cmNoYXNlTW9kZWwiLCJyZWNpcGllbnROYW1lIiwidmFsIiwicmVjaXBpZW50RW1haWwiLCJhcHBseSIsImFyZ3VtZW50cyIsInNlbmRlck5hbWUiLCJzZW5kZXJFbWFpbCIsImN1c3RvbUFtb3VudCIsIm1pbiIsIm1heCIsInNldEFtb3VudCIsIm9wdGlvbnMiLCJmb3VuZCIsImZvckVhY2giLCJvcHRpb24iLCIkcHVyY2hhc2VGb3JtIiwiJGN1c3RvbUFtb3VudHMiLCJmaW5kIiwicHVyY2hhc2VWYWxpZGF0b3IiLCJzdWJtaXQiLCJkZWxheSIsIiRlbGVtZW50IiwiZGF0YSIsIm1pbkZvcm1hdHRlZCIsIm1heEZvcm1hdHRlZCIsImFkZCIsInNlbGVjdG9yIiwidmFsaWRhdGUiLCJjYiIsIm51bWJlclZhbCIsIk51bWJlciIsImVycm9yTWVzc2FnZSIsInJlc3VsdCIsInRvTmFtZSIsInRvRW1haWwiLCJmcm9tTmFtZSIsImZyb21FbWFpbCIsInRyaWdnZXJlZEJ5IiwiY2VydFRoZW1lIiwiZ2V0IiwiY2hlY2tlZCIsImFncmVlVG9UZXJtcyIsImJhbGFuY2VWYWwiLCJjaGVja0NlcnRCYWxhbmNlVmFsaWRhdG9yIiwib24iLCJwZXJmb3JtQ2hlY2siLCJhcmVBbGwiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiY2xpY2siLCJtb2RhbCIsInByZXZpZXdVcmwiLCJjdXJyZW50VGFyZ2V0Iiwic2VyaWFsaXplIiwib3BlbiIsImdldFBhZ2UiLCJlcnIiLCJjb250ZW50IiwidXBkYXRlQ29udGVudCIsInByZXZpZXdFcnJvciIsIndyYXAiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCIkYmFsYW5jZUZvcm0iLCJiYWxhbmNlVmFsaWRhdG9yIiwiZGVmYXVsdCJdLCJzb3VyY2VSb290IjoiIn0=
