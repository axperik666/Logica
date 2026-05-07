import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: "Политика конфиденциальности Logica Marketing."
};

export default function PrivacyPage() {
  return (
    <section className="tech-bg relative container-px py-10 sm:py-14">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Политика конфиденциальности
      </h1>
      <div className="mt-6 max-w-3xl space-y-3 text-sm text-white/70">
        <p>
          Этот текст — шаблон. Перед публикацией замените на вашу реальную политику
          (юрист/шаблон под вашу юрисдикцию).
        </p>
        <p>
          Мы можем собирать данные, которые вы добровольно отправляете через форму
          на сайте (имя, контакт, сообщение), чтобы ответить на запрос и оказать
          услуги.
        </p>
        <p>
          По вопросам обработки данных:{" "}
          <span className="text-white">hello@logicamarketing.pro</span>
        </p>
      </div>
    </section>
  );
}

