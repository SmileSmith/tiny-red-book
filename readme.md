# 小红书数据抓取

## 整体思路

1. 先抓取homeFeed的100条Feed作为基础数据

2. 再抓取feed详情中的html，从html解析出topicId

3. 再抓取Topic详情，抓取topic页html中的关联Topic，接口中的topic名称，点赞数、访问数等

4. 循环2~3步骤

## 基于 superagent 和 Puppeteer

因为小红书详情页面的数据存在多重防爬机制，因此先简单用 puppeteer 模拟页面请求抓取，获取_at参数

## 快速开始

1.根目录执行

```javascript
npm install
```

2.打开mogodb服务，并新建./config/db.js，参考如下：

```javascript
module.exports = {
  user: 'tinyredbook', // mogodb用户名
  pwd: 'xxxxxx', // mogodb密码
  host: '127.0.0.1', // mogodb host地址，端口默认27017
};
```

3.根目录执行

```javascript
node index.js
```


## 小红书App SIGN 算法 Python 版本（备份，或许会用到）

```python
#coding:utf-8
import hashlib


def md5hex(word):
    if isinstance(word, unicode):
        word = word.encode("utf-8")
    elif not isinstance(word, str):
        word = str(word)
    m = hashlib.md5()
    m.update(word)
    return m.hexdigest()


#参数名
paramas_name=[
    'android_id',
    'channel',
    'deviceId',
    'device_fingerprint',
    'imei',
    'lang',
    'password',
    'phone',
    'platform',
    'sid',
    'start',
    't',
    'type',
    'versionName',
    'zone'
    ]


#按参数名顺序传入参数值列表，无参数名留空值
def get_sign(paramas_value):
    key=''
    for index,item in enumerate(paramas_value):
        if item!='':
            key=key+paramas_name[index]+'%3D'+item
    deviceId=paramas_value[2]
    v1_2 = bytearray(key, 'utf-8')
    v5_1 = ''
    v3_2 = 0
    v2 = 0
    v4_1=bytearray(deviceId, 'utf-8')

    while v2<len(v1_2):
        v5_1 = v5_1 + str(v1_2[v2] ^ v4_1[v3_2 ])
        v3_2 = (v3_2 + 1) % len(v4_1)
        v2 = v2 + 1

    sign=md5hex(md5hex(v5_1)+deviceId)
    return sign

```
