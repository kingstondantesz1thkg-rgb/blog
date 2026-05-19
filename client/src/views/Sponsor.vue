<template>
  <div class="max-w-4xl mx-auto py-12 space-y-12">
    <header class="text-center space-y-4">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4 shadow-[0_0_20px_rgba(52,211,153,0.3)]">
        <img src="../assets/shop/gift.png" alt="Gift" class="w-8 h-8 object-contain drop-shadow-md" />
      </div>
      <h1 class="text-4xl md:text-5xl font-extrabold text-white">{{ $t('sponsor.title') }}</h1>
      <p class="text-xl text-gray-400">{{ $t('sponsor.subtitle') }}</p>
    </header>

    <div v-if="!paymentSuccess" class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- 饮品菜单 -->
      <div class="md:col-span-2 space-y-6">
        <div class="flex items-center gap-2 mb-6">
          <img src="../assets/shop/menu.png" alt="Menu" class="w-6 h-6 object-contain" />
          <h2 class="text-2xl font-bold text-white">{{ $t('sponsor.menuTitle') }}</h2>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div 
            v-for="drink in drinks" 
            :key="drink.id"
            class="glass-panel p-6 hover-glass transition-all flex flex-col justify-between"
          >
            <div>
              <div class="flex justify-between items-start mb-2">
                <h3 class="text-xl font-bold text-white">{{ drink.name }}</h3>
                <span class="text-primary font-bold">¥{{ drink.price }}</span>
              </div>
              <p class="text-sm text-gray-400 mb-4">{{ drink.desc }}</p>
            </div>
            <button 
              @click="addToCart(drink)"
              class="w-full py-2 bg-white/5 hover:bg-primary/20 text-white hover:text-primary border border-white/10 hover:border-primary/50 rounded-lg transition-colors font-medium text-sm"
            >
              {{ $t('sponsor.addToCart') }}
            </button>
          </div>
        </div>
      </div>

      <!-- 购物车面板 -->
      <div class="glass-panel p-6 h-fit sticky top-24">
        <div class="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
          <img src="../assets/shop/cart.png" alt="Cart" class="w-6 h-6 object-contain" />
          <h2 class="text-xl font-bold text-white">{{ $t('sponsor.cartTitle') }}</h2>
        </div>

        <div v-if="cart.length === 0" class="text-center text-gray-500 py-8">
          {{ $t('sponsor.emptyCart') }}
        </div>
        
        <div v-else class="space-y-4 mb-6">
          <div v-for="item in cart" :key="item.drink.id" class="flex justify-between items-center text-sm">
            <span class="text-gray-300">{{ item.drink.name }} x{{ item.quantity }}</span>
            <span class="text-white font-medium">¥{{ item.drink.price * item.quantity }}</span>
          </div>
        </div>

        <div class="border-t border-white/10 pt-4 mt-auto">
          <div class="flex justify-between items-center mb-6">
            <span class="text-gray-400">{{ $t('sponsor.total') }}</span>
            <span class="text-2xl font-bold text-primary">¥{{ totalAmount }}</span>
          </div>
          <button 
            @click="checkout"
            :disabled="cart.length === 0 || loading"
            class="w-full py-3 bg-primary hover:bg-emerald-400 text-darker font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(52,211,153,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? $t('sponsor.processing') : $t('sponsor.checkout') }}
          </button>
        </div>
      </div>
    </div>

    <!-- 支付成功状态 -->
    <div v-else class="glass-panel p-12 text-center max-w-lg mx-auto transform transition-all animate-fade-in-up">
      <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500/20 mb-6 border-4 border-emerald-500/30">
        <img src="../assets/shop/success.png" alt="Success" class="w-12 h-12 object-contain" />
      </div>
      <h2 class="text-3xl font-bold text-white mb-4">{{ $t('sponsor.successTitle') }}</h2>
      <p class="text-gray-400 mb-8 leading-relaxed">
        {{ $t('sponsor.successDesc') }}
      </p>
      <button 
        @click="resetStore"
        class="px-8 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg transition-colors font-medium"
      >
        {{ $t('sponsor.continue') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

const drinks = computed(() => [
  { id: 1, name: t('sponsor.drinks.juice.name'), price: 15, desc: t('sponsor.drinks.juice.desc') },
  { id: 2, name: t('sponsor.drinks.boba.name'), price: 20, desc: t('sponsor.drinks.boba.desc') },
  { id: 3, name: t('sponsor.drinks.coffee.name'), price: 25, desc: t('sponsor.drinks.coffee.desc') },
  { id: 4, name: t('sponsor.drinks.tea.name'), price: 50, desc: t('sponsor.drinks.tea.desc') }
])

const cart = ref<{ drink: any, quantity: number }[]>([])
const paymentSuccess = ref(false)
const loading = ref(false)

const totalAmount = computed(() => {
  return cart.value.reduce((total, item) => total + (item.drink.price * item.quantity), 0)
})

function addToCart(drink: any) {
  const existing = cart.value.find(item => item.drink.id === drink.id)
  if (existing) {
    existing.quantity++
  } else {
    cart.value.push({ drink, quantity: 1 })
  }
}

function checkout() {
  if (cart.value.length === 0) return
  
  loading.value = true
  // 模拟支付网络请求
  setTimeout(() => {
    loading.value = false
    paymentSuccess.value = true
  }, 1500)
}

function resetStore() {
  cart.value = []
  paymentSuccess.value = false
  router.push('/')
}
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>