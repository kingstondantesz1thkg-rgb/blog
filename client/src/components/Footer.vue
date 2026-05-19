<template>
  <footer class="py-8 mt-20 border-t border-white/10">
    <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <p class="text-gray-400 text-sm">
        {{ $t('footer.copyright') }}
      </p>
      <div class="flex gap-4 items-center">
        <div class="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
          <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></div>
          <span class="text-xs font-medium text-gray-300">{{ $t('footer.systemOnline') }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>