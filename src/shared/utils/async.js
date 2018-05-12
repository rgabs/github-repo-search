function defer() {
  const deferred = {}
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve
    deferred.reject = reject
  })
  return deferred
}

export const debounce = (fn, currentWait = 0, options = {}) => {
  let deferred
  let timer
  let pendingArgs = []
  return function debounced(...args) {

    if (deferred) {
      clearTimeout(timer);
    } else {
      deferred = defer()
    }

    pendingArgs.push(args)
    timer = setTimeout(() => {
      const oldResolve = deferred.resolve;
      clearTimeout(timer)
      Promise.resolve(fn.apply(this, pendingArgs[pendingArgs.length - 1]))
        .then((res) => oldResolve({ ...res, searchQuery: args[0]}), deferred.reject)

      pendingArgs = []
      deferred = null
    }, currentWait);

    return deferred.promise
  }
}


export default debounce;


export const throttle = function (fnTothrottle, interval = 500) {
  let timer, pendingArgs = [], shouldCancelPromise = false;
  const absorbPromise = () => { shouldCancelPromise = false };

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