# 使用cloudflare pages发布新界面
## 前期准备
首先我们访问[官网](https://pages.cloudflare.com/)，注册自己的账号或者登陆已有的账号（GitHub账号也可以登录，推荐使用github账号）。

其次你得拥有自己的域名，自己的域名可以去阿里云等地方购买。

## 创建一个pages页面
去到我们的build/Workers & pages,点击右上角的Creat application。这时候注意不要点上面的各种配置，看到下面有一行【looking to deploy pages？ Get started】选择这个。

然后选择【import an existing Git repository】，之后配置Select repository 选择自己想要发布的仓库（建议选择fork本仓库）。在Set up builds and deployments部分，记得选择 Framework preset 为Astro，分支为main，名字随意。

然后等待cloudflaere.com进行配置，完成后点击【Continue to project】

## 配置custom domains
此时会进入你的pages管理页面，点击Custom domains --> Set up a custom domain，输入已经购买的域名后点击Continue，然后点击Bengin DNS transfer。

进入一个新页面后 直接在Enter an existing domain 输入自己的域名，之后选择Continue

下一个页面直接选择Free就可以了，或者根据自己的需求选择plan

此时新界面内，点击Add record。第一个填写类似于（这里以我自己的doubleducklab部署为例子）：
```
Type: CNAME
Name: @
Target: doubleducklab.pages.dev   
Proxy status: Proxied (橙色云)
TTL: Auto
```
第二个add record填写：
```
Type: CNAME
Name: www
Target: doubleducklab.pages.dev
Proxy status: Proxied
TTL: Auto
```
完成之后点击Continue to activation，之后划到下面，选择【I updated my nameservesrs】

## 配置DNS（以阿里云为例）
打开阿里云的域名管理，找到DNS服务器，选择修改DNS，这里我要修改为
```
alexandra.ns.cloudflare.com
cesar.ns.cloudflare.com
```
后续回到 cloudflare pages 页面，点击【Check nameservers now】，会出现【Cloudflare is now checking the nameservers for doubleducklab.com. Please wait a few hours for an update.】稍等一段时间即可（一般几分钟）

## 再次配置custom domain
一样的再次去输入doubleducklab.com（这里的例子），然后continue。这时候就会有activate domain，正常是有两个DNS record的（上面步骤新增的）。选择【active domain】即可，稍等他initializing就可以了。

后面看到active就是成功了！！！你的官网已经发布了 ！！！