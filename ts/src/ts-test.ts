/**
 * 类型注解和编译时类型检查
 */

/**
 * ************************类型基础*********************
 */
// 类型注解
let var1: string;

var1 = '开课吧'
// var1 = 1 // no ok

// 类型推断
let var2 = true
// var2 = 1 // no ok

// 常见类型：string,boolean,number,undefined,null

// 类型数组
let arr: string[]
arr = ['tom', 'jerry']

// 任意类型 any
let varAny: any
varAny = 'tom'
varAny = 1

let arrAny: any[] // 不推荐使用
arrAny = [1, true, 'tom']

// 函数中的类型约束
function greet (person: string): string {
  return 'hello,' + person
}
const res = greet('tom')

// console.log(var1, var2, arr, varAny, arrAny, res)

function varn (): void { }
// varn()
/**
 * **************************类型别名***************************
 */
type FooBar = {
  foo: string
  bar: number
}

let objType: FooBar
objType = {
  foo: 'foooo',
  bar: 1
}
// console.log(objType)

// 接口 ===> 类型别名与接口的区别
interface Barfoo {
  foo: string
  bar: string
}

/**
 * **************************联合类型***************************
 */
let union: string | number | boolean
union = 1
union = 'str'
union = true

/**
 * **************************交叉类型***************************
 */
type First = { first: number }
type Second = { second: number }
type FirstAndSecond = First & Second
let msg: FirstAndSecond = {
  first: 1,
  second: 2
}
/**
 * **************************函数***************************
 */
// 必填参数：形参一旦声明必须传递
// 可选参数：加？  表明参数是可选的(可选参数或者默认值要放在必填参数的后面)
function greeting (person: string, age?: number): string {
  return 'hello, ' + person
}
greeting('tom')

// 函数重载：以函数参数数量或者类型，或者返回值的类型区分多个同名函数
// 先声明，在实现
// 重载一
function watch (cb1: () => void): void // watch 接收一个回调函数，回调函数没有参数，也没有返回值；watch没有返回值
// 重载二
function watch (cb1: () => void, cb2: (v1: any, v2: any) => void): void

// 实现
function watch (cb1: () => void, cb2?: (v1: any, v2: any) => void) {
  if (cb2) {
    console.log('执行重载2');
  } else {
    console.log('执行重载1');
  }
}
// watch(() => { })
