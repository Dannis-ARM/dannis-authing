export default function ProfilePage() {
  // 模拟用户数据
  const user = {
    nickname: '张三',
    avatar: 'https://picsum.photos/id/1005/200/200',
    email: 'zhangsan@example.com',
    phone: '138****8888',
    tier: 'STANDARD',
    joinDate: '2024-01-15',
  };

  const tierText: Record<string, string> = {
    FREE: '免费版',
    STANDARD: '标准版',
    PREMIUM: '高级版',
  };

  const tierColor: Record<string, string> = {
    FREE: 'text-neutral-600 bg-neutral-100',
    STANDARD: 'text-primary-700 bg-primary-100',
    PREMIUM: 'text-accent-700 bg-accent-100',
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">个人中心</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 基本信息卡片 */}
          <div className="lg:col-span-2 space-y-8">
            <div className="card p-8">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img src={user.avatar} alt="用户头像" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-neutral-900">{user.nickname}</h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${tierColor[user.tier]}`}>
                      {tierText[user.tier]}
                    </span>
                  </div>
                  <p className="text-neutral-600 mb-4">加入时间：{user.joinDate}</p>
                  <button className="btn-primary text-sm px-4 py-2">
                    编辑个人信息
                  </button>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-6">账号信息</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-500 mb-1">电子邮箱</label>
                    <div className="flex items-center justify-between p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                      <span className="text-neutral-900">{user.email}</span>
                      <button className="text-primary-600 text-sm font-medium hover:text-primary-700">
                        修改
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-500 mb-1">手机号码</label>
                    <div className="flex items-center justify-between p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                      <span className="text-neutral-900">{user.phone}</span>
                      <button className="text-primary-600 text-sm font-medium hover:text-primary-700">
                        修改
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-500 mb-1">登录密码</label>
                  <div className="flex items-center justify-between p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                    <span className="text-neutral-900">********</span>
                    <button className="text-primary-600 text-sm font-medium hover:text-primary-700">
                      修改密码
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-6">安全设置</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-neutral-900">两步验证</h4>
                    <p className="text-sm text-neutral-500">开启后登录需要额外验证，提升账号安全性</p>
                  </div>
                  <button className="btn-primary text-sm px-4 py-2">
                    开启
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-neutral-900">登录提醒</h4>
                    <p className="text-sm text-neutral-500">异常登录时发送短信和邮件提醒</p>
                  </div>
                  <div className="w-12 h-6 bg-primary-600 rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 侧边信息 */}
          <div className="space-y-8">
            <div className="card p-6">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">当前订阅</h3>
              <div className={`p-4 rounded-lg mb-4 text-center font-semibold ${tierColor[user.tier]}`}>
                {tierText[user.tier]}
              </div>
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-neutral-500">到期时间</span>
                  <span className="text-neutral-900 font-medium">2025-01-15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">自动续费</span>
                  <span className="text-green-600 font-medium">已开启</span>
                </div>
              </div>
              <button className="btn-accent w-full text-sm py-2">
                管理订阅
              </button>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">使用统计</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-600">存储空间</span>
                    <span className="text-neutral-900 font-medium">2.3GB / 10GB</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-600 rounded-full" style={{ width: '23%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-600">API调用次数</span>
                    <span className="text-neutral-900 font-medium">1,234 / 无限</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}