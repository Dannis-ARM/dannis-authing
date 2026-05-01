export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-neutral-900 via-primary-900 to-primary-800 text-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            专业级服务平台
            <br />
            <span className="text-accent-400">为企业赋能</span>
          </h1>
          <p className="text-xl text-neutral-200 max-w-3xl mx-auto mb-10">
            我们提供多等级订阅服务，满足不同规模企业的需求，让您的业务更高效、更智能。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-accent text-lg px-8 py-4">
              立即开始使用
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg font-semibold text-lg px-8 py-4 transition-all">
              查看功能介绍
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">核心功能优势</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              我们的平台集成了业界领先的功能模块，为您提供全方位的服务支持
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                🛡️
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">安全可靠</h3>
              <p className="text-neutral-600">
                银行级别的安全防护，多重数据加密，保障您的数据安全和隐私。
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-accent-100 text-accent-700 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">高性能</h3>
              <p className="text-neutral-600">
                全球分布式节点，99.99%的可用性保障，毫秒级响应速度。
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                📈
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">智能分析</h3>
              <p className="text-neutral-600">
                AI 驱动的数据分析功能，为您的业务决策提供有力支持。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">客户评价</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              来自各行各业的客户对我们的服务给予了高度评价
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-neutral-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">客户名称 {i}</h4>
                    <p className="text-sm text-neutral-500">某公司 CEO</p>
                  </div>
                </div>
                <p className="text-neutral-700 italic">
                  "使用这个平台后，我们的工作效率提升了300%，服务非常稳定，支持团队响应也很及时。强烈推荐！"
                </p>
                <div className="mt-4 text-accent-500">
                  {'⭐'.repeat(5)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-neutral-900 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">准备好提升您的业务了吗？</h2>
          <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
            立即注册，免费体验所有基础功能，随时可以升级到更高级的服务。
          </p>
          <button className="btn-accent text-lg px-8 py-4">
            免费注册账号
          </button>
        </div>
      </section>
    </div>
  );
}