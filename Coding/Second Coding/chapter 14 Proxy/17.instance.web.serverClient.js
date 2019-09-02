// Proxy 对象可以拦截目标对象的任意属性，这使得它很合适用来写 Web 服务的客户端。
const {url} = require('./constants');
const service = createWebService(url);
const axios = require('axios');
service.user().then(json => {
  const user = JSON.parse(json);
  console.log(user);
})

function createWebService (baseUrl) {
  return new Proxy({}, {
    get (target, prop, receiver) {
      return () => httpGet(baseUrl + '/' + prop);
    }
  })
}

async function httpGet (url) {
  let {data} = await axios.get(url);
  return data;
}
