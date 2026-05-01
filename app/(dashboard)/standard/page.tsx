export default function StandardDashboardPage() {
  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">标准版 Dashboard</h1>
          <p className="text-neutral-600">欢迎使用标准版功能</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">免费功能 1</h3>
            <p className="text-neutral-600">包含所有免费版功能</p>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">免费功能 2</h3>
            <p className="text-neutral-600">包含所有免费版功能</p>
          </div>
          <div className="card p-6 border-primary-200 bg-primary-50">
            <h3 className="text-lg font-semibold text-primary-900 mb-2">高级功能 1</h3>
            <p className="text-primary-700">标准版专属功能</p>
          </div>
          <div className="card p-6 border-primary-200 bg-primary-50">
            <h3 className="text-lg font-semibold text-primary-900 mb-2">高级功能 2</h3>
            <p className="text-primary-700">标准版专属功能</p>
          </div>
        </div>

        <div className="card p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-neutral-900 mb-2">升级到高级版获取全部功能</h2>
              <p className="text-neutral-600 mb-4">解锁所有高级功能，享受专属服务</p>
              <button className="btn-accent">
                升级到高级版
              </button>
            </div>
            <div className="text-6xl text-accent-500">💎</div>
          </div>
        </div>
      </div>
    </div>
  );
}