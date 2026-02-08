export interface PageContent {
  title: string
  subtitle: string
  content: string
}

export const STATIC_PAGES: Record<string, PageContent> = {
  technologies: {
    title: 'Технології',
    subtitle:
      'Інженерія емоцій. Ми використовуємо обладнання, що стирає межу між екраном та реальністю.',
    content: `
      <div class="space-y-8">
        
        <div class="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-black p-8 md:p-12 transition-all hover:border-cyan-500/30">
          <div class="absolute top-0 right-0 h-64 w-64 bg-cyan-500/10 blur-[100px] transition-opacity opacity-50 group-hover:opacity-100"></div>
          
          <div class="relative z-10">
            <div class="mb-4 inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-cyan-400">
              Візуал
            </div>
            <h3 class="mb-4 text-4xl font-black uppercase tracking-tighter text-white">
              IMAX <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Laser 4K</span>
            </h3>
            <p class="mb-8 text-lg text-zinc-400 leading-relaxed max-w-2xl">
              Це не просто проєктор. Система подвійних лазерів 4K забезпечує зображення з максимальною роздільною здатністю та різкістю. Ми відмовилися від ксенонових ламп на користь чистого лазерного світла.
            </p>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/10 pt-6">
              <div>
                <div class="text-2xl font-bold text-white">60 fps</div>
                <div class="text-xs text-zinc-500 uppercase font-bold">High Frame Rate</div>
              </div>
              <div>
                <div class="text-2xl font-bold text-white">+50%</div>
                <div class="text-xs text-zinc-500 uppercase font-bold">Яскравість</div>
              </div>
              <div>
                <div class="text-2xl font-bold text-white">1.43:1</div>
                <div class="text-xs text-zinc-500 uppercase font-bold">Співвідношення сторін</div>
              </div>
               <div>
                <div class="text-2xl font-bold text-white">12.0 ch</div>
                <div class="text-xs text-zinc-500 uppercase font-bold">Звукова схема</div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div class="group relative overflow-hidden rounded-3xl border border-white/10 bg-black p-8 hover:border-indigo-500/30 transition-all">
             <div class="absolute bottom-0 left-0 h-40 w-40 bg-indigo-600/20 blur-[80px]"></div>
             
             <div class="mb-4 inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-indigo-400">
              Звук
            </div>
            <h3 class="mb-3 text-2xl font-black uppercase text-white">
              Dolby <span class="text-indigo-500">Atmos</span>
            </h3>
            <p class="text-zinc-400 mb-6 text-sm leading-relaxed">
              Звук більше не прив'язаний до каналів. Він рухається навколо вас. Об'єкто-орієнтована аудіосистема дозволяє розміщувати звукові ефекти в будь-якій точці зали, навіть над головою.
            </p>
            <ul class="space-y-2 text-sm text-zinc-300 font-medium">
              <li class="flex items-center gap-2"><span class="h-1.5 w-1.5 rounded-full bg-indigo-500"></span> 64 незалежних канали</li>
              <li class="flex items-center gap-2"><span class="h-1.5 w-1.5 rounded-full bg-indigo-500"></span> Стельові динаміки</li>
              <li class="flex items-center gap-2"><span class="h-1.5 w-1.5 rounded-full bg-indigo-500"></span> Акустична прозорість екрану</li>
            </ul>
          </div>

          <div class="group relative overflow-hidden rounded-3xl border border-white/10 bg-black p-8 hover:border-red-500/30 transition-all">
             <div class="absolute bottom-0 right-0 h-40 w-40 bg-red-600/20 blur-[80px]"></div>

             <div class="mb-4 inline-flex items-center rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-red-400">
              Відчуття
            </div>
            <h3 class="mb-3 text-2xl font-black uppercase text-white">
              D-BOX <span class="text-red-500">Motion</span>
            </h3>
            <p class="text-zinc-400 mb-6 text-sm leading-relaxed">
              Ваше тіло бере участь у подіях фільму. Крісла D-BOX синхронізуються з дією на екрані, імітуючи вібрацію, падіння, прискорення та текстуру поверхні.
            </p>
            <ul class="space-y-2 text-sm text-zinc-300 font-medium">
              <li class="flex items-center gap-2"><span class="h-1.5 w-1.5 rounded-full bg-red-500"></span> 3 осі руху (MFX)</li>
              <li class="flex items-center gap-2"><span class="h-1.5 w-1.5 rounded-full bg-red-500"></span> Індивідуальне налаштування інтенсивності</li>
              <li class="flex items-center gap-2"><span class="h-1.5 w-1.5 rounded-full bg-red-500"></span> Сертифікація кіностудій</li>
            </ul>
          </div>
          
        </div>

        <div class="rounded-2xl bg-white/5 border border-white/5 p-6 text-center text-sm text-zinc-500">
          Ми регулярно проводимо калібрування обладнання за стандартами THX та IMAX Corporation для забезпечення еталонної якості.
        </div>
      </div>
    `,
  },
  halls: {
    title: 'Наші зали',
    subtitle:
      'Ми перетворили перегляд фільму на першокласний відпочинок. Оберіть свій рівень комфорту.',
    content: `
      <div class="space-y-12">
        
        <div class="group relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-900/10 via-black to-black p-8 md:p-12 shadow-2xl transition-all hover:border-amber-500/40">
          <div class="absolute top-0 right-0 h-96 w-96 bg-amber-600/10 blur-[120px] rounded-full transition-opacity opacity-60 group-hover:opacity-100"></div>
          
          <div class="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div class="flex-1">
              <div class="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                ★ Premium Experience
              </div>
              <h3 class="mb-4 text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
                LUX <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-600">Cinema</span>
              </h3>
              <p class="mb-8 text-lg text-zinc-400 leading-relaxed">
                Максимальна приватність та комфорт бізнес-класу. Зал обладнаний шкіряними кріслами-реклайнерами, що розкладаються до горизонтального положення.
              </p>
              
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-zinc-300 font-medium">
                <li class="flex items-center gap-3">
                  <span class="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">✓</span>
                  Електронне керування спинкою
                </li>
                <li class="flex items-center gap-3">
                  <span class="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">✓</span>
                  Персональні столики з підсвіткою
                </li>
                <li class="flex items-center gap-3">
                  <span class="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">✓</span>
                  Кнопка виклику офіціанта
                </li>
                <li class="flex items-center gap-3">
                  <span class="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">✓</span>
                  USB-порти для зарядки
                </li>
              </ul>
            </div>
            
            <div class="hidden md:flex h-40 w-40 shrink-0 items-center justify-center rounded-3xl bg-amber-900/20 border border-amber-500/20">
               <span class="text-4xl">👑</span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div class="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-8 transition-all hover:bg-zinc-900 hover:border-white/20">
            <div class="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800 text-2xl group-hover:scale-110 transition-transform">
              🛋️
            </div>
            <h3 class="mb-3 text-2xl font-black uppercase text-white">Comfort</h3>
            <p class="text-zinc-400 mb-6 text-sm leading-relaxed">
              Золотий стандарт кінопоказу. Ми збільшили відстань між рядами на 40%, щоб ви могли зручно витягнути ноги.
            </p>
            <div class="flex flex-wrap gap-2">
               <span class="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-xs font-bold text-zinc-300">Широкі підлокітники</span>
               <span class="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-xs font-bold text-zinc-300">Double-armchair</span>
               <span class="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-xs font-bold text-zinc-300">Ергономіка</span>
            </div>
          </div>

          <div class="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-rose-900/20 to-black p-8 transition-all hover:border-rose-500/30">
            <div class="absolute bottom-0 right-0 h-32 w-32 bg-rose-600/10 blur-[60px] group-hover:opacity-100 transition-opacity"></div>
            
            <div class="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-900/30 text-rose-400 text-2xl group-hover:scale-110 transition-transform">
              ❤️
            </div>
            <h3 class="mb-3 text-2xl font-black uppercase text-white group-hover:text-rose-400 transition-colors">Love Seats</h3>
            <p class="text-zinc-400 mb-6 text-sm leading-relaxed">
              Затишні дивани для двох у останньому ряду. Ідеальний вибір для романтичного побачення, де ніхто не заважатиме.
            </p>
            <div class="flex flex-wrap gap-2">
               <span class="px-3 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs font-bold text-rose-300">Без перегородок</span>
               <span class="px-3 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs font-bold text-rose-300">Приватність</span>
            </div>
          </div>
          
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/5">
            <div class="text-center md:text-left">
                <div class="text-2xl font-bold text-white">120 см</div>
                <div class="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Між рядами</div>
            </div>
            <div class="text-center md:text-left">
                <div class="text-2xl font-bold text-white">65 см</div>
                <div class="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Ширина крісла</div>
            </div>
             <div class="text-center md:text-left">
                <div class="text-2xl font-bold text-white">Premium</div>
                <div class="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Матеріали</div>
            </div>
             <div class="text-center md:text-left">
                <div class="text-2xl font-bold text-white">Climate</div>
                <div class="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Контроль</div>
            </div>
        </div>

      </div>
    `,
  },
  rules: {
    title: 'Правила відвідування',
    subtitle: 'Взаємоповага та безпека — наші головні пріоритети.',
    content: `
      <div class="space-y-12">
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div class="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10">
             <div class="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)] text-white font-bold">1</div>
             <h3 class="text-xl font-bold text-white mb-2">Вхід до зали</h3>
             <p class="text-zinc-400 text-sm leading-relaxed">
               Вхід можливий тільки за наявності дійсного квитка (електронного на смартфоні або роздрукованого). Зберігайте квиток до кінця сеансу.
             </p>
          </div>

          <div class="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10">
             <div class="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white font-bold">2</div>
             <h3 class="text-xl font-bold text-white mb-2">Їжа та напої</h3>
             <p class="text-zinc-400 text-sm leading-relaxed">
               Вхід зі своїми продуктами харчування та напоями заборонений. Ви можете насолодитися попкорном та напоями з нашого кінобару.
             </p>
          </div>

          <div class="relative overflow-hidden rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-900/10 to-transparent p-6 transition-all hover:border-red-500/40">
             <div class="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white font-bold">3</div>
             <h3 class="text-xl font-bold text-white mb-2">Зйомка заборонена</h3>
             <p class="text-zinc-400 text-sm leading-relaxed">
               Будь-яка фото- та відеозйомка екрану під час фільму суворо заборонена (Закон про авторське право). Порушники будуть виведені із зали без повернення коштів.
             </p>
          </div>

          <div class="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10">
             <div class="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-700 text-white font-bold">4</div>
             <h3 class="text-xl font-bold text-white mb-2">Дрес-код та стан</h3>
             <p class="text-zinc-400 text-sm leading-relaxed">
               Адміністрація має право відмовити у вході особам у стані сильного алкогольного або наркотичного сп'яніння, а також у брудному одязі, що може забруднити крісла.
             </p>
          </div>

        </div>

        <div class="rounded-2xl border border-blue-500/20 bg-blue-900/10 p-6 flex flex-col md:flex-row gap-6 items-center">
            <div class="h-12 w-12 shrink-0 flex items-center justify-center rounded-full bg-blue-500/20 text-2xl">👶</div>
            <div>
               <h3 class="text-lg font-bold text-white mb-1">Діти до 5 років</h3>
               <p class="text-sm text-zinc-400">
                 Відвідують сеанси безкоштовно без надання окремого місця (на руках у дорослих). Це правило не поширюється на сеанси з віковим обмеженням 16+ та 18+.
               </p>
            </div>
        </div>

        <div class="rounded-2xl border border-yellow-500/20 bg-yellow-900/10 p-6">
           <h3 class="text-lg font-bold text-white mb-2 flex items-center gap-2">
             <span class="inline-block h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></span>
             Повітряна тривога
           </h3>
           <p class="text-sm text-zinc-400 leading-relaxed">
             У разі оголошення повітряної тривоги сеанс зупиняється. Всі відвідувачі повинні пройти в найближче укриття. Якщо тривога триває менше 30 хв, сеанс буде продовжено. Якщо довше — квитки можна обміняти на інший сеанс протягом 14 днів.
           </p>
        </div>

      </div>
    `,
  },
  privacy: {
    title: 'Політика конфіденційності',
    subtitle:
      'Ваша довіра — наш найцінніший актив. Прозорість у обробці даних.',
    content: `
      <div class="space-y-10 text-base md:text-lg leading-relaxed">
        
        <div class="border-l-4 border-[var(--color-primary)] bg-white/5 p-6 rounded-r-xl">
          <p class="text-zinc-300 italic">
            Ця Політика конфіденційності пояснює, як "Cinema Platform" збирає, використовує та захищає ваші персональні дані. Ми діємо відповідно до Закону України «Про захист персональних даних».
          </p>
        </div>

        <div>
          <h3 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span class="text-[var(--color-primary)]">01.</span> Збір інформації
          </h3>
          <p class="text-zinc-400 mb-4">
            Ми збираємо лише ті дані, які необхідні для надання послуг бронювання та покращення вашого досвіду:
          </p>
          <ul class="list-disc pl-6 space-y-2 text-zinc-400 marker:text-[var(--color-primary)]">
            <li><strong class="text-white">Особисті дані:</strong> Ім'я, прізвище, номер телефону та адреса електронної пошти (для ідентифікації та надсилання квитків).</li>
            <li><strong class="text-white">Платіжні дані:</strong> Ми не зберігаємо повні дані ваших банківських карток. Всі транзакції обробляються через сертифіковані платіжні шлюзи (PCI DSS).</li>
            <li><strong class="text-white">Технічні дані:</strong> IP-адреса, тип пристрою, історія переглядів на сайті (для аналітики та безпеки).</li>
          </ul>
        </div>

        <div>
          <h3 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
             <span class="text-[var(--color-primary)]">02.</span> Використання даних
          </h3>
          <p class="text-zinc-400 mb-4">
            Ваша інформація використовується для:
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div class="bg-white/5 p-4 rounded-lg border border-white/5 text-sm text-zinc-300">
                🎫 Обробки бронювань та покупок квитків.
             </div>
             <div class="bg-white/5 p-4 rounded-lg border border-white/5 text-sm text-zinc-300">
                📞 Служби підтримки та зворотного зв'язку.
             </div>
             <div class="bg-white/5 p-4 rounded-lg border border-white/5 text-sm text-zinc-300">
                🛡️ Запобігання шахрайству та безпеки акаунту.
             </div>
             <div class="bg-white/5 p-4 rounded-lg border border-white/5 text-sm text-zinc-300">
                🎁 Персональних пропозицій (тільки за вашою згодою).
             </div>
          </div>
        </div>

        <div>
          <h3 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
             <span class="text-[var(--color-primary)]">03.</span> Захист інформації
          </h3>
          <p class="text-zinc-400">
            Ми впровадили комплекс технічних та організаційних заходів безпеки. Веб-сайт використовує протокол шифрування <strong>SSL (HTTPS)</strong>, що гарантує захищену передачу даних між вашим браузером та нашими серверами. Паролі користувачів зберігаються у вигляді хеш-сум і не доступні навіть співробітникам компанії.
          </p>
        </div>

        <div>
          <h3 class="text-2xl font-bold text-white mb-4 flex items-center gap-3">
             <span class="text-[var(--color-primary)]">04.</span> Cookie-файли
          </h3>
          <p class="text-zinc-400">
            Ми використовуємо файли cookie для збереження вашої сесії авторизації та налаштувань. Ви можете відключити їх у налаштуваннях браузера, проте це може вплинути на коректну роботу сайту.
          </p>
        </div>

        <div class="pt-8 border-t border-white/10 mt-12">
          <p class="text-sm text-zinc-500">
            Якщо ви бажаєте видалити свій акаунт або отримати виписку про зібрані дані, будь ласка, зв'яжіться з нашим Data Protection Officer за адресою: <a href="mailto:privacy@cinema.ua" class="text-white hover:text-[var(--color-primary)] underline decoration-dotted underline-offset-4">privacy@cinema.ua</a>.
          </p>
          <p class="text-xs text-zinc-600 mt-2">Останнє оновлення: 1 лютого 2026 року</p>
        </div>

      </div>
    `,
  },
  offer: {
    title: 'Публічна оферта',
    subtitle: 'Офіційні умови надання послуг та продажу квитків онлайн.',
    content: `
      <div class="space-y-10 text-sm md:text-base leading-relaxed text-zinc-400">
        
        <div class="bg-white/5 p-6 rounded-xl border border-white/5">
          <p>
            Цей документ є офіційною пропозицією (публічною офертою) ТОВ "Сінема Платформ" (далі — <strong>"Виконавець"</strong>) укласти договір купівлі-продажу квитків на кіносеанси з будь-якою фізичною особою (далі — <strong>"Відвідувач"</strong>).
          </p>
        </div>

        <div>
          <h3 class="text-xl font-bold text-white mb-4">1. Загальні положення</h3>
          <ol class="list-decimal pl-5 space-y-3 marker:text-[var(--color-primary)]">
            <li>Цей Договір є публічним відповідно до ст. 633 Цивільного кодексу України. Його умови є однаковими для всіх Відвідувачів.</li>
            <li>Моментом повного і беззастережного прийняття (акцептом) пропозиції Виконавця укласти Договір вважається факт здійснення Відвідувачем оплати Замовлення на Сайті.</li>
            <li>Адміністрація залишає за собою право вносити зміни до Оферти в будь-який момент.</li>
          </ol>
        </div>

        <div>
          <h3 class="text-xl font-bold text-white mb-4">2. Предмет договору</h3>
          <p class="mb-3">
            Виконавець зобов'язується надати Відвідувачеві послуги з демонстрації кінофільму (продати Квиток), а Відвідувач зобов'язується оплатити ці послуги.
          </p>
          <p>
            Електронний квиток (E-ticket) надає право на відвідування сеансу без необхідності обміну в касі. Підставою для входу є унікальний QR-код, який надходить на пошту або зберігається в особистому кабінеті.
          </p>
        </div>

        <div>
          <h3 class="text-xl font-bold text-white mb-4">3. Порядок розрахунків</h3>
          <ul class="list-disc pl-5 space-y-2 marker:text-zinc-600">
             <li>Ціни на квитки вказуються в гривнях і включають ПДВ.</li>
             <li>Оплата здійснюється виключно в безготівковій формі через платіжний віджет на Сайті.</li>
             <li>Договір вважається виконаним з боку Виконавця в момент відправлення Електронного квитка на пошту Відвідувача.</li>
          </ul>
        </div>

        <div>
          <h3 class="text-xl font-bold text-white mb-4">4. Повернення квитків</h3>
          <p>
            Повернення коштів можливе не пізніше, ніж за 30 хвилин до початку сеансу. Процедура повернення ініціюється Відвідувачем через особистий кабінет або службу підтримки. Кошти повертаються на картку платника протягом 3-5 банківських днів.
          </p>
        </div>

        <div>
          <h3 class="text-xl font-bold text-white mb-4">5. Відповідальність сторін</h3>
          <p class="mb-3">
            Виконавець не несе відповідальності за невідповідність художньої цінності фільму очікуванням Відвідувача (суб'єктивна оцінка).
          </p>
          <p>
            У разі скасування сеансу з технічних причин або через обставини непереборної сили (повітряна тривога, вимкнення електроенергії), Виконавець зобов'язується повернути 100% вартості квитка або обміняти його на інший сеанс.
          </p>
        </div>

        <div class="mt-12 pt-8 border-t border-white/10 text-xs text-zinc-500 font-mono">
          <p class="font-bold text-white mb-2">РЕКВІЗИТИ ВИКОНАВЦЯ:</p>
          <p>ТОВ "СІНЕМА ПЛАТФОРМ"</p>
          <p>ЄДРПОУ: 12345678</p>
          <p>Юридична адреса: 01001, м. Київ, вул. Хрещатик, 1</p>
          <p>Email: legal@cinema.ua</p>
        </div>

      </div>
    `,
  },
  'age-limits': {
    title: 'Вікові обмеження',
    subtitle:
      'Індекс кіноаудиторії. Ми дотримуємося законодавства про захист суспільної моралі.',
    content: `
      <div class="space-y-12">
        
        <p class="text-zinc-400 text-lg leading-relaxed border-l-4 border-white/10 pl-6">
          Вікові рейтинги встановлюються Міністерством культури та інформаційної політики України. Будь ласка, звертайте увагу на індекс фільму перед покупкою квитків.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div class="group relative overflow-hidden rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-900/10 to-transparent p-8 transition-all hover:border-green-500/50 hover:bg-green-900/20">
             <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <span class="text-6xl font-black text-green-500">0+</span>
             </div>
             
             <div class="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-green-500 text-black font-black text-xl mb-4 shadow-[0_0_15px_rgba(34,197,94,0.4)]">
               0+
             </div>
             <h3 class="text-xl font-bold text-white mb-2">Загальна аудиторія</h3>
             <p class="text-zinc-400 text-sm">
               Фільми, доступні для глядачів будь-якого віку. Зазвичай це мультфільми, сімейні комедії та казки. Сцени насилля чи грубої лексики відсутні.
             </p>
          </div>

          <div class="group relative overflow-hidden rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-yellow-900/10 to-transparent p-8 transition-all hover:border-yellow-500/50 hover:bg-yellow-900/20">
             <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <span class="text-6xl font-black text-yellow-500">12+</span>
             </div>

             <div class="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-yellow-500 text-black font-black text-xl mb-4 shadow-[0_0_15px_rgba(234,179,8,0.4)]">
               12+
             </div>
             <h3 class="text-xl font-bold text-white mb-2">Діти до 12 років</h3>
             <p class="text-zinc-400 text-sm">
               Фільм може містити сцени, що вимагають уваги батьків. Діти до 12 років допускаються на сеанс <strong>виключно у супроводі батьків</strong> або повнолітніх опікунів.
             </p>
          </div>

          <div class="group relative overflow-hidden rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-900/10 to-transparent p-8 transition-all hover:border-orange-500/50 hover:bg-orange-900/20">
             <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <span class="text-6xl font-black text-orange-500">16+</span>
             </div>

             <div class="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-orange-500 text-black font-black text-xl mb-4 shadow-[0_0_15px_rgba(249,115,22,0.4)]">
               16+
             </div>
             <h3 class="text-xl font-bold text-white mb-2">Обмеження до 16 років</h3>
             <p class="text-zinc-400 text-sm">
               Перегляд заборонено особам, які не досягли 16-річного віку. Фільм може містити сцени насилля, вживання алкоголю або ненормативну лексику.
             </p>
          </div>

          <div class="group relative overflow-hidden rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-900/10 to-transparent p-8 transition-all hover:border-red-500/50 hover:bg-red-900/20">
             <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <span class="text-6xl font-black text-red-600">18+</span>
             </div>

             <div class="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-red-600 text-white font-black text-xl mb-4 shadow-[0_0_15px_rgba(220,38,38,0.4)]">
               18+
             </div>
             <h3 class="text-xl font-bold text-white mb-2">Суворо для дорослих</h3>
             <p class="text-zinc-400 text-sm">
               Вхід особам до 18 років <strong>категорично заборонено</strong>, навіть у супроводі батьків. Фільм може містити сцени жорстокості або контент сексуального характеру.
             </p>
          </div>

        </div>

        <div class="rounded-xl bg-zinc-900 border border-zinc-800 p-6 flex flex-col md:flex-row gap-6 items-center">
           <div class="h-14 w-14 shrink-0 rounded-full bg-white/10 flex items-center justify-center text-3xl">🪪</div>
           <div>
              <h4 class="text-lg font-bold text-white mb-1">Перевірка документів</h4>
              <p class="text-sm text-zinc-400">
                Адміністрація кінотеатру та контролери мають законне право перевірити документ, що підтверджує вік відвідувача (паспорт, студентський квиток, водійські права або Дія), якщо виникають сумніви щодо досягнення необхідного віку. У разі відсутності документа у вході може бути відмовлено без повернення коштів.
              </p>
           </div>
        </div>

      </div>
    `,
  },
}
