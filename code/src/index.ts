const msg = 'typescript'
// const msg = ['typescript'] // 会有错误提示  =>  波浪线

function sayHello(msg: string) {
  return 'hello,' + msg
}

document.body.textContent = sayHello(msg)
