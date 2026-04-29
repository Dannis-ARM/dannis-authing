export default function PremiumDashboardPage() {
  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-neutral-900">高级版 Dashboard</h1>
            <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-semibold">
              VIP
            </span>
          </div>
          <p className="text-neutral-600 mt-2">欢迎使用高级版全部功能</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">基础功能</h3>
            <p className="text-neutral-600">包含所有免费版功能</p>
          </div>
          <div className="card p-6 border-primary-200 bg-primary-50">
            <h3 className="text-lg font-semibold text-primary-900 mb-2">高级功能</h3>
            <p className="text-primary-700">包含所有标准版功能</p>
          </div>
          <div className="card p-6 border-accent-200 bg-accent-50">
            <h3 className="text-lg font-semibold text-accent-900 mb-2">专属功能 1</h3>
            <p className="text-accent-700">高级版专属特权</p>
          </div>
          <div className="card p-6 border-accent-200 bg-accent-50">
            <h3 className="text-lg font-semibold text-accent-900 mb-2">专属功能 2</h3>
            <p className="text-accent-700">高级版专属特权</p>
          </div>
          <div className="card p-6 border-accent-200 bg-accent-50">
            <h3 className="text-lg font-semibold text-accent-900 mb-2">专属功能 3</h3>
            <p className="text-accent-700">高级版专属特权</p>
          </div>
          <div className="card p-6 border-accent-200 bg-accent-50">
            <h3 className="text-lg font-semibold text-accent-900 mb-2">专属客服</h3>
            <p className="text-accent-700">1对1专属客户服务</p>
          </div>
        </div>

        <div className="card p-8 border-accent-300 bg-gradient-to-r from-accent-50 to-primary-50">
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">感谢您使用高级版服务</h2>
            <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
              您已解锁全部功能特权，如有任何问题请随时联系我们的专属客服。
            </p>
            <button className="btn-accent">
              联系专属客服
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}