export default function Loading() {
  return (
    <div className="min-h-screen bg-[#faf6ee] flex flex-col" role="status" aria-live="polite" aria-label="Cargando el panel de la colmena">
      {/* Header skeleton */}
      <div className="h-[72px] bg-white/70 border-b border-[#ebdcb9]/60 flex items-center px-8 gap-4" aria-hidden="true">
        <div className="w-24 h-5 bg-[#ebdcb9]/40 rounded-lg animate-pulse" />
        <div className="flex-1" />
        <div className="w-32 h-9 bg-[#ebdcb9]/30 rounded-xl animate-pulse" />
        <div className="w-9 h-9 bg-[#ebdcb9]/30 rounded-xl animate-pulse" />
      </div>

      <div className="flex flex-1" aria-hidden="true">
        {/* Sidebar skeleton */}
        <div className="w-64 shrink-0 bg-white/60 border-r border-[#ebdcb9]/60 p-4 space-y-3 hidden lg:block">
          <div className="h-8 bg-[#ebdcb9]/30 rounded-xl animate-pulse" />
          <div className="h-8 bg-[#ebdcb9]/20 rounded-xl animate-pulse" />
          <div className="h-8 bg-[#ebdcb9]/20 rounded-xl animate-pulse" />
        </div>

        {/* Main content skeleton */}
        <main className="flex-1 p-6 space-y-6">
          {/* Hero skeleton */}
          <div className="bg-white/80 border border-[#ebdcb9] rounded-3xl p-6 space-y-3">
            <div className="h-4 w-48 bg-[#ebdcb9]/40 rounded-lg animate-pulse" />
            <div className="h-7 w-80 bg-[#ebdcb9]/30 rounded-lg animate-pulse" />
            <div className="h-3 w-full max-w-md bg-[#ebdcb9]/20 rounded-lg animate-pulse" />
            <div className="h-3 w-3/4 max-w-sm bg-[#ebdcb9]/20 rounded-lg animate-pulse" />
          </div>

          {/* Metrics grid skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/80 border border-[#ebdcb9] rounded-2xl p-5 space-y-3">
                <div className="h-3 w-24 bg-[#ebdcb9]/30 rounded-lg animate-pulse" />
                <div className="h-6 w-16 bg-[#ebdcb9]/40 rounded-lg animate-pulse" />
                <div className="h-2 w-full bg-[#ebdcb9]/15 rounded-full animate-pulse" />
              </div>
            ))}
          </div>

          {/* Content area skeletons */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 bg-white/80 border border-[#ebdcb9] rounded-3xl p-5 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-[#ebdcb9]/15 rounded-xl animate-pulse" />
              ))}
            </div>
            <div className="lg:col-span-6 bg-white/80 border border-[#ebdcb9] rounded-3xl p-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-14 bg-[#ebdcb9]/15 rounded-xl animate-pulse" />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="h-48 bg-white/60 border border-[#ebdcb9] rounded-3xl animate-pulse" />
        </main>
      </div>
    </div>
  );
}
