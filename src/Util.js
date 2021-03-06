// Helper method: find a group in an array
export function findGroup (name, groupArray) {
  for (let index = 0; index < groupArray.length; index++) {
    if (groupArray[index].name === name) {
      return groupArray[index]
    }
  }
  return null
}

// Helper method: add a new group to an array of groups
export function addGroup (groupName, groupArray) {
  let group = { name: groupName, items: [], paletteItems: [], groups: [], visible: true }
  groupArray.push(group)
  return group
}

export function getAdditionalIEZoom () {
  let additionalIEZoom = 1
  if (!isNaN(screen.logicalXDPI) && !isNaN(screen.systemXDPI)) {
    let ua = navigator.userAgent
    if (ua.indexOf('MSIE') >= 0) {
      // IE 10 and below
      let zoom = Math.round((screen.deviceXDPI / screen.logicalXDPI) * 100)
      if (zoom !== 100) {
        additionalIEZoom = zoom / 100
      }
    }
  }
  return additionalIEZoom
}

/**
 * This creates a modal window that auto closes on route change.
 * By default, this is NOT the case, and leads to some funny behaviour.
 *
 * Use this method vs the default $modal({myJson}) approach
 */
export function _internalCreateModal (modalConfig, $modal, $scope) {
  if ($scope !== null && $scope !== undefined) {
    $scope.modal = $modal(modalConfig)

    $scope.$on('$routeChangeStart', function () {
      if ($scope.modal) {
        $scope.modal.hide()
      }
    })

    return $scope.modal
  } else {
    return $modal(modalConfig)
  }
}

export function extendDeep (parent, child) {
  let proxy = JSON.stringify(parent) // 把parent对象转换成字符串
  proxy = JSON.parse(proxy) // 把字符串转换成对象，这是parent的一个副本

  child = child || {}

  for (let i in proxy) {
    // 判断对象是否包含特定的自身（非继承）属性
    if (proxy.hasOwnProperty(i)) {
      child[i] = proxy[i]
    }
  }

  proxy = null // 因为proxy是中间对象，可以将它回收掉

  return child
}

/**
 * @description [throttle 节流函数]
 * @author shanshuizinong
 * @param {Function} fn 延时调用函数
 * @param {Number} delay 延迟多长时间
 * @param {Number} atleast 至少多长时间触发一次
 * @return {Function} 延迟执行的方法
 */
export function throttle (fn, delay, atleast) {
  let timer = null
  let previous = null
  return function () {
    let now = +new Date()
    if (!previous) previous = now
    if (atleast && now - previous > atleast) {
      fn()
      previous = now
      clearTimeout(timer)
    } else {
      clearTimeout(timer)
      timer = setTimeout(function () {
        fn()
        previous = null
      }, delay)
    }
  }
}

// 防抖
export function _debounce (fn, delay = 200) {
  let timer
  return function () {
    const th = this
    const args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      timer = null
      fn.apply(th, args)
    }, delay)
  }
}

// 节流
export function _throttle (fn, interval = 200) {
  let last
  let timer
  return function () {
    const th = this
    const args = arguments
    let now = +new Date()
    if (last && now - last < interval) {
      clearTimeout(timer)
      timer = setTimeout(function () {
        last = now
        fn.apply(th, args)
      }, interval)
    } else {
      last = now
      fn.apply(th, args)
    }
  }
}

// 深度合并对象
// export function deepObjectMerge (FirstOBJ, SecondOBJ) {
//   for (let key in SecondOBJ) {
//     FirstOBJ[key] = FirstOBJ[key] && FirstOBJ[key].toString() === "[object Object]" ?
//       deepObjectMerge(FirstOBJ[key], SecondOBJ[key]) : FirstOBJ[key] = SecondOBJ[key];
//   }
//   return FirstOBJ;
// }

// 返回数组中每个对象的某个属性集合（数组）
export function pluck (arry, property) {
  let results = []
  arry.each(function (value) {
    results.push(value[property])
  })
  return results
}
// function pluck(property) {
//   var results = [];
//   this.each(function(value) {
//     results.push(value[property]);
//   });
//   return results;
// }

// this.dockers.invoke('update')
// function invoke(method) {
//   var args = $A(arguments).slice(1);
//   return this.map(function(value) {
//     return value[method].apply(value, args);
//   });
// }
