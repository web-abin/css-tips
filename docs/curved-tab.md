
# 实现弧形tab
## 副标题

使用现代 CSS 创建那些著名的带有内曲线的圆形标签。

无额外元素 & 无伪元素
不到 10 个 CSS 声明即可获得三种变体
一个变量来控制曲率
适用于渐变着色
仅限 CSS 的带内曲线的圆形标签

.rounded-tab {
  --r: .8em; /* control the curvature */
  
  border: solid #0000;
  border-width: 0 var(--r);
  border-radius: calc(2*var(--r)) calc(2*var(--r)) 0 0/var(--r);
  mask: 
    radial-gradient(var(--r) at var(--r) 0,#0000 98%,#000 101%)
      calc(-1*var(--r)) 100%/100% var(--r) repeat-x,
    conic-gradient(#000 0 0) padding-box;
}
.rounded-tab.left {
  border-left-width: 0;
  border-top-left-radius: var(--r);
}
.rounded-tab.right {
  border-right-width: 0;
  border-top-right-radius: var(--r);
}
