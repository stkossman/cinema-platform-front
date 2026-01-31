import { Mail, Github, MapPin, ArrowRight } from 'lucide-react'

const AboutPage = () => {
  return (
    <div className='flex min-h-screen flex-col lg:flex-row bg-black'>
      <div className='relative h-[50vh] w-full overflow-hidden bg-zinc-950 lg:sticky lg:top-0 lg:h-screen lg:w-1/2'>
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className='absolute inset-0 bg-gradient-to-br from-[var(--bg-main)] via-transparent to-[var(--color-primary)]/20' />

        <div className='absolute inset-0 flex items-center justify-center p-10'>
          <div className='relative z-10'>
            <div className='absolute -inset-20 rounded-full bg-[var(--color-primary)]/20 blur-[100px] animate-pulse-slow' />
            <h1 className='relative z-10 text-7xl font-black uppercase tracking-tighter text-white sm:text-8xl lg:text-9xl leading-[0.8]'>
              Cine
              <br />
              ma<span className='text-[var(--color-primary)]'>.</span>
            </h1>
          </div>
        </div>
      </div>

      <div className='flex w-full flex-col justify-center bg-[var(--bg-main)] px-6 py-20 lg:min-h-screen lg:w-1/2 lg:px-24 lg:py-24 relative'>
        <div className='max-w-xl space-y-16 animate-in slide-in-from-bottom-10 fade-in duration-1000'>
          <div className='space-y-6'>
            <span className='text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]'>
              Наша місія
            </span>
            <p className='text-3xl font-bold leading-tight text-white md:text-4xl'>
              Ми переосмислюємо досвід походу в кіно, роблячи його простим,
              красивим та емоційним.
            </p>
            <p className='text-lg leading-relaxed text-[var(--text-muted)]'>
              Наш проєкт поєднує сучасний дизайн, передові технології та любов
              до кінематографу. Ми не просто продаємо квитки — ми створюємо
              атмосферу ще до того, як ви зайдете в зал.
            </p>
          </div>

          <div className='grid grid-cols-2 gap-8 py-8 border-y border-white/5'>
            <div>
              <div className='text-3xl font-black text-white mb-1'>10k+</div>
              <div className='text-xs uppercase tracking-wider text-[var(--text-muted)]'>
                Користувачів
              </div>
            </div>
            <div>
              <div className='text-3xl font-black text-white mb-1'>5</div>
              <div className='text-xs uppercase tracking-wider text-[var(--text-muted)]'>
                Міст України
              </div>
            </div>
          </div>

          <div className='space-y-8'>
            <span className='text-xs font-bold uppercase tracking-[0.2em] text-zinc-500'>
              Зв'яжіться з нами
            </span>

            <ul className='space-y-4'>
              <li className='flex items-center gap-4 group cursor-pointer'>
                <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:border-white/20 transition-all'>
                  <MapPin size={20} className='text-white' />
                </div>
                <div>
                  <div className='text-xs text-[var(--text-muted)] uppercase font-bold'>
                    Адреса
                  </div>
                  <div className='text-zinc-200'>
                    м. Острог, проспект Незалежності
                  </div>
                </div>
              </li>

              <li className='flex items-center gap-4 group cursor-pointer'>
                <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:border-white/20 transition-all'>
                  <Mail size={20} className='text-white' />
                </div>
                <div>
                  <div className='text-xs text-[var(--text-muted)] uppercase font-bold'>
                    Email
                  </div>
                  <a
                    href='mailto:an.stawski@outlook.com'
                    className='text-zinc-200 hover:text-[var(--color-primary)] transition-colors'
                  >
                    an.stawski@outlook.com
                  </a>
                </div>
              </li>

              <li className='flex items-center gap-4 group cursor-pointer'>
                <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:border-white/20 transition-all'>
                  <Github size={20} className='text-white' />
                </div>
                <div>
                  <div className='text-xs text-[var(--text-muted)] uppercase font-bold'>
                    GitHub
                  </div>
                  <a
                    href='https://github.com/stkossman'
                    target='_blank'
                    rel='noreferrer'
                    className='text-zinc-200 hover:text-[var(--color-primary)] transition-colors'
                  >
                    github.com/stkossman
                  </a>
                </div>
              </li>
            </ul>

            <div className='pt-8'>
              <a
                href='mailto:an.stawski@outlook.com'
                className='group flex w-full items-center justify-center gap-3 rounded-xl bg-white py-4 text-sm font-bold text-black transition-all hover:bg-zinc-200 hover:shadow-lg active:scale-95'
              >
                Написати нам
                <ArrowRight
                  size={18}
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
