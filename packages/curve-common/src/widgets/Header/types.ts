import type { AppName, AppPage, Locale } from 'ui/src/AppNav/types'
import { LanguageSwitcherProps } from '../../features/switch-language'
import { ChainSwitcherProps } from '../../features/switch-chain'
import { ConnectWalletIndicatorProps } from '../../features/connect-wallet'
import { Dispatch } from 'react'
import { ThemeKey } from 'curve-ui-kit/src/themes/basic-theme'

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
  lend: 'Llamalend',
  crvusd: 'crvUSD'
} as const
