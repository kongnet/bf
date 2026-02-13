// 实现图灵完备语言BF
// 浏览器兼容版本
(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    root.js2BF = factory()
  }
}(typeof self !== 'undefined' ? self : this, function() {
  function js2BF (code, input, stream = false) {
    const memory = new Uint8Array(10000)
    let ptr = 0
    let inputPtr = 0
    let output = []

    const stack = []

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
          output.push(String.fromCharCode(memory[ptr]))
          stream && process.stdout.write(String.fromCharCode(memory[ptr]))
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
      }
    }

    return {
      output: output.map(x => String.fromCharCode(x)).join(''),
      ptr,
      memory
    }
  }
  return js2BF
}))
