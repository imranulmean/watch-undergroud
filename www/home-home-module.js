(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-home-module"],{

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

/***/ "./node_modules/rxjs-compat/_esm5/add/observable/forkJoin.js":
/*!*******************************************************************!*\
  !*** ./node_modules/rxjs-compat/_esm5/add/observable/forkJoin.js ***!
  \*******************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");

rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"].forkJoin = rxjs__WEBPACK_IMPORTED_MODULE_0__["forkJoin"];
//# sourceMappingURL=forkJoin.js.map

/***/ }),

/***/ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs-compat/_esm5/add/operator/catch.js ***!
  \**************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _operator_catch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../operator/catch */ "./node_modules/rxjs-compat/_esm5/operator/catch.js");


rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"].prototype.catch = _operator_catch__WEBPACK_IMPORTED_MODULE_1__["_catch"];
rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"].prototype._catch = _operator_catch__WEBPACK_IMPORTED_MODULE_1__["_catch"];
//# sourceMappingURL=catch.js.map

/***/ }),

/***/ "./node_modules/rxjs-compat/_esm5/add/operator/map.js":
/*!************************************************************!*\
  !*** ./node_modules/rxjs-compat/_esm5/add/operator/map.js ***!
  \************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _operator_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../operator/map */ "./node_modules/rxjs-compat/_esm5/operator/map.js");


rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"].prototype.map = _operator_map__WEBPACK_IMPORTED_MODULE_1__["map"];
//# sourceMappingURL=map.js.map

/***/ }),

/***/ "./node_modules/rxjs-compat/_esm5/operator/catch.js":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs-compat/_esm5/operator/catch.js ***!
  \**********************************************************/
/*! exports provided: _catch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_catch", function() { return _catch; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");

function _catch(selector) {
    return Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["catchError"])(selector)(this);
}
//# sourceMappingURL=catch.js.map

/***/ }),

/***/ "./node_modules/rxjs-compat/_esm5/operator/map.js":
/*!********************************************************!*\
  !*** ./node_modules/rxjs-compat/_esm5/operator/map.js ***!
  \********************************************************/
/*! exports provided: map */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return map; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");

function map(project, thisArg) {
    return Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(project, thisArg)(this);
}
//# sourceMappingURL=map.js.map

/***/ }),

/***/ "./src/app/news.service.ts":
/*!*********************************!*\
  !*** ./src/app/news.service.ts ***!
  \*********************************/
/*! exports provided: NewsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsService", function() { return NewsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_add_observable_forkJoin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/add/observable/forkJoin */ "./node_modules/rxjs-compat/_esm5/add/observable/forkJoin.js");
/* harmony import */ var _globalSettings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../globalSettings */ "./src/globalSettings.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");







