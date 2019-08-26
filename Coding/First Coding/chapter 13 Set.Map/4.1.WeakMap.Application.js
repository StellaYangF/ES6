// WeakMap 的用途
// 1: 前文说过，WeakMap 应用的典型场合就是 DOM 节点作为键名。下面是一个例子。

elem = document.getElementById("WeakMap-的用途");
wm = new WeakMap();
wm.set(elem, { timesClicked: 0 });
elem.addEventListener('click', function(){
  let clickData = wm.get(elem);
  console.log(clickData.timesClicked++)
}, false);

// 上面代码中，myElement是一个 DOM 节点，每当发生click事件，就更新一下状态。
// 我们将这个状态作为键值放在 WeakMap 里，对应的键名就是myElement。
// 一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险。


elem = null;
wm.get(elem);   // undefined

// 2: WeakMap 的另一个用处是部署私有属性。
_counter = new WeakMap();
_action = new WeakMap();

class Countdown {
  constructor(counter, action){
    _counter.set(this, counter);
    _action.set(this,action);
  }
  dec(){
    let counter = _counter.get(this);
    if(counter < 1) return;
    counter --;
    _counter.set(this,counter);
    if(counter === 0){
      _action.get(this)();
    }
  }
}

c = new Countdown(2, ()=>console.log("DONE"));
// 上面代码中，Countdown类的两个内部属性_counter和_action，是实例的弱引用，
// 所以如果删除实例，它们也就随之消失，不会造成内存泄漏。



