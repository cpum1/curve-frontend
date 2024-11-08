import { LanguageSwitcherProps } from '../../features/switch-language'
import { ChainSwitcherProps } from '../../features/switch-chain'
import { ConnectWalletIndicatorProps } from '../../features/connect-wallet'
import { ThemeKey } from 'curve-ui-kit/src/shared/lib'
import { Dispatch } from 'react'
import { AppNames } from './constants'

export type Locale = 'en' | 'zh-Hans' | 'zh-Hant' | 'pseudo'
export type AppName = typeof AppNames[number]

export type AppPage = {
  route: string
  label: string
  isActive?: boolean
  target?: '_self' | '_blank'
  groupedTitle?: string
  minWidth?: string
}

export type NavigationSection = {
  title: string
  links: AppPage[]
}

export type BaseHeaderProps<TChainId = number> = {
  currentApp: AppName
  LanguageProps: LanguageSwitcherProps
  ChainProps: ChainSwitcherProps<TChainId>
  WalletProps: ConnectWalletIndicatorProps
  pages: AppPage[]
  sections: NavigationSection[]
  themes: [ThemeKey, Dispatch<ThemeKey>]
  appStats: { label: string, value: string }[]
  advancedMode: [boolean, Dispatch<boolean>]
  locale: Locale
  translations: {
    advanced: string
    advancedMode: string
    theme: string
    language: string
    otherApps: string
    settings: string
    socialMedia: string
  }
}

export type HeaderProps<TChainId> = BaseHeaderProps<TChainId> & {
  isMdUp: boolean
}

export const APP_NAMES = {
  main: 'Curve',
  lend: 'LLAMALEND',
  crvusd: 'crvUSD'
} as const


// TODO: Color should be in theme
export const toolbarColors = {
  light: ['#eeeceb', '#f4f3f0'],
  dark: ['#1f1f1f', '#2f2f2f'] // todo
} as const
