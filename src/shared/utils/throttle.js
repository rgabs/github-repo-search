const throttle = function (fnTothrottle, interval = 500) {
  let timer, pendingArgs = [], shouldCancelPromise = false;
  const absorbPromise = () => {shouldCancelPromise = false };
  
  function throttledFunction(...args) {
    pendingArgs.push(args);
    return new Promise((resolve, reject) => {
      const onSuccess = (res) => shouldCancelPromise ? absorbPromise(res) : resolve(res)
      if (!timer) {
        timer = setTimeout(() => {
          timer = clearTimeout(timer);
          shouldCancelPromise = false
          fnTothrottle(pendingArgs[pendingArgs.length - 1]).then(onSuccess).catch(reject);
          pendingArgs = [];
        }, interval);
      }
      else resolve({});
    })
  }
  throttledFunction.cancel = () => shouldCancelPromise = true;
  return throttledFunction;
}

export default throttle;