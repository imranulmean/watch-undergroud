(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-home-home-module"],{

/***/ "./node_modules/feels/lib/base.js":
/*!****************************************!*\
  !*** ./node_modules/feels/lib/base.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable no-mixed-operators */

const { isCorrect, tempConvert, speedConvert } = __webpack_require__(/*! ./helpers */ "./node_modules/feels/lib/helpers.js");
const {
  HI, AWBGT, HI_CA, AAT, WCI, WVP, WVPbyDP, ARH, RH, ADP, getT
} = __webpack_require__(/*! ./formulas */ "./node_modules/feels/lib/formulas.js");

class BaseFeels {
  static tempConvert(temp, from, to, round = false) {
    if (round) {
      if (typeof round === 'function') {
        return round(tempConvert(temp, from, to));
      }
      return Math.round(tempConvert(temp, from, to));
    }
    return tempConvert(temp, from, to);
  }

  static speedConvert(speed, from, to, round = false) {
    if (round) {
      if (typeof round === 'function') {
        return round(speedConvert(speed, from, to));
      }
      return Math.round(speedConvert(speed, from, to));
    }
    return speedConvert(speed, from, to);
  }

  static heatIndex(temp, humidity, { dewPoint, round } = {}) { // HI
    if (!isCorrect(temp, humidity)) {
      throw new Error('One of the required arguments are not specified');
    }
    const t = BaseFeels.tempConvert(temp, 'c', 'f');

    if (t < 68) {
      throw new RangeError('Heat Index: temp must be >= (20C, 68F, 293.15K)');
    }

    if (dewPoint) {
      humidity = BaseFeels.getRH(temp, humidity, { dewPoint: true });
    } else if (humidity <= 0 || humidity > 100) {
      throw new RangeError('Heat Index: humidity must be in (0, 100]');
    }

    return BaseFeels.tempConvert(HI(t, humidity), 'f', 'c', round);
  }

  static AWBGT(temp, humidity, { dewPoint, round } = {}) { // AWBGT
    if (!isCorrect(temp, humidity)) {
      throw new Error('One of the required arguments are not specified');
    }

    if (temp < 15) {
      throw new RangeError('AWBGT: temp must be >= (15C, 59F, 288.15K)');
    }

    if (!dewPoint && (humidity <= 0 || humidity > 100)) {
      throw new RangeError('AWBGT: humidity must be in (0, 100]');
    }

    const wvp = dewPoint ? BaseFeels.getWVPbyDP(humidity) : BaseFeels.getWVP(temp, humidity);
    return BaseFeels.tempConvert(AWBGT(temp, wvp), '', '', round);
  }

  static humidex(temp, humidity, { dewPoint, round } = {}) { // HI_CA
    if (!isCorrect(temp, humidity)) {
      throw new Error('One of the required arguments are not specified');
    }

    if (temp <= 0) {
      throw new RangeError('Humidex: temp must be > (0C, 32F, 273.15K)');
    }

    if (!dewPoint && (humidity <= 0 || humidity > 100)) {
      throw new RangeError('Humidex: humidity must be in (0, 100]');
    }

    const wvp = dewPoint ? BaseFeels.getWVPbyDP(humidity) : BaseFeels.getWVP(temp, humidity);
    return BaseFeels.tempConvert(HI_CA(temp, wvp), '', '', round);
  }

  static AAT(temp, speed, humidity, { dewPoint, round } = {}) { // AAT
    if (!isCorrect(temp, speed, humidity)) {
      throw new Error('One of the required arguments are not specified');
    }

    if (speed < 0) {
      throw new RangeError('AAT: wind speed must be >= 0');
    }

    if (!dewPoint && (humidity <= 0 || humidity > 100)) {
      throw new RangeError('AAT: humidity must be in (0, 100]');
    }

    const wvp = dewPoint ? BaseFeels.getWVPbyDP(humidity) : BaseFeels.getWVP(temp, humidity);
    return BaseFeels.tempConvert(AAT(temp, wvp, speed), '', '', round);
  }

  static windChill(temp, speed, { round } = {}) { // WCI
    if (!isCorrect(temp, speed)) {
      throw new Error('One of the required arguments are not specified');
    }

    if (temp > 0) {
      throw new RangeError('Wind Chill: temp must be <= (0C, 32F, 273.15K)');
    } else if (speed < 0) {
      throw new RangeError('Wind Chill: wind speed must be >= 0');
    }

    const s = BaseFeels.speedConvert(speed, 'mps', 'kph');
    if (s >= 5) {
      return BaseFeels.tempConvert(WCI(temp, s), '', '', round);
    }
    return BaseFeels.tempConvert(temp + ((-1.59 + 0.1345 * temp) / 5) * s, '', '', round);
  }

  static getWVP(temp, humidity, { round } = {}) {
    if (!isCorrect(humidity, temp)) {
      throw new Error('One of the required arguments are not specified');
    }

    if (humidity <= 0 || humidity > 100) {
      throw new RangeError('Water Vapour Pressure: humidity must be in (0, 100]');
    }

    return BaseFeels.tempConvert(WVP(temp, humidity), '', '', round);
  }

  static getWVPbyDP(dewPoint, { round } = {}) {
    if (!isCorrect(dewPoint)) {
      throw new Error('Dew point is not specified');
    }

    return BaseFeels.tempConvert(WVPbyDP(dewPoint), '', '', round);
  }

  static getARH(temp, dewPoint, { round } = {}) {
    if (!isCorrect(temp, dewPoint)) {
      throw new Error('One of the required arguments are not specified');
    }

    return BaseFeels.tempConvert(ARH(temp, dewPoint), '', '', round);
  }

  static getRH(temp, wvp, { dewPoint, round } = {}) {
    if (!isCorrect(temp, wvp)) {
      throw new Error('One of the required arguments are not specified');
    }

    return BaseFeels.tempConvert(RH(temp, (dewPoint) ? BaseFeels.getWVPbyDP(wvp) : wvp), '', '', round);
  }

  static getADP(temp, humidity, { round } = {}) {
    if (!isCorrect(temp, humidity)) {
      throw new Error('One of the required arguments are not specified');
    }

    if (humidity <= 0 || humidity > 100) {
      throw new RangeError('Aproximate Dew Point: humidity must be in (0, 100]');
    }

    return BaseFeels.tempConvert(ADP(temp, humidity), '', '', round);
  }

  static getDP(temp, humidity, { round } = {}) {
    if (!isCorrect(temp, humidity)) {
      throw new Error('One of the required arguments are not specified');
    }

    if (temp < -40 || temp > 50) {
      throw new RangeError('Dew Point: temp must be in [-40, 50]');
    } else if (humidity <= 0 || humidity > 100) {
      throw new RangeError('Dew Point: humidity must be in (0, 100]');
    }

    const b = 18.729;
    const c = 257.87;
    const d = 273.3;
    return BaseFeels.tempConvert(getT(temp, humidity, b, c, d), '', '', round);
  }

  static getFP(temp, humidity, { round } = {}) {
    if (!isCorrect(temp, humidity)) {
      throw new Error('One of the required arguments are not specified');
    }

    if (temp < -80 || temp > 0) {
      throw new RangeError('Frost Point: temp must be in [-80, 0]');
    } else if (humidity <= 0 || humidity > 100) {
      throw new RangeError('Frost Point: humidity must be in (0, 100]');
    }

    const b = 23.036;
    const c = 279.82;
    const d = 333.7;
    return BaseFeels.tempConvert(getT(temp, humidity, b, c, d), '', '', round);
  }
}

module.exports = BaseFeels;


/***/ }),

/***/ "./node_modules/feels/lib/formulas.js":
/*!********************************************!*\
  !*** ./node_modules/feels/lib/formulas.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable no-mixed-operators, no-restricted-properties */

module.exports.HI = (temp, humidity) =>
  16.923 + 0.185212 * temp + 5.37941 * humidity - 0.100254 * temp * humidity +
  9.41695 * Math.pow(10, -3) * Math.pow(temp, 2) + 7.28898 * Math.pow(10, -3) *
  Math.pow(humidity, 2) + 3.45372 * Math.pow(10, -4) * Math.pow(temp, 2) * humidity -
  8.14971 * Math.pow(10, -4) * temp * Math.pow(humidity, 2) + 1.02102 * Math.pow(10, -5) *
  Math.pow(temp, 2) * Math.pow(humidity, 2) - 3.8646 * Math.pow(10, -5) * Math.pow(temp, 3) +
  2.91583 * Math.pow(10, -5) * Math.pow(humidity, 3) + 1.42721 * Math.pow(10, -6) *
  Math.pow(temp, 3) * humidity + 1.97483 * Math.pow(10, -7) * temp * Math.pow(humidity, 3) -
  2.18429 * Math.pow(10, -8) * Math.pow(temp, 3) * Math.pow(humidity, 2) + 8.43296 *
  Math.pow(10, -10) * Math.pow(temp, 2) * Math.pow(humidity, 3) - 4.81975 * Math.pow(10, -11) *
  Math.pow(temp, 3) * Math.pow(humidity, 3);

module.exports.AWBGT = (temp, WVP) => 0.567 * temp + 0.393 * WVP + 3.94;

module.exports.HI_CA = (temp, WVP) => temp + 0.5555 * (WVP - 10.0);

module.exports.AAT = (temp, WVP, speed) => temp + 0.33 * WVP - 0.70 * speed - 4.00;

module.exports.WCI = (temp, speed) =>
  13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16);

module.exports.WVP = (temp, humidity) =>
  (humidity / 100) * 6.105 * Math.exp((17.27 * temp) / (237.7 + temp));

module.exports.WVPbyDP = temp =>
  6.11 * Math.exp(5417.7530 * (1 / 273.16 - 1 / (temp + 273.15)));

module.exports.ARH = (temp, dewPoint) => 100 - 5 * (temp - dewPoint);

module.exports.RH = (temp, WVP) =>
  (WVP / (6.105 * Math.exp((17.27 * temp) / (237.7 + temp)))) * 100;

module.exports.ADP = (temp, humidity) => temp - ((100 - humidity) / 5);

const getG = (temp, humidity, b, c, d) =>
  Math.log(humidity / 100 * Math.exp((b - temp / d) * (temp / (c + temp))));

module.exports.getT = (temp, humidity, b, c, d) =>
  (c * getG(temp, humidity, b, c, d)) / (b - getG(temp, humidity, b, c, d));


/***/ }),

/***/ "./node_modules/feels/lib/helpers.js":
/*!*******************************************!*\
  !*** ./node_modules/feels/lib/helpers.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable no-mixed-operators */

const isCorrect = data => !(data == null) && Number.isFinite(data);

module.exports.isCorrect = (...args) => args.every(arg => isCorrect(arg));

const tempFormat = (temp) => {
  if (temp === 'f' || temp === 'fahrenheit') {
    return 'f';
  } else if (temp === 'k' || temp === 'kelvin') {
    return 'k';
  }
  return 'c';
};

const speedFormat = (speed) => {
  if (speed === 'mph' || speed === 'mi/h') {
    return 'mph';
  } else if (['kmh', 'kph', 'kmph', 'km/h'].includes(speed)) {
    return 'kph';
  }
  return 'mps';
};

module.exports.unitsFormat = (units) => {
  if (!units) {
    return {
      temp: 'c',
      speed: 'mps'
    };
  }

  const temp = (units.temp) ? units.temp.toLowerCase() : 'c';
  const speed = (units.speed) ? units.speed.toLowerCase() : 'mps';

  return { temp: tempFormat(temp), speed: speedFormat(speed) };
};

module.exports.tempConvert = (temp, from, to) => {
  if (!isCorrect(temp)) {
    throw new TypeError('Temp must be specified and must be a number');
  }
  if (from === to) {
    return temp;
  }
  if (!(['c', 'f', 'k'].includes(from) && ['c', 'f', 'k'].includes(to))) {
    throw new RangeError('Units must be c, f or k');
  }
  if (from === 'c') {
    return (to === 'f') ?
      (temp * 1000 * (9 / 5) + 32 * 1000) / 1000 :
      (temp * 1000 + 273.15 * 1000) / 1000;
  }
  if (from === 'f') {
    return (to === 'c') ?
      ((temp - 32) * 1000 * (5 / 9)) / 1000 :
      ((temp + 459.67) * 1000 * (5 / 9)) / 1000;
  }
  return (to === 'c') ? // k
    (temp * 1000 - 273.15 * 1000) / 1000 :
    (temp * 1000 * (9 / 5) - 459.67 * 1000) / 1000;
};

