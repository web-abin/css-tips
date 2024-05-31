# md 文档

```
<div id="content"></div>

<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

<script>
  var filename = window.location.pathname.split("/").pop().replace(".html", "")
  fetch(`./docs/${filename}.md`)
    .then(response => response.text())
    .then(text => {
      var html = marked.parse(text);
      document.getElementById('content').innerHTML = html;
    });
</script>
```

# 创建新页面

```
node create.mjs

```

# 部署

```

./deploy.sh ""

```
