# 思路
- 完成基本界面
- 通过查询基本界面完成逻辑代码

# bug
> 无法获取本地文件的问题
```
通过fetch获取本地文件，一直获取不到数据，更换XMLHttpRequest后也无法成功，但是将函数放到onload事件之后执行成功。
```
> 无法解析promise对象问题
```
无法将promise的[[PromiseResult]]转化为普通json对象，.then 或者async,await方式得到的也是promise对象。
```
> setTimeout 包含参数导致栈溢出[链接](https://segmentfault.com/a/1190000016615948)
```
1. 通过采用匿名函数包裹
2. 用引号包裹需要调用的函数
```