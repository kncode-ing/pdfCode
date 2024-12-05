# 使用vue实现pdf文件预览

## 项目描述

    此项目实现一个 PDF 文件上传功能，并根据上传的 PDF 文件的加密情况，做出相应的权限校验
    和信息展示。应处理两种情况：
    1.未加密文件：展示该文件的页数。
    2.打开权限加密文件：提示用户输入密码，输入正确后展示文件的页数以及该密码。

## 项目技术

__ __vue2、pdfjs、element-ui__

## 使用方法

    在pc端打开网页后，上传pdf文件，并点击上传的文件进行预览

## 项目实现截图

一、

1.选择无需密码的文件后，点击选择的文件

![1.jpg](https://s2.loli.net/2024/12/05/nREw6bQNTf3MkYr.jpg)

2.文件直接展示

![2.jpg](https://s2.loli.net/2024/12/05/8Wn1Vtyv4KXUbP9.jpg)

二、

  1.选择需要密码的文件

![3.jpg](https://s2.loli.net/2024/12/05/mH9gt4Aw1ZNs8LF.jpg)

2.输入对应密码

![6.jpg](https://s2.loli.net/2024/12/05/uJAPZao6Kl7g1d5.jpg)

3.密码输入正确后展示

![5.jpg](https://s2.loli.net/2024/12/05/IMTlwsuSqOgRime.jpg)

4.密码输入不正确则提示用户

![4.jpg](https://s2.loli.net/2024/12/05/XmBY6OPWJbvluhw.jpg)
