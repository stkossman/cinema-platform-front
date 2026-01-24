import { type SeatType } from '../../types/hall'

export const SEAT_TYPES: Record<string, SeatType> = {
  standard: {
    id: 'type-standard',
    name: 'Standard',
    price: 150,
    color: 'bg-blue-600',
  },
  vip: {
    id: 'type-vip',
    name: 'VIP / Recliner',
    price: 300,
    color: 'bg-yellow-500',
  },
  love: {
    id: 'type-love',
    name: 'Love Seat (Sofa)',
    price: 450,
    color: 'bg-pink-500',
  },
}
