import { ROLE } from "./constants"

export type CardT = {
  brand?: string
  country?: string
  cvc_check?: string
  exp_month?: number
  exp_year?: number
  funding?: string
  id?: string
  last4?: string
  name?: string
  object?: string
}

export type SubscriptionT = {
  id?: string
  pause_collection?: any
  current_period_end?: number
  cancel_at_period_end?: boolean
  items?: any
  status?: string
  plan?: any
}

export type UserT =
  | (UserDBT & {
      trialLeft?: number
      member?: boolean
      subscription?: SubscriptionT
      contentAccess?: boolean // TODO: store contentAccess on use-user.tsx, and remove other checkings for access tutorials
    })
  | null

export type UserDBT =
  | {
      uid?: string
      email?: string
      name?: string
      role?: keyof typeof ROLE
      customer?: string
      card?: CardT
      notifications?: Array<any>
      subscription?: {
        id?: string
      }
      lastPost?: string
      progress?: Object
      date?: number
      trial_end?: number
      last_active?: {
        date?: number
        page?: string
      }
      settings?: {
        slowLoad?: boolean
      }
    }
  | undefined

export type LoadingT = "before" | "loading" | "loaded"

export type MembershipT = {
  key: string
  plan: string
  sale_price?: number
  price: number
  interval: "month" | "year" | "day"
}