var NewsService = /** @class */ (function () {
    function NewsService(http) {
        this.http = http;
        this.apiURL = _globalSettings__WEBPACK_IMPORTED_MODULE_3__["API_SLUG"];
        this.jamunaTvYouTubeURL = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyCPKMoCzd_WwQ6HeQAFWITwVnL1-YDBxgE&channelId=UCN6sm8iHiPd0cnoUardDAnw&part=snippet,id&order=date&maxResults=20";
        this.data = [];
    }
    /**
     * Get all the posts
     */
    NewsService.prototype.getweatherReport = function (lat, long, accuracy) {
        var apiUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=metric&appid=40e08730efcea491d4b72d2d32656090";
        return this.http.get(apiUrl);
    };
    /**
     * Jamuna Tv Youtube channel api call
     */
    NewsService.prototype.getjamunaTvYoutube = function () {
        return this.http.get(this.jamunaTvYouTubeURL);
    };
    /**
     * Get all the posts
     */
    NewsService.prototype.getAllPosts = function (page) {
        console.log("NEWS SERVICE PAGE NUM");
        console.log(page);
        return this.http.get(_globalSettings__WEBPACK_IMPORTED_MODULE_3__["API_SLUG"] + 'posts?page=' + page);
    };
    /**
     * Get all the posts from LifeStyle category
     * http://ahayder.me/wp-json/wp/v2/posts?
     */
    NewsService.prototype.getAllLifeStylePosts = function (page) {
        console.log("Page page page");
        console.log(page);
        return this.http.get(_globalSettings__WEBPACK_IMPORTED_MODULE_3__["API_SLUG"] + 'posts?tags=34,31&page=' + page);
    };
    /**
     * Get all the posts from Sports category
     * http://ahayder.me/wp-json/wp/v2/posts?
     */
    NewsService.prototype.getAllSportsPosts = function (page) {
        console.log("Page page page");
        console.log(page);
        return this.http.get(_globalSettings__WEBPACK_IMPORTED_MODULE_3__["API_SLUG"] + 'posts?tags=19,27&page=' + page);
    };
    /**
    /**
     * Get all the posts from Sports category
     * http://ahayder.me/wp-json/wp/v2/posts?
     */
    NewsService.prototype.getAllEconomyPosts = function (page) {
        console.log("Page page page");
        console.log(page);
        return this.http.get(_globalSettings__WEBPACK_IMPORTED_MODULE_3__["API_SLUG"] + 'posts?tags22&page=' + page);
    };
    /**
     * Get all the posts from Bangladesh category
     * http://ahayder.me/wp-json/wp/v2/posts?
     */
    NewsService.prototype.getAllBangladeshPosts = function (page) {
        console.log("Page page page");
        console.log(page);
        return this.http.get(_globalSettings__WEBPACK_IMPORTED_MODULE_3__["API_SLUG"] + 'posts?tags=25,13,9,29,21&page=' + page);
    };
    /**
     * Get all the posts from Tech category
     * http://ahayder.me/wp-json/wp/v2/posts?
     */
    NewsService.prototype.getAllTechPosts = function (page) {
        return this.http.get(_globalSettings__WEBPACK_IMPORTED_MODULE_3__["API_SLUG"] + 'posts??&tags=28&page=' + page);
    };
    /**
     * Get all the posts from antorjatik category
     * http://ahayder.me/wp-json/wp/v2/posts?
     */
    NewsService.prototype.getAllInternationalPosts = function (page) {
        return this.http.get(_globalSettings__WEBPACK_IMPORTED_MODULE_3__["API_SLUG"] + 'posts?tags=32&page=' + page);
    };
    /**
     * Get all the posts from Binodon category
     * http://ahayder.me/wp-json/wp/v2/posts?
     */
    NewsService.prototype.getAllEntertainmentPosts = function (page) {
        return this.http.get(_globalSettings__WEBPACK_IMPORTED_MODULE_3__["API_SLUG"] + 'posts?tags=10&page=' + page);
    };
    NewsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]])
    ], NewsService);
    return NewsService;
}());



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

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-title>\r\n      নিউজ\r\n    </ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<!-- Default Segment -->\r\n<ion-segment no-padding value=\"home\" [(ngModel)]=\"category\" scrollable id=\"segment\">\r\n  <ion-segment-button no-padding value=\"home\" (click)=\"home()\" id=\"0\">\r\n    <ion-label color=\"dark\">হোম</ion-label>\r\n  </ion-segment-button>\r\n  <ion-segment-button no-padding value=\"videos\" (click)=\"videos()\" id=\"1\">\r\n    <ion-label color=\"dark\">ভিডিও নিউজ</ion-label>\r\n  </ion-segment-button>\r\n  <ion-segment-button no-padding value=\"bangladesh\" (click)=\"bangladesh()\" id=\"2\">\r\n    <ion-label color=\"dark\">বাংলাদেশ</ion-label>\r\n  </ion-segment-button>\r\n  <ion-segment-button no-padding value=\"international\" (click)=\"international()\" id=\"3\">\r\n    <ion-label color=\"dark\">আন্তর্জাতিক</ion-label>\r\n  </ion-segment-button>\r\n  <ion-segment-button no-padding value=\"sports\" (click)=\"sports()\" id=\"4\">\r\n    <ion-label color=\"dark\">খেলা</ion-label>\r\n  </ion-segment-button>\r\n  <ion-segment-button no-padding value=\"entertainment\" (click)=\"entertainment()\" id=\"5\">\r\n    <ion-label color=\"dark\">বিনোদন</ion-label>\r\n  </ion-segment-button>\r\n  <ion-segment-button no-padding value=\"tech\" (click)=\"tech()\" id=\"6\">\r\n    <ion-label color=\"dark\">টেক</ion-label>\r\n  </ion-segment-button>\r\n  <ion-segment-button no-padding value=\"lifeStyle\" (click)=\"lifeStyle()\" id=\"7\">\r\n    <ion-label color=\"dark\">লাইফ স্টাইল</ion-label>\r\n  </ion-segment-button>\r\n\r\n  <hr class=\"hrs\">\r\n</ion-segment>\r\n<ion-content (swipeleft)=\"swipeLeftPress($event)\" (swiperight)=\"swipeRightPress($event)\" class=\"fast\">\r\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\">\r\n    <ion-refresher-content pullingIcon=\"arrow-dropdown\" pullingText=\"Pull to refresh\" refreshingSpinner=\"circles\"\r\n      refreshingText=\"Refreshing...\">\r\n    </ion-refresher-content>\r\n  </ion-refresher>\r\n  <!-- Home section -->\r\n\r\n\r\n  <div [ngSwitch]=\"category\" scrollable>\r\n    <ion-list *ngSwitchCase=\"'home'\">\r\n      <ion-card *ngIf=\"weatherFlag\">\r\n        <ion-card-header>\r\n          <ion-card-subtitle>\r\n            <!--Basic: auto-select the icon based on the platform -->\r\n          </ion-card-subtitle>\r\n          <ion-grid style=\"margin-left: 2em;margin-right: 1em;\">\r\n            <ion-row>\r\n              <ion-col>\r\n                <h1 class=\"weatherDegree\" *ngIf=\"temp\">{{temp}}<sup>০</sup></h1> সেলসিয়াস\r\n              </ion-col>\r\n              <ion-col class=\"weatherSummery\" *ngIf=\"weatherIconUrl\">\r\n                <img class=\"weatherIcon\" src={{weatherIconUrl}} alt=\"weather icon\">\r\n                <p>{{description}}</p>\r\n                <p>humidity <span *ngIf=\"humidity\">{{humidity}}%</span></p>\r\n                <p>Wind: <span *ngIf=\"wind\">{{wind}}</span> Mph</p>\r\n              </ion-col>\r\n            </ion-row>\r\n            <ion-row>\r\n              <ion-col>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-grid>\r\n        </ion-card-header>\r\n      </ion-card>\r\n      <!-- If location service is not enabled -->\r\n      <ion-card *ngIf=\"weatherFlag==false\">\r\n        <ion-card-header>\r\n          <ion-card-subtitle>\r\n            <p>Please check your location service for weather report</p>\r\n          </ion-card-subtitle>\r\n        </ion-card-header>\r\n      </ion-card>\r\n\r\n\r\n      <!-- horizontal scroller -->\r\n      <div class=\"container \">\r\n        <h1 class=\"suggestedNews\"> প্রস্তাবিত খবর</h1>\r\n        <div class=\"scroll\" scrollX=\"true\">\r\n          <span *ngFor=\"let result of allPosts\">\r\n            <ion-card class=\" horizontalScroll\" (click)=goToSource(result.link)>\r\n              <ion-card-header>\r\n                <ion-badge>\r\n                  <img *ngIf=\"result.categories['0']=='14'\" class=\"sourceLogo\"\r\n                    src=\"/assets/img/news-source-icons/bdnews24-logo.png\" />\r\n                  <img *ngIf=\"result.categories['0']=='17'\" class=\"sourceLogo\"\r\n                    src=\"/assets/img/news-source-icons/jugantor.png\" />\r\n                  <img *ngIf=\"result.categories['0']=='15'\" class=\"sourceLogo\"\r\n                    src=\"/assets/img/news-source-icons/prothom-alo.png\" />\r\n                  <img *ngIf=\"result.categories['0']=='76'\" class=\"sourceLogo\"\r\n                    src=\"/assets/img/news-source-icons/somokal.png\" />\r\n                </ion-badge>\r\n                <div class=\"newsRecommendedImg\">\r\n                  <img *ngIf=\"result.fimg_url;\" src=\"{{result.fimg_url}}\" />\r\n                  <img *ngIf=\"!result.fimg_url\" src=\"assets/img/news_fallback.png\" />\r\n                </div>\r\n\r\n                <div style=\"position:absolute\">\r\n                  <ion-card-subtitle class=\"newsRecommended\" color=\"dark\" *ngIf=\"result.title.rendered\">\r\n                    {{result.title.rendered}}</ion-card-subtitle>\r\n                </div>\r\n\r\n              </ion-card-header>\r\n              <div class=\"newsTags\">\r\n                <div class=\"publishedOn\" *ngIf=\"result.date\">\r\n                  <ion-icon name=\"md-clock\"></ion-icon> {{dateToBengali(result.date)}}\r\n                </div>\r\n              </div>\r\n\r\n            </ion-card>\r\n          </span>\r\n        </div>\r\n      </div>\r\n      <div class=\"container \">\r\n        <h1 class=\"suggestedNews\">আজকের খবর</h1>\r\n        <!-- ionic grid starts -->\r\n        <ion-grid>\r\n          <ion-row>\r\n            <ion-col col-6 *ngFor=\"let result of allPosts\" class=\"callOfTodaysNews\">\r\n              <ion-card class=\"newsOfToday\" (click)=goToSource(result.link)>\r\n                <ion-card-header class=\"cardNewsHeader\">\r\n                  <ion-badge class=\"sourceBadge\">\r\n                    <img *ngIf=\"result.categories['0']=='14'\" class=\"sourceLogo\"\r\n                      src=\"/assets/img/news-source-icons/bdnews24-logo.png\" />\r\n                    <img *ngIf=\"result.categories['0']=='17'\" class=\"sourceLogo\"\r\n                      src=\"/assets/img/news-source-icons/jugantor.png\" />\r\n                    <img *ngIf=\"result.categories['0']=='15'\" class=\"sourceLogo\"\r\n                      src=\"/assets/img/news-source-icons/prothom-alo.png\" />\r\n                    <img *ngIf=\"result.categories['0']=='76'\" class=\"sourceLogo\"\r\n                      src=\"/assets/img/news-source-icons/somokal.png\" />\r\n                  </ion-badge>\r\n                  <img *ngIf=\"result.fimg_url;\" src=\"{{result.fimg_url}}\" />\r\n                  <img *ngIf=\"!result.fimg_url\" src=\"assets/img/news_fallback.png\" />\r\n\r\n\r\n                  <ion-card-subtitle color=\"dark\" *ngIf=\"result.title.rendered\">{{result.title.rendered}}\r\n                  </ion-card-subtitle>\r\n\r\n                  <!-- <ion-card-title>Card Title</ion-card-title> -->\r\n                </ion-card-header>\r\n              </ion-card>\r\n            </ion-col>\r\n            <ion-infinite-scroll threshold=\"100px\" (ionInfinite)=\"loadAllNews($event)\">\r\n              <ion-infinite-scroll-content loadingSpinner=\"bubbles\" loadingText=\"Loading more data...\">\r\n              </ion-infinite-scroll-content>\r\n            </ion-infinite-scroll>\r\n          </ion-row>\r\n        </ion-grid>\r\n      </div>\r\n\r\n    </ion-list>\r\n    <!-- Home ends -->\r\n    <!-- Videos news -->\r\n    <ion-list *ngSwitchCase=\"'videos'\">\r\n      <div *ngFor=\"let result of jamunaTvYoutube\">\r\n        <ion-card (click)=goToYoutube(result.id.videoId)>\r\n          <ion-card-header>\r\n            <ion-badge>ভিডিও নিউজ</ion-badge>\r\n            <img *ngIf=\"result.snippet.thumbnails.high.url;\" src=\"{{result.snippet.thumbnails.high.url}}\" />\r\n            <img *ngIf=\"!result.snippet.thumbnails.high.url;\" src=\"assets/img/news_fallback.png\" />\r\n            <ion-card-subtitle color=\"dark\" class=\"sectionTitle\" *ngIf=\"result.snippet.title\">{{result.snippet.title}}\r\n            </ion-card-subtitle>\r\n          </ion-card-header>\r\n        </ion-card>\r\n      </div>\r\n    </ion-list>\r\n    <!-- Bangladesh news -->\r\n    <ion-list *ngSwitchCase=\"'bangladesh'\">\r\n      <div *ngFor=\"let result of resultsBd\">\r\n        <ion-card (click)=goToSource(result.link)>\r\n          <ion-card-header>\r\n            <ion-badge>বাংলাদেশ</ion-badge>\r\n            <img *ngIf=\"result.fimg_url;\" src=\"{{result.fimg_url}}\" />\r\n            <img *ngIf=\"!result.fimg_url\" src=\"assets/img/news_fallback.png\" />\r\n            <ion-card-subtitle color=\"dark\" class=\"sectionTitle\" *ngIf=\"result.title.rendered\">{{result.title.rendered}}\r\n            </ion-card-subtitle>\r\n          </ion-card-header>\r\n          <img *ngIf=\"result.categories['0']=='14'\" class=\"sourceLogoBangladesh\"\r\n            src=\"/assets/img/news-source-icons/bdnews24-logo.png\" />\r\n          <img *ngIf=\"result.categories['0']=='17'\" class=\"sourceLogoBangladesh\"\r\n            src=\"/assets/img/news-source-icons/jugantor.png\" />\r\n          <img *ngIf=\"result.categories['0']=='15'\" class=\"sourceLogoBangladesh\"\r\n            src=\"/assets/img/news-source-icons/prothom-alo.png\" />\r\n          <img *ngIf=\"result.categories['0']=='76'\" class=\"sourceLogoBangladesh\"\r\n            src=\"/assets/img/news-source-icons/somokal.png\" />\r\n        </ion-card>\r\n      </div>\r\n      <ion-infinite-scroll threshold=\"100px\" (ionInfinite)=\"loadAllBangladeshNews($event)\">\r\n        <ion-infinite-scroll-content loadingSpinner=\"bubbles\" loadingText=\"Loading more data...\">\r\n        </ion-infinite-scroll-content>\r\n      </ion-infinite-scroll>\r\n    </ion-list>\r\n\r\n    <!-- International segment body -->\r\n    <ion-list *ngSwitchCase=\"'international'\">\r\n      <div *ngFor=\"let result of resultsInt\">\r\n        <ion-card (click)=goToSource(result.link)>\r\n          <ion-card-header>\r\n            <ion-badge>আন্তর্জাতিক</ion-badge>\r\n            <img *ngIf=\"result.fimg_url;\" src=\"{{result.fimg_url}}\" />\r\n            <img *ngIf=\"!result.fimg_url\" src=\"assets/img/news_fallback.png\" />\r\n            <ion-card-subtitle color=\"dark\" class=\"sectionTitle\" *ngIf=\"result.title.rendered\">{{result.title.rendered}}\r\n            </ion-card-subtitle>\r\n          </ion-card-header>\r\n          <img *ngIf=\"result.categories['0']=='14'\" class=\"sourceLogoInt\"\r\n            src=\"/assets/img/news-source-icons/bdnews24-logo.png\" />\r\n          <img *ngIf=\"result.categories['0']=='17'\" class=\"sourceLogoInt\"\r\n            src=\"/assets/img/news-source-icons/jugantor.png\" />\r\n          <img *ngIf=\"result.categories['0']=='15'\" class=\"sourceLogoInt\"\r\n            src=\"/assets/img/news-source-icons/prothom-alo.png\" />\r\n          <img *ngIf=\"result.categories['0']=='76'\" class=\"sourceLogoInt\"\r\n            src=\"/assets/img/news-source-icons/somokal.png\" />\r\n        </ion-card>\r\n      </div>\r\n      <ion-infinite-scroll threshold=\"100px\" (ionInfinite)=\"loadAllInternationalNews($event)\">\r\n        <ion-infinite-scroll-content loadingSpinner=\"bubbles\" loadingText=\"Loading more data...\">\r\n        </ion-infinite-scroll-content>\r\n      </ion-infinite-scroll>\r\n    </ion-list>\r\n\r\n\r\n    <!-- Entertainment segment body -->\r\n    <ion-list *ngSwitchCase=\"'entertainment'\">\r\n      <div *ngFor=\"let result of resultsEnt\">\r\n        <ion-card (click)=goToSource(result.link)>\r\n          <ion-card-header>\r\n            <ion-badge>বিনোদন</ion-badge>\r\n\r\n            <img *ngIf=\"result.fimg_url;\" src=\"{{result.fimg_url}}\" />\r\n            <img *ngIf=\"!result.fimg_url\" src=\"assets/img/news_fallback.png\" />\r\n            <ion-card-subtitle color=\"dark\" class=\"sectionTitle\" class=\"sectionTitle\" *ngIf=\"result.title.rendered\">\r\n              {{result.title.rendered}}</ion-card-subtitle>\r\n          </ion-card-header>\r\n          <img *ngIf=\"result.categories['0']=='14'\" class=\"sourceLogoEntertainment\"\r\n            src=\"/assets/img/news-source-icons/bdnews24-logo.png\" />\r\n          <img *ngIf=\"result.categories['0']=='17'\" class=\"sourceLogoEntertainment\"\r\n            src=\"/assets/img/news-source-icons/jugantor.png\" />\r\n          <img *ngIf=\"result.categories['0']=='15'\" class=\"sourceLogoEntertainment\"\r\n            src=\"/assets/img/news-source-icons/prothom-alo.png\" />\r\n          <img *ngIf=\"result.categories['0']=='76'\" class=\"sourceLogoEntertainment\"\r\n            src=\"/assets/img/news-source-icons/somokal.png\" />\r\n\r\n        </ion-card>\r\n      </div>\r\n      <ion-infinite-scroll threshold=\"100px\" (ionInfinite)=\"loadAllEntertainmentNews($event)\">\r\n        <ion-infinite-scroll-content loadingSpinner=\"bubbles\" loadingText=\"Loading more data...\">\r\n        </ion-infinite-scroll-content>\r\n      </ion-infinite-scroll>\r\n    </ion-list>\r\n\r\n\r\n    <!-- Tech segment body -->\r\n    <ion-list *ngSwitchCase=\"'tech'\">\r\n      <div *ngFor=\"let result of resultsTech\">\r\n        <ion-card (click)=goToSource(result.link)>\r\n          <ion-card-header>\r\n            <ion-badge>টেক</ion-badge>\r\n\r\n            <img *ngIf=\"result.fimg_url;\" src=\"{{result.fimg_url}}\" />\r\n            <img *ngIf=\"!result.fimg_url\" src=\"assets/img/news_fallback.png\" />\r\n            <ion-card-subtitle color=\"dark\" class=\"sectionTitle\" class=\"sectionTitle\" *ngIf=\"result.title.rendered\">\r\n              {{result.title.rendered}}</ion-card-subtitle>\r\n          </ion-card-header>\r\n          <img *ngIf=\"result.categories['0']=='14'\" class=\"sourceLogoTech\"\r\n            src=\"/assets/img/news-source-icons/bdnews24-logo.png\" />\r\n          <img *ngIf=\"result.categories['0']=='17'\" class=\"sourceLogoTech\"\r\n            src=\"/assets/img/news-source-icons/jugantor.png\" />\r\n          <img *ngIf=\"result.categories['0']=='15'\" class=\"sourceLogoTech\"\r\n            src=\"/assets/img/news-source-icons/prothom-alo.png\" />\r\n          <img *ngIf=\"result.categories['0']=='76'\" class=\"sourceLogoTech\"\r\n            src=\"/assets/img/news-source-icons/somokal.png\" />\r\n\r\n        </ion-card>\r\n      </div>\r\n      <ion-infinite-scroll threshold=\"100px\" (ionInfinite)=\"loadAllTechNews($event)\">\r\n        <ion-infinite-scroll-content loadingSpinner=\"bubbles\" loadingText=\"Loading more data...\">\r\n        </ion-infinite-scroll-content>\r\n      </ion-infinite-scroll>\r\n    </ion-list>\r\n\r\n\r\n    <!-- Sports segment body -->\r\n    <ion-list *ngSwitchCase=\"'sports'\">\r\n      <div *ngFor=\"let result of resultsSports\">\r\n        <ion-card (click)=goToSource(result.link)>\r\n          <ion-card-header>\r\n            <ion-badge>খেলা</ion-badge>\r\n            <img *ngIf=\"result.fimg_url;\" src=\"{{result.fimg_url}}\" />\r\n            <img *ngIf=\"!result.fimg_url\" src=\"assets/img/news_fallback.png\" />\r\n            <ion-card-subtitle color=\"dark\" class=\"sectionTitle\" *ngIf=\"result.title.rendered\">{{result.title.rendered}}\r\n            </ion-card-subtitle>\r\n          </ion-card-header>\r\n\r\n          <img *ngIf=\"result.categories['0']=='14'\" class=\"sourceLogoSports\"\r\n            src=\"/assets/img/news-source-icons/bdnews24-logo.png\" />\r\n          <img *ngIf=\"result.categories['0']=='17'\" class=\"sourceLogoSports\"\r\n            src=\"/assets/img/news-source-icons/jugantor.png\" />\r\n          <img *ngIf=\"result.categories['0']=='15'\" class=\"sourceLogoSports\"\r\n            src=\"/assets/img/news-source-icons/prothom-alo.png\" />\r\n          <img *ngIf=\"result.categories['0']=='76'\" class=\"sourceLogoSports\"\r\n            src=\"/assets/img/news-source-icons/somokal.png\" />\r\n        </ion-card>\r\n      </div>\r\n      <ion-infinite-scroll threshold=\"100px\" (ionInfinite)=\"loadAllSportsNews($event)\">\r\n        <ion-infinite-scroll-content loadingSpinner=\"bubbles\" loadingText=\"Loading more data...\">\r\n        </ion-infinite-scroll-content>\r\n      </ion-infinite-scroll>\r\n    </ion-list>\r\n    <!-- Lifestyle segment body -->\r\n    <ion-list *ngSwitchCase=\"'lifeStyle'\">\r\n      <div *ngFor=\"let result of resultsLifeStyle\">\r\n        <ion-card (click)=goToSource(result.link)>\r\n          <ion-card-header>\r\n            <ion-badge>লাইফ স্টাইল</ion-badge>\r\n            <img *ngIf=\"result.fimg_url;\" src=\"{{result.fimg_url}}\" />\r\n            <img *ngIf=\"!result.fimg_url\" src=\"assets/img/news_fallback.png\" />\r\n            <ion-card-subtitle color=\"dark\" class=\"sectionTitle\" *ngIf=\"result.title.rendered\">{{result.title.rendered}}\r\n            </ion-card-subtitle>\r\n          </ion-card-header>\r\n          <img *ngIf=\"result.categories['0']=='14'\" class=\"sourceLogoLifeStyle\"\r\n            src=\"/assets/img/news-source-icons/bdnews24-logo.png\" />\r\n          <img *ngIf=\"result.categories['0']=='17'\" class=\"sourceLogoLifeStyle\"\r\n            src=\"/assets/img/news-source-icons/jugantor.png\" />\r\n          <img *ngIf=\"result.categories['0']=='15'\" class=\"sourceLogoLifeStyle\"\r\n            src=\"/assets/img/news-source-icons/prothom-alo.png\" />\r\n          <img *ngIf=\"result.categories['0']=='76'\" class=\"sourceLogoLifeStyle\"\r\n            src=\"/assets/img/news-source-icons/somokal.png\" />\r\n        </ion-card>\r\n      </div>\r\n      <ion-infinite-scroll threshold=\"100px\" (ionInfinite)=\"loadAllLifeStyleNews($event)\">\r\n        <ion-infinite-scroll-content loadingSpinner=\"bubbles\" loadingText=\"Loading more data...\">\r\n        </ion-infinite-scroll-content>\r\n      </ion-infinite-scroll>\r\n    </ion-list>\r\n  </div>\r\n\r\n\r\n</ion-content>"

/***/ }),

/***/ "./src/app/pages/home/home.page.scss":
/*!*******************************************!*\
  !*** ./src/app/pages/home/home.page.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-title {\n  text-align: left !important;\n  padding: 12px;\n  font-weight: 700;\n  font-size: 1.5em; }\n\nion-segment-button {\n  border: none;\n  font-weight: 900;\n  font-size: 0.8em;\n  border: none; }\n\nion-segment {\n  background-image: linear-gradient(to right, #ead1ad, white);\n  padding: 0; }\n\nion-card-subtitle .newsRecommended {\n  margin-top: 1em;\n  margin-left: 1em;\n  padding: 0;\n  position: absolute; }\n\nion-card-subtitle {\n  margin-top: 1em !important;\n  margin-left: 1em !important;\n  padding: 0;\n  font-size: 1.1em; }\n\ndiv[scrollx=\"true\"] {\n  display: flex;\n  flex-wrap: nowrap;\n  overflow-x: auto; }\n\ndiv[scrollx=\"true\"]::-webkit-scrollbar {\n    display: none; }\n\ndiv[scrollx=\"true\"] .scroll-item {\n    flex: 0 0 auto; }\n\n.horizontalScroll {\n  width: 16em;\n  height: 22em;\n  border-radius: 5px; }\n\n.cardData {\n  width: 100%;\n  display: flex;\n  flex-wrap: wrap; }\n\n.newsToday {\n  width: 40%;\n  line-height: 100px;\n  background-color: grey;\n  margin: 10px;\n  color: white;\n  text-align: center;\n  vertical-align: middle;\n  position: relative; }\n\n.cardNewsHeader {\n  height: 17em; }\n\n.newsOfToday .sourceLogo {\n  width: 7em;\n  height: 1.6em;\n  margin-top: 0;\n  margin-left: 0em;\n  margin-bottom: -1em;\n  background-color: #ebd3b0;\n  border-radius: 25px; }\n\n.sourceLogoInt {\n  width: 9em;\n  height: 2em;\n  align-items: right;\n  float: right;\n  border-radius: 0.5em;\n  margin-bottom: 0.2em;\n  margin-right: 0.2em; }\n\n.sourceLogoSports {\n  width: 9em;\n  height: 2em;\n  align-items: right;\n  float: right;\n  border-radius: 0.5em;\n  margin-bottom: 0.2em;\n  margin-right: 0.2em; }\n\n.sourceLogoLifeStyle {\n  width: 9em;\n  height: 2em;\n  align-items: right;\n  float: right;\n  border-radius: 0.5em;\n  margin-bottom: 0.2em;\n  margin-right: 0.2em; }\n\n.sourceLogoBangladesh {\n  width: 9em;\n  height: 2em;\n  align-items: right;\n  float: right;\n  border-radius: 0.5em;\n  margin-bottom: 0.2em;\n  margin-right: 0.2em; }\n\n.sourceLogoEntertainment {\n  width: 9em;\n  height: 2em;\n  align-items: right;\n  float: right;\n  border-radius: 0.5em;\n  margin-bottom: 0.2em;\n  margin-right: 0.2em; }\n\n.sourceLogoTech {\n  width: 9em;\n  height: 2em;\n  align-items: right;\n  float: right;\n  border-radius: 0.5em;\n  margin-bottom: 0.2em;\n  margin-right: 0.2em; }\n\n.callOfTodaysNews {\n  min-width: 8em; }\n\n.newsOfToday img {\n  width: 12em;\n  height: 10em;\n  z-index: 0; }\n\n.hrs {\n  box-shadow: 0px 1.5px 1.5px #646364; }\n\nion-card-content {\n  margin-left: 1em;\n  padding: 0; }\n\n::-webkit-scrollbar,\n*::-webkit-scrollbar {\n  display: none;\n  overflow: scroll; }\n\nion-content {\n  overflow: hidden;\n  --overflow: scroll; }\n\n.scroll-content {\n  overflow: scroll; }\n\nion-infinite-scroll.md.infinite-scroll-enabled.hydrated {\n  overflow: scroll !important;\n  height: 100% !important; }\n\n.weatherIcon {\n  width: 3em; }\n\nion-card-header {\n  padding: 4px; }\n\n.weatherDegree {\n  margin-top: 20px;\n  font-size: 3em;\n  font-weight: 900;\n  color: #bb8f52; }\n\n.weatherSummery p {\n  margin: 0; }\n\nion-badge {\n  width: 8em;\n  display: block;\n  position: absolute;\n  height: 1.8em;\n  margin-top: 1em;\n  margin-left: 1em;\n  background-color: #ebd3b0;\n  color: black; }\n\n.sourceBadge {\n  width: 8em;\n  display: block;\n  position: absolute;\n  height: 1.8em;\n  margin-top: 10em;\n  margin-left: 3em;\n  background-color: #ebd3b0;\n  color: black; }\n\n.weatherShortReport {\n  position: relative;\n  padding: 0;\n  margin-top: 0px; }\n\n.temperature {\n  padding: 0; }\n\n.suggestedNews {\n  font-weight: 700;\n  font-size: 1.5em;\n  margin-left: 9.8px; }\n\n.scrollContainer {\n  margin-left: 0.8em; }\n\n.newsTags {\n  width: 100%;\n  height: 7em;\n  position: absolute;\n  margin-top: 7em; }\n\n.newsTags img {\n  max-width: 8em;\n  margin-left: 7em;\n  margin-top: -2em; }\n\n.newsTags .publishedOn {\n  text-align: center;\n  color: #bb8f52;\n  margin-top: -2em;\n  margin-left: 7em; }\n\n.newsRecommendedImg img {\n  width: 100%;\n  height: 11em; }\n\n.sectionTitle {\n  font-size: 1.6em; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3Nkci9kZXZlbG9wbWVudC9Nb2JpbGVBcHBzL3Nob2JraG9ib3IvU2hvYi1LaG9ib3Ivc3JjL2FwcC9wYWdlcy9ob21lL2hvbWUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsMkJBQTJCO0VBQzNCLGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIsZ0JBQWdCLEVBQUE7O0FBR2xCO0VBQ0UsWUFBWTtFQUNaLGdCQUFnQjtFQUNoQixnQkFBZ0I7RUFDaEIsWUFBWSxFQUFBOztBQUdkO0VBQ0UsMkRBQTJEO0VBQzNELFVBQVUsRUFBQTs7QUFHWjtFQUNFLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsVUFBVTtFQUNWLGtCQUFrQixFQUFBOztBQUVwQjtFQUNFLDBCQUEwQjtFQUMxQiwyQkFBMkI7RUFDM0IsVUFBVTtFQUNWLGdCQUFnQixFQUFBOztBQUdsQjtFQUNFLGFBQWE7RUFDYixpQkFBaUI7RUFDakIsZ0JBQWdCLEVBQUE7O0FBSGxCO0lBS0ksYUFBYSxFQUFBOztBQUxqQjtJQVFJLGNBQWMsRUFBQTs7QUFJbEI7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLGtCQUFrQixFQUFBOztBQUdwQjtFQUNFLFdBQVc7RUFDWCxhQUFhO0VBRWIsZUFBZSxFQUFBOztBQUVqQjtFQUNFLFVBQVU7RUFDVixrQkFBa0I7RUFDbEIsc0JBQXNCO0VBQ3RCLFlBQVk7RUFDWixZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLHNCQUFzQjtFQUN0QixrQkFBa0IsRUFBQTs7QUFHcEI7RUFDRSxZQUFZLEVBQUE7O0FBR2Q7RUFDRSxVQUFVO0VBQ1YsYUFBYTtFQUNiLGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIsbUJBQW1CO0VBQ25CLHlCQUF5QjtFQUN6QixtQkFBbUIsRUFBQTs7QUFHckI7RUFDRSxVQUFVO0VBQ1YsV0FBVztFQUVYLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osb0JBQW9CO0VBQ3BCLG9CQUFvQjtFQUNwQixtQkFBbUIsRUFBQTs7QUFFckI7RUFDRSxVQUFVO0VBQ1YsV0FBVztFQUVYLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osb0JBQW9CO0VBQ3BCLG9CQUFvQjtFQUNwQixtQkFBbUIsRUFBQTs7QUFFckI7RUFDRSxVQUFVO0VBQ1YsV0FBVztFQUVYLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osb0JBQW9CO0VBQ3BCLG9CQUFvQjtFQUNwQixtQkFBbUIsRUFBQTs7QUFFckI7RUFDRSxVQUFVO0VBQ1YsV0FBVztFQUVYLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osb0JBQW9CO0VBQ3BCLG9CQUFvQjtFQUNwQixtQkFBbUIsRUFBQTs7QUFFckI7RUFDRSxVQUFVO0VBQ1YsV0FBVztFQUVYLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osb0JBQW9CO0VBQ3BCLG9CQUFvQjtFQUNwQixtQkFBbUIsRUFBQTs7QUFFckI7RUFDRSxVQUFVO0VBQ1YsV0FBVztFQUVYLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osb0JBQW9CO0VBQ3BCLG9CQUFvQjtFQUNwQixtQkFBbUIsRUFBQTs7QUFHckI7RUFDRSxjQUFjLEVBQUE7O0FBR2hCO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixVQUFVLEVBQUE7O0FBRVo7RUFJRSxtQ0FBbUMsRUFBQTs7QUFHckM7RUFDRSxnQkFBZ0I7RUFFaEIsVUFBVSxFQUFBOztBQUlaOztFQUVFLGFBQWE7RUFDYixnQkFBZ0IsRUFBQTs7QUFHbEI7RUFDRSxnQkFBZ0I7RUFDaEIsa0JBQVcsRUFBQTs7QUFHYjtFQUNFLGdCQUFnQixFQUFBOztBQUVsQjtFQUNFLDJCQUEyQjtFQUMzQix1QkFBdUIsRUFBQTs7QUFFekI7RUFDRSxVQUFVLEVBQUE7O0FBR1o7RUFDRSxZQUFZLEVBQUE7O0FBR2Q7RUFDRSxnQkFBZ0I7RUFDaEIsY0FBYztFQUNkLGdCQUFnQjtFQUNoQixjQUFjLEVBQUE7O0FBR2hCO0VBQ0UsU0FBUyxFQUFBOztBQUdYO0VBQ0UsVUFBVTtFQUNWLGNBQWM7RUFDZCxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIseUJBQXlCO0VBQ3pCLFlBQVksRUFBQTs7QUFFZDtFQUNFLFVBQVU7RUFDVixjQUFjO0VBQ2Qsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLHlCQUF5QjtFQUN6QixZQUFZLEVBQUE7O0FBR2Q7RUFDRSxrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLGVBQWUsRUFBQTs7QUFHakI7RUFDRSxVQUFVLEVBQUE7O0FBR1o7RUFDRSxnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLGtCQUFrQixFQUFBOztBQUdwQjtFQUNFLGtCQUFrQixFQUFBOztBQUdwQjtFQUVFLFdBQVc7RUFDWCxXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLGVBQWUsRUFBQTs7QUFFakI7RUFDRSxjQUFjO0VBQ2QsZ0JBQWdCO0VBQ2hCLGdCQUFnQixFQUFBOztBQUVsQjtFQUNFLGtCQUFrQjtFQUNsQixjQUFjO0VBQ2QsZ0JBQWdCO0VBQ2hCLGdCQUFnQixFQUFBOztBQUdsQjtFQUNFLFdBQVc7RUFDWCxZQUFZLEVBQUE7O0FBR2Q7RUFDRSxnQkFBZ0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2hvbWUvaG9tZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tdGl0bGUge1xyXG4gIHRleHQtYWxpZ246IGxlZnQgIWltcG9ydGFudDtcclxuICBwYWRkaW5nOiAxMnB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgZm9udC1zaXplOiAxLjVlbTtcclxufVxyXG5cclxuaW9uLXNlZ21lbnQtYnV0dG9uIHtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgZm9udC13ZWlnaHQ6IDkwMDtcclxuICBmb250LXNpemU6IDAuOGVtO1xyXG4gIGJvcmRlcjogbm9uZTtcclxufVxyXG5cclxuaW9uLXNlZ21lbnQge1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgI2VhZDFhZCwgd2hpdGUpO1xyXG4gIHBhZGRpbmc6IDA7XHJcbn1cclxuXHJcbmlvbi1jYXJkLXN1YnRpdGxlIC5uZXdzUmVjb21tZW5kZWQge1xyXG4gIG1hcmdpbi10b3A6IDFlbTtcclxuICBtYXJnaW4tbGVmdDogMWVtO1xyXG4gIHBhZGRpbmc6IDA7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG59XHJcbmlvbi1jYXJkLXN1YnRpdGxlIHtcclxuICBtYXJnaW4tdG9wOiAxZW0gIWltcG9ydGFudDtcclxuICBtYXJnaW4tbGVmdDogMWVtICFpbXBvcnRhbnQ7XHJcbiAgcGFkZGluZzogMDtcclxuICBmb250LXNpemU6IDEuMWVtO1xyXG59XHJcblxyXG5kaXZbc2Nyb2xseD1cInRydWVcIl0ge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC13cmFwOiBub3dyYXA7XHJcbiAgb3ZlcmZsb3cteDogYXV0bztcclxuICAmOjotd2Via2l0LXNjcm9sbGJhciB7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG4gIH1cclxuICAuc2Nyb2xsLWl0ZW0ge1xyXG4gICAgZmxleDogMCAwIGF1dG87XHJcbiAgfVxyXG59XHJcblxyXG4uaG9yaXpvbnRhbFNjcm9sbCB7XHJcbiAgd2lkdGg6IDE2ZW07XHJcbiAgaGVpZ2h0OiAyMmVtO1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxufVxyXG5cclxuLmNhcmREYXRhIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIC8vIGZsZXgtZGlyZWN0aW9uOiByb3c7MTBlbVxyXG4gIGZsZXgtd3JhcDogd3JhcDtcclxufVxyXG4ubmV3c1RvZGF5IHtcclxuICB3aWR0aDogNDAlO1xyXG4gIGxpbmUtaGVpZ2h0OiAxMDBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xyXG4gIG1hcmdpbjogMTBweDtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG59XHJcblxyXG4uY2FyZE5ld3NIZWFkZXIge1xyXG4gIGhlaWdodDogMTdlbTtcclxufVxyXG5cclxuLm5ld3NPZlRvZGF5IC5zb3VyY2VMb2dvIHtcclxuICB3aWR0aDogN2VtO1xyXG4gIGhlaWdodDogMS42ZW07XHJcbiAgbWFyZ2luLXRvcDogMDtcclxuICBtYXJnaW4tbGVmdDogMGVtO1xyXG4gIG1hcmdpbi1ib3R0b206IC0xZW07XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ViZDNiMDtcclxuICBib3JkZXItcmFkaXVzOiAyNXB4O1xyXG59XHJcblxyXG4uc291cmNlTG9nb0ludCB7XHJcbiAgd2lkdGg6IDllbTtcclxuICBoZWlnaHQ6IDJlbTtcclxuICAvLyBiYWNrZ3JvdW5kLWNvbG9yOiAjYmI4ZjUyO1xyXG4gIGFsaWduLWl0ZW1zOiByaWdodDtcclxuICBmbG9hdDogcmlnaHQ7XHJcbiAgYm9yZGVyLXJhZGl1czogMC41ZW07XHJcbiAgbWFyZ2luLWJvdHRvbTogMC4yZW07XHJcbiAgbWFyZ2luLXJpZ2h0OiAwLjJlbTtcclxufVxyXG4uc291cmNlTG9nb1Nwb3J0cyB7XHJcbiAgd2lkdGg6IDllbTtcclxuICBoZWlnaHQ6IDJlbTtcclxuICAvLyBiYWNrZ3JvdW5kLWNvbG9yOiAjYmI4ZjUyO1xyXG4gIGFsaWduLWl0ZW1zOiByaWdodDtcclxuICBmbG9hdDogcmlnaHQ7XHJcbiAgYm9yZGVyLXJhZGl1czogMC41ZW07XHJcbiAgbWFyZ2luLWJvdHRvbTogMC4yZW07XHJcbiAgbWFyZ2luLXJpZ2h0OiAwLjJlbTtcclxufVxyXG4uc291cmNlTG9nb0xpZmVTdHlsZSB7XHJcbiAgd2lkdGg6IDllbTtcclxuICBoZWlnaHQ6IDJlbTtcclxuICAvLyBiYWNrZ3JvdW5kLWNvbG9yOiAjYmI4ZjUyO1xyXG4gIGFsaWduLWl0ZW1zOiByaWdodDtcclxuICBmbG9hdDogcmlnaHQ7XHJcbiAgYm9yZGVyLXJhZGl1czogMC41ZW07XHJcbiAgbWFyZ2luLWJvdHRvbTogMC4yZW07XHJcbiAgbWFyZ2luLXJpZ2h0OiAwLjJlbTtcclxufVxyXG4uc291cmNlTG9nb0JhbmdsYWRlc2gge1xyXG4gIHdpZHRoOiA5ZW07XHJcbiAgaGVpZ2h0OiAyZW07XHJcbiAgLy8gYmFja2dyb3VuZC1jb2xvcjogI2JiOGY1MjtcclxuICBhbGlnbi1pdGVtczogcmlnaHQ7XHJcbiAgZmxvYXQ6IHJpZ2h0O1xyXG4gIGJvcmRlci1yYWRpdXM6IDAuNWVtO1xyXG4gIG1hcmdpbi1ib3R0b206IDAuMmVtO1xyXG4gIG1hcmdpbi1yaWdodDogMC4yZW07XHJcbn1cclxuLnNvdXJjZUxvZ29FbnRlcnRhaW5tZW50IHtcclxuICB3aWR0aDogOWVtO1xyXG4gIGhlaWdodDogMmVtO1xyXG4gIC8vIGJhY2tncm91bmQtY29sb3I6ICNiYjhmNTI7XHJcbiAgYWxpZ24taXRlbXM6IHJpZ2h0O1xyXG4gIGZsb2F0OiByaWdodDtcclxuICBib3JkZXItcmFkaXVzOiAwLjVlbTtcclxuICBtYXJnaW4tYm90dG9tOiAwLjJlbTtcclxuICBtYXJnaW4tcmlnaHQ6IDAuMmVtO1xyXG59XHJcbi5zb3VyY2VMb2dvVGVjaCB7XHJcbiAgd2lkdGg6IDllbTtcclxuICBoZWlnaHQ6IDJlbTtcclxuICAvLyBiYWNrZ3JvdW5kLWNvbG9yOiAjYmI4ZjUyO1xyXG4gIGFsaWduLWl0ZW1zOiByaWdodDtcclxuICBmbG9hdDogcmlnaHQ7XHJcbiAgYm9yZGVyLXJhZGl1czogMC41ZW07XHJcbiAgbWFyZ2luLWJvdHRvbTogMC4yZW07XHJcbiAgbWFyZ2luLXJpZ2h0OiAwLjJlbTtcclxufVxyXG5cclxuLmNhbGxPZlRvZGF5c05ld3Mge1xyXG4gIG1pbi13aWR0aDogOGVtO1xyXG59XHJcblxyXG4ubmV3c09mVG9kYXkgaW1nIHtcclxuICB3aWR0aDogMTJlbTtcclxuICBoZWlnaHQ6IDEwZW07XHJcbiAgei1pbmRleDogMDtcclxufVxyXG4uaHJzIHtcclxuICAvL2JvcmRlci10b3A6IDFweCBzb2xpZCBibGFjaztcclxuICAtd2Via2l0LWJveC1zaGFkb3c6IDBweCAxcHggMXB4ICM2NDYzNjQ7XHJcbiAgLW1vei1ib3gtc2hhZG93OiAwcHggMXB4IDFweCAjNjQ2MzY0O1xyXG4gIGJveC1zaGFkb3c6IDBweCAxLjVweCAxLjVweCAjNjQ2MzY0O1xyXG59XHJcblxyXG5pb24tY2FyZC1jb250ZW50IHtcclxuICBtYXJnaW4tbGVmdDogMWVtO1xyXG4gIC8vIG1hcmdpbi1yaWdodDogMS4xZW07XHJcbiAgcGFkZGluZzogMDtcclxufVxyXG5cclxuLy8gVmVydGljYWwgc2Nyb2xsZXIgZGlzYWJsaW5nXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXIsXHJcbio6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcclxuICBkaXNwbGF5OiBub25lO1xyXG4gIG92ZXJmbG93OiBzY3JvbGw7XHJcbn1cclxuXHJcbmlvbi1jb250ZW50IHtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIC0tb3ZlcmZsb3c6IHNjcm9sbDtcclxufVxyXG5cclxuLnNjcm9sbC1jb250ZW50IHtcclxuICBvdmVyZmxvdzogc2Nyb2xsO1xyXG59XHJcbmlvbi1pbmZpbml0ZS1zY3JvbGwubWQuaW5maW5pdGUtc2Nyb2xsLWVuYWJsZWQuaHlkcmF0ZWQge1xyXG4gIG92ZXJmbG93OiBzY3JvbGwgIWltcG9ydGFudDtcclxuICBoZWlnaHQ6IDEwMCUgIWltcG9ydGFudDtcclxufVxyXG4ud2VhdGhlckljb24ge1xyXG4gIHdpZHRoOiAzZW07XHJcbn1cclxuXHJcbmlvbi1jYXJkLWhlYWRlciB7XHJcbiAgcGFkZGluZzogNHB4O1xyXG59XHJcblxyXG4ud2VhdGhlckRlZ3JlZSB7XHJcbiAgbWFyZ2luLXRvcDogMjBweDtcclxuICBmb250LXNpemU6IDNlbTtcclxuICBmb250LXdlaWdodDogOTAwO1xyXG4gIGNvbG9yOiAjYmI4ZjUyO1xyXG59XHJcblxyXG4ud2VhdGhlclN1bW1lcnkgcCB7XHJcbiAgbWFyZ2luOiAwO1xyXG59XHJcblxyXG5pb24tYmFkZ2Uge1xyXG4gIHdpZHRoOiA4ZW07XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGhlaWdodDogMS44ZW07XHJcbiAgbWFyZ2luLXRvcDogMWVtO1xyXG4gIG1hcmdpbi1sZWZ0OiAxZW07XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ViZDNiMDtcclxuICBjb2xvcjogYmxhY2s7XHJcbn1cclxuLnNvdXJjZUJhZGdlIHtcclxuICB3aWR0aDogOGVtO1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBoZWlnaHQ6IDEuOGVtO1xyXG4gIG1hcmdpbi10b3A6IDEwZW07XHJcbiAgbWFyZ2luLWxlZnQ6IDNlbTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWJkM2IwO1xyXG4gIGNvbG9yOiBibGFjaztcclxufVxyXG5cclxuLndlYXRoZXJTaG9ydFJlcG9ydCB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHBhZGRpbmc6IDA7XHJcbiAgbWFyZ2luLXRvcDogMHB4O1xyXG59XHJcblxyXG4udGVtcGVyYXR1cmUge1xyXG4gIHBhZGRpbmc6IDA7XHJcbn1cclxuXHJcbi5zdWdnZXN0ZWROZXdzIHtcclxuICBmb250LXdlaWdodDogNzAwO1xyXG4gIGZvbnQtc2l6ZTogMS41ZW07XHJcbiAgbWFyZ2luLWxlZnQ6IDkuOHB4O1xyXG59XHJcblxyXG4uc2Nyb2xsQ29udGFpbmVyIHtcclxuICBtYXJnaW4tbGVmdDogMC44ZW07XHJcbn1cclxuXHJcbi5uZXdzVGFncyB7XHJcbiAgLy8gYmFja2dyb3VuZC1jb2xvcjogI2JiOGY1MjtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDdlbTtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgbWFyZ2luLXRvcDogN2VtO1xyXG59XHJcbi5uZXdzVGFncyBpbWcge1xyXG4gIG1heC13aWR0aDogOGVtO1xyXG4gIG1hcmdpbi1sZWZ0OiA3ZW07XHJcbiAgbWFyZ2luLXRvcDogLTJlbTtcclxufVxyXG4ubmV3c1RhZ3MgLnB1Ymxpc2hlZE9uIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgY29sb3I6ICNiYjhmNTI7XHJcbiAgbWFyZ2luLXRvcDogLTJlbTtcclxuICBtYXJnaW4tbGVmdDogN2VtO1xyXG59XHJcblxyXG4ubmV3c1JlY29tbWVuZGVkSW1nIGltZyB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxMWVtO1xyXG59XHJcblxyXG4uc2VjdGlvblRpdGxlIHtcclxuICBmb250LXNpemU6IDEuNmVtO1xyXG59XHJcbiJdfQ== */"

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
/* harmony import */ var _news_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../news.service */ "./src/app/news.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/in-app-browser/ngx */ "./node_modules/@ionic-native/in-app-browser/ngx/index.js");
/* harmony import */ var _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic-native/geolocation/ngx */ "./node_modules/@ionic-native/geolocation/ngx/index.js");
/* harmony import */ var _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/native-geocoder/ngx */ "./node_modules/@ionic-native/native-geocoder/ngx/index.js");














var HomePage = /** @class */ (function () {
    function HomePage(router, newsApi, event, iab, loadingController, geolocation, nativeGeocoder, platform, toastController) {
        this.router = router;
        this.newsApi = newsApi;
        this.event = event;
        this.iab = iab;
        this.loadingController = loadingController;
        this.geolocation = geolocation;
        this.nativeGeocoder = nativeGeocoder;
        this.platform = platform;
        this.toastController = toastController;
        this.homeVisibleFlag = true;
        this.results = []; //This is the array which contains category segment page getAllBangladeshPosts
        this.resultsBd = []; //This is the array which contains category segment page getAllBangladeshPosts
        this.resultsInt = [];
        this.resultsEnt = [];
        this.resultsTech = [];
        this.resultsSports = [];
        this.resultsLifeStyle = [];
        this.allPosts = [];
        this.test = [];
        this.weather = [];
        this.jamunaTvYoutube = [];
        this.category = "home";
        this.page = 1;
        this.pageBd = 1;
        this.pageInt = 1;
        this.pageSports = 1;
        this.pageLifeStyle = 1;
        this.pageEnt = 1;
        this.pageTech = 1;
        this.resultFlag = true;
        this.bdFlag = true;
        this.intFlag = true;
        this.sportsFlag = true;
        this.lifeStyleFlag = true;
        this.entFlag = true;
        this.techFlag = true;
        this.lat = 0;
        this.long = 0;
        this.weatherFlag = false;
        this.categories = ["704", "658", "729", "726"]; //704= jugantor, 658=bdnews24 729=bengal-beats, 726=prothom-alo
        this.dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        //Geocoder configuration
        this.geoencoderOptions = {
            useLocale: true,
            maxResults: 5
        };
        this.showAutoHideLoader();
        this.getPosts(this.page);
        this.getGeolocation();
        this.getJamunaTvVideos();
        this.home();
        this.event.publish('scrollToTop', this.content);
    }
    //////////////////////// Imranul Hasan ///////////////////////
    HomePage.prototype.goToSegment = function (buttonNumber, side) {
        console.log("buttonNumber", buttonNumber);
        var nextButtonNumber;
        if (side === "right") {
            if (buttonNumber === 0) {
                return;
            }
            nextButtonNumber = buttonNumber - 1;
        }
        else {
            nextButtonNumber = buttonNumber + 1;
        }
        var buttonWidth = document.getElementById(String(buttonNumber)).offsetWidth;
        document.getElementById(String(nextButtonNumber)).click();
        document.getElementById("segment").scrollLeft = nextButtonNumber * buttonWidth - buttonWidth;
    };
    HomePage.prototype.segmentWiseSwipe = function (side) {
        // $("ion-content").css({left:this.platform.width()}).animate({"left":"0px"}, "slow");
        var element = document.querySelector('ion-content');
        element.classList.add('animated', 'zoomInUp');
        element.addEventListener('animationend', function () {
            element.classList.remove('animated', 'zoomInUp');
        });
        if (this.category == "home") {
            this.goToSegment(0, side);
        }
        else if (this.category == "videos") {
            this.goToSegment(1, side);
        }
        else if (this.category == "bangladesh") {
            this.goToSegment(2, side);
        }
        else if (this.category == "international") {
            this.goToSegment(3, side);
        }
        else if (this.category == "sports") {
            this.goToSegment(4, side);
        }
        else if (this.category == "entertainment") {
            this.goToSegment(5, side);
        }
        else if (this.category == "tech") {
            this.goToSegment(6, side);
        }
        else if (this.category == "lifeStyle") {
            this.goToSegment(7, side);
        }
    };
    HomePage.prototype.swipeLeftPress = function ($event) {
        console.log("swipeLeftPress", $event);
        this.segmentWiseSwipe("left");
    };
    HomePage.prototype.swipeRightPress = function ($event) {
        console.log("swipeRightPress", $event);
        this.segmentWiseSwipe("right");
    };
    //////////////////////// Imranul Hasan end ///////////////////////
    //Get current coordinates of device
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
            _this.toastMsg("Please ALLOW geolocation service", 2000);
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
            console.log("Weather from report");
            console.log(result["main"].temp);
            _this.temp = result["main"].temp;
            _this.humidity = result["main"].humidity;
            _this.wind = result["wind"].speed;
            var icon = result["weather"][0].icon;
            _this.description = result["weather"][0].description;
            console.log("ICOOOO");
            _this.weatherIconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
            console.log("ICOOOO");
            console.log(_this.weatherIconUrl);
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
            console.log("This is the feels like temperature");
            console.log(_this.feelsLike);
        });
    };
    /**
     *
     * @param lat
     * @param long
     * Calls the jamuna tv youtube channel api
     */
    HomePage.prototype.getJamunaTvVideos = function () {
        var _this = this;
        this.newsApi.getjamunaTvYoutube().subscribe(function (result) {
            console.log("Jamuna Tv API");
            // var videoId=result['items'][0].id["videoId"];
            var lengthOfRes = Object.keys(result["items"]).length;
            console.log("SHSHSHSHS");
            console.log(lengthOfRes);
            console.log(result);
            for (var i = 0; i < lengthOfRes; i++) {
                _this.jamunaTvYoutube.push(result["items"][i]);
            }
            console.log("final ress");
            console.log(_this.jamunaTvYoutube);
        });
    };
    /**
     *
     * Infinite scroll for todays news section on home page
     */
    HomePage.prototype.loadAllNews = function (event) {
        var _this = this;
        setTimeout(function () {
            console.log('Done');
            _this.getPosts(_this.page);
            event.target.complete();
            // App logic to determine if all data is loaded
            // and disable the infinite scroll
            if (_this.resultFlag == false) {
                event.target.disabled = true;
            }
        }, 1500);
    };
    /**
     *
     * Infinite scroll for bangladesh news section on home page
     */
    HomePage.prototype.loadAllSportsNews = function (event) {
        var _this = this;
        setTimeout(function () {
            console.log('Done');
            _this.getSportsPosts(_this.pageSports);
            event.target.complete();
            // App logic to determine if all data is loaded
            // and disable the infinite scroll
            if (_this.resultFlag == false) {
                event.target.disabled = true;
            }
        }, 1500);
    };
    /**
     *
     * Infinite scroll for bangladesh news section on home page
     */
    HomePage.prototype.loadAllLifeStyleNews = function (event) {
        var _this = this;
        setTimeout(function () {
            console.log('Done');
            _this.getLifeStylePosts(_this.pageLifeStyle);
            event.target.complete();
            // App logic to determine if all data is loaded
            // and disable the infinite scroll
            if (_this.resultFlag == false) {
                event.target.disabled = true;
            }
        }, 1500);
    };
    /**
     *
     * Infinite scroll for bangladesh news section on home page
     */
    HomePage.prototype.loadAllBangladeshNews = function (event) {
        var _this = this;
        setTimeout(function () {
            console.log('Done');
            _this.getBangladeshPosts(_this.pageBd);
            event.target.complete();
            // App logic to determine if all data is loaded
            // and disable the infinite scroll
            if (_this.resultFlag == false) {
                event.target.disabled = true;
            }
        }, 1500);
    };
    /**
     *
     * Infinite scroll for International news section on home page
     */
    HomePage.prototype.loadAllInternationalNews = function (event) {
        var _this = this;
        setTimeout(function () {
            console.log('Done');
            _this.getInternationalPosts(_this.pageInt);
            event.target.complete();
            // App logic to determine if all data is loaded
            // and disable the infinite scroll
            if (_this.resultFlag == false) {
                event.target.disabled = true;
            }
        }, 1500);
    };
    /**
     *
     * Infinite scroll for entertainment news section on home page
     */
    HomePage.prototype.loadAllEntertainmentNews = function (event) {
        var _this = this;
        setTimeout(function () {
            console.log('Done');
            _this.getEntertainmentPosts(_this.pageEnt);
            event.target.complete();
            // App logic to determine if all data is loaded
            // and disable the infinite scroll
            if (_this.resultFlag == false) {
                event.target.disabled = true;
            }
        }, 1500);
    };
    /**
     *
     * Infinite scroll for Tech news section on home page
     */
    HomePage.prototype.loadAllTechNews = function (event) {
        var _this = this;
        setTimeout(function () {
            console.log('Done');
            _this.getTechPosts(_this.pageTech);
            event.target.complete();
            // App logic to determine if all data is loaded
            // and disable the infinite scroll
            if (_this.resultFlag == false) {
                event.target.disabled = true;
            }
        }, 1500);
    };
    HomePage.prototype.toggleInfiniteScroll = function () {
        this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    };
    /**
     *
     * Convert date into bengali
     */
    HomePage.prototype.dateToBengali = function (date) {
        var event = new Date(date);
        console.log("Date in banglaaa");
        console.log(event.toLocaleDateString('bn', this.dateOptions));
        return event.toLocaleDateString('bn', this.dateOptions);
    };
    /**
     * Gets all the posts
     */
    HomePage.prototype.getPosts = function (page) {
        var _this = this;
        // Get the information from the API
        console.log("Hey daaaa");
        console.log(page);
        this.newsApi.getAllPosts(page).subscribe(function (result) {
            if (result) {
                var lengthOfRes = Object.keys(result).length;
                console.log("Todays date");
                for (var i = 0; i < lengthOfRes; i++) {
                    _this.allPosts.push(result[i]);
                    console.log("This is res ress");
                    console.log(result[i]);
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
                console.log("THE THE");
                console.log(y['1']);
                res.link = y['1'];
            }
        });
        // this.page=this.page+1;
    };
    HomePage.prototype.goToSource = function (url) {
        console.log("This is ht url");
        console.log(url);
        // window.location.href = url; 
        this.iab.create(url, '_system');
        // if(url['0']){
        //   window.location.href('"'+url['0']+'"');
    };
    HomePage.prototype.goToYoutube = function (videoId) {
        var youtubeURL = "https://www.youtube.com/watch?v=" + videoId;
        console.log("This is youtube url");
        console.log(youtubeURL);
        this.iab.create(youtubeURL, '_system');
    };
    /**
     * Gets all the posts
     */
    HomePage.prototype.getBangladeshPosts = function (page) {
        var _this = this;
        //This flag ensures that the loader does not load on each infinite scroll
        if (this.bdFlag) {
            this.showAutoHideLoader();
        }
        // Get the information from the API
        this.newsApi.getAllBangladeshPosts(page).subscribe(function (result) {
            if (result) {
                var lengthOfRes = Object.keys(result).length;
                for (var i = 0; i < lengthOfRes; i++) {
                    _this.resultsBd.push(result[i]);
                }
                _this.pageBd = _this.pageBd + 1;
                _this.bdFlag = false;
                console.log("this.resultsBd");
                console.log(_this.resultsBd);
            }
            else {
                _this.resultFlag = false;
            }
            for (var _i = 0, _a = _this.resultsBd; _i < _a.length; _i++) {
                var res = _a[_i];
                var x = res.content.rendered;
                var pat = /href="([^\'\"]+)/g;
                var y = pat.exec(x);
                console.log("THE THE");
                console.log(y['1']);
                res.link = y['1'];
            }
        });
    };
    /**
     * Gets all the posts
     */
    HomePage.prototype.getSportsPosts = function (page) {
        var _this = this;
        //This flag ensures that the loader does not load on each infinite scroll
        if (this.sportsFlag) {
            this.showAutoHideLoader();
        }
        // Get the information from the API
        this.newsApi.getAllSportsPosts(page).subscribe(function (result) {
            if (result) {
                var lengthOfRes = Object.keys(result).length;
                for (var i = 0; i < lengthOfRes; i++) {
                    _this.resultsSports.push(result[i]);
                }
                _this.pageSports = _this.pageSports + 1;
                _this.sportsFlag = false;
            }
            else {
                _this.resultFlag = false;
            }
            for (var _i = 0, _a = _this.resultsSports; _i < _a.length; _i++) {
                var res = _a[_i];
                var x = res.content.rendered;
                var pat = /href="([^\'\"]+)/g;
                var y = pat.exec(x);
                console.log("THE THE");
                console.log(y['1']);
                res.link = y['1'];
            }
        });
    };
    /**
     * Gets all the posts
     */
    HomePage.prototype.getLifeStylePosts = function (page) {
        var _this = this;
        //This flag ensures that the loader does not load on each infinite scroll
        if (this.lifeStyleFlag) {
            this.showAutoHideLoader();
        }
        // Get the information from the API
        this.newsApi.getAllLifeStylePosts(page).subscribe(function (result) {
            if (result) {
                var lengthOfRes = Object.keys(result).length;
                for (var i = 0; i < lengthOfRes; i++) {
                    _this.resultsLifeStyle.push(result[i]);
                }
                _this.pageLifeStyle = _this.pageLifeStyle + 1;
                _this.lifeStyleFlag = false;
            }
            else {
                _this.resultFlag = false;
            }
            for (var _i = 0, _a = _this.resultsLifeStyle; _i < _a.length; _i++) {
                var res = _a[_i];
                var x = res.content.rendered;
                var pat = /href="([^\'\"]+)/g;
                var y = pat.exec(x);
                console.log("THE THE");
                console.log(y['1']);
                res.link = y['1'];
            }
        });
    };
    /**
     * Gets all international the posts
     */
    HomePage.prototype.getInternationalPosts = function (page) {
        var _this = this;
        if (this.intFlag) {
            this.showAutoHideLoader();
        }
        // Get the information from the API
        this.newsApi.getAllInternationalPosts(page).subscribe(function (result) {
            if (result) {
                var lengthOfRes = Object.keys(result).length;
                for (var i = 0; i < lengthOfRes; i++) {
                    _this.resultsInt.push(result[i]);
                }
                _this.pageInt = _this.pageInt + 1;
                _this.intFlag = false;
            }
            else {
                _this.resultFlag = false;
            }
            for (var _i = 0, _a = _this.resultsInt; _i < _a.length; _i++) {
                var res = _a[_i];
                var x = res.content.rendered;
                var pat = /href="([^\'\"]+)/g;
                var y = pat.exec(x);
                console.log("THE THE");
                console.log(y['1']);
                res.link = y['1'];
            }
        });
    };
    /**
     * Gets all international the posts
     */
    HomePage.prototype.getEntertainmentPosts = function (page) {
        var _this = this;
        if (this.entFlag) {
            this.showAutoHideLoader();
        }
        // Get the information from the API
        this.newsApi.getAllEntertainmentPosts(page).subscribe(function (result) {
            if (result) {
                var lengthOfRes = Object.keys(result).length;
                for (var i = 0; i < lengthOfRes; i++) {
                    _this.resultsEnt.push(result[i]);
                }
                _this.pageEnt = _this.pageEnt + 1;
                _this.entFlag = false;
            }
            else {
                _this.resultFlag = false;
            }
            for (var _i = 0, _a = _this.resultsEnt; _i < _a.length; _i++) {
                var res = _a[_i];
                var x = res.content.rendered;
                var pat = /href="([^\'\"]+)/g;
                var y = pat.exec(x);
                console.log("THE THE");
                console.log(y['1']);
                res.link = y['1'];
            }
        });
    };
    /**
     * Gets all international the posts
     */
    HomePage.prototype.getTechPosts = function (page) {
        var _this = this;
        if (this.techFlag) {
            this.showAutoHideLoader();
        }
        // Get the information from the API
        this.newsApi.getAllTechPosts(page).subscribe(function (result) {
            if (result) {
                var lengthOfRes = Object.keys(result).length;
                console.log("LENGTH OF RESULT");
                console.log(lengthOfRes);
                for (var i = 0; i < lengthOfRes; i++) {
                    _this.resultsTech.push(result[i]);
                }
                _this.pageTech = _this.pageTech + 1;
                _this.techFlag = false;
            }
            else {
                _this.resultFlag = false;
            }
            for (var _i = 0, _a = _this.resultsTech; _i < _a.length; _i++) {
                var res = _a[_i];
                var x = res.content.rendered;
                var pat = /href="([^\'\"]+)/g;
                var y = pat.exec(x);
                console.log("THE THE");
                console.log(y['1']);
                res.link = y['1'];
            }
        });
    };
    HomePage.prototype.doRefresh = function (event) {
        console.log('Begin async operation=======');
        setTimeout(function () {
            console.log('Async operation has ended');
            event.target.complete();
        }, 2500);
    };
    HomePage.prototype.home = function () {
        this.homeVisibleFlag = true;
    };
    HomePage.prototype.videos = function () {
        this.content.scrollToTop();
        this.getJamunaTvVideos();
        this.homeVisibleFlag = false;
    };
    HomePage.prototype.bangladesh = function () {
        this.content.scrollToTop();
        this.getBangladeshPosts(this.pageBd);
        this.homeVisibleFlag = false;
    };
    HomePage.prototype.international = function () {
        this.content.scrollToTop();
        this.homeVisibleFlag = false;
        this.getInternationalPosts(this.pageInt);
    };
    HomePage.prototype.sports = function () {
        console.log("Gullu Gullu");
        this.content.scrollToTop();
        this.homeVisibleFlag = false;
        this.getSportsPosts(this.pageSports);
    };
    HomePage.prototype.entertainment = function () {
        this.content.scrollToTop();
        this.homeVisibleFlag = false;
        this.getEntertainmentPosts(this.pageEnt);
    };
    HomePage.prototype.tech = function () {
        this.content.scrollToTop();
        this.homeVisibleFlag = false;
        this.getTechPosts(this.pageTech);
    };
    HomePage.prototype.lifeStyle = function () {
        this.content.scrollToTop();
        this.homeVisibleFlag = false;
        this.getLifeStylePosts(this.pageLifeStyle);
    };
    HomePage.prototype.ionViewDidEnter = function () {
        this.content.scrollToTop();
    };
    /**
     * Ionic Loading Controller
     */
    HomePage.prototype.showAutoHideLoader = function () {
        this.loadingController.create({
            message: 'Loading...',
            cssClass: "loader",
            duration: 800
        }).then(function (res) {
            res.present();
            res.onDidDismiss().then(function (dis) {
                console.log('Loading...');
            });
        });
    };
    /**
     *
     * @param msg the toast message which is going to be displayed
     *
     * This is a generic toast message display function
     */
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
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _news_service__WEBPACK_IMPORTED_MODULE_3__["NewsService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["Events"], _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_5__["InAppBrowser"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["LoadingController"], _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_6__["Geolocation"], _ionic_native_native_geocoder_ngx__WEBPACK_IMPORTED_MODULE_7__["NativeGeocoder"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["Platform"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ToastController"]])
    ], HomePage);
    return HomePage;
}());



/***/ }),

/***/ "./src/globalSettings.ts":
/*!*******************************!*\
  !*** ./src/globalSettings.ts ***!
  \*******************************/
/*! exports provided: ROOT_URL, API_SLUG */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROOT_URL", function() { return ROOT_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API_SLUG", function() { return API_SLUG; });
//config constants
var ROOT_URL = 'http://shobkhobor.dreamdiver.nl/';
var API_SLUG = ROOT_URL + 'wp-json/wp/v2/';


/***/ })

}]);
//# sourceMappingURL=home-home-module.js.map