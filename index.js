//实现图灵完备语言BF
function js2BF (code, input, stream = false) {
  const memory = new Uint8Array(10000) // bf使用的内存空间大小
  let ptr = 0 // 内存指针
  let inputPtr = 0 // 输入指针
  let output = [] // 输出

  const stack = [] // 栈，'[' , ']' 匹配

  for (let i = 0; i < code.length; i++) {
    const char = code[i]
    switch (char) {
      case '>':
        ptr++
        break
      case '<':
        ptr--
        break
      case '+':
        memory[ptr]++
        break
      case '-':
        memory[ptr]--
        break
      case '.':
        output.push(memory[ptr]) // += String.fromCharCode(memory[ptr]) 压入数组为了可以输出观察内存模式
        stream && process.stdout.write(String.fromCharCode(memory[ptr])) // 要兼容网页输出,改这里
        break
      case ',':
        if (inputPtr < input.length) {
          memory[ptr] = input.charCodeAt(inputPtr)
          inputPtr++
        } else {
          memory[ptr] = 0
        }
        break
      case '[':
        if (memory[ptr] === 0) {
          let count = 1
          while (count > 0) {
            i++
            if (code[i] === '[') count++
            else if (code[i] === ']') count--
          }
        } else {
          stack.push(i)
        }
        break
      case ']':
        if (memory[ptr] !== 0) {
          i = stack[stack.length - 1]
        } else {
          stack.pop()
        }
        break
      default:
        break
    }
  }

  return {
    output: output.map(x => String.fromCharCode(x)).join(''),
    ptr,
    memory
  }
}
module.exports = js2BF
