(function () {
  var styleContent = document.getElementsByTagName('style')[0].innerHTML;
  const code = document.querySelector('code')

  document.querySelector('main').insertAdjacentHTML('beforeend', `<pre style="margin: 40px 0"><code>${styleContent}</code></pre>`)
})()