export default function FreeDashboardPage() {
  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">免费版 Dashboard</h1>
          <p className="text-neutral-600">欢迎使用免费版功能</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">功能 1</h3>
            <p className="text-neutral-600">免费版专属功能介绍</p>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">功能 2</h3>
            <p className="text-neutral-600">免费版专属功能介绍</p>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">功能 3</h3>
            <p className="text-neutral-600">免费版专属功能介绍</p>
          </div>
        </div>

        <div className="card p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-neutral-900 mb-2">升级到标准版获取更多功能</h2>
              <p className="text-neutral-600 mb-4">解锁高级功能，提升使用体验</p>
              <button className="btn-primary">
                立即升级
              </button>
            </div>
            <div className="text-6xl text-accent-500">⭐</div>
          </div>
        </div>
      </div>
    </div>
  );
}