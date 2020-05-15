const {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
  AsyncParallelHook,
  AsyncParallelBailHook,
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook
} = require("tapable");

class Car {
  constructor () {
    this.hooks = {
      accelerate: new SyncHook(["newSpeed"]),
      brake: new SyncHook(),
      calculateRoutes: new AsyncParallelHook(["source", "target", "routesList"])
    };
  }
}

const myCar = new Car();

// 绑定同步钩子
myCar.hooks.brake.tap("WarningLampPlugin", () => console.log('warningLamp.on1'));
myCar.hooks.brake.tap("WarningLampPlugin", () => console.log('warningLamp.on2'));

myCar.hooks.calculateRoutes.tapPromise("tapAsync", () => console.log('Async1'));


console.log(myCar.hooks.calculateRoutes);





