// Promise.race方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

const p = Promise.race([
  fetch(
    "https://www.baidu.com/home/msg/data/personalcontent?" +
      "callback=jQuery110205049949085661523_1562652906598&num=8" +
      "&_req_seqid=c75a82ae0008ffaf&sid=1435_21108_20697_29238_28518_29099_28839_29221" +
      "&_=1562652906599"
  ),
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("request timeout")), 5000);
  })
]);

p.then(console.log).catch(console.error);
