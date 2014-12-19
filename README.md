# Simple ScrollLoad

一个简单的ScrollLoad组件。

依赖项：

- JQuery 2.0+
- [Simple Module](https://github.com/mycolorway/simple-module)

### 使用方法
首先，需要在页面里引用相关脚本以及css

```html
<link media="all" rel="stylesheet" type="text/css" href="path/to/scroll-load.css" />
<script type="text/javascript" src="path/to/jquery.min.js"></script>
<script type="text/javascript" src="path/to/module.js"></script>
<script type="text/javascript" src="path/to/scroll-load.js"></script>

```

通过scrollLoad方法，实例化ScrollLoad对象

```
<section id="content">
  <li><p>This is a paragraph</p></li>
  <li><p>This is a paragraph</p></li>
  <li><p>This is a paragraph</p></li>
  ......
</section>
<div id="scroll-load"></div>


simple.scrollLoad({
    el: '#scroll-load',
    url: 'democontent.html',
    method: 'GET',
    container: '#content',
    heightOffset: 10
})

```

### API 文档

####初始化选项

__el__

scrollLoad的选择器，必选

__url__

ajax请求所需url，默认为空，若留空则指当前页面

__method__

ajax请求方式，默认为GET方式

__container__

ajax获取完数据后要添加到的容器，默认添加到body中

__heightOffset__

触发滚动加载时距离页面底部的高度，默认为10px
