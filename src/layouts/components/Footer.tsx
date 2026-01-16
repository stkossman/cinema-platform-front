const Footer = () => {
  return (
    <footer className='border-t border-white/5 bg-black py-8 text-center text-zinc-500'>
      <div className='container mx-auto px-4'>
        <p className='text-sm'>
          &copy; {new Date().getFullYear()} Cinema Platform. All rights
          reserved.
        </p>
        <div className='mt-4 flex justify-center gap-4 text-xs'>
          <a href='#' className='hover:text-white'>
            Privacy Policy
          </a>
          <a href='#' className='hover:text-white'>
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
