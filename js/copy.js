(function () {
  const copyToast = document.createElement('div')
  copyToast.className = 'copy-code-toast'
  copyToast.textContent = '复制成功'
  document.body.appendChild(copyToast)
  const codeArr = document.querySelectorAll('pre')
  function getCode(nodes) {
    let code = ''
    for (const node of nodes) {
      if (node.nodeName === 'CODE') {
        code += node.textContent
      }
    }
    return code
  }
  for (let i = 0; i < codeArr.length; i++) {
    const pre = codeArr[i];
    const code = getCode(pre.childNodes)
    const copyBtn = document.createElement('button')
    copyBtn.className = 'copy-code'
    copyBtn.textContent = '复制代码'
    copyBtn.onclick = function () {
      console.log(pre.childNodes);
      navigator.clipboard.writeText(code)
        .then(() => {
          copyToast.animate([{
            opacity: 0,
            offset: 0
          }, {
            opacity: 1,
            offset: 0.04
          }, {
            opacity: 1,
            offset: 1
          }], {
            duration: 3000,
            iterations: 1
          })
        })
        .catch(err => {
          console.error('无法复制文本: ', err);
        });
    }
    pre.appendChild(copyBtn)
  }
})()