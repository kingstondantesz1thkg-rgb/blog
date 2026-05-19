<template>
  <div class="max-w-6xl mx-auto py-10 space-y-10">
    <section class="relative overflow-hidden rounded-[2rem] border border-white/10 min-h-[320px]">
      <img
        :src="heroBackground"
        alt="Cooperation Hero"
        class="absolute inset-0 w-full h-full object-cover opacity-50"
      />
      <div class="absolute inset-0 cooperation-hero-overlay"></div>
      <div class="relative z-10 px-8 py-12 md:px-12 md:py-16">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6">
            <Handshake class="w-4 h-4" />
            {{ t('cooperation.badge') }}
          </div>
          <h1 class="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            {{ t('cooperation.title') }}
          </h1>
          <p class="text-lg md:text-xl text-gray-300 mt-5 leading-relaxed">
            {{ t('cooperation.subtitle') }}
          </p>
          <div class="flex flex-wrap gap-4 mt-8">
            <a
              :href="cooperationContact.emailLink"
              class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-darker font-bold rounded-xl hover:bg-emerald-400 transition-colors"
            >
              <Mail class="w-5 h-5" />
              {{ t('cooperation.ctaEmail') }}
            </a>
            <a
              href="#contact-qrcode"
              class="inline-flex items-center gap-2 px-6 py-3 glass-panel hover-glass rounded-xl text-white font-semibold transition-transform hover:-translate-y-1"
            >
              <QrCode class="w-5 h-5" />
              {{ t('cooperation.ctaQr') }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
      <div class="space-y-8">
        <div
          class="glass-panel cooperation-email-panel p-8 relative overflow-hidden border border-white/10"
        >
          <div class="flex items-start gap-4">
            <div class="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
              <img :src="serviceIcon" alt="service" class="w-8 h-8 object-contain opacity-90" />
            </div>
            <div>
              <h2 class="text-2xl font-bold text-white">{{ t('cooperation.emailTitle') }}</h2>
              <p class="text-gray-300 mt-2 leading-relaxed">{{ t('cooperation.emailDesc') }}</p>
            </div>
          </div>

          <div class="mt-8 rounded-2xl bg-white/5 border border-white/10 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div class="text-sm uppercase tracking-[0.25em] text-gray-400">{{ t('cooperation.emailLabel') }}</div>
              <a :href="cooperationContact.emailLink" class="text-xl md:text-2xl font-bold text-primary break-all hover:text-emerald-300 transition-colors">
                {{ cooperationContact.email }}
              </a>
            </div>
            <a
              :href="cooperationContact.emailLink"
              class="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-darker font-bold hover:bg-emerald-400 transition-colors"
            >
              <Send class="w-4 h-4" />
              {{ t('cooperation.sendMail') }}
            </a>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="glass-panel p-6">
            <div class="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Sparkles class="w-5 h-5" />
            </div>
            <h3 class="text-xl font-bold text-white">{{ t('cooperation.serviceTitle') }}</h3>
            <p class="text-gray-400 mt-3 leading-relaxed">{{ t('cooperation.serviceDesc') }}</p>
          </div>

          <div class="glass-panel p-6">
            <div class="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Clock3 class="w-5 h-5" />
            </div>
            <h3 class="text-xl font-bold text-white">{{ t('cooperation.responseTitle') }}</h3>
            <p class="text-gray-400 mt-3 leading-relaxed">{{ t('cooperation.responseDesc') }}</p>
          </div>
        </div>
      </div>

      <div id="contact-qrcode" class="glass-panel p-8 flex flex-col items-center text-center">
        <div class="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
          <img :src="phoneIcon" alt="phone" class="w-8 h-8 object-contain opacity-90" />
        </div>
        <h2 class="text-2xl font-bold text-white mt-5">{{ t('cooperation.qrTitle') }}</h2>
        <p class="text-gray-400 mt-3 leading-relaxed">{{ t('cooperation.qrDesc') }}</p>

        <div class="mt-6 p-4 rounded-[1.75rem] cooperation-qr-frame">
          <img :src="qrCode" alt="QR Code" class="w-56 h-56 object-contain rounded-2xl" />
        </div>

        <p class="text-sm text-gray-400 mt-5">{{ localizedWechatHint }}</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Clock3, Handshake, Mail, QrCode, Send, Sparkles } from 'lucide-vue-next'
import heroBackground from '../assets/cooperation/contact-hero-bg.png'
import serviceIcon from '../assets/cooperation/contact-service.png'
import phoneIcon from '../assets/cooperation/contact-phone.png'
import qrCode from '../assets/erweimav1.jpg'
import { cooperationContact } from '../config/contact'

const { t, locale } = useI18n()

const localizedWechatHint = computed(() =>
  locale.value === 'en' ? cooperationContact.wechatHint.en : cooperationContact.wechatHint.zh
)
</script>

<style scoped>
.cooperation-hero-overlay {
  background: var(--cooperation-hero-overlay);
}

.cooperation-qr-frame {
  background-color: var(--cooperation-qr-bg);
  box-shadow: var(--cooperation-qr-shadow);
}

.cooperation-email-panel {
  background-image: var(--cooperation-card-overlay);
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
