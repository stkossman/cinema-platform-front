import { api } from '../lib/axios'

export interface UserProfileDto {
  id: string
  email: string
  firstName: string
  lastName: string
}

export interface UpdateProfileRequest {
  firstName: string
  lastName: string
}

export interface ChangePasswordRequest {
  oldPassword?: string
  newPassword?: string
  confirmNewPassword?: string
}

export const accountService = {
  getProfile: async (): Promise<UserProfileDto> => {
    const { data } = await api.get<UserProfileDto>('/account/profile')
    return data
  },

  updateProfile: async (data: UpdateProfileRequest) => {
    await api.put('/account/profile', data)
  },

  changePassword: async (data: ChangePasswordRequest) => {
    await api.post('/account/change-password', data)
  },
}
