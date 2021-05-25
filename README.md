
<p align = "center">

<img src="https://z3.ax1x.com/2021/05/17/g2EMt0.png" width="256" />

</p>

<h1 align="center">Where is my tab ?</h1>

<div align = "center">

Search for tabs in the opened window, can also increase your speed of switching tabs.

<a href = "https://github.com/LEODPEN/Where-is-my-tab/"> <img src="https://img.shields.io/badge/version-1.6-orange"> </a>
<a href = "https://chrome.google.com/webstore/detail/where-is-my-tab/abccjdbmfpgocjjmebdjogoophngecfe?hl=zh-CN&authuser=0" > <img src="https://img.shields.io/badge/platform-chrome-red"> </a>
<a href = "https://github.com/LEODPEN/Where-is-my-tab/blob/main/LICENSE"> <img src="https://img.shields.io/github/license/LEODPEN/Where-is-my-tab"> </a>
</div>

## About

学习及工作中常常遇到浏览器里面打开的tab页过多，窗口也多，总感觉或确定之前打开过某个tab页，但是不知道它在哪里了，于是有时不得不重新开一个tab页，“雪球越滚越大”。

本插件提供关键词查找功能，点击结果即可跳转到相应tab页；此外，还提供tab回退，助力大家使用浏览器的速度起飞；（当前已支持完全脱离鼠标使用本插件！）

目标是解放鼠标！

## Getting Plug-in

1. [谷歌应用商店](https://chrome.google.com/webstore/detail/where-is-my-tab/abccjdbmfpgocjjmebdjogoophngecfe?hl=zh-CN&authuser=0)添加即可（添加后记得固定下，方便点击）；

<img src="https://z3.ax1x.com/2021/05/17/g2mGP1.jpg" alt="g2mGP1.jpg" />

2. [Release](https://github.com/LEODPEN/Where-is-my-tab/releases/tag/V1.5)中最新包下载并解压后，添加到本地Chrome，其他操作相同；

<img src="https://z3.ax1x.com/2021/05/17/g2mY26.jpg" alt="g2mY26.jpg" height = "110" width = "100%"/>

3. Edge商店搜索同名插件（阉割版，因为其`manifest_version`只支持到2 ~~懒，不想兼容~~）；

## Features

+ 分窗口tab名展示与关键词查找；

+ 根据搜索结果跳转对应tab页；

+ 分窗口tab页回退（一个窗口最多支持10次回退）；

## Usage

+ 搜索与跳转
    + 搜索
        1. 可选择点击浏览器右上角插件图标，按照关键词搜索tab页；
        2. 可选择键盘操作(`Command+Shift+9`)，打开扩展工具(tab键可键入，回车可直接搜索，上下键可选中)；
        3. 可选择键盘操作(`Command+Shift+0`)，新开tab页操作;
    + 跳转
        点击对应标题文字，即可跳转到已打开、需去往的tab页（如果采取3方式搜索，你可以选择`Command+9`来到新建搜索页，然后`Command+W`来关闭，毕竟目的是搜索不是开更多tab页，**强烈建议使用2操作**）

> 注意：不同窗口下搜索与跳转只会在当前窗口进行；

+ 回退

    每一个窗口都会维护固定大小的回退栈，使用`Command+Shift+7`以回退tab页。再配合上Chrome的`Command+数字`以及`Command+Option+左右方向键`，相信每个人都能在tab页中**穿梭自如**，基本摆脱鼠标的桎梏！

> 注意：一个窗口只支持10个回退，多于10次则会丢弃更早的记录；

## Others

+ Windows下将(Command键替换为Ctrl即可)；

+ **不涉及任何隐私收集**，无外部依赖，离线可用；

+ 前端菜鸟，代码垃圾请轻喷，此处强烈感谢[@TimGin117](https://github.com/TimGin117)对代码中各种前端问题的解答与帮助！

+ 如果觉得有用希望能star一下or应用商店打个分（本人是深度用户hh）；

+ 有任何bug或者优化请提PR或Issue(bug)；
