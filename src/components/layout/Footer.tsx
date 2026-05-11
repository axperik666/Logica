import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Image
              src="/logo.png"
              alt="LOGICA Marketing"
              width={160}
              height={40}
              className="h-10 w-auto mb-6"
            />
            <p className="text-gray-400 max-w-md">
              Performance-маркетинг, который реально приносит прибыль. Специализируемся на ROI от
              3×.
            </p>
            <p className="text-sm text-gray-500 mt-8">
              © 2026 Logica Marketing. All rights reserved.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-semibold text-white mb-6">Навигация</h4>
            <div className="space-y-3 text-gray-400">
              <a href="#cases" className="block hover:text-white transition-colors">
                Кейсы
              </a>
              <a href="#services" className="block hover:text-white transition-colors">
                Услуги
              </a>
              <a href="#contact" className="block hover:text-white transition-colors">
                Контакты
              </a>
            </div>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-semibold text-white mb-6">Связаться с нами</h4>
            <div className="space-y-4 text-gray-400">
              <a
                href="https://t.me/logicamarketing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                Telegram
              </a>
              <a
                href="mailto:hello@logicamarketing.pro"
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                hello@logicamarketing.pro
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