module.exports.speedConvert = (speed, from, to) => {
  if (!isCorrect(speed)) {
    throw new TypeError('Speed must be specified and must be a number');
  }
  if (from === to) {
    return speed;
  }
  if (!(['mps', 'mph', 'kph'].includes(from) && ['mps', 'mph', 'kph'].includes(to))) {
    throw new RangeError('Units must be mps, mph or kph');
  }
  if (from === 'mps') {
    return (to === 'mph') ? speed / 0.44704 : speed * 3.6;
  }
  if (from === 'mph') {
    return (to === 'mps') ? speed * 0.44704 : speed * 1.609344;
  }
  return (to === 'mps') ? speed / 3.6 : speed / 1.609344; // kph
};


/***/ }),

/***/ "./node_modules/feels/main.js":
/*!************************************!*\
  !*** ./node_modules/feels/main.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { isCorrect, unitsFormat } = __webpack_require__(/*! ./lib/helpers */ "./node_modules/feels/lib/helpers.js");
const BaseFeels = __webpack_require__(/*! ./lib/base */ "./node_modules/feels/lib/base.js");

function apparentTemp(tempConvert, func) {
  if (!isCorrect(this.temp) || (!isCorrect(this.humidity) && !isCorrect(this.dewPoint))) {
    throw new Error('One of the required arguments are not specified');
  }

  const { temp } = this.units;
  const t = tempConvert(this.temp, temp, 'c');

  const index = (isCorrect(this.dewPoint) && !isCorrect(this.humidity)) ?
    func(t, tempConvert(this.dewPoint, temp, 'c'), { dewPoint: true }) :
    func(t, this.humidity);

  return tempConvert(index, 'c', this._units.temp, this.round);
}

class Feels extends BaseFeels {
  constructor(opts) {
    super();
    this.setOptions(opts);
    this._methods = {
      HI: 'heatIndex',
      AWBGT: 'AWBGT',
      HI_CA: 'humidex',
      AAT: 'AAT',
      WCI: 'windChill'
    };
  }

  setOptions(opts = {}) {
    this.units = unitsFormat(opts.units);
    this.temp = opts.temp;
    this.speed = opts.speed || 0;
    this.humidity = opts.humidity;
    this.dewPoint = opts.dewPoint;
    this.wvp = opts.wvp;
    this.round = opts.round;
    this._units = {
      temp: this.units.temp,
      speed: this.units.speed
    };
    return this;
  }

  registerMethod(method) {
    if (this[method]) {
      this._methods[method.toUpperCase()] = method;
      return this;
    }
    throw new Error(`${method} doesn't exists`);
  }

  registerMethods(methods) {
    if (Array.isArray(methods)) {
      for (const method of methods) {
        this.registerMethod(method);
      }
      return this;
    }
    throw new TypeError('Methods must be an array');
  }

  addMethod(method, func) {
    if (typeof func === 'function') {
      this[method] = func.bind(this);
      this.registerMethod(method);
      return this;
    }
    throw new TypeError(`${method} must be a function`);
  }

  toCelsius() {
    this._units.temp = 'c';
    return this;
  }

  toFahrenheit() {
    this._units.temp = 'f';
    return this;
  }

  toKelvin() {
    this._units.temp = 'k';
    return this;
  }

  like(methods = ['HI', 'HI_CA', 'AAT', 'WCI']) {
    if (typeof methods === 'string') {
      const method = this._methods[methods.toUpperCase()];
      if (method) {
        return this[method]();
      }
      throw new RangeError(`Methods must be one of: ${Object.keys(this._methods).join(', ')}`);
    }

    if (Array.isArray(methods)) {
      let like = 0;
      let count = methods.length;
      for (const m of methods) {
        const method = this._methods[m.toUpperCase()];
        if (method) {
          try {
            like += this[method]();
          } catch (e) {
            // eslint-disable-next-line no-plusplus
            count--;
          }
        } else {
          // eslint-disable-next-line max-len
          throw new RangeError(`Methods must be one of: ${Object.keys(this._methods).join(', ')}`);
        }
      }

      if (!count) {
        throw new Error('No valid methods for these values');
      }
      return Feels.tempConvert(like / count, '', '', this.round);
    }
    return this.like(['HI', 'HI_CA', 'AAT', 'WCI']);
  }

  heatIndex() { // HI
    return apparentTemp.call(this, Feels.tempConvert, Feels.heatIndex);
  }

  AWBGT() { // AWBGT
    return apparentTemp.call(this, Feels.tempConvert, Feels.AWBGT);
  }

  humidex() { // HI_CA
    return apparentTemp.call(this, Feels.tempConvert, Feels.humidex);
  }

  AAT() { // AAT
    // eslint-disable-next-line max-len
    if (!isCorrect(this.temp, this.speed) || (!isCorrect(this.humidity) && !isCorrect(this.dewPoint))) {
      throw new Error('One of the required arguments are not specified');
    }

    const { temp, speed } = this.units;
    const u = this._units.temp;
    const t = Feels.tempConvert(this.temp, temp, 'c');
    const s = Feels.speedConvert(this.speed, speed, 'mps');

    const index = (isCorrect(this.dewPoint) && !isCorrect(this.humidity)) ?
      Feels.AAT(t, s, Feels.tempConvert(this.dewPoint, temp, 'c'), { dewPoint: true }) :
      Feels.AAT(t, s, this.humidity);

    return Feels.tempConvert(index, 'c', u, this.round);
  }

  windChill() { // WCI
    if (!isCorrect(this.temp, this.speed)) {
      throw new Error('One of the required arguments are not specified');
    }
    const { temp, speed } = this.units;
    const u = this._units.temp;
    const t = Feels.tempConvert(this.temp, temp, 'c');
    const s = Feels.speedConvert(this.speed, speed, 'mps');

    return Feels.tempConvert(Feels.windChill(t, s), 'c', u, this.round);
  }

  getWaterVapourPressure() {
    if (isCorrect(this.wvp)) {
      return this.wvp;
    } else if (isCorrect(this.humidity, this.temp)) {
      const temp = Feels.tempConvert(this.temp, this.units.temp, 'c');

      return Feels.getWVP(temp, this.humidity, this.round);
    }
    throw new Error('One of the required arguments are not specified');
  }

  getWaterVapourPressureByDewPoint() {
    if (isCorrect(this.wvp)) {
      return this.wvp;
    } else if (isCorrect(this.dewPoint)) {
      const dewPoint = Feels.tempConvert(this.dewPoint, this.units.temp, 'c');

      return Feels.getWVPbyDP(dewPoint, this.round);
    }
    throw new Error('Dew point is not specified');
  }

  getAproximateRelativeHumidity() {
    if (isCorrect(this.humidity)) {
      return this.humidity;
    } else if (isCorrect(this.temp, this.dewPoint)) {
      const { temp } = this.units;
      const t = Feels.tempConvert(this.temp, temp, 'c');
      const dewPoint = Feels.tempConvert(this.dewPoint, temp, 'c');

      return Feels.getARH(t, dewPoint, this.round);
    }
    throw new Error('One of the required arguments are not specified');
  }

  getRelativeHumidity() {
    if (isCorrect(this.humidity)) {
      return this.humidity;
    } else if (isCorrect(this.temp) && (isCorrect(this.wvp) || isCorrect(this.dewPoint))) {
      const { temp } = this.units;
      const t = Feels.tempConvert(this.temp, temp, 'c');

      return (isCorrect(this.dewPoint) && !isCorrect(this.wvp)) ?
        Feels.getRH(t, Feels.tempConvert(this.dewPoint, temp, 'c'), { dewPoint: true, round: this.round }) :
        Feels.getRH(t, this.wvp, this.round);
    }
    throw new Error('One of the required arguments are not specified');
  }

  getAproximateDewPoint() {
    if (isCorrect(this.dewPoint)) {
      return this.dewPoint;
    } else if (isCorrect(this.temp, this.humidity)) {
      const temp = Feels.tempConvert(this.temp, this.units.temp, 'c');

      return Feels.tempConvert(Feels.getADP(temp, this.humidity), 'c', this._units.temp, this.round);
    }
    throw new Error('One of the required arguments are not specified');
  }

  getDewPoint() { // dew point for [-40, 50], humidity must be in (0, 100]
    if (isCorrect(this.dewPoint)) {
      return this.dewPoint;
    } else if (isCorrect(this.temp, this.humidity)) {
      const temp = Feels.tempConvert(this.temp, this.units.temp, 'c');

      return Feels.tempConvert(Feels.getDP(temp, this.humidity), 'c', this._units.temp, this.round);
    }
    throw new Error('One of the required arguments are not specified');
  }

  getFrostPoint() { // frost point for [-80, 0], humidity must be in (0, 100]
    if (!isCorrect(this.temp, this.humidity)) {
      throw new Error('One of the required arguments are not specified');
    }

    const temp = Feels.tempConvert(this.temp, this.units.temp, 'c');
    return Feels.tempConvert(Feels.getFP(temp, this.humidity), 'c', this._units.temp, this.round);
  }
}

Feels.prototype.toC = Feels.prototype.toCelsius;
Feels.prototype.toF = Feels.prototype.toFahrenheit;
Feels.prototype.toK = Feels.prototype.toKelvin;

Feels.prototype.getWVP = Feels.prototype.getWaterVapourPressure;
Feels.prototype.getWVPbyDP = Feels.prototype.getWaterVapourPressureByDewPoint;
Feels.prototype.getARH = Feels.prototype.getAproximateRelativeHumidity;
Feels.prototype.getRH = Feels.prototype.getRelativeHumidity;
Feels.prototype.getADP = Feels.prototype.getAproximateDewPoint;
Feels.prototype.getDP = Feels.prototype.getDewPoint;
Feels.prototype.getFP = Feels.prototype.getFrostPoint;

module.exports = Feels;


/***/ }),

/***/ "./src/app/pages/home/home.module.ts":
/*!*******************************************!*\
  !*** ./src/app/pages/home/home.module.ts ***!
  \*******************************************/
/*! exports provided: HomePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./home.page */ "./src/app/pages/home/home.page.ts");







var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"]
                    }
                ])
            ],
            declarations: [_home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"]]
        })
    ], HomePageModule);
    return HomePageModule;
}());



/***/ }),

/***/ "./src/app/pages/home/home.page.html":
/*!*******************************************!*\
  !*** ./src/app/pages/home/home.page.html ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar id=\"topToolbar\">\r\n\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button></ion-menu-button>\r\n      <img src=\"../../../assets/img/logo-200.png\" height=\"35\">\r\n    </ion-buttons>\r\n\r\n    <ion-title>\r\n      <ion-label color=\"light\">\r\n        <p><b>{{nowTime}}</b></p>\r\n      </ion-label>\r\n    </ion-title>\r\n\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<!-- Default Segment -->\r\n  <ion-toolbar id=\"segmentToolbar\" (pan)=\"panToFirstSeg($event)\">\r\n      <ion-segment no-padding value=\"home\" [(ngModel)]=\"category\" scrollable id=\"segment\" > \r\n        <ion-segment-button no-padding value=\"home\" (click)=\"home()\" id=\"0\">\r\n          <ion-icon class=\"big\" src=\"../../../assets/img/menu-icons/prothom-pata.svg\"></ion-icon>\r\n          <ion-label color=\"dark my-custom\">প্রথম পাতা</ion-label>\r\n        </ion-segment-button>\r\n        <ion-segment-button no-padding value=\"videos\" (click)=\"videos()\" id=\"1\">\r\n          <ion-icon class=\"big\" src=\"../../../assets/img/menu-icons/video.svg\"></ion-icon>\r\n          <ion-label color=\"dark\">ভিডিও নিউজ</ion-label>\r\n        </ion-segment-button>\r\n        <ion-segment-button no-padding value=\"bangladesh\" (click)=\"bangladesh()\" id=\"2\">\r\n          <ion-icon class=\"big\" src=\"../../../assets/img/menu-icons/bangladesh.svg\"></ion-icon>\r\n          <ion-label color=\"dark\">বাংলাদেশ</ion-label>\r\n        </ion-segment-button>\r\n         <ion-segment-button no-padding value=\"politics\" (click)=\"politics()\" id=\"3\">\r\n          <ion-icon class=\"big\" src=\"../../../assets/img/menu-icons/politics.svg\"></ion-icon>\r\n          <ion-label color=\"dark\">রাজনীতি</ion-label>\r\n        </ion-segment-button>  \r\n        <ion-segment-button no-padding value=\"international\" (click)=\"international()\" id=\"4\">\r\n          <ion-icon class=\"big\" src=\"../../../assets/img/menu-icons/international.svg\"></ion-icon>\r\n          <ion-label color=\"dark\">আন্তর্জাতিক</ion-label>\r\n        </ion-segment-button>\r\n        <ion-segment-button no-padding value=\"economy\" (click)=\"economy()\" id=\"5\">\r\n          <ion-icon class=\"big\" src=\"../../../assets/img/menu-icons/economy.svg\"></ion-icon>\r\n          <ion-label color=\"dark\">অর্থনীতি</ion-label>\r\n        </ion-segment-button>\r\n        <ion-segment-button no-padding value=\"share\" (click)=\"share()\" id=\"6\">\r\n          <ion-icon class=\"big\" src=\"../../../assets/img/menu-icons/others.svg\"></ion-icon>\r\n          <ion-label color=\"dark\">পুঁজিবাজার</ion-label>\r\n        </ion-segment-button>   \r\n        <ion-segment-button no-padding value=\"sports\" (click)=\"sports()\" id=\"7\">\r\n          <ion-icon class=\"big\" src=\"../../../assets/img/menu-icons/game.svg\"></ion-icon>\r\n          <ion-label color=\"dark\">খেলা</ion-label>\r\n        </ion-segment-button>\r\n        <ion-segment-button no-padding value=\"entertainment\" (click)=\"entertainment()\" id=\"8\">\r\n          <ion-icon class=\"big\" src=\"../../../assets/img/menu-icons/buzz.svg\"></ion-icon>\r\n          <ion-label color=\"dark\">বিনোদন</ion-label>\r\n        </ion-segment-button>\r\n        <ion-segment-button no-padding value=\"tech\" (click)=\"tech()\" id=\"9\">\r\n          <ion-icon class=\"big\" src=\"../../../assets/img/menu-icons/science.svg\"></ion-icon>\r\n          <ion-label color=\"dark\">বিজ্ঞান-প্রযুক্তি</ion-label>\r\n        </ion-segment-button>\r\n        <ion-segment-button no-padding value=\"lifeStyle\" (click)=\"lifeStyle()\" id=\"10\">\r\n          <ion-icon class=\"big\" src=\"../../../assets/img/menu-icons/lifestyle.svg\"></ion-icon>\r\n          <ion-label color=\"dark\">জীবনযাপন</ion-label>\r\n        </ion-segment-button>\r\n        <ion-segment-button no-padding value=\"education\" (click)=\"education()\" id=\"11\">\r\n          <ion-icon class=\"big\" src=\"../../../assets/img/menu-icons/education.svg\"></ion-icon>\r\n          <ion-label color=\"dark\">শিক্ষা</ion-label>\r\n        </ion-segment-button>\r\n        <ion-segment-button no-padding value=\"crime\" (click)=\"crime()\" id=\"12\">\r\n          <ion-icon class=\"big\" src=\"../../../assets/img/menu-icons/crime.svg\"></ion-icon>\r\n          <ion-label color=\"dark\">আপরাধ জগত</ion-label>\r\n        </ion-segment-button>\r\n        <ion-segment-button no-padding value=\"culture\" (click)=\"culture()\" id=\"13\">\r\n          <ion-icon class=\"big\" src=\"../../../assets/img/menu-icons/literature.svg\"></ion-icon>\r\n          <ion-label color=\"dark\">শিল্প-সাহিত্য</ion-label>\r\n        </ion-segment-button>\r\n        <ion-segment-button no-padding value=\"vivid\" (click)=\"vivid()\" id=\"14\">\r\n          <ion-icon class=\"big\" src=\"../../../assets/img/menu-icons/bichitro.svg\"></ion-icon>\r\n          <ion-label color=\"dark\">বিচিত্র</ion-label>\r\n        </ion-segment-button>\r\n        <ion-segment-button no-padding value=\"business\" (click)=\"business()\" id=\"15\">\r\n          <ion-icon class=\"big\" src=\"../../../assets/img/menu-icons/business.svg\"></ion-icon>\r\n          <ion-label color=\"dark\">ব্যবসা-বাণিজ্য</ion-label>\r\n        </ion-segment-button>\r\n        <ion-segment-button no-padding value=\"horoscope\" (click)=\"horoscope()\" id=\"16\">\r\n          <ion-icon class=\"big\" src=\"../../../assets/img/menu-icons/horoscope.svg\"></ion-icon>\r\n          <ion-label color=\"dark\">রাশিফল</ion-label>\r\n        </ion-segment-button>\r\n\r\n\r\n\r\n        <hr class=\"hrs\">\r\n      </ion-segment>\r\n  </ion-toolbar>\r\n\r\n\r\n\r\n<ion-content (swipeleft)=\"swipeLeftPress($event)\" (swiperight)=\"swipeRightPress($event)\" class=\"fast\" id=\"ionContent\">\r\n<!--   <ion-fab vertical=\"bottom\" horizontal=\"end\" slot=\"fixed\" id=\"fabButton\" \r\n    (panmove)=\"dragFab($event)\" > -->\r\n      <ion-fab vertical=\"bottom\" horizontal=\"end\" slot=\"fixed\" id=\"fabButton\" \r\n      (touchmove)=\"fabMove($event,1)\" (touchend)=\"fabMove($event,0)\">\r\n    <ion-fab-button color=\"danger\" [routerDirection]=\"'root'\" routerLink=\"/livetv\">\r\n     <!-- <ion-fab-button color=\"danger\">  -->\r\n      <img src=\"../../../assets/img/news-source-icons/television.png\" style=\"max-width: 3em;\">\r\n    </ion-fab-button>\r\n<!-- //////////////////////// -->\r\n<!--       <ion-fab-list side=\"top\">\r\n          <ion-fab-button color=\"light\" (click)='fabmove(\"left\")'>\r\n            <ion-icon name=\"arrow-round-back\"></ion-icon>\r\n          </ion-fab-button>\r\n          <ion-fab-button color=\"light\" (click)='fabmove(\"right\")'>\r\n            <ion-icon name=\"arrow-round-forward\"></ion-icon>\r\n          </ion-fab-button>\r\n          <ion-fab-button color=\"danger\" [routerDirection]=\"'root'\" routerLink=\"/livetv\">\r\n           <b>TV</b>\r\n          </ion-fab-button>\r\n        </ion-fab-list> -->\r\n<!-- /////////////////////////    -->\r\n  </ion-fab>\r\n  <ion-refresher *ngIf=swipe_pull slot=\"fixed\" (ionRefresh)=\"doRefresh($event,category)\">\r\n    <ion-refresher-content pullingIcon=\"arrow-dropdown\" refreshingSpinner=\"crescent\">\r\n    </ion-refresher-content>\r\n  </ion-refresher>\r\n\r\n  <!-- Home section -->\r\n  <div scrollable>\r\n    <ion-list *ngIf=\"homeVisibleFlag\">\r\n      <ion-card id=\"weatherCard\" *ngIf=\"weatherFlag\">\r\n        <ion-card-header>\r\n          <ion-card-subtitle>\r\n            <!--Basic: auto-select the icon based on the platform -->\r\n          </ion-card-subtitle>\r\n          <ion-grid>\r\n            <ion-row>\r\n              <ion-col size=\"8\" style=\"padding: 0;\">\r\n              <img src={{tharmoIcon}} style=\"width: 27%;float: left;margin-right: -9px;margin-top: 3%;\">\r\n                <span class=\"weatherDegree\" *ngIf=\"temp\">{{temp}}<sup>০</sup>C</span>\r\n                <p id=\"weatherCardText\" style=\"margin-top:-0.5%;color: #f4f5f8;\">Feels Like: <span>{{feelsLike}}</span><sup>0</sup> C</p>\r\n\r\n              </ion-col>\r\n              <ion-col class=\"weatherSummery\" style=\"margin-left: 0;padding: 0\" *ngIf=\"weatherIconUrl\">\r\n                <img class=\"weatherIcon\" src={{weatherIconUrl}} alt=\"weather icon\">\r\n                <p id=\"weatherCardText\">{{description}}</p>\r\n                <p id=\"weatherCardText\">humidity <span *ngIf=\"humidity\">{{humidity}}%</span></p>\r\n                <p id=\"weatherCardText\">Wind: <span *ngIf=\"wind\">{{wind}}</span> Mph</p>\r\n              </ion-col>\r\n            </ion-row>\r\n            <ion-row>\r\n              <ion-col>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </ion-card-header>\r\n      </ion-card>\r\n      <!-- If location service is not enabled -->\r\n      <ion-card *ngIf=\"weatherFlag==false\">\r\n        <ion-card-header>\r\n          <ion-card-subtitle>\r\n            <p>Please check your location service for weather report</p>\r\n            <ion-button size=\"small\" color=\"dark\" (click)=\"openLocation('location')\">Open Location</ion-button>\r\n          </ion-card-subtitle>\r\n        </ion-card-header>\r\n      </ion-card>\r\n\r\n\r\n      <!-- horizontal scroller -->\r\n      <div class=\"container \">\r\n        <h1 class=\"suggestedNews\"> সর্বশেষ খবর</h1>\r\n        <div class=\"scroll\" scrollX=\"true\">\r\n          <span *ngFor=\"let result of allPosts\">\r\n            <ion-card class=\" horizontalScroll\" (click)=goToSource(result.link)>\r\n              <ion-card-header>\r\n                <ion-badge>\r\n                  <img *ngIf=\"result.categories['0']=='14'\" class=\"sourceLogo\"\r\n                    src=\"/assets/img/news-source-icons/bdnews24-logo.png\" />\r\n                  <img *ngIf=\"result.categories['0']=='17'\" class=\"sourceLogo\"\r\n                    src=\"/assets/img/news-source-icons/jugantor.png\" />\r\n                  <img *ngIf=\"result.categories['0']=='15'\" class=\"sourceLogo\"\r\n                    src=\"/assets/img/news-source-icons/prothom-alo.png\" />\r\n                  <img *ngIf=\"result.categories['0']=='76'\" class=\"sourceLogo\"\r\n                    src=\"/assets/img/news-source-icons/somokal.png\" />\r\n                  <img *ngIf=\"result.categories['0']=='262'\" class=\"sourceLogo\"\r\n                    src=\"/assets/img/news-source-icons/tt-logo.png\" />\r\n                  <img *ngIf=\"result.categories['0']=='333'\" class=\"sourceLogo\"\r\n                    src=\"/assets/img/news-source-icons/Bangla_Tribune_logo.png\" />\r\n                  <img *ngIf=\"result.categories['0']=='358'\" class=\"sourceLogo\"\r\n                    src=\"/assets/img/news-source-icons/bbc.png\" />\r\n                  <img *ngIf=\"result.categories['0']=='388'\" class=\"sourceLogo\"\r\n                    src=\"/assets/img/news-source-icons/daily-star.svg\" />\r\n                  <img *ngIf=\"result.categories['0']=='369'\" class=\"sourceLogo\"\r\n                    src=\"/assets/img/news-source-icons/cnn.png\" />\r\n                  <img *ngIf=\"result.categories['0']=='420'\" class=\"sourceLogo\"\r\n                    src=\"/assets/img/news-source-icons/The_Washington_Post_logo_newspaper.png\" />\r\n                  <img *ngIf=\"result.categories['0']=='417'\" class=\"sourceLogo\"\r\n                    src=\"/assets/img/news-source-icons/banglanews_logo.jpg\" />\r\n                </ion-badge>\r\n                <div class=\"newsRecommendedImg\">\r\n                  <img *ngIf=\"result.fimg_url;\" src=\"{{result.fimg_url}}\" />\r\n                  <img *ngIf=\"!result.fimg_url\" src=\"assets/img/news_fallback.png\" />\r\n                </div>\r\n\r\n                <div style=\"position:absolute;margin-top:10px;\">\r\n                  <ion-card-subtitle class=\"newsRecommended\" color=\"dark\" *ngIf=\"result.title.rendered\"\r\n                    [innerHtml]=\"result.title.rendered\">\r\n                  </ion-card-subtitle>\r\n                </div>\r\n\r\n              </ion-card-header>\r\n              <div class=\"newsTags\">\r\n                <div class=\"publishedOn\" *ngIf=\"result.date\">\r\n                  <p style=\"margin:auto;\">\r\n                    <ion-icon name=\"md-clock\"></ion-icon> {{result.date}}\r\n                  </p>\r\n                </div>\r\n              </div>\r\n\r\n            </ion-card>\r\n          </span>\r\n        </div>\r\n      </div>\r\n      <div class=\"container \">\r\n        <h1 class=\"suggestedNews\">সারাদিনের খবর</h1>\r\n        <!-- ionic grid starts -->\r\n        <ion-grid>\r\n          <ion-row>\r\n            <ion-col size=\"6\" *ngFor=\"let result of allPosts\" class=\"callOfTodaysNews\">\r\n              <ion-card class=\"newsOfToday\" (click)=goToSource(result.link) style=\"width:100%;height:17em;margin:auto;\">\r\n                <ion-card-header class=\"cardNewsHeader\">\r\n                  <ion-badge class=\"sourceBadge\">\r\n                    <img *ngIf=\"result.categories['0']=='14'\" class=\"sourceLogo\"\r\n                      src=\"/assets/img/news-source-icons/bdnews24-logo.png\" />\r\n                    <img *ngIf=\"result.categories['0']=='17'\" class=\"sourceLogo\"\r\n                      src=\"/assets/img/news-source-icons/jugantor.png\" />\r\n                    <img *ngIf=\"result.categories['0']=='15'\" class=\"sourceLogo\"\r\n                      src=\"/assets/img/news-source-icons/prothom-alo.png\" />\r\n                    <img *ngIf=\"result.categories['0']=='76'\" class=\"sourceLogo\"\r\n                      src=\"/assets/img/news-source-icons/somokal.png\" />\r\n                    <img *ngIf=\"result.categories['0']=='262'\" class=\"sourceLogo\"\r\n                      src=\"/assets/img/news-source-icons/tt-logo.png\" />\r\n                    <img *ngIf=\"result.categories['0']=='333'\" class=\"sourceLogo\"\r\n                      src=\"/assets/img/news-source-icons/Bangla_Tribune_logo.png\" />\r\n                    <img *ngIf=\"result.categories['0']=='358'\" class=\"sourceLogo\"\r\n                      src=\"/assets/img/news-source-icons/bbc.png\" />\r\n                    <img *ngIf=\"result.categories['0']=='388'\" class=\"sourceLogo\"\r\n                      src=\"/assets/img/news-source-icons/daily-star.svg\" />\r\n                    <img *ngIf=\"result.categories['0']=='369'\" class=\"sourceLogo\"\r\n                      src=\"/assets/img/news-source-icons/cnn.png\" />\r\n                    <img *ngIf=\"result.categories['0']=='420'\" class=\"sourceLogo\"\r\n                      src=\"/assets/img/news-source-icons/The_Washington_Post_logo_newspaper.png\" />\r\n                    <img *ngIf=\"result.categories['0']=='417'\" class=\"sourceLogo\"\r\n                      src=\"/assets/img/news-source-icons/banglanews_logo.jpg\" />\r\n                  </ion-badge>\r\n                  <img *ngIf=\"result.fimg_url;\" src=\"{{result.fimg_url}}\" style=\"width: 100%\" />\r\n                  <img *ngIf=\"!result.fimg_url\" src=\"assets/img/news_fallback.png\" style=\"width: 100%\" />\r\n\r\n\r\n                  <ion-card-subtitle color=\"dark\" *ngIf=\"result.title.rendered\" [innerHtml]=\"result.title.rendered\">\r\n\r\n\r\n                  </ion-card-subtitle>\r\n\r\n\r\n                  <!-- <ion-card-title>Card Title</ion-card-title> -->\r\n                </ion-card-header>\r\n              </ion-card>\r\n            </ion-col>\r\n            <ion-infinite-scroll threshold=\"85%\" (ionInfinite)=\"loadAllNews($event)\">\r\n              <ion-infinite-scroll-content loadingSpinner=\"bubbles\">\r\n              </ion-infinite-scroll-content>\r\n            </ion-infinite-scroll>\r\n          </ion-row>\r\n        </ion-grid>\r\n      </div>\r\n\r\n    </ion-list>\r\n    <!-- Home ends -->\r\n    <!-- Videos news -->\r\n    <ion-list *ngIf=\"showVideoNews\">\r\n      <div *ngFor=\"let result of jamunaTvYoutube\">\r\n        <ion-card (click)=goToYoutube(result.id.videoId)>\r\n          <ion-card-header>\r\n            <!-- <ion-badge>ভিডিও নিউজ</ion-badge> -->\r\n            <img *ngIf=\"result.snippet.thumbnails\" src=\"{{result.snippet.thumbnails.high.url}}\" />\r\n            <img *ngIf=\"!result.snippet.thumbnails\" src=\"assets/img/news_fallback.png\" />\r\n            <ion-card-subtitle color=\"dark\" class=\"sectionTitle\" *ngIf=\"result.snippet.title\" \r\n            [innerHtml]=\"result.snippet.title\">\r\n            </ion-card-subtitle>\r\n          </ion-card-header>\r\n        </ion-card>\r\n      </div>\r\n    </ion-list>\r\n    <!-- Bangladesh news -->\r\n    <ion-list *ngIf=\"showOtherSegments\">\r\n      <div *ngFor=\"let result of mainNewsArray\">\r\n        <ion-card (click)=goToSource(result.link)>\r\n          <ion-card-header>\r\n            <!--  <ion-badge>বাংলাদেশ</ion-badge> -->\r\n            <img *ngIf=\"result.fimg_url;\" src=\"{{result.fimg_url}}\" />\r\n            <img *ngIf=\"!result.fimg_url\" src=\"assets/img/news_fallback.png\" />\r\n            <ion-card-subtitle color=\"dark\" class=\"sectionTitle\" *ngIf=\"result.title.rendered\"\r\n              [innerHtml]=\"result.title.rendered\">\r\n            </ion-card-subtitle>\r\n          </ion-card-header>\r\n          <img *ngIf=\"result.categories['0']=='14'\" class=\"sourceLogoAllCategory\"\r\n            src=\"/assets/img/news-source-icons/bdnews24-logo.png\" />\r\n          <img *ngIf=\"result.categories['0']=='17'\" class=\"sourceLogoAllCategory\"\r\n            src=\"/assets/img/news-source-icons/jugantor.png\" />\r\n          <img *ngIf=\"result.categories['0']=='15'\" class=\"sourceLogoAllCategory\"\r\n            src=\"/assets/img/news-source-icons/prothom-alo.png\" />\r\n          <img *ngIf=\"result.categories['0']=='76'\" class=\"sourceLogoAllCategory\"\r\n            src=\"/assets/img/news-source-icons/somokal.png\" />\r\n          <img *ngIf=\"result.categories['0']=='262'\" class=\"sourceLogoAllCategory\"\r\n            src=\"/assets/img/news-source-icons/tt-logo.png\" />\r\n          <img *ngIf=\"result.categories['0']=='333'\" class=\"sourceLogoAllCategory\"\r\n            src=\"/assets/img/news-source-icons/Bangla_Tribune_logo.png\" />\r\n          <img *ngIf=\"result.categories['0']=='358'\" class=\"sourceLogoAllCategory\"\r\n            src=\"/assets/img/news-source-icons/bbc.png\" />\r\n          <img *ngIf=\"result.categories['0']=='388'\" class=\"sourceLogoAllCategory\"\r\n            src=\"/assets/img/news-source-icons/daily-star.svg\" />\r\n          <img *ngIf=\"result.categories['0']=='369'\" class=\"sourceLogoAllCategory\"\r\n            src=\"/assets/img/news-source-icons/cnn.png\" />\r\n          <img *ngIf=\"result.categories['0']=='420'\" class=\"sourceLogoAllCategory\"\r\n            src=\"/assets/img/news-source-icons/The_Washington_Post_logo_newspaper.png\" />\r\n          <img *ngIf=\"result.categories['0']=='417'\" class=\"sourceLogoAllCategory\"\r\n            src=\"/assets/img/news-source-icons/banglanews_logo.jpg\" />\r\n        </ion-card>\r\n      </div>\r\n      <ion-infinite-scroll threshold=\"85%\" (ionInfinite)=\"loadAllBangladeshNews($event,category)\">\r\n        <ion-infinite-scroll-content loadingSpinner=\"bubbles\">\r\n        </ion-infinite-scroll-content>\r\n      </ion-infinite-scroll>\r\n    </ion-list>\r\n  </div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/pages/home/home.page.scss":
/*!*******************************************!*\
  !*** ./src/app/pages/home/home.page.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".ion-color-danger {\n  --ion-color-base: #fe8c00 !important; }\n\n#weatherCard {\n  background-repeat: no-repeat;\n  background-size: cover; }\n\n#weatherCardText {\n  color: white; }\n\nion-title {\n  text-align: left !important;\n  padding: 12px;\n  font-weight: 700;\n  font-size: 1.5em; }\n\n#topToolbar {\n  --background: #fe8c00; }\n\nion-segment-button {\n  border: none;\n  font-weight: 900;\n  font-size: 0.8em;\n  --indicator-color-checked: #fcb13c;\n  --color-activated: #fcb13c;\n  --color-checked: #fcb13c;\n  --background: #fabc5a1b; }\n\n.button-outline.ion-color.button-native {\n  color: black; }\n\nion-segment {\n  background-image: white;\n  padding: 0;\n  box-shadow: 0px 10px 5px #888, 0px -10px 5px #888; }\n\nion-card-subtitle .newsRecommended {\n  margin-top: 1em;\n  margin-left: 1em;\n  padding: 0;\n  position: absolute; }\n\nion-card-subtitle {\n  margin-top: 1em !important;\n  margin-left: 1em !important;\n  padding: 0;\n  font-size: 1.1em; }\n\ndiv[scrollx=\"true\"] {\n  display: flex;\n  flex-wrap: nowrap;\n  overflow-x: auto; }\n\ndiv[scrollx=\"true\"]::-webkit-scrollbar {\n    display: none; }\n\ndiv[scrollx=\"true\"] .scroll-item {\n    flex: 0 0 auto; }\n\n.horizontalScroll {\n  width: 16em;\n  height: 18.5em;\n  border-radius: 5px; }\n\n.cardData {\n  width: 100%;\n  display: flex;\n  flex-wrap: wrap; }\n\n.newsToday {\n  width: 40%;\n  line-height: 100px;\n  background-color: grey;\n  margin: 10px;\n  color: white;\n  text-align: center;\n  vertical-align: middle;\n  position: relative; }\n\n.cardNewsHeader {\n  height: 17em;\n  padding: 0px; }\n\n.newsOfToday {\n  height: 16em; }\n\n.newsOfToday .sourceLogo {\n  width: 100%;\n  height: 1.6em;\n  margin-top: 0;\n  margin-left: 0em;\n  margin-bottom: -1em;\n  background-color: #fcb13c;\n  border-radius: 25px;\n  margin: auto; }\n\n.sourceLogoAllCategory {\n  width: 9em;\n  height: 2em;\n  align-items: right;\n  float: right;\n  border-radius: 0.5em;\n  margin-bottom: 0.2em;\n  margin-right: 0.2em; }\n\n.callOfTodaysNews {\n  min-width: 8em; }\n\n.newsOfToday img {\n  width: 12em;\n  height: 10em;\n  z-index: 0; }\n\n.hrs {\n  box-shadow: 0px 1.5px 1.5px #646364; }\n\nion-card-content {\n  margin-left: 1em;\n  padding: 0; }\n\n::-webkit-scrollbar,\n*::-webkit-scrollbar {\n  display: none;\n  overflow: scroll; }\n\nion-content {\n  overflow: hidden;\n  --overflow: scroll; }\n\n.scroll-content {\n  overflow: scroll; }\n\nion-infinite-scroll.md.infinite-scroll-enabled.hydrated {\n  overflow: scroll !important;\n  height: 100% !important; }\n\n.weatherIcon {\n  width: 3em; }\n\nion-card-header {\n  padding: 4px; }\n\n.weatherDegree {\n  margin-top: 7px;\n  font-size: 2.5em;\n  font-weight: 900;\n  color: #fcb13c; }\n\n.weatherSummery p {\n  margin: 0; }\n\nion-badge {\n  /*width: 8em;*/\n  display: block;\n  position: absolute;\n  /*height: 1.8em;*/\n  margin-top: 11em;\n  margin-left: 8.6em;\n  background-color: #f2f2f2;\n  /*background-color: #fcb13c;*/\n  color: black; }\n\n.sourceBadge {\n  width: 8em;\n  display: block;\n  position: absolute;\n  height: 1.8em;\n  margin-top: 10em;\n  margin-left: 3em;\n  background-color: #fcb13c;\n  color: black;\n  padding: 0; }\n\n.weatherShortReport {\n  position: relative;\n  padding: 0;\n  margin-top: 0px; }\n\n.temperature {\n  padding: 0; }\n\n.suggestedNews {\n  font-weight: 700;\n  font-size: 1.5em;\n  margin-left: 9.8px; }\n\n.scrollContainer {\n  margin-left: 0.8em; }\n\n.newsTags {\n  width: 100%;\n  height: 7em;\n  position: absolute;\n  margin-top: 7em; }\n\n.newsTags img {\n  max-width: 8em;\n  margin-left: 7em;\n  margin-top: -2em; }\n\n.newsTags .publishedOn {\n  text-align: center;\n  color: #fcb13c;\n  margin-top: -1.5em;\n  margin-left: 7em; }\n\n.newsRecommendedImg img {\n  width: 100%;\n  height: 11em; }\n\n.sectionTitle {\n  font-size: 1.6em; }\n\nion-icon.big {\n  width: 30px;\n  height: 30px; }\n\nion-icon.bigger {\n  width: 100px;\n  height: 100px; }\n\nion-icon.red {\n  color: red; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvaG9tZS9EOlxcTk9ERUpTIEFQUFxcSW9uaWM0XFxzaG9iLWtob2JvciAzXFxzaG9iLWtob2Jvci9zcmNcXGFwcFxccGFnZXNcXGhvbWVcXGhvbWUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usb0NBQWlCLEVBQUE7O0FBRW5CO0VBQ0UsNEJBQTRCO0VBQzVCLHNCQUFzQixFQUFBOztBQUV4QjtFQUNFLFlBQVcsRUFBQTs7QUFFYjtFQUNFLDJCQUEyQjtFQUMzQixhQUFhO0VBQ2IsZ0JBQWdCO0VBQ2hCLGdCQUFnQixFQUFBOztBQUdsQjtFQUNFLHFCQUFhLEVBQUE7O0FBR2Y7RUFDRSxZQUFZO0VBQ1osZ0JBQWdCO0VBQ2hCLGdCQUFnQjtFQUNoQixrQ0FBMEI7RUFDMUIsMEJBQWtCO0VBQ2xCLHdCQUFnQjtFQUNoQix1QkFBYSxFQUFBOztBQUdmO0VBQ0UsWUFBVyxFQUFBOztBQUdiO0VBRUUsdUJBQXVCO0VBQ3ZCLFVBQVU7RUFDVixpREFBaUQsRUFBQTs7QUFHbkQ7RUFDRSxlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLFVBQVU7RUFDVixrQkFBa0IsRUFBQTs7QUFFcEI7RUFDRSwwQkFBMEI7RUFDMUIsMkJBQTJCO0VBQzNCLFVBQVU7RUFDVixnQkFBZ0IsRUFBQTs7QUFHbEI7RUFDRSxhQUFhO0VBQ2IsaUJBQWlCO0VBQ2pCLGdCQUFnQixFQUFBOztBQUhsQjtJQUtJLGFBQWEsRUFBQTs7QUFMakI7SUFRSSxjQUFjLEVBQUE7O0FBSWxCO0VBQ0UsV0FBVztFQUNYLGNBQWM7RUFDZCxrQkFBa0IsRUFBQTs7QUFHcEI7RUFDRSxXQUFXO0VBQ1gsYUFBYTtFQUViLGVBQWUsRUFBQTs7QUFFakI7RUFDRSxVQUFVO0VBQ1Ysa0JBQWtCO0VBQ2xCLHNCQUFzQjtFQUN0QixZQUFZO0VBQ1osWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixzQkFBc0I7RUFDdEIsa0JBQWtCLEVBQUE7O0FBR3BCO0VBQ0UsWUFBWTtFQUNaLFlBQVcsRUFBQTs7QUFHYjtFQUNFLFlBQVksRUFBQTs7QUFFZDtFQUNFLFdBQVc7RUFDWCxhQUFhO0VBQ2IsYUFBYTtFQUNiLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIseUJBQXlCO0VBQ3pCLG1CQUFtQjtFQUNuQixZQUFXLEVBQUE7O0FBR2I7RUFDRSxVQUFVO0VBQ1YsV0FBVztFQUVYLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osb0JBQW9CO0VBQ3BCLG9CQUFvQjtFQUNwQixtQkFBbUIsRUFBQTs7QUFJckI7RUFDRSxjQUFjLEVBQUE7O0FBR2hCO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixVQUFVLEVBQUE7O0FBRVo7RUFJRSxtQ0FBbUMsRUFBQTs7QUFHckM7RUFDRSxnQkFBZ0I7RUFFaEIsVUFBVSxFQUFBOztBQUlaOztFQUVFLGFBQWE7RUFDYixnQkFBZ0IsRUFBQTs7QUFHbEI7RUFDRSxnQkFBZ0I7RUFDaEIsa0JBQVcsRUFBQTs7QUFHYjtFQUNFLGdCQUFnQixFQUFBOztBQUVsQjtFQUNFLDJCQUEyQjtFQUMzQix1QkFBdUIsRUFBQTs7QUFFekI7RUFDRSxVQUFVLEVBQUE7O0FBR1o7RUFDRSxZQUFZLEVBQUE7O0FBR2Q7RUFDRSxlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtFQUNoQixjQUFjLEVBQUE7O0FBR2hCO0VBQ0UsU0FBUyxFQUFBOztBQUdYO0VBQ0UsY0FBQTtFQUNBLGNBQWM7RUFDZCxrQkFBa0I7RUFDbEIsaUJBQUE7RUFDQSxnQkFBZ0I7RUFDaEIsa0JBQWtCO0VBQ2xCLHlCQUF3QjtFQUN4Qiw2QkFBQTtFQUNBLFlBQVksRUFBQTs7QUFFZDtFQUNFLFVBQVU7RUFDVixjQUFjO0VBQ2Qsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLHlCQUF5QjtFQUN6QixZQUFZO0VBQ1osVUFBVSxFQUFBOztBQUdaO0VBQ0Usa0JBQWtCO0VBQ2xCLFVBQVU7RUFDVixlQUFlLEVBQUE7O0FBR2pCO0VBQ0UsVUFBVSxFQUFBOztBQUdaO0VBQ0UsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtFQUNoQixrQkFBa0IsRUFBQTs7QUFHcEI7RUFDRSxrQkFBa0IsRUFBQTs7QUFHcEI7RUFFRSxXQUFXO0VBQ1gsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixlQUFlLEVBQUE7O0FBRWpCO0VBQ0UsY0FBYztFQUNkLGdCQUFnQjtFQUNoQixnQkFBZ0IsRUFBQTs7QUFFbEI7RUFDRSxrQkFBa0I7RUFDbEIsY0FBYztFQUNkLGtCQUFrQjtFQUNsQixnQkFBZ0IsRUFBQTs7QUFHbEI7RUFDRSxXQUFXO0VBQ1gsWUFBWSxFQUFBOztBQUdkO0VBQ0UsZ0JBQWdCLEVBQUE7O0FBR2xCO0VBRUksV0FBVztFQUNYLFlBQVksRUFBQTs7QUFIaEI7RUFPSSxZQUFZO0VBQ1osYUFBYSxFQUFBOztBQVJqQjtFQVlJLFVBQVUsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2hvbWUvaG9tZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaW9uLWNvbG9yLWRhbmdlcntcclxuICAtLWlvbi1jb2xvci1iYXNlOiAjZmU4YzAwICFpbXBvcnRhbnQ7XHJcbiB9XHJcbiN3ZWF0aGVyQ2FyZHtcclxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbn1cclxuI3dlYXRoZXJDYXJkVGV4dHtcclxuICBjb2xvcjp3aGl0ZTtcclxufVxyXG5pb24tdGl0bGUge1xyXG4gIHRleHQtYWxpZ246IGxlZnQgIWltcG9ydGFudDtcclxuICBwYWRkaW5nOiAxMnB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgZm9udC1zaXplOiAxLjVlbTtcclxufVxyXG5cclxuI3RvcFRvb2xiYXJ7XHJcbiAgLS1iYWNrZ3JvdW5kOiAjZmU4YzAwO1xyXG59XHJcblxyXG5pb24tc2VnbWVudC1idXR0b24ge1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBmb250LXdlaWdodDogOTAwO1xyXG4gIGZvbnQtc2l6ZTogMC44ZW07XHJcbiAgLS1pbmRpY2F0b3ItY29sb3ItY2hlY2tlZDogI2ZjYjEzYztcclxuICAtLWNvbG9yLWFjdGl2YXRlZDogI2ZjYjEzYztcclxuICAtLWNvbG9yLWNoZWNrZWQ6ICNmY2IxM2M7XHJcbiAgLS1iYWNrZ3JvdW5kOiAjZmFiYzVhMWI7XHJcbn1cclxuXHJcbi5idXR0b24tb3V0bGluZS5pb24tY29sb3IuYnV0dG9uLW5hdGl2ZXtcclxuICBjb2xvcjpibGFjaztcclxufVxyXG5cclxuaW9uLXNlZ21lbnQge1xyXG4gIC8vIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgI2VhZDFhZCwgd2hpdGUpO1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IHdoaXRlO1xyXG4gIHBhZGRpbmc6IDA7XHJcbiAgYm94LXNoYWRvdzogMHB4IDEwcHggNXB4ICM4ODgsIDBweCAtMTBweCA1cHggIzg4ODtcclxufVxyXG5cclxuaW9uLWNhcmQtc3VidGl0bGUgLm5ld3NSZWNvbW1lbmRlZCB7XHJcbiAgbWFyZ2luLXRvcDogMWVtO1xyXG4gIG1hcmdpbi1sZWZ0OiAxZW07XHJcbiAgcGFkZGluZzogMDtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbn1cclxuaW9uLWNhcmQtc3VidGl0bGUge1xyXG4gIG1hcmdpbi10b3A6IDFlbSAhaW1wb3J0YW50O1xyXG4gIG1hcmdpbi1sZWZ0OiAxZW0gIWltcG9ydGFudDtcclxuICBwYWRkaW5nOiAwO1xyXG4gIGZvbnQtc2l6ZTogMS4xZW07XHJcbn1cclxuXHJcbmRpdltzY3JvbGx4PVwidHJ1ZVwiXSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LXdyYXA6IG5vd3JhcDtcclxuICBvdmVyZmxvdy14OiBhdXRvO1xyXG4gICY6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgfVxyXG4gIC5zY3JvbGwtaXRlbSB7XHJcbiAgICBmbGV4OiAwIDAgYXV0bztcclxuICB9XHJcbn1cclxuXHJcbi5ob3Jpem9udGFsU2Nyb2xsIHtcclxuICB3aWR0aDogMTZlbTtcclxuICBoZWlnaHQ6IDE4LjVlbTtcclxuICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuXHJcbi5jYXJkRGF0YSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICAvLyBmbGV4LWRpcmVjdGlvbjogcm93OzEwZW1cclxuICBmbGV4LXdyYXA6IHdyYXA7XHJcbn1cclxuLm5ld3NUb2RheSB7XHJcbiAgd2lkdGg6IDQwJTtcclxuICBsaW5lLWhlaWdodDogMTAwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcclxuICBtYXJnaW46IDEwcHg7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxufVxyXG5cclxuLmNhcmROZXdzSGVhZGVyIHtcclxuICBoZWlnaHQ6IDE3ZW07XHJcbiAgcGFkZGluZzowcHg7XHJcbn1cclxuXHJcbi5uZXdzT2ZUb2RheXtcclxuICBoZWlnaHQ6IDE2ZW07XHJcbn1cclxuLm5ld3NPZlRvZGF5IC5zb3VyY2VMb2dvIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDEuNmVtO1xyXG4gIG1hcmdpbi10b3A6IDA7XHJcbiAgbWFyZ2luLWxlZnQ6IDBlbTtcclxuICBtYXJnaW4tYm90dG9tOiAtMWVtO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmY2IxM2M7XHJcbiAgYm9yZGVyLXJhZGl1czogMjVweDtcclxuICBtYXJnaW46YXV0bztcclxufVxyXG5cclxuLnNvdXJjZUxvZ29BbGxDYXRlZ29yeSB7XHJcbiAgd2lkdGg6IDllbTtcclxuICBoZWlnaHQ6IDJlbTtcclxuICAvLyBiYWNrZ3JvdW5kLWNvbG9yOiAjYmI4ZjUyO1xyXG4gIGFsaWduLWl0ZW1zOiByaWdodDtcclxuICBmbG9hdDogcmlnaHQ7XHJcbiAgYm9yZGVyLXJhZGl1czogMC41ZW07XHJcbiAgbWFyZ2luLWJvdHRvbTogMC4yZW07XHJcbiAgbWFyZ2luLXJpZ2h0OiAwLjJlbTtcclxufVxyXG5cclxuXHJcbi5jYWxsT2ZUb2RheXNOZXdzIHtcclxuICBtaW4td2lkdGg6IDhlbTtcclxufVxyXG5cclxuLm5ld3NPZlRvZGF5IGltZyB7XHJcbiAgd2lkdGg6IDEyZW07XHJcbiAgaGVpZ2h0OiAxMGVtO1xyXG4gIHotaW5kZXg6IDA7XHJcbn1cclxuLmhycyB7XHJcbiAgLy9ib3JkZXItdG9wOiAxcHggc29saWQgYmxhY2s7XHJcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAwcHggMXB4IDFweCAjNjQ2MzY0O1xyXG4gIC1tb3otYm94LXNoYWRvdzogMHB4IDFweCAxcHggIzY0NjM2NDtcclxuICBib3gtc2hhZG93OiAwcHggMS41cHggMS41cHggIzY0NjM2NDtcclxufVxyXG5cclxuaW9uLWNhcmQtY29udGVudCB7XHJcbiAgbWFyZ2luLWxlZnQ6IDFlbTtcclxuICAvLyBtYXJnaW4tcmlnaHQ6IDEuMWVtO1xyXG4gIHBhZGRpbmc6IDA7XHJcbn1cclxuXHJcbi8vIFZlcnRpY2FsIHNjcm9sbGVyIGRpc2FibGluZ1xyXG46Oi13ZWJraXQtc2Nyb2xsYmFyLFxyXG4qOjotd2Via2l0LXNjcm9sbGJhciB7XHJcbiAgZGlzcGxheTogbm9uZTtcclxuICBvdmVyZmxvdzogc2Nyb2xsO1xyXG59XHJcblxyXG5pb24tY29udGVudCB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAtLW92ZXJmbG93OiBzY3JvbGw7XHJcbn1cclxuXHJcbi5zY3JvbGwtY29udGVudCB7XHJcbiAgb3ZlcmZsb3c6IHNjcm9sbDtcclxufVxyXG5pb24taW5maW5pdGUtc2Nyb2xsLm1kLmluZmluaXRlLXNjcm9sbC1lbmFibGVkLmh5ZHJhdGVkIHtcclxuICBvdmVyZmxvdzogc2Nyb2xsICFpbXBvcnRhbnQ7XHJcbiAgaGVpZ2h0OiAxMDAlICFpbXBvcnRhbnQ7XHJcbn1cclxuLndlYXRoZXJJY29uIHtcclxuICB3aWR0aDogM2VtO1xyXG59XHJcblxyXG5pb24tY2FyZC1oZWFkZXIge1xyXG4gIHBhZGRpbmc6IDRweDtcclxufVxyXG5cclxuLndlYXRoZXJEZWdyZWUge1xyXG4gIG1hcmdpbi10b3A6IDdweDtcclxuICBmb250LXNpemU6IDIuNWVtO1xyXG4gIGZvbnQtd2VpZ2h0OiA5MDA7XHJcbiAgY29sb3I6ICNmY2IxM2M7XHJcbn1cclxuXHJcbi53ZWF0aGVyU3VtbWVyeSBwIHtcclxuICBtYXJnaW46IDA7XHJcbn1cclxuXHJcbmlvbi1iYWRnZSB7XHJcbiAgLyp3aWR0aDogOGVtOyovXHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIC8qaGVpZ2h0OiAxLjhlbTsqL1xyXG4gIG1hcmdpbi10b3A6IDExZW07XHJcbiAgbWFyZ2luLWxlZnQ6IDguNmVtO1xyXG4gIGJhY2tncm91bmQtY29sb3I6I2YyZjJmMjtcclxuICAvKmJhY2tncm91bmQtY29sb3I6ICNmY2IxM2M7Ki9cclxuICBjb2xvcjogYmxhY2s7XHJcbn1cclxuLnNvdXJjZUJhZGdlIHtcclxuICB3aWR0aDogOGVtO1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBoZWlnaHQ6IDEuOGVtO1xyXG4gIG1hcmdpbi10b3A6IDEwZW07XHJcbiAgbWFyZ2luLWxlZnQ6IDNlbTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmNiMTNjO1xyXG4gIGNvbG9yOiBibGFjaztcclxuICBwYWRkaW5nOiAwO1xyXG59XHJcblxyXG4ud2VhdGhlclNob3J0UmVwb3J0IHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgcGFkZGluZzogMDtcclxuICBtYXJnaW4tdG9wOiAwcHg7XHJcbn1cclxuXHJcbi50ZW1wZXJhdHVyZSB7XHJcbiAgcGFkZGluZzogMDtcclxufVxyXG5cclxuLnN1Z2dlc3RlZE5ld3Mge1xyXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgZm9udC1zaXplOiAxLjVlbTtcclxuICBtYXJnaW4tbGVmdDogOS44cHg7XHJcbn1cclxuXHJcbi5zY3JvbGxDb250YWluZXIge1xyXG4gIG1hcmdpbi1sZWZ0OiAwLjhlbTtcclxufVxyXG5cclxuLm5ld3NUYWdzIHtcclxuICAvLyBiYWNrZ3JvdW5kLWNvbG9yOiAjYmI4ZjUyO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogN2VtO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBtYXJnaW4tdG9wOiA3ZW07XHJcbn1cclxuLm5ld3NUYWdzIGltZyB7XHJcbiAgbWF4LXdpZHRoOiA4ZW07XHJcbiAgbWFyZ2luLWxlZnQ6IDdlbTtcclxuICBtYXJnaW4tdG9wOiAtMmVtO1xyXG59XHJcbi5uZXdzVGFncyAucHVibGlzaGVkT24ge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBjb2xvcjogI2ZjYjEzYztcclxuICBtYXJnaW4tdG9wOiAtMS41ZW07XHJcbiAgbWFyZ2luLWxlZnQ6IDdlbTtcclxufVxyXG5cclxuLm5ld3NSZWNvbW1lbmRlZEltZyBpbWcge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogMTFlbTtcclxufVxyXG5cclxuLnNlY3Rpb25UaXRsZSB7XHJcbiAgZm9udC1zaXplOiAxLjZlbTtcclxufVxyXG5cclxuaW9uLWljb24ge1xyXG4gICYuYmlnIHtcclxuICAgIHdpZHRoOiAzMHB4O1xyXG4gICAgaGVpZ2h0OiAzMHB4O1xyXG4gIH1cclxuXHJcbiAgJi5iaWdnZXIge1xyXG4gICAgd2lkdGg6IDEwMHB4O1xyXG4gICAgaGVpZ2h0OiAxMDBweDtcclxuICB9XHJcblxyXG4gICYucmVkIHtcclxuICAgIGNvbG9yOiByZWQ7XHJcbiAgfVxyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/pages/home/home.page.ts":
/*!*****************************************!*\
  !*** ./src/app/pages/home/home.page.ts ***!
  \*****************************************/
/*! exports provided: HomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePage", function() { return HomePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_news_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/news.service */ "./src/app/services/news.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/in-app-browser/ngx */ "./node_modules/@ionic-native/in-app-browser/ngx/index.js");
/* harmony import */ var _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic-native/geolocation/ngx */ "./node_modules/@ionic-native/geolocation/ngx/index.js");
/* harmony import */ var _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/native-geocoder/ngx */ "./node_modules/@ionic-native/native-geocoder/ngx/index.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _ionic_native_open_native_settings_ngx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic-native/open-native-settings/ngx */ "./node_modules/@ionic-native/open-native-settings/ngx/index.js");









// import { AdmobFreeService } from '../../services/admobfree.service';








var HomePage = /** @class */ (function () {
    function HomePage(router, newsApi, event, iab, loadingController, geolocation, nativeGeocoder, platform, toastController, 
    // private admobFreeService: AdmobFreeService,
    route, openNativeSettings) {
        var _this = this;
        this.router = router;
        this.newsApi = newsApi;
        this.event = event;
        this.iab = iab;
        this.loadingController = loadingController;
        this.geolocation = geolocation;
        this.nativeGeocoder = nativeGeocoder;
        this.platform = platform;
        this.toastController = toastController;
        this.route = route;
        this.openNativeSettings = openNativeSettings;
        this.homeVisibleFlag = true;
        this.results = []; // This is the array which contains category segment page getAllBangladeshPosts 
        this.allPosts = [];
        this.test = [];
        this.weather = [];
        this.jamunaTvYoutube = [];
        this.category = 'home';
        this.page = 1;
        this.resultFlag = true;
        this.lat = 0;
        this.long = 0;
        this.weatherFlag = false;
        this.categories = ['704', '658', '729', '726']; // 704= jugantor, 658=bdnews24 729=bengal-beats, 726=prothom-alo
        this.dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        // Geocoder configuration
        this.geoencoderOptions = {
            useLocale: true,
            maxResults: 5
        };
        this.currentTab = 0;
        this.animationStart = 1;
        this.cricketTeams = [];
        this.tharmoIcon = "";
        this.mainNewsArray = [];
        this.showAutoHide = true;
        this.pageNumber = 1;
        this.showOtherSegments = false;
        this.showVideoNews = false;
        this.swipe_pull = true;
        // this.home();
        this.showAutoHideLoader();
        this.event.publish('scrollToTop', this.content);
        // console.log(this.route.snapshot.paramMap.get('id'));
        if (this.route.snapshot.paramMap.get('id') != null) {
            if (this.route.snapshot.paramMap.get('id').includes("random")) {
                this.clickToHome();
            }
            else {
                this.routeInterval = setInterval(function () {
                    if (document.getElementById(String(_this.route.snapshot.paramMap.get('id')))) {
                        _this.segmentWiseSwipe('left', _this.route.snapshot.paramMap.get('id'));
                        clearInterval(_this.routeInterval);
                    }
                }, 2000);
            }
        }
        else {
            this.clickToHome();
        }
        setInterval(function () {
            _this.refreshTime();
        }, 1000);
    }
    HomePage.prototype.clickToHome = function () {
        var _this = this;
        this.routeInterval = setInterval(function () {
            if (document.getElementById(String(0))) {
                _this.segmentWiseSwipe('left', 0);
                clearInterval(_this.routeInterval);
            }
        }, 2000);
    };
    HomePage.prototype.ngOnInit = function () {
        // if (this.platform.is('cordova')) {
        //   this.admobFreeService.BannerAd();
        // }
    };
    HomePage.prototype.refreshTime = function () {
        moment__WEBPACK_IMPORTED_MODULE_8__["locale"]('bn');
        this.nowTime = moment__WEBPACK_IMPORTED_MODULE_8__().format('MMMM Do YYYY, h:mm:ss a');
        // this.nowTime =moment.unix(1568462657).format("MM/DD/YYYY, , h:mm:ss a");
    };
    HomePage.prototype.openLocation = function (settings) {
        var _this = this;
        this.openNativeSettings.open(settings).then(function (val) {
            _this.getGeolocation();
        }).catch(function (err) {
            alert(JSON.stringify(err));
        });
    };
    HomePage.prototype.goToSegment = function (buttonNumber, side) {
        var nextButtonNumber = buttonNumber;
        var buttonWidth = document.getElementById(String(buttonNumber)).offsetWidth;
        document.getElementById(String(nextButtonNumber)).click();
        document.getElementById('segment').scrollLeft = nextButtonNumber * buttonWidth - buttonWidth;
    };
    HomePage.prototype.animationDivContent = function () {
        var _this = this;
        var element = document.querySelector('ion-content#ionContent');
        if (this.animationStart == 1) {
            element.classList.add('animated', 'zoomInUp');
            element.addEventListener('animationend', function () {
                element.classList.remove('animated', 'zoomInUp');
                _this.animationStart = 0;
            });
        }
    };
    HomePage.prototype.animationDiv = function () {
        var _this = this;
        if (!document.getElementById("ionContent")) {
            var interval_1 = setInterval(function () {
                if (document.getElementById("ionContent")) {
                    clearInterval(interval_1);
                    _this.animationDivContent();
                }
            }, 10);
        }
        else {
            this.animationDivContent();
        }
    };
    HomePage.prototype.segmentWiseSwipe = function (side, currentTab) {
        this.goToSegment(currentTab, side);
    };
    HomePage.prototype.swipeLeftPress = function ($event) {
        if (this.swipe_pull) {
            console.log('swipeLeftPress', $event);
            this.currentTab = this.currentTab + 1;
            console.log('this.currentTab', this.currentTab);
            this.currentTab = (this.currentTab > 16 ? 0 : this.currentTab);
            this.segmentWiseSwipe('left', this.currentTab);
        }
    };
    HomePage.prototype.swipeRightPress = function ($event) {
        if (this.swipe_pull) {
            console.log('swipeRightPress', $event);
            this.currentTab = this.currentTab - 1;
            this.currentTab = (this.currentTab < 0 ? 16 : this.currentTab);
            this.segmentWiseSwipe('right', this.currentTab);
        }
    };
    HomePage.prototype.panningLogic = function (side, h1) {
        var bounding = h1.getBoundingClientRect();
        if (side === "left") {
            if (bounding["right"] == document.getElementById('segment').offsetWidth) {
                document.getElementById('segment').scrollLeft = 0;
            }
        }
        if (side === "right") {
            if (bounding["left"] === 0) {
                var buttonWidth = document.getElementById('16').offsetWidth;
                document.getElementById('segment').scrollLeft = 16 * buttonWidth - buttonWidth;
            }
        }
    };
    HomePage.prototype.panToFirstSeg = function ($event) {
        // console.log($event);    
        if ($event["additionalEvent"] === "panleft") {
            var h1 = document.getElementById('16');
            this.panningLogic("left", h1);
        }
        if ($event["additionalEvent"] === "panright") {
            var h1 = document.getElementById('0');
            this.panningLogic("right", h1);
        }
    };
    HomePage.prototype.fabMove = function ($event, option) {
        // console.log($event);
        // console.log("clientX",$event.changedTouches["0"].clientX,"clientY",$event.changedTouches["0"].clientY);
        if (option === 1) {
            this.swipe_pull = false;
            var yPos = $event.changedTouches["0"].clientY + 50;
            yPos = yPos - window.innerHeight;
            var xPos = $event.changedTouches["0"].clientX + 50;
            xPos = xPos - window.innerWidth;
            console.log('xPos:', xPos, 'yPos:', yPos);
            console.log('width:', -window.innerWidth, 'Height:', -window.innerHeight);
            if (xPos - 70 > -window.innerWidth && (xPos) < 0 && (yPos - 200) > -window.innerHeight && (yPos) < 0) {
                document.getElementById("fabButton").style.transform = 'translate(' + xPos + 'px,' + yPos + 'px)';
            }
        }
        else {
            this.swipe_pull = true;
        }
    };
    //////////////////////// Imranul Hasan end ///////////////////////
    // Get current coordinates of device
    HomePage.prototype.getGeolocation = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            _this.geoLatitude = resp.coords.latitude;
            _this.geoLongitude = resp.coords.longitude;
            _this.geoAccuracy = resp.coords.accuracy;
            _this.weatherFlag = true;
            _this.curentWeatherReport(_this.geoLatitude, _this.geoLongitude, _this.geoAccuracy);
            // this.getGeoencoder(this.geoLatitude,this.geoLongitude);
        }).catch(function (error) {
            _this.toastMsg('Please ALLOW geolocation service', 2000);
            _this.weatherFlag = false;
        });
    };
    /**
     *
     * @param lat
     * @param long
     * Calls the current weather api
     */
    HomePage.prototype.curentWeatherReport = function (lat, long, accuracy) {
        var _this = this;
        this.newsApi.getweatherReport(lat, long, accuracy).subscribe(function (result) {
            _this.temp = result['main'].temp;
            // this.temp = 12.05;
            _this.humidity = result['main'].humidity;
            _this.wind = result['wind'].speed;
            var icon = result['weather'][0].icon;
            _this.description = result['weather'][0].description;
            var sunSet = result["sys"];
            var mainWatherCondition = result['weather'][0].main;
            if (mainWatherCondition == "Mist" || mainWatherCondition == "Smoke" || mainWatherCondition == "Dust" || mainWatherCondition == "Fog" || mainWatherCondition == "Sand" || mainWatherCondition == "Dust" || mainWatherCondition == "Ash" || mainWatherCondition == "Squall" || mainWatherCondition == "Tornado")
                mainWatherCondition = "Haze";
            // this.weatherIconUrl = 'http://openweathermap.org/img/w/' + icon + '.png'
            ///////////////////////////////////
            var now = moment__WEBPACK_IMPORTED_MODULE_8__();
            var currentHour = now.hour();
            var selectedImage = "1.png";
            // selectedImage= currentHour<moment.unix(sunSet["sunset"]).hour() ? "1.png" : "2.png";
            _this.tharmoIcon = _this.temp > 25 ? "../../../assets/weatherIcons/tharm/1.png" : "../../../assets/weatherIcons/tharm/2.png";
            // let morningImage="url(https://image.freepik.com/free-photo/fantastic-morning-sunrise-mountain-landscape-scenery-high-green-mountains_56644-27.jpg)";
            // let morningImage="url(https://wallup.net/wp-content/uploads/2016/01/70149-landscape-rock-old_building-748x468.jpg)";
            var morningImage = "url(https://www.tibetexperience.com/wp-content/uploads/2017/10/IMG-20170903-WA0001.jpg)";
            var eveningImage = "url(https://c.pxhere.com/photos/de/1d/architecture_building_business_city_cityscape_crowded_evening_illuminated-1364419.jpg!d)";
            var nightImage = "url(https://data.whicdn.com/images/146867816/original.gif)";
            // currentHour=21;
            if (currentHour >= moment__WEBPACK_IMPORTED_MODULE_8__["unix"](sunSet["sunrise"]).hour() && currentHour < moment__WEBPACK_IMPORTED_MODULE_8__["unix"](sunSet["sunset"]).hour()) {
                document.getElementById("weatherCard").style.backgroundImage = morningImage;
                selectedImage = "1.png";
            }
            else {
                console.log('moment.unix(sunSet["sunset"]).hour()', moment__WEBPACK_IMPORTED_MODULE_8__["unix"](sunSet["sunset"]).hour());
                console.log('currentHour', currentHour);
                if (currentHour >= moment__WEBPACK_IMPORTED_MODULE_8__["unix"](sunSet["sunset"]).hour() && currentHour <= moment__WEBPACK_IMPORTED_MODULE_8__["unix"](sunSet["sunset"]).hour() + 3) {
                    document.getElementById("weatherCard").style.backgroundImage = eveningImage;
                }
                else {
                    document.getElementById("weatherCard").style.backgroundImage = nightImage;
                }
                selectedImage = "2.png";
            }
            _this.weatherIconUrl = '../../../assets/weatherIcons/' + mainWatherCondition + "/" + selectedImage;
            ///////////////////////////////////////////
            var Feels = __webpack_require__(/*! feels */ "./node_modules/feels/main.js");
            var config = {
                temp: _this.temp,
                humidity: _this.humidity,
                speed: _this.wind,
                units: {
                    temp: 'c',
                    speed: 'mps'
                }
            };
            _this.feelsLike = new Feels(config).like();
            _this.feelsLike = Math.floor(_this.feelsLike);
        });
    };
    /**
     *
     * @param lat
     * @param long
     * Calls the jamuna tv youtube channel api
     */
    HomePage.prototype.parseChannelNews = function (result) {
        var lengthOfRes = Object.keys(result['items']).length;
        for (var i = 0; i < lengthOfRes; i++) {
            var id = {
                videoId: result['items'][i].snippet.resourceId.videoId
            };
            result['items'][i].id = id;
            this.jamunaTvYoutube.push(result['items'][i]);
        }
    };
    HomePage.prototype.getJamunaTvVideos = function () {
        var _this = this;
        this.newsApi.getjamunaTvYoutube().subscribe(function (result) {
            _this.animationDiv();
            var lengthOfRes = Object.keys(result['items']).length;
            for (var i = 0; i < lengthOfRes; i++) {
                _this.jamunaTvYoutube.push(result['items'][i]);
            }
        });
        this.newsApi.getIndependentTvYoutube().subscribe(function (result) {
            _this.parseChannelNews(result);
        });
        this.newsApi.getchannel24Youtube().subscribe(function (result) {
            _this.parseChannelNews(result);
        });
    };
    /**
     *
     * Infinite scroll for todays news section on home page
     */
    HomePage.prototype.loadAllNews = function (event) {
        var _this = this;
        setTimeout(function () {
            _this.getPosts(_this.page);
            event.target.complete();
            // App logic to determine if all data is loaded
            // and disable the infinite scroll
            if (_this.resultFlag == false) {
                event.target.disabled = true;
            }
        }, 1500);
    };
    HomePage.prototype.loadAllBangladeshNews = function (event, category1) {
        var _this = this;
        setTimeout(function () {
            _this.loadAll_pullRefresh(category1, true);
            event.target.complete();
            if (_this.resultFlag == false) {
                event.target.disabled = true;
            }
        }, 1500);
    };
    HomePage.prototype.loadAll_pullRefresh = function (category1, infinite) {
        if (category1 == "bangladesh") {
            if (infinite) {
                this.getBangladeshPosts();
            }
            else {
                this.bangladesh();
            }
        }
        else if (category1 == "politics") {
            if (infinite) {
                this.getPoliticsPosts();
            }
            else {
                this.politics();
            }
        }
        else if (category1 == "international") {
            if (infinite) {
                this.getInternationalPosts();
            }
            else {
                this.international();
            }
        }
        else if (category1 == "economy") {
            if (infinite) {
                this.getEconomyPosts();
            }
            else {
                this.economy();
            }
        }
        else if (category1 == "share") {
            if (infinite) {
                this.getShareMarketPosts();
            }
            else {
                this.share();
            }
        }
        else if (category1 == "sports") {
            if (infinite) {
                this.getSportsPosts();
            }
            else {
                this.sports();
            }
        }
        else if (category1 == "entertainment") {
            if (infinite) {
                this.getEntertainmentPosts();
            }
            else {
                this.entertainment();
            }
        }
        else if (category1 == "tech") {
            if (infinite) {
                this.getTechPosts();
            }
            else {
                this.tech();
            }
        }
        else if (category1 == "lifeStyle") {
            if (infinite) {
                this.getLifeStylePosts();
            }
            else {
                this.lifeStyle();
            }
        }
        else if (category1 == "education") {
            if (infinite) {
                this.getEducationPosts();
            }
            else {
                this.education();
            }
        }
        else if (category1 == "crime") {
            if (infinite) {
                this.getCrimePosts();
            }
            else {
                this.crime();
            }
        }
        else if (category1 == "culture") {
            if (infinite) {
                this.getCulturePosts();
            }
            else {
                this.culture();
            }
        }
        else if (category1 == "vivid") {
            if (infinite) {
                this.getVividPosts();
            }
            else {
                this.vivid();
            }
        }
        else if (category1 == "business") {
            if (infinite) {
                this.getBusinessPosts();
            }
            else {
                this.business();
            }
        }
        else if (category1 == "horoscope") {
            if (infinite) {
                this.getHoroscopePosts();
            }
            else {
                this.horoscope();
            }
        }
    };
    HomePage.prototype.toggleInfiniteScroll = function () {
        this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    };
    HomePage.prototype.goToSource = function (url) {
        // console.log(url);
        if (url.includes("https")) {
            this.iab.create(url, '_self', 'location=yes');
        }
        else {
            var n = url.includes("www.banglatribune");
            if (n) {
                url = url.replace("www.banglatribune", "m.banglatribune");
            }
            this.iab.create(url, '_system', 'location=yes');
        }
    };
    HomePage.prototype.goToYoutube = function (videoId) {
        var youtubeURL = 'https://www.youtube.com/watch?v=' + videoId;
        this.iab.create(youtubeURL, '_self', 'location=yes');
    };
    /**
     * Gets all the posts
     */
    HomePage.prototype.getPosts = function (page) {
        var _this = this;
        this.newsApi.getAllPosts(page).subscribe(function (result) {
            var resultArray = [];
            resultArray = result;
            if (resultArray.length > 0) {
                for (var i = 0; i < _this.allPosts.length; i++) {
                    for (var j = 0; j < resultArray.length; j++) {
                        if (_this.allPosts[i].id == resultArray[j].id) {
                            resultArray.splice(j, 1);
                        }
                    }
                }
                var lengthOfRes = Object.keys(resultArray).length;
                for (var i = 0; i < lengthOfRes; i++) {
                    moment__WEBPACK_IMPORTED_MODULE_8__["locale"]('bn');
                    resultArray[i]['date'] = moment__WEBPACK_IMPORTED_MODULE_8__(resultArray[i]['date']).format('MMMM Do YYYY');
                    resultArray[i].title.rendered = resultArray[i].title.rendered.substring(0, 45);
                    resultArray[i].title.rendered = resultArray[i].title.rendered.substr(0, Math.min(resultArray[i].title.rendered.length, resultArray[i].title.rendered.lastIndexOf(" ")));
                    resultArray[i].title.rendered += "<b>... আরও পড়ুন</b>";
                    _this.allPosts.push(resultArray[i]);
                    // console.log("allPosts[i].date", this.allPosts[i].title.rendered + "length: "+this.allPosts[i].title.rendered.length);
                }
                _this.page = _this.page + 1;
            }
            else {
                _this.resultFlag = false;
            }
            for (var _i = 0, _a = _this.allPosts; _i < _a.length; _i++) {
                var res = _a[_i];
                var x = res.content.rendered;
                var pat = /href="([^\'\"]+)/g;
                var y = pat.exec(x);
                res.link = y['1'];
            }
        });
        // this.page=this.page+1;
    };
    HomePage.prototype.apiResult = function (result) {
        var resultArray = [];
        resultArray = result;
        if (resultArray.length > 0) {
            this.animationDiv();
            for (var i = 0; i < this.mainNewsArray.length; i++) {
                for (var j = 0; j < resultArray.length; j++) {
                    if (this.mainNewsArray[i].id == resultArray[j].id) {
                        resultArray.splice(j, 1);
                    }
                }
            }
            var lengthOfRes = Object.keys(resultArray).length;
            for (var i = 0; i < lengthOfRes; i++) {
                this.mainNewsArray.push(resultArray[i]);
            }
            this.pageNumber = this.pageNumber + 1;
            this.showAutoHide = false;
        }
        else {
            this.resultFlag = false;
        }
        for (var _i = 0, _a = this.mainNewsArray; _i < _a.length; _i++) {
            var res = _a[_i];
            var x = res.content.rendered;
            var pat = /href="([^\'\"]+)/g;
            var y = pat.exec(x);
            res.link = y['1'];
        }
    };
    HomePage.prototype.getBangladeshPosts = function () {
        var _this = this;
        this.newsApi.getAllBangladeshPosts(this.pageNumber).subscribe(function (result) {
            _this.apiResult(result);
        });
    };
    /**
     * Gets all the posts
     */
    HomePage.prototype.getSportsPosts = function () {
        var _this = this;
        this.newsApi.getAllSportsPosts(this.pageNumber).subscribe(function (result) {
            _this.apiResult(result);
        });
    };
    HomePage.prototype.getLifeStylePosts = function () {
        var _this = this;
        this.newsApi.getAllLifeStylePosts(this.pageNumber).subscribe(function (result) {
            _this.apiResult(result);
        });
    };
    HomePage.prototype.getEducationPosts = function () {
        var _this = this;
        this.newsApi.getAllEducationPosts(this.pageNumber).subscribe(function (result) {
            _this.apiResult(result);
        });
    };
    HomePage.prototype.getCrimePosts = function () {
        var _this = this;
        this.newsApi.getAllCrimePosts(this.pageNumber).subscribe(function (result) {
            _this.apiResult(result);
        });
    };
    HomePage.prototype.getCulturePosts = function () {
        var _this = this;
        this.newsApi.getAllCulturePosts(this.pageNumber).subscribe(function (result) {
            _this.apiResult(result);
        });
    };
    HomePage.prototype.getVividPosts = function () {
        var _this = this;
        this.newsApi.getAllVividPosts(this.pageNumber).subscribe(function (result) {
            _this.apiResult(result);
        });
    };
    HomePage.prototype.getBusinessPosts = function () {
        var _this = this;
        this.newsApi.getAllBusinessPosts(this.pageNumber).subscribe(function (result) {
            _this.apiResult(result);
        });
    };
    HomePage.prototype.getHoroscopePosts = function () {
        var _this = this;
        this.newsApi.getAllHoroscopePosts(this.pageNumber).subscribe(function (result) {
            _this.apiResult(result);
        });
    };
    HomePage.prototype.getPoliticsPosts = function () {
        var _this = this;
        this.newsApi.getAllPoliticsPosts(this.pageNumber).subscribe(function (result) {
            _this.apiResult(result);
        });
    };
    HomePage.prototype.getShareMarketPosts = function () {
        var _this = this;
        this.newsApi.getAllShareMarketPosts(this.pageNumber).subscribe(function (result) {
            _this.apiResult(result);
        });
    };
    HomePage.prototype.getInternationalPosts = function () {
        var _this = this;
        this.newsApi.getAllInternationalPosts(this.pageNumber).subscribe(function (result) {
            _this.apiResult(result);
        });
    };
    HomePage.prototype.getEconomyPosts = function () {
        var _this = this;
        this.newsApi.getAllEconomyPosts(this.pageNumber).subscribe(function (result) {
            _this.apiResult(result);
        });
    };
    HomePage.prototype.getEntertainmentPosts = function () {
        var _this = this;
        this.newsApi.getAllEntertainmentPosts(this.pageNumber).subscribe(function (result) {
            _this.apiResult(result);
        });
    };
    HomePage.prototype.getTechPosts = function () {
        var _this = this;
        this.newsApi.getAllTechPosts(this.pageNumber).subscribe(function (result) {
            _this.apiResult(result);
        });
    };
    HomePage.prototype.doRefresh = function (event, category1) {
        var _this = this;
        setTimeout(function () {
            if (category1 == "home") {
                _this.home();
            }
            else if (category1 == "videos") {
                _this.getJamunaTvVideos();
            }
            else {
                _this.loadAll_pullRefresh(category1, false);
            }
            console.log('Async operation has ended');
            event.target.complete();
        }, 1500);
    };
    HomePage.prototype.home = function () {
        this.showOtherSegments = false;
        this.weatherFlag = false;
        this.showVideoNews = false;
        this.allPosts = [];
        this.mainNewsArray = [];
        this.animationStart = 1;
        this.animationDiv();
        this.getGeolocation();
        this.currentTab = 0;
        this.homeVisibleFlag = true;
        this.page = 1;
        this.getPosts(this.page);
    };
    HomePage.prototype.videos = function () {
        this.showOtherSegments = false;
        this.homeVisibleFlag = false;
        this.showVideoNews = true;
        this.mainNewsArray = [];
        this.jamunaTvYoutube = [];
        this.currentTab = 1;
        this.getJamunaTvVideos();
    };
    HomePage.prototype.commonParam = function () {
        this.mainNewsArray = [];
        this.pageNumber = 1;
        this.animationStart = 1;
        this.content.scrollToTop();
        this.homeVisibleFlag = false;
        this.showVideoNews = false;
        this.showOtherSegments = true;
        this.showAutoHide = true;
        if (this.showAutoHide) {
            this.showAutoHideLoader();
        }
    };
    HomePage.prototype.bangladesh = function () {
        this.currentTab = 2;
        this.commonParam();
        this.getBangladeshPosts();
    };
    HomePage.prototype.politics = function () {
        this.currentTab = 3;
        this.commonParam();
        this.getPoliticsPosts();
    };
    HomePage.prototype.international = function () {
        this.currentTab = 4;
        this.commonParam();
        this.getInternationalPosts();
    };
    HomePage.prototype.economy = function () {
        this.currentTab = 5;
        this.commonParam();
        this.getEconomyPosts();
    };
    HomePage.prototype.share = function () {
        this.currentTab = 6;
        this.commonParam();
        this.getShareMarketPosts();
    };
    HomePage.prototype.sports = function () {
        this.currentTab = 7;
        this.commonParam();
        this.getSportsPosts();
    };
    HomePage.prototype.entertainment = function () {
        this.currentTab = 8;
        this.commonParam();
        this.getEntertainmentPosts();
    };
    HomePage.prototype.tech = function () {
        this.currentTab = 9;
        this.commonParam();
        this.getTechPosts();
    };
    HomePage.prototype.lifeStyle = function () {
        this.currentTab = 10;
        this.commonParam();
        this.getLifeStylePosts();
    };
    HomePage.prototype.education = function () {
        this.currentTab = 11;
        this.commonParam();
        this.getEducationPosts();
    };
    HomePage.prototype.crime = function () {
        this.currentTab = 12;
        this.commonParam();
        this.getCrimePosts();
    };
    HomePage.prototype.culture = function () {
        this.currentTab = 13;
        this.commonParam();
        this.getCulturePosts();
    };
    HomePage.prototype.vivid = function () {
        this.currentTab = 14;
        this.commonParam();
        this.getVividPosts();
    };
    HomePage.prototype.business = function () {
        this.currentTab = 15;
        this.commonParam();
        this.getBusinessPosts();
    };
    HomePage.prototype.horoscope = function () {
        this.currentTab = 16;
        this.commonParam();
        this.getHoroscopePosts();
    };
    HomePage.prototype.ionViewDidEnter = function () {
        this.content.scrollToTop();
    };
    /**
     * Ionic Loading Controller
     */
    HomePage.prototype.showAutoHideLoader = function () {
        this.loadingController.create({
            spinner: 'crescent',
            cssClass: 'loader',
            duration: 800
        }).then(function (res) {
            res.present();
            res.onDidDismiss().then(function (dis) {
                console.log('Loading...');
            });
        });
    };
    HomePage.prototype.toastMsg = function (msg, duration) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: msg,
                            duration: duration
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonContent"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonContent"])
    ], HomePage.prototype, "content", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonInfiniteScroll"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonInfiniteScroll"])
    ], HomePage.prototype, "infiniteScroll", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonSlides"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonSlides"])
    ], HomePage.prototype, "slider", void 0);
    HomePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.page.html */ "./src/app/pages/home/home.page.html"),
            styles: [__webpack_require__(/*! ./home.page.scss */ "./src/app/pages/home/home.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _services_news_service__WEBPACK_IMPORTED_MODULE_3__["NewsService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["Events"],
            _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_5__["InAppBrowser"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["LoadingController"],
            _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_6__["Geolocation"],
            _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_7__["NativeGeocoder"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["Platform"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ToastController"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _ionic_native_open_native_settings_ngx__WEBPACK_IMPORTED_MODULE_9__["OpenNativeSettings"]])
    ], HomePage);
    return HomePage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-home-home-module.js.map