(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[846],{

/***/ "rRZ9":
/*!****************************************************!*\
  !*** ./node_modules/@angular/common/locales/gl.js ***!
  \****************************************************/
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
        v = n.toString().replace(/^[^.]*\.?/, '').length;
    if (i === 1 && v === 0) return 1;
    return 5;
  }

  exports.default = ['gl', [['a.m.', 'p.m.'], u, u], u, [['d.', 'l.', 'm.', 'm.', 'x.', 'v.', 's.'], ['dom.', 'luns', 'mar.', 'mér.', 'xov.', 'ven.', 'sáb.'], ['domingo', 'luns', 'martes', 'mércores', 'xoves', 'venres', 'sábado'], ['do.', 'lu.', 'ma.', 'mé.', 'xo.', 've.', 'sá.']], [['D', 'L', 'M', 'M', 'X', 'V', 'S'], ['Dom.', 'Luns', 'Mar.', 'Mér.', 'Xov.', 'Ven.', 'Sáb.'], ['Domingo', 'Luns', 'Martes', 'Mércores', 'Xoves', 'Venres', 'Sábado'], ['Do', 'Lu', 'Ma', 'Mé', 'Xo', 'Ve', 'Sá']], [['x.', 'f.', 'm.', 'a.', 'm.', 'x.', 'x.', 'a.', 's.', 'o.', 'n.', 'd.'], ['xan.', 'feb.', 'mar.', 'abr.', 'maio', 'xuño', 'xul.', 'ago.', 'set.', 'out.', 'nov.', 'dec.'], ['xaneiro', 'febreiro', 'marzo', 'abril', 'maio', 'xuño', 'xullo', 'agosto', 'setembro', 'outubro', 'novembro', 'decembro']], [['X', 'F', 'M', 'A', 'M', 'X', 'X', 'A', 'S', 'O', 'N', 'D'], ['Xan.', 'Feb.', 'Mar.', 'Abr.', 'Maio', 'Xuño', 'Xul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dec.'], ['Xaneiro', 'Febreiro', 'Marzo', 'Abril', 'Maio', 'Xuño', 'Xullo', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Decembro']], [['a.C.', 'd.C.'], u, ['antes de Cristo', 'despois de Cristo']], 1, [6, 0], ['dd/MM/yy', 'd \'de\' MMM \'de\' y', 'd \'de\' MMMM \'de\' y', 'EEEE, d \'de\' MMMM \'de\' y'], ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'], ['{0}, {1}', u, '{0} \'do\' {1}', u], [',', '.', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'], ['#,##0.###', '#,##0 %', '#,##0.00 ¤', '#E0'], 'EUR', '€', 'euro', {
    'BYN': [u, 'Br'],
    'ESP': ['₧'],
    'JPY': ['JP¥', '¥'],
    'KMF': [u, 'FC'],
    'MXN': ['$MX', '$'],
    'RUB': [u, 'руб'],
    'THB': ['฿'],
    'TWD': ['NT$'],
    'XCD': [u, '$']
  }, 'ltr', plural];
});

/***/ })

}]);
//# sourceMappingURL=846.js.map