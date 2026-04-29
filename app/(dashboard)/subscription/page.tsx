export default function SubscriptionPage() {
  // 模拟订阅数据
  const currentPlan = {
    name: '标准版',
    tier: 'STANDARD',
    price: '¥99',
    period: '/月',
    status: 'active',
    currentPeriodStart: '2024-01-15',
    currentPeriodEnd: '2024-02-15',
    autoRenew: true,
    paymentMethod: '微信支付 ****8888',
  };

  // 模拟支付历史
  const paymentHistory = [
    {
      id: '1',
      date: '2024-01-15',
      amount: '¥99.00',
      method: '微信支付',
      status: 'success',
      invoice: '#INV-20240115',
    },
    {
      id: '2',
      date: '2023-12-15',
      amount: '¥99.00',
      method: '微信支付',
      status: 'success',
      invoice: '#INV-20231215',
    },
    {
      id: '3',
      date: '2023-11-15',
      amount: '¥99.00',
      method: '微信支付',
      status: 'success',
      invoice: '#INV-20231115',
    },
  ];

  const availablePlans = [
    {
      name: '标准版',
      tier: 'STANDARD',
      price: '¥99/月',
      current: true,
      features: [
        '10GB存储空间',
        '优先客户支持',
        '无使用额度限制',
        '高级数据分析功能',
        'API访问权限',
      ],
    },
    {
      name: '高级版',
      tier: 'PREMIUM',
      price: '¥299/月',
      current: false,
      features: [
        '包含所有标准版功能',
        '无限存储空间',
        '1对1专属客服支持',
        '定制化功能开发',
        'SLA服务保障',
        '优先使用新功能',
        '专属数据备份服务',
      ],
    },
  ];

  const statusText: Record<string, string> = {
    active: '已激活',
    canceled: '已取消',
    past_due: '逾期未付',
  };

  const statusColor: Record<string, string> = {
    active: 'text-green-600 bg-green-100',
    canceled: 'text-red-600 bg-red-100',
    past_due: 'text-orange-600 bg-orange-100',
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">订阅管理</h1>

        {/* 当前订阅信息 */}
        <div className="card p-8 mb-8">
          <div className="flex flex-wrap justify-between items-start gap-6 mb-6">
            <div>
              <h2 className="text-xl font-bold text-neutral-900 mb-2">当前订阅</h2>
              <p className="text-neutral-600">管理您的订阅方案和支付信息</p>
            </div>
            <span className={`px-4 py-2 rounded-full font-semibold ${statusColor[currentPlan.status]}`}>
              {statusText[currentPlan.status]}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div>
              <p className="text-sm text-neutral-500 mb-1">订阅方案</p>
              <p className="text-lg font-semibold text-neutral-900">{currentPlan.name}</p>
              <p className="text-accent-600 font-semibold">{currentPlan.price}{currentPlan.period}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500 mb-1">当前周期</p>
              <p className="text-lg font-semibold text-neutral-900">{currentPlan.currentPeriodStart}</p>
              <p className="text-neutral-600">至 {currentPlan.currentPeriodEnd}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500 mb-1">自动续费</p>
              <p className="text-lg font-semibold text-neutral-900">
                {currentPlan.autoRenew ? '已开启' : '已关闭'}
              </p>
              <p className="text-neutral-600">
                {currentPlan.autoRenew ? '到期后自动续费' : '到期后将停止服务'}
              </p>
            </div>
            <div>
              <p className="text-sm text-neutral-500 mb-1">支付方式</p>
              <p className="text-lg font-semibold text-neutral-900">{currentPlan.paymentMethod}</p>
              <button className="text-primary-600 text-sm font-medium hover:text-primary-700 mt-1">
                修改支付方式
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {currentPlan.autoRenew ? (
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all">
                取消自动续费
              </button>
            ) : (
              <button className="btn-primary">
                开启自动续费
              </button>
            )}
            <button className="btn-accent">
              升级到高级版
            </button>
          </div>
        </div>

        {/* 可选方案对比 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">可选方案</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {availablePlans.map((plan) => (
              <div
                key={plan.tier}
                className={`card p-6 relative ${
                  plan.current
                    ? 'border-2 border-primary-500 bg-primary-50'
                    : 'border border-neutral-200'
                }`}
              >
                {plan.current && (
                  <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    当前使用
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">{plan.name}</h3>
                  <p className="text-2xl font-bold text-accent-600">{plan.price}</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {!plan.current && (
                  <button className="btn-accent w-full">
                    立即升级
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 支付历史 */}
        <div className="card p-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">支付历史</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-500">日期</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-500">金额</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-500">支付方式</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-500">状态</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-500">发票</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment) => (
                  <tr key={payment.id} className="border-b border-neutral-100">
                    <td className="py-4 px-4 text-neutral-900">{payment.date}</td>
                    <td className="py-4 px-4 font-semibold text-neutral-900">{payment.amount}</td>
                    <td className="py-4 px-4 text-neutral-700">{payment.method}</td>
                    <td className="py-4 px-4">
                      <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-sm font-medium">
                        支付成功
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-primary-600 hover:text-primary-700 font-medium">
                        {payment.invoice}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}