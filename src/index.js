const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook
} = require('tapable');

class Car {
    constructor() {
        this.hooks = {
            accelerate: new AsyncSeriesWaterfallHook(['Accelerate'])
        };
    }
}

// SyncHook
// 同步普通钩子
// this.call = function lazyCompile(Accelerate) {
//     const func = function (Accelerate) {
//         // create
//         'use strict';
//         // header
//         var _context;
//         var _x = this._x;
//
//         // callTapsSeries callTap
//         // onDone 的变化
//         var _fn0 = _x[0];
//         _fn0(Accelerate);
//         var _fn1 = _x[1];
//         _fn1(Accelerate);
//     };
//     return func(Accelerate);
// };
// const car = new Car();
// const accelerateHooks = car.hooks.accelerate;
// accelerateHooks.tap('WarningLamp', (Accelerate) => {
//     console.log(`Accelerate: ${Accelerate} mph`);
//     return Accelerate;
// });
// accelerateHooks.tap('NextWarningLamp', (Accelerate) => {
//     console.log(`Next Accelerate: ${Accelerate} mph`);
//     return Accelerate;
// });
// const result = accelerateHooks.call(120);
// console.log(result);

// SyncBailHook
// 同步熔断钩子
// this.call = function lazyCompile(Accelerate) {
//     function func(Accelerate) {
//         // create
//         'use strict';
//
//         // header
//         var _context;
//         var _x = this._x;
//
//         // callTapsSeries callTap
//         // onDone,onResult 的变化
//         var _fn0 = _x[0];
//         var _result0 = _fn0(Accelerate);
//         if (_result0 !== undefined) {
//             return _result0;
//         } else {
//             var _fn1 = _x[1];
//             var _result1 = _fn1(Accelerate);
//             if (_result1 !== undefined) {
//                 return _result1;
//             } else {
//             }
//         }
//     }
//
//     return func(Accelerate);
// }
// const car = new Car();
// const accelerateHooks = car.hooks.accelerate;
// accelerateHooks.tap('WarningLamp', (Accelerate) => {
//     console.log(`Accelerate: ${Accelerate} mph`);
// });
// accelerateHooks.tap('NextWarningLamp', (Accelerate) => {
//     console.log(`Next Accelerate: ${Accelerate} mph`);
//     return Accelerate + 150;
// });
// const result = accelerateHooks.call(120);
// console.log(result);

// SyncWaterfallHook
// 同步流水钩子
// this.call = function lazyCompile(Accelerate) {
//     function func(Accelerate) {
//         // create
//         'use strict';
//         // header
//         var _context;
//         var _x = this._x;
//         // callTapsSeries callTap
//         // onDone,onResult 的变化
//         var _fn0 = _x[0];
//         var _result0 = _fn0(Accelerate);
//         if (_result0 !== undefined) {
//             Accelerate = _result0;
//         }
//         var _fn1 = _x[1];
//         var _result1 = _fn1(Accelerate);
//         if (_result1 !== undefined) {
//             Accelerate = _result1;
//         }
//         return Accelerate;
//     }
//     return func(Accelerate);
// }
// const car = new Car();
// const accelerateHooks = car.hooks.accelerate;
// accelerateHooks.tap('WarningLamp', (Accelerate) => {
//     console.log(`Accelerate: ${Accelerate} mph`);
//     return Accelerate + 220;
// });
// accelerateHooks.tap('NextWarningLamp', (Accelerate) => {
//     console.log(`Next Accelerate: ${Accelerate} mph`);
//     return Accelerate + 150;
// });
// const result = accelerateHooks.call(120);
// console.log(result);

// AsyncSeriesHook
// 异步普通钩子
// this.callAsync = function lazyCompile(Accelerate, callback) {
//     function func(Accelerate, _callback) {
//         // create
//         'use strict'
//         // header
//         var _context;
//         var _x = this._x;
//
//         // callTapsSeries callTap
//         // onDone 的变化
//         function _next0() {
//             var _fn1 = _x[1];
//             _fn1(Accelerate, _err1 => {
//                 if (_err1) {
//                     _callback(_err1);
//                 } else {
//                     _callback();
//                 }
//             });
//         }
//
//         var _fn0 = _x[0];
//         _fn0(Accelerate, _err1 => {
//             if (_err1) {
//                 _callback(_err1);
//             } else {
//                 _next0();
//             }
//         });
//     }
//
//     func(Accelerate, callback);
// }
// const car = new Car();
// const accelerateHooks = car.hooks.accelerate;
// accelerateHooks.tapAsync('WarningLamp', (Accelerate, callback) => {
//     console.log(`Accelerate: ${Accelerate} mph`);
//     callback();
// });
// accelerateHooks.tapAsync('NextWarningLamp', (Accelerate, callback) => {
//     console.log(`Next Accelerate: ${Accelerate} mph`);
//     callback('error');
// });
// accelerateHooks.callAsync(120, (err, result) => {
//     console.log('err:', err, '###', 'result:', result);
// });

// AsyncSeriesBailHook
// 异步熔断钩子
// this.callAsync = function lazyCompile(Accelerate, callback) {
//     function func(Accelerate, _callback) {
//         // create
//         'use strict';
//         // header
//         var _context;
//         var _x = this._x;
//
//         // callTapsSeries callTap
//         // onDone,onResult 的变化
//         function _next0() {
//             var _fn1 = _x[1];
//             _fn1(Accelerate, (_err1, _result1) => {
//                 if (_err1) {
//                     _callback(_err1);
//                 } else {
//                     if (_result1 !== undefined) {
//                         _callback(null, _result1);
//                     } else {
//                         _callback();
//                     }
//                 }
//             });
//         }
//
//         var _fn0 = _x[0];
//         _fn0(Accelerate, (_err0, _result0) => {
//             if (_err0) {
//                 _callback(_err0);
//             } else {
//                 if (_result0 !== undefined) {
//                     _callback(null, _result0);
//                 } else {
//                     _next0();
//                 }
//             }
//         });
//     }
//
//     func(Accelerate, callback);
// };
// const car = new Car();
// const accelerateHooks = car.hooks.accelerate;
// accelerateHooks.tapAsync('WarningLamp', (Accelerate, callback) => {
//     console.log(`Accelerate: ${Accelerate} mph`);
//     callback();
// });
// accelerateHooks.tapAsync('NextWarningLamp', (Accelerate, callback) => {
//     console.log(`Next Accelerate: ${Accelerate} mph`);
//     callback(undefined, Accelerate + 180);
// });
// accelerateHooks.callAsync(120, (err, result) => {
//     console.log('err:', err, '###', 'result:', result);
// });

// AsyncSeriesWaterfallHook
// this.callAsync = function lazyCompile(Accelerate, callback) {
//     function func(Accelerate, _callback) {
//         // create
//         'use strict';
//         // header
//         var _context;
//         var _x = this._x;
//         // callTapsSeries callTap
//         // onDone,onResult 的变化
//         function _next0() {
//             var _fn1 = _x[1];
//             _fn1(Accelerate, (_err1, _result1) => {
//                 if (_err1) {
//                     _callback(_err1);
//                 } else {
//                     if (_result1 !== undefined) {
//                         Accelerate = _result1;
//                     }
//                     _callback(null, Accelerate);
//                 }
//             });
//         }
//         var _fn0 = _x[0];
//         _fn0(Accelerate, (_err0, _result0) => {
//             if (_err0) {
//                 _callback(_err0);
//             } else {
//                 if (_result0 !== undefined) {
//                     Accelerate = _result0;
//                 }
//                 _next0();
//             }
//         });
//     }
//     func(Accelerate, callback);
// }
// 异步流水钩子
// const car = new Car();
// const accelerateHooks = car.hooks.accelerate;
// accelerateHooks.tapAsync('WarningLamp', (Accelerate, callback) => {
//     console.log(`Accelerate: ${Accelerate} mph`);
//     callback(undefined, Accelerate + 190);
// });
// accelerateHooks.tapAsync('NextWarningLamp', (Accelerate, callback) => {
//     console.log(`Next Accelerate: ${Accelerate} mph`);
//     callback(undefined, Accelerate + 200);
// });
// accelerateHooks.callAsync(120, (err, result) => {
//     console.log('err:', err, '###', 'result:', result);
// });

// AsyncSeriesHook Promise
// Promise 普通钩子
// this.promise = function (Accelerate) {
//     function func(Accelerate) {
//         // create
//         'use strict';
//         return new Promise((_resolve, _reject) => {
//             var _sync = true;
//
//             function _error(_err) {
//                 if (_sync)
//                     _resolve(Promise.resolve().then(() => {throw _err;}));
//                 else
//                     _reject(_err);
//             }
//
//             // header
//             var _context;
//             var _x = this._x;
//
//             // callTapsSeries callTap
//             // onError、onDone 以及 onResult 的变化
//             function _next0() {
//                 var _hasResult1 = false;
//                 var _fn1 = _x[1];
//                 var _promise1 = _fn1(Accelerate);
//
//                 if (!_promise1 || !_promise1.then)
//                     throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise1 + ')');
//
//                 _promise1.then(() => {
//                     _hasResult1 = true;
//                     _resolve();
//                 }, _err1 => {
//                     if (_hasResult1)
//                         throw _err1;
//                     else
//                         _error(_err1);
//                 });
//             }
//
//             var _hasResult0 = false;
//             var _fn0 = _x[0];
//             var _promise0 = _fn0(Accelerate);
//             if (!_promise0 || !_promise0.then)
//                 throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise0 + ')');
//             _promise0.then(() => {
//                 _hasResult0 = true;
//                 _next0();
//             }, _err0 => {
//                 if (_hasResult0)
//                     throw _err0;
//                 else
//                     _error(_err0);
//             });
//             _sync = false;
//         });
//     }
//
//     return func(Accelerate);
// };
// const car = new Car();
// const accelerateHooks = car.hooks.accelerate;
// accelerateHooks.tapPromise('WarningLamp', (Accelerate) => {
//     return new Promise(resolve => {
//         console.log(`Accelerate: ${Accelerate} mph`);
//         resolve();
//     });
// });
// accelerateHooks.tapPromise('NextWarningLamp', (Accelerate) => {
//     return new Promise(resolve => {
//         console.log(`Next Accelerate: ${Accelerate} mph`);
//         resolve(Accelerate);
//     });
// });
// accelerateHooks.promise(140).then((err, result) => {
//     console.log('err:', err, '###', 'result:', result);
// });

// AsyncSeriesBailHook Promise
// Promise 熔断钩子
// this.promise = function lazyCompile(Accelerate) {
//     function func(Accelerate) {
//         // create
//         'use strict';
//         return new Promise((_resolve, _reject) => {
//             var _sync = true;
//
//             function _error(_err) {
//                 if (_sync)
//                     _resolve(Promise.resolve().then(() => {
//                         throw _err;
//                     }));
//                 else
//                     _reject(_err);
//             }
//
//             // header
//             var _context;
//             var _x = this._x;
//
//             callTapsSeries callTap
//             onError、onDone 以及 onResult 的变化
//             function _next0() {
//                 var _hasResult1 = false;
//                 var _fn1 = _x[1];
//                 var _promise1 = _fn1(Accelerate);
//
//                 if (!_promise1 || !_promise1.then)
//                     throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise1 + ')');
//
//                 _promise1.then(_result1 => {
//                     _hasResult1 = true;
//                     if (_result1 !== undefined) {
//                         _resolve(_result1);
//                     } else {
//                         _resolve();
//                     }
//                 }, _err1 => {
//                     if (_hasResult1)
//                         throw _err1;
//                     else
//                         _error(_err1);
//                 });
//             }
//
//             var _hasResult0 = false;
//             var _fn0 = _x[0];
//             var _promise0 = _fn0(Accelerate);
//
//             if (!_promise0 || !_promise0.then)
//                 throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise0 + ')');
//
//             _promise0.then(_result0 => {
//                 _hasResult0 = true;
//                 if (_result0) {
//                     _resolve(_result0);
//                 } else {
//                     _next0();
//                 }
//             }, _err0 => {
//                 if (_hasResult0)
//                     throw _err0;
//                 else
//                     _error(_err0);
//             });
//             _sync = false;
//         })
//     }
//
//     return func(Accelerate);
// }
// const car = new Car();
// const accelerateHooks = car.hooks.accelerate;
// accelerateHooks.tapPromise('WarningLamp', (Accelerate) => {
//     return new Promise(resolve => {
//         console.log(`Accelerate: ${Accelerate} mph`);
//         resolve();
//     });
// });
// accelerateHooks.tapPromise('NextWarningLamp', (Accelerate) => {
//     return new Promise(resolve => {
//         console.log(`Next Accelerate: ${Accelerate} mph`);
//         resolve();
//     });
// });
// accelerateHooks.promise(140).then((result) => {
//     console.log('###', 'result:', result);
// });

// AsyncSeriesWaterfallHook Promise
// this.promise = function lazyCompile(Accelerate) {
//     function func(Accelerate) {
//         // create
//         'use strict';
//         return new Promise((_resolve, _reject) => {
//             var _sync = true;
//
//             function _error(_err) {
//                 if (_sync)
//                     _resolve(Promise.resolve().then(() => {
//                         throw _err
//                     }));
//                 else
//                     _reject(_err);
//             }
//
//             // header
//             var _context;
//             var _x = this._x;
//
//             // callTapsSeries callTap
//             // onError、onDone 以及 onResult 的变化
//             function _next0() {
//                 var _hasResult1 = false;
//                 var _fn1 = _x[1];
//                 var _promise1 = _fn1(Accelerate);
//
//                 if (!_promise1 || !_promise1.then)
//                     throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise1 + ')');
//
//                 _promise1.then(_result1 => {
//                     _hasResult1 = true;
//                     if (_result1 !== undefined) {
//                         Accelerate = _result1;
//                     }
//                     _resolve(Accelerate);
//                 }, _err1 => {
//                     if (_hasResult1)
//                         throw _err1;
//                     else
//                         _error(_err1);
//                 });
//             }
//
//             var _hasResult0 = false;
//             var _fn0 = _x[0];
//             var _promise0 = _fn0(Accelerate);
//             if (!_promise0 || !_promise0)
//                 throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise0 + ')');
//
//             _promise0.then(_result0 => {
//                 _hasResult0 = true;
//                 if (_result0 !== undefined) {
//                     Accelerate = _result0;
//                 }
//                 _next0();
//             }, _err0 => {
//                 if (_hasResult0)
//                     throw _err0;
//                 else
//                     _error(_err0);
//             });
//
//             _sync = false;
//         })
//     }
//
//     return func(Accelerate);
// }
// const car = new Car();
// const accelerateHooks = car.hooks.accelerate;
// accelerateHooks.tapPromise('WarningLamp', (Accelerate) => {
//     return new Promise(resolve => {
//         console.log(`Accelerate: ${Accelerate} mph`);
//         resolve(Accelerate + 220);
//     });
// });
// accelerateHooks.tapPromise('NextWarningLamp', (Accelerate) => {
//     return new Promise(resolve => {
//         console.log(`Next Accelerate: ${Accelerate} mph`);
//         resolve(Accelerate + 400);
//     });
// });
// accelerateHooks.promise(140).then((result) => {
//     console.log('###', 'result:', result);
// });


