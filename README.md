
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

1. 学习及工作中常常遇到浏览器里面打开的tab页过多，窗口也多，总感觉或确定之前打开过某个tab页，但是不知道它在哪里了，于是有时不得不重新开一个tab页，“雪球越滚越大”。本插件提供关键词查找功能，点击结果即可跳转到相应tab页；
2. 你还记得窗口中上一个聚焦的tab页是什么吗？本插件提供tab回退与前进功能，帮助大家在浏览器中来回穿梭，速度起飞；

3. 解放鼠标！（够熟练就行了！）

## Getting Plug-in

1. [谷歌应用商店](https://chrome.google.com/webstore/detail/where-is-my-tab/abccjdbmfpgocjjmebdjogoophngecfe?hl=zh-CN&authuser=0)添加即可（添加后记得固定下，方便点击）；

<img src="https://z3.ax1x.com/2021/05/17/g2mGP1.jpg" alt="g2mGP1.jpg" />

2. [Release](https://github.com/LEODPEN/Where-is-my-tab/releases/tag/V1.5)中最新包下载并解压后，添加到本地Chrome，其他操作相同；

<img src="https://z3.ax1x.com/2021/05/17/g2mY26.jpg" alt="g2mY26.jpg" height = "110" width = "100%"/>

3. Edge商店搜索同名插件（阉割版，因为其`manifest_version`只支持到2 ~~懒，不想兼容~~）；

## Features

+ 分窗口tab名展示与关键词查找；

+ 根据搜索结果跳转对应tab页；

+ 分窗口tab页回退(20次左右)；

+ 分窗口tab页前进(20次左右)；

## Usage

+ 搜索与跳转
    + 搜索
        1. 可选择点击浏览器右上角插件图标，按照关键词搜索tab页；
        2. 可选择键盘操作(`Command+Shift+7`)，打开扩展工具(tab键可键入，回车可直接搜索，上下键可选中)；
        3. ~~可选择键盘操作(`Command+Shift+0`)，新开tab页操作【在1.6版本不再自动启用，请于快捷键自己设置】;~~
    + 跳转
        1. 点击对应搜索结果，即可跳转到已打开、需去往的tab页;
        2. 默认选中第一个搜索结果，直接回车可去往;
        3. 上下方向键选择要去往项，回车可去往;

> 注意：不同窗口下搜索与跳转只会在当前窗口进行；

+ 回退

    + 使用`Command+Shift+9`以回退tab页;
    + 使用`Command+Shift+0`以前进tab页;
    + 再配合上Chrome的`Command+数字`以及`Command+Option+左右方向键`，相信每个人都能在tab页中**穿梭自如**，基本摆脱鼠标的桎梏！

> 注意：一个窗口只支持20次左右的当前记录，更多时会丢弃更早时候的记录；此外，为了不增加tab页，回退或前进时遇到已关闭tab页将会跳过。

## Others

+ Windows下将(Command键替换为Ctrl即可)；

+ 可以在"管理扩展程序 -> 键盘快捷键中"自定义你的快捷键;

+ **不涉及任何隐私收集**，无外部依赖，离线可用；

+ 前端菜鸟，代码垃圾请轻喷，此处强烈感谢[@TimGin117](https://github.com/TimGin117)对代码中各种前端问题的解答与帮助！

+ 如果觉得有用希望能star一下or应用商店打个分（本人是深度用户hh）；

+ 有任何bug或者优化请提PR或Issue(bug)；
