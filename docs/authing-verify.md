# Authing 配置验证教程

本文档详细说明如何验证 Authing 微信登录配置是否成功生效。

---

## 🧪 完整验证步骤

### 第一步：启动项目，检查启动日志
1. 执行启动命令：
```bash
pnpm dev
```
2. 查看控制台输出，确认没有报错：
   - ✅ 正常应该输出：`ready started server on 0.0.0.0:3000, url: http://localhost:3000`
   - ❌ 如果有报错，检查 `.env` 文件中的 Authing 配置是否正确填写，参数是否完整

### 第二步：访问登录页，检查二维码是否正常显示
1. 打开浏览器访问：`http://localhost:3000/login`
2. 页面正常加载的标志：
   - ✅ 页面显示 "欢迎登录" 标题
   - ✅ 中间区域显示微信扫码二维码（注意不是占位图，是真实的二维码）
   - ✅ 控制台没有跨域错误、404错误、500错误
3. 常见失败情况：
   - ❌ 二维码区域空白：检查 Authing 应用ID、域名是否填写正确
   - ❌ 提示"应用不存在"：`AUTHING_APP_ID` 填写错误
   - ❌ 跨域错误：Authing 后台 CORS 配置没有添加 `http://localhost:3000`

### 第三步：扫码测试微信授权
1. 使用微信扫码页面上的二维码
2. 微信端正常情况：
   - ✅ 微信弹出授权页面，显示你的应用名称
   - ✅ 点击"允许"后，微信提示"授权成功"
3. 常见失败情况：
   - ❌ 扫码提示"该链接无法访问"：Authing 应用域名配置错误
   - ❌ 提示"应用未授权使用微信登录"：Authing 后台没有开启微信身份源
   - ❌ 提示"scope 参数错误"：微信身份源配置的权限范围不正确

### 第四步：检查回调跳转是否正常
1. 微信端点击"允许"授权后，浏览器会自动跳转到回调地址
2. 正常流程：
   - ✅ 浏览器先跳转到 `http://localhost:3000/auth/callback?code=xxx`
   - ✅ 页面显示"正在处理登录..."加载动画
   - ✅ 处理完成后自动跳转到 dashboard 页面（默认跳转到 `/dashboard/free`）
3. 常见失败情况：
   - ❌ 回调页面提示"404 Not Found"：检查回调路径是否正确，`/auth/callback` 页面是否存在
   - ❌ 提示"回调地址不匹配"：Authing 后台配置的回调地址和实际地址不一致
   - ❌ 页面长时间加载没有反应：检查后端接口 `/api/auth/login` 是否正常工作

### 第五步：验证用户数据是否正确入库
1. 登录成功后，打开 Prisma Studio 查看数据库：
```bash
pnpm prisma studio
```
2. 查看 `User` 表：
   - ✅ 表中有新的用户记录，`authingId` 字段有值
   - ✅ `nickname`、`avatar` 字段和你的微信昵称头像一致
   - ✅ `tier` 字段默认为 `FREE`（新用户默认是免费版）
   - ✅ `Subscription` 表中有对应的订阅记录
3. 常见失败情况：
   - ❌ 用户表没有新记录：检查 `/api/auth/login` 接口是否正常，数据库连接是否正确
   - ❌ 昵称头像为空：检查 Authing 应用是否有获取用户信息的权限

### 第六步：验证权限控制是否生效
1. 登录后，尝试访问不同等级的页面：
   - ✅ 免费用户可以访问 `/dashboard/free`，访问 `/dashboard/standard` 或 `/premium` 会跳转到定价页
   - ✅ （测试高等级用户可以手动修改数据库中的 `tier` 字段为 `STANDARD` 或 `PREMIUM`）
   - ✅ 未登录用户访问 `/dashboard` 下的任何页面都会自动跳转到登录页

---

## ✅ 验证成功的完整标志
1. 登录页二维码正常显示
2. 微信扫码授权成功
3. 回调后正常跳转到后台
4. 数据库有用户记录
5. 权限控制正常工作

---

## 🔍 快速排查命令
如果你不确定哪里有问题，可以按顺序执行以下检查：

### 1. 检查环境变量是否正确加载
在 `app/api/auth/login/route.ts` 中临时添加日志：
```typescript
console.log('AUTHING_APP_ID:', process.env.AUTHING_APP_ID)
console.log('AUTHING_DOMAIN:', process.env.AUTHING_DOMAIN)
```
重启项目，访问登录接口，看控制台输出的参数是否和你配置的一致。

### 2. 测试 Authing API 是否可用
使用 curl 测试 Authing 接口：
```bash
curl https://你的应用域名.authing.cn/api/v3/users/me \
  -H "Authorization: Bearer 你的AccessToken"
```
看是否能正常返回用户信息。

### 3. 检查数据库连接
执行：
```bash
pnpm prisma db push
```
看是否能正常连接数据库，没有报错。

---

## 🎉 配置成功后
恭喜你，Authing 微信扫码登录已经可以正常使用了！接下来可以：
1. 配置支付功能，实现订阅升级
2. 自定义各等级页面的功能
3. 部署到生产环境上线运营