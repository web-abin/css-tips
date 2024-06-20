function loadScript(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {  //IE
    script.onreadystatechange = function () {
      if (script.readyState == "loaded" || script.readyState == "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  //其他浏览器
    script.onload = function () {
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

// 使用方法
loadScript("https://cdn.jsdelivr.net/npm/marked/marked.min.js", function () {
  var filename = window.location.pathname.split("/").pop().replace(".html", "")
  fetch(`./docs/${filename}.md`)
    .then(response => response.text())
    .then(text => {
      var html = marked.parse(text);
      document.getElementById('content').innerHTML = html;
    });
});
