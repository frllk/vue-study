/**
 * 对象响应式原理
 * 1. Object.defineProperty()
 */

function defineReactive(obj, key, val) {
  // val可能是对象，需要递归处理
  observe(val)
  Object.defineProperty(obj, key, {
    get() {
      console.log('get', val)
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        observe(newVal)
        val = newVal
        console.log('set', newVal)
      }
    }
  })
}

// 对象响应式处理
function observe(obj) {
  // 判断obj类型必须是对象
  if (typeof obj !== 'object' || obj == null) return
  Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]))
}


function set(obj, key, val) {
  defineReactive(obj, key, val)
}

let obj = {}
// defineReactive(obj, 'foo', 'foo')



obj = { foo: 'foo', bar: 'bar', baz: { a: 1 } }
observe(obj)



// obj.foo
// obj.foo = 'fooooooooooo'
// obj.bar
// obj.baz.a = 10 // set丢失  ===> 递归处理
// obj.baz = { a: 10 }
// obj.baz.a = 100 // 设置拦截不到 ===>  16行  observe(newVal)
// obj.dong = 'dong' // 属性动态添加进来时，没有经过初始化  ===> set一下
set(obj, 'dong', 'dong')
console.log(obj)
obj.dong
