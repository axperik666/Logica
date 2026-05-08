import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { CONTACTS } from "@/lib/contacts";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Связаться с Logica Marketing: аудит, план роста и запуск работ по сайту/рекламе/креативам."
};

export default function ContactsPage() {
  return (
    <section className="tech-bg relative site-container py-10 sm:py-14">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Контакты
          </h1>
          <p className="mt-3 text-sm text-white/65 sm:text-base">
            Напишите, что нужно: сайт/лендинг, реклама Meta/Google/TikTok, креативы —
            и мы предложим план и оценку.
          </p>

          <div className="mt-8 grid gap-4">
            <div className="glass rounded-2xl p-5">
              <div className="text-sm font-semibold">Email</div>
              <div className="mt-2 text-sm text-white/70">{CONTACTS.email}</div>
            </div>
            <div className="glass rounded-2xl p-5">
              <div className="text-sm font-semibold">Telegram</div>
              <div className="mt-2 text-sm text-white/70">@logica_marketing</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="glass rounded-3xl p-6 sm:p-7">
            <div className="text-sm font-semibold">Быстрая заявка</div>
            <p className="mt-2 text-sm text-white/65">
              Эта форма — “заглушка” без бэкенда. На Vercel можно подключить
              отправку в Telegram/Email через Server Actions — добавлю следующим шагом.
            </p>

            <form className="mt-6 grid gap-3">
              <label className="grid gap-2">
                <span className="text-xs text-white/70">Имя</span>
                <input
                  className="h-11 rounded-xl border border-white/10 bg-[#070B12]/40 px-4 text-sm outline-none focus:ring-2 focus:ring-brand-400/70"
                  placeholder="Как к вам обращаться?"
                  name="name"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-xs text-white/70">Контакт</span>
                <input
                  className="h-11 rounded-xl border border-white/10 bg-[#070B12]/40 px-4 text-sm outline-none focus:ring-2 focus:ring-brand-400/70"
                  placeholder="Telegram/WhatsApp/Email"
                  name="contact"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-xs text-white/70">Что нужно?</span>
                <textarea
                  className="min-h-28 rounded-xl border border-white/10 bg-[#070B12]/40 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-400/70"
                  placeholder="Коротко про задачу, нишу и цель"
                  name="message"
                />
              </label>

              <div className="pt-2">
                <Button type="submit" className="w-full">
                  Отправить (подключим сервер)
                </Button>
                <p className="mt-3 text-xs text-white/55">
                  Нажимая “Отправить”, вы соглашаетесь с обработкой данных.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

