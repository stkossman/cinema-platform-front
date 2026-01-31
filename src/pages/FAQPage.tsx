import { useState } from 'react'
import { ChevronDown, HelpCircle, Phone, Mail } from 'lucide-react'
import { clsx } from 'clsx'

const FAQ_ITEMS = [
  {
    question: 'Які технології використовуються у ваших залах?',
    answer:
      'Ми використовуємо найсучасніші лазерні проєктори IMAX 4K та звукову систему Dolby Atmos. У деяких залах встановлені крісла D-Box, що рухаються синхронно з подіями на екрані.',
  },
  {
    question: 'Як купити квиток онлайн?',
    answer:
      "Оберіть фільм, натисніть на сеанс, оберіть місця на схемі залу та натисніть 'Купити'. Після оплати квитки будуть надіслані на вашу пошту та збережені у вашому особистому кабінеті.",
  },
  {
    question: 'Що робити, якщо я забув речі в залі?',
    answer:
      "Не хвилюйтеся! Усі знайдені речі ми зберігаємо у адміністратора протягом 30 днів. Зв'яжіться з нами за телефоном або підійдіть на касу кінотеатру.",
  },
  {
    question: 'Чи можу я повернути квиток?',
    answer:
      'Так, повернення квитків можливе не пізніше ніж за 30 хвилин до початку сеансу. Кошти будуть повернуті на картку протягом 3-5 банківських днів.',
  },
  {
    question: 'Чи є знижки для студентів?',
    answer:
      'Звичайно! Для студентів діє знижка 15% на всі сеанси у будні дні до 18:00. Не забудьте взяти з собою студентський квиток.',
  },
]

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className='min-h-screen bg-[var(--bg-main)] px-4 py-16 text-[var(--text-main)]'>
      <div className='container mx-auto max-w-3xl'>
        <div className='mb-12 text-center space-y-4'>
          <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]'>
            <HelpCircle size={32} />
          </div>
          <h1 className='text-4xl font-bold tracking-tight text-white sm:text-5xl'>
            Поширені запитання
          </h1>
          <p className='text-[var(--text-muted)]'>
            Ми зібрали відповіді на найпопулярніші питання наших глядачів.
          </p>
        </div>

        <div className='space-y-4'>
          {FAQ_ITEMS.map((item, index) => (
            <div
              key={index}
              className='overflow-hidden rounded-xl border border-white/5 bg-[var(--bg-card)] transition-colors hover:border-white/10'
            >
              <button
                type='button'
                onClick={() => toggleItem(index)}
                className='flex w-full items-center justify-between px-6 py-5 text-left font-medium text-white focus:outline-none hover:text-[var(--color-primary)] transition-colors'
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={clsx(
                    'ml-4 h-5 w-5 text-[var(--text-muted)] transition-transform duration-300',
                    openIndex === index &&
                      'rotate-180 text-[var(--color-primary)]',
                  )}
                />
              </button>

              <div
                className={clsx(
                  'grid transition-[grid-template-rows] duration-300 ease-out',
                  openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                )}
              >
                <div className='overflow-hidden'>
                  <div className='px-6 pb-5 text-[var(--text-muted)] leading-relaxed border-t border-white/5 pt-4'>
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-16 rounded-2xl border border-white/10 bg-gradient-to-br from-[var(--bg-card)] to-black p-8 text-center shadow-2xl'>
          <h3 className='mb-2 text-xl font-bold text-white'>
            Не знайшли відповіді?
          </h3>
          <p className='mb-6 text-[var(--text-muted)]'>
            Наша підтримка завжди на зв'язку.
          </p>
          <div className='flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8'>
            <a
              href='tel:+380000000000'
              className='flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors'
            >
              <Phone size={18} />
              +38 (000) 000-00-00
            </a>
            <a
              href='mailto:an.stawski@outlook.com'
              className='flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors'
            >
              <Mail size={18} />
              an.stawski@outlook.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQPage
