# whistle.uiauth
通过插件给 Whistle 的所有界面添加账号和密码

# 安装
``` sh
w2 i whistle.uiauth
```

# 使用
安装后需要用户输入账号和密码，默认为：
1. 账号：`test`
2. 密码：`123`

可以通过新建文件 `~/.whistle.uiauth.txt` 修改密码，如在改文件输入：
> `~` 对应 Node 中通过 `os.homedir()` 获取的路径
``` txt
admin:123456
```
将账号和密码分别修改为 `admin`、`123456`

也可以参考该插件的实现，从远程直接获取账号和密码等其它交互方式。
