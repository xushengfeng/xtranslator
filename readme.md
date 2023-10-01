# xTranslator

## 简介（introduction）

聚合翻译api

## 安装（installation）

```bash
npm i xtranslator
```

```js
import * as xtranslator from xtranslator
console.log(xtranslator.toMMLHTML("e^(i pi)=-1"))
```

```html
<script src="./dist/xtranslator.umd.js"></script>
<script>
    let div = document.createElement("div");
    div.innerHTML = xtranslator.toMMLHTML("e^(i pi)=-1");
    document.body.append(div);
</script>
```
