// 1) example 1: 
const target = {};
const handler = {};
const { proxy, revoke } = Proxy.revocable(target, handler);
proxy.foo = 123;
proxy.foo // 123;

revoke();
proxy.foo 
// Uncaught TypeError: Cannot perform 'get' on a proxy that has been revoked

// Proxy.revocable的一个使用场景是，目标对象不允许直接访问，
// 必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。