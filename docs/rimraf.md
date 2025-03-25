---
home: true
heroText: rimraf 提效
tagline: rimraf 提效
date: 2023-06-05
# sidebar: 'auto'
subSidebar: false
categories:
 - nodejs
tags:
 - tool
author: zjk537
---

# rimraf 删除 node_modules
每次只能删一个……
安装：npm i -g rimraf
使用：rimraf node_modules
实际上，你也可以用它删除其他文件夹，他的底层是基于 fs 模块递归删除的。

使用 rimraf 递归删除删除.git 文件夹
我有 20 个项目，每个项目都有 git 仓库，但是我的电脑要重装系统了，旧的公钥密钥也不想迁移，所以旧仓库没用了，删了吧，一个个删？no。

```js

var fs = require("fs"); 
var base = "./"; 
var list = fs.readdirSync(base); 
var remove = require("rimraf"); 
function recursion(list, base) { 
  for (var i = 0; i < list.length; i++) { 
    if (fs.statSync(base + list[i]).isDirectory()) { 
      // 如果文件夹名字是node_moduels 则删除 
      var name = list[i]; 
      if (name === ".git") { 
        remove(base + name, (err) => { 
          console.log(err); 
        }); 
      } else { 
        var path = base + name + "/"; 
        recursion(fs.readdirSync(path), path); 
      } 
    } 
  } 
}
recursion(list, base);

```