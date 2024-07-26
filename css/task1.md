Определить приоритет стилей

```html
<div class="parent">
  <div id="myId" class="class1 class2”></div>
</div>
```

```css
div.class1 {
}

.class1.class2 {
}

#myId {
}

.parent div {
}

.parent .class1 {
}
```
