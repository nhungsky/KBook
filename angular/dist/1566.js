(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1566],{

/***/ "jFVn":
/*!************************************************************!*\
  !*** ./node_modules/@angular/common/locales/sr-Cyrl-BA.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
  if ( true && typeof module.exports === "object") {
    var v = factory(null, exports);
    if (v !== undefined) module.exports = v;
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
})(function (require, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  }); // THIS CODE IS GENERATED - DO NOT MODIFY
  // See angular/tools/gulp-tasks/cldr/extract.js

  var u = undefined;

  function plural(n) {
    var i = Math.floor(Math.abs(n)),
        v = n.toString().replace(/^[^.]*\.?/, '').length,
        f = parseInt(n.toString().replace(/^[^.]*\.?/, ''), 10) || 0;
    if (v === 0 && i % 10 === 1 && !(i % 100 === 11) || f % 10 === 1 && !(f % 100 === 11)) return 1;
    if (v === 0 && i % 10 === Math.floor(i % 10) && i % 10 >= 2 && i % 10 <= 4 && !(i % 100 >= 12 && i % 100 <= 14) || f % 10 === Math.floor(f % 10) && f % 10 >= 2 && f % 10 <= 4 && !(f % 100 >= 12 && f % 100 <= 14)) return 3;
    return 5;
  }

  exports.default = ['sr-Cyrl-BA', [['a', 'p'], ['прије подне', 'по подне'], u], [['а', 'p'], ['прије подне', 'по подне'], u], [['н', 'п', 'у', 'с', 'ч', 'п', 'с'], ['нед', 'пон', 'ут', 'ср', 'чет', 'пет', 'суб'], ['недјеља', 'понедељак', 'уторак', 'сриједа', 'четвртак', 'петак', 'субота'], ['не', 'по', 'ут', 'ср', 'че', 'пе', 'су']], u, [['ј', 'ф', 'м', 'а', 'м', 'ј', 'ј', 'а', 'с', 'о', 'н', 'д'], ['јан', 'феб', 'мар', 'апр', 'мај', 'јун', 'јул', 'авг', 'сеп', 'окт', 'нов', 'дец'], ['јануар', 'фебруар', 'март', 'април', 'мај', 'јун', 'јул', 'август', 'септембар', 'октобар', 'новембар', 'децембар']], u, [['п.н.е.', 'н.е.'], ['п. н. е.', 'н. е.'], ['прије нове ере', 'нове ере']], 1, [6, 0], ['d.M.yy.', 'dd.MM.y.', 'dd. MMMM y.', 'EEEE, dd. MMMM y.'], ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'], ['{1} {0}', u, u, u], [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'], ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'], 'BAM', 'КМ', 'Босанско-херцеговачка конвертибилна марка', {
    'AUD': [u, '$'],
    'BAM': ['КМ', 'KM'],
    'GEL': [u, 'ლ'],
    'KRW': [u, '₩'],
    'NZD': [u, '$'],
    'TWD': ['NT$'],
    'USD': ['US$', '$'],
    'VND': [u, '₫']
  }, 'ltr', plural];
});

/***/ })

}]);
//# sourceMappingURL=1566.js.map