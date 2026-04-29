export default function PricingPage() {
  const plans = [
    {
      name: '免费版',
      price: '¥0',
      period: '/永久免费',
      tier: 'FREE',
      features: [
        '基础功能访问',
        '1GB存储空间',
        '社区支持',
        '每日使用额度限制',
      ],
      cta: '立即开始',
      ctaVariant: 'primary',
      highlighted: false,
    },
    {
      name: '标准版',
      price: '¥99',
      period: '/月',
      tier: 'STANDARD',
      features: [
        '包含所有免费版功能',
        '10GB存储空间',
        '优先客户支持',
        '无使用额度限制',
        '高级数据分析功能',
        'API访问权限',
      ],
      cta: '立即订阅',
      ctaVariant: 'primary',
      highlighted: true,
    },
    {
      name: '高级版',
      price: '¥299',
      period: '/月',
      tier: 'PREMIUM',
      features: [
        '包含所有标准版功能',
        '无限存储空间',
        '1对1专属客服支持',
        '定制化功能开发',
        'SLA服务保障',
        '优先使用新功能',
        '专属数据备份服务',
      ],
      cta: '联系销售',
      ctaVariant: 'accent',
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">选择适合您的方案</h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            灵活的订阅方案，满足不同规模的需求，随时可以升级或降级
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.tier}
              className={`card p-8 relative transition-all duration-300 hover:translate-y-[-8px] ${
                plan.highlighted
                  ? 'border-2 border-primary-500 shadow-xl scale-105 z-10'
                  : 'border border-neutral-200 shadow-md'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  最受欢迎
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-neutral-900">{plan.price}</span>
                  <span className="text-neutral-500 ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-neutral-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                  plan.ctaVariant === 'accent'
                    ? 'btn-accent w-full'
                    : 'btn-primary w-full'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="card p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">需要定制化方案？</h2>
            <p className="text-neutral-600 mb-6">
              对于大型企业客户，我们提供定制化的解决方案和专属的价格优惠，欢迎联系我们的销售团队。
            </p>
            <button className="btn-accent">
              联系我们
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}