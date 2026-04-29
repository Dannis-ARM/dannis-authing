import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "安全可靠",
      description: "企业级安全防护，Authing 身份认证体系，保障用户数据安全",
      icon: (
        <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "多等级服务",
      description: "免费版、标准版、高级版三种订阅方案，满足不同规模企业需求",
      icon: (
        <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "便捷登录",
      description: "支持微信扫码快速登录，无需账号密码，提升用户体验",
      icon: (
        <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    }
  ];

  const testimonials = [
    {
      name: "张总",
      company: "某对冲基金",
      content: "平台界面简洁专业，功能稳定，微信登录非常方便，大大提升了我们的工作效率。",
      avatar: "https://picsum.photos/id/1005/100/100"
    },
    {
      name: "李经理",
      company: "科技公司",
      content: "多等级订阅方案非常灵活，我们从免费版升级到高级版，服务体验提升明显。",
      avatar: "https://picsum.photos/id/1012/100/100"
    },
    {
      name: "王总",
      company: "金融公司",
      content: "安全可靠，技术支持响应快，是我们一直使用的核心服务平台。",
      avatar: "https://picsum.photos/id/1025/100/100"
    }
  ];

  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            专业级 <span className="text-amber-400">企业服务</span> 平台
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto">
            采用对冲基金级安全设计，支持微信扫码登录，三级订阅服务体系，为企业提供全方位的服务支持
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/login"
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-md text-lg font-medium transition-all hover:shadow-lg"
            >
              立即开始
            </Link>
            <Link 
              href="/pricing"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-md text-lg font-medium transition-all"
            >
              查看定价
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">核心优势</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            我们提供最专业的企业服务，满足您的各种业务需求
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-slate-200"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-slate-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">客户评价</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              看看我们的客户是怎么评价我们的服务
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-lg shadow-sm border border-slate-200"
              >
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-amber-400"
                  />
                  <div>
                    <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                    <p className="text-sm text-slate-500">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-slate-600 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Preview Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">灵活的订阅方案</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            三种订阅方案，总有一款适合您的需求，支持随时升级
          </p>
          <Link 
            href="/pricing"
            className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-md font-medium transition-all"
          >
            查看详细方案
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">免费版</h3>
              <p className="text-4xl font-bold text-slate-900">¥0<span className="text-sm font-normal text-slate-500">/月</span></p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-slate-700">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                基础功能使用
              </li>
              <li className="flex items-center gap-2 text-slate-700">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                社区支持
              </li>
              <li className="flex items-center gap-2 text-slate-700">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                1GB 存储空间
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-amber-400 transform scale-105 relative">
            <div className="absolute top-0 right-0 bg-amber-500 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
              推荐
            </div>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">标准版</h3>
              <p className="text-4xl font-bold text-slate-900">¥99<span className="text-sm font-normal text-slate-500">/月</span></p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-slate-700">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                所有免费版功能
              </li>
              <li className="flex items-center gap-2 text-slate-700">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                优先客户支持
              </li>
              <li className="flex items-center gap-2 text-slate-700">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                10GB 存储空间
              </li>
              <li className="flex items-center gap-2 text-slate-700">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                高级功能使用
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">高级版</h3>
              <p className="text-4xl font-bold text-slate-900">¥299<span className="text-sm font-normal text-slate-500">/月</span></p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-slate-700">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                所有标准版功能
              </li>
              <li className="flex items-center gap-2 text-slate-700">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                1对1专属客服
              </li>
              <li className="flex items-center gap-2 text-slate-700">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                无限存储空间
              </li>
              <li className="flex items-center gap-2 text-slate-700">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                定制化功能支持
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">立即开始使用我们的服务</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            注册即可享受7天免费试用高级版功能，无需信用卡，随时取消
          </p>
          <Link 
            href="/login"
            className="bg-amber-500 hover:bg-amber-600 text-white px-10 py-4 rounded-md text-lg font-medium transition-all hover:shadow-lg"
          >
            免费试用7天
          </Link>
        </div>
      </div>
    </div>
  );
}
