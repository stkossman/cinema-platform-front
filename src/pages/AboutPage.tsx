import { Mail, Github, MapPin, ArrowRight } from 'lucide-react'

const AboutPage = () => {
  return (
    <div className='flex min-h-screen flex-col lg:flex-row'>
      <div className='relative h-[40vh] w-full overflow-hidden bg-zinc-950 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:w-1/2'>
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className='absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-red-950/20' />

        <div className='absolute inset-0 flex items-center justify-center p-10'>
          <div className='relative'>
            <div className='absolute -inset-10 rounded-full bg-red-600/20 blur-3xl' />
            <h1 className='relative z-10 text-6xl font-black uppercase tracking-tighter text-white sm:text-8xl lg:text-9xl'>
              Cine
              <br />
              ma<span className='text-red-600'>.</span>
            </h1>
          </div>
        </div>
      </div>

      <div className='flex w-full flex-col justify-center bg-black px-6 py-16 lg:min-h-[calc(100vh-4rem)] lg:w-1/2 lg:px-20 lg:py-24'>
        <div className='max-w-xl space-y-12 animate-in slide-in-from-bottom-8 fade-in duration-700'>
          <div className='space-y-6'>
            <h2 className='text-sm font-bold uppercase tracking-widest text-zinc-500'>
              Хто ми є
            </h2>
            <p className='text-3xl font-light leading-tight text-zinc-100 md:text-4xl'>
              Ми - команда ентузіастів з Острозької Академії, що переосмислює
              досвід купівлі квитків у кіно.
            </p>
            <p className='text-lg leading-relaxed text-zinc-400'>
              Наш проєкт поєднує мінімалістичний дизайн та передові технології.
              Ми не просто продаємо квитки, ми створюємо атмосферу ще до початку
              сеансу.
            </p>
          </div>

          <hr className='border-white/10' />

          <div className='space-y-6'>
            <h2 className='text-sm font-bold uppercase tracking-widest text-zinc-500'>
              Технології
            </h2>
            <div className='grid grid-cols-2 gap-4'>
              {[
                { label: 'Frontend', val: 'React + Tailwind v4' },
                { label: 'Backend', val: '.NET 8 WebAPI' },
                { label: 'Database', val: 'PostgreSQL' },
              ].map(item => (
                <div key={item.label}>
                  <div className='text-xs text-zinc-500'>{item.label}</div>
                  <div className='font-medium text-zinc-200'>{item.val}</div>
                </div>
              ))}
            </div>
          </div>

          <hr className='border-white/10' />

          <div className='space-y-6'>
            <h2 className='text-sm font-bold uppercase tracking-widest text-zinc-500'>
              Зв'язок
            </h2>

            <ul className='space-y-4'>
              <li className='flex items-center gap-4 text-zinc-300'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10'>
                  <MapPin size={18} />
                </div>
                <span>м. Острог, проспект Незалежності</span>
              </li>
              <li className='flex items-center gap-4 text-zinc-300'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10'>
                  <Mail size={18} />
                </div>
                <a
                  href='mailto:an.stawski@outlook.com'
                  className='hover:text-white transition-colors'
                >
                  an.stawski@outlook.com
                </a>
              </li>
              <li className='flex items-center gap-4 text-zinc-300'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10'>
                  <Github size={18} />
                </div>
                <a
                  href='https://github.com/stkossman'
                  target='_blank'
                  rel='noreferrer'
                  className='hover:text-white transition-colors'
                >
                  github.com/stkossman
                </a>
              </li>
            </ul>

            <div className='pt-6'>
              <a
                href='mailto:an.stawski@outlook.com'
                className='group flex w-full items-center justify-center gap-2 rounded-lg bg-white py-4 text-sm font-bold text-black transition-all hover:bg-zinc-200 active:scale-95'
              >
                Написати нам
                <ArrowRight
                  size={16}
                  className='transition-transform group-hover:translate-x-1'
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
