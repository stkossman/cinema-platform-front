import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import type { Toast } from './ToastContext'

const icons = {
  success: <CheckCircle size={20} className='text-green-500' />,
  error: <AlertCircle size={20} className='text-red-500' />,
  info: <Info size={20} className='text-blue-500' />,
  warning: <AlertTriangle size={20} className='text-yellow-500' />,
}

const ToastItem = ({
  toast,
  onRemove,
}: {
  toast: Toast
  onRemove: (id: string) => void
}) => {
  const [isExiting, setIsExiting] = useState(false)

  const handleRemove = () => {
    setIsExiting(true)
    setTimeout(() => onRemove(toast.id), 300)
  }

  return (
    <div
      className={`
        flex items-center gap-3 p-4 rounded-xl shadow-2xl border border-white/10 bg-[#1a1a1a] backdrop-blur-md text-white min-w-[300px] max-w-md
        transition-all duration-300 ease-in-out transform
        ${isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'}
        animate-in slide-in-from-right-10 fade-in
      `}
    >
      <div className='shrink-0'>{icons[toast.type]}</div>
      <p className='text-sm font-medium flex-1'>{toast.message}</p>
      <button
        type='button'
        onClick={handleRemove}
        className='text-[var(--text-muted)] hover:text-white transition-colors'
      >
        <X size={16} />
      </button>
    </div>
  )
}

const ToastContainer = ({
  toasts,
  removeToast,
}: {
  toasts: Toast[]
  removeToast: (id: string) => void
}) => {
  return (
    <div className='fixed bottom-5 right-5 z-[9999] flex flex-col gap-3'>
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  )
}

export default ToastContainer
