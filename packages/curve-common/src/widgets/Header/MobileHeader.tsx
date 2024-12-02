import { AppBar, Toolbar } from '@mui/material'
import { BaseHeaderProps } from './types'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Drawer from '@mui/material/Drawer'
import { SidebarSection } from './SidebarSection'
import groupBy from 'lodash/groupBy'
import Box from '@mui/material/Box'
import { HeaderStats } from './HeaderStats'
import { SocialSidebarSection } from './SocialSidebarSection'
import { SideBarFooter } from './SideBarFooter'
import { MobileTopBar } from './MobileTopBar'
import { DEFAULT_BAR_SIZE } from 'curve-ui-kit/src/themes/components'
import { APP_LINK, AppNames } from './constants'
import { useLocation } from 'react-router-dom'

const SIDEBAR_WIDTH = {width: '100%', minWidth: 320} as const
const HIDE_SCROLLBAR = {
  // hide the scrollbar, on mobile it's not needed, and it messes up with the SideBarFooter
  '&::-webkit-scrollbar': { display: 'none' }, // chrome, safari, opera
  msOverflowStyle: 'none', // IE and Edge
  scrollbarWidth: 'none', // Firefox
}

const SECONDARY_BACKGROUND = {backgroundColor: 'background.default'}
const zIndex = 1300

export const MobileHeader = <TChainId extends number>({
  mainNavRef,
  currentApp,
  pages,
  appStats,
  themes,
  sections,
  locale,
  translations: t,
  ChainProps,
  isLite = false,
  advancedMode,
  WalletProps: { onConnectWallet: startWalletConnection, ...WalletProps },
}: BaseHeaderProps<TChainId>) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const groupedPages = useMemo(() => groupBy(pages, (p) => p.groupedTitle), [pages])
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])
  const toggleSidebar = useCallback(() => setSidebarOpen((isOpen) => !isOpen), [])
  const { pathname } = useLocation()

  useEffect(() => () => closeSidebar(), [pathname, closeSidebar]) // close when clicking a link

  const onConnect = useCallback(() => {
    closeSidebar()
    startWalletConnection()
  }, [startWalletConnection, closeSidebar])

  return (
    <AppBar color="transparent" position="relative" sx={{ width: '100vw' }} ref={mainNavRef}>
      <Toolbar sx={{ ...SECONDARY_BACKGROUND, paddingY: 3 }}>
        <MobileTopBar
          isLite={isLite}
          ChainProps={ChainProps}
          currentApp={currentApp}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          sx={{ zIndex }}
        />

        <Drawer
          anchor="left"
          onClose={closeSidebar}
          open={isSidebarOpen}
          PaperProps={{ sx: { top: DEFAULT_BAR_SIZE, ...SECONDARY_BACKGROUND, ...SIDEBAR_WIDTH, ...HIDE_SCROLLBAR } }}
          variant="temporary"
          hideBackdrop
          data-testid="mobile-drawer"
        >
          <Box>
            <Box padding={4} display="flex" flexDirection="column">
              <HeaderStats appStats={appStats} />
            </Box>

            {Object.entries(groupedPages).map(([title, pages]) => (
              <SidebarSection title={title} key={title} pages={pages} />
            ))}

            <SidebarSection
              title={t.otherApps}
              pages={AppNames.filter((appName) => appName != currentApp).map((appName) => APP_LINK[appName])}
            />

            {sections.map(({ title, links }) => (
              <SidebarSection key={title} title={title} pages={links} />
            ))}

            <SocialSidebarSection title={t.socialMedia} locale={locale} />
          </Box>

          <SideBarFooter
            translations={t}
            themes={themes}
            advancedMode={advancedMode}
            WalletProps={{ ...WalletProps, onConnectWallet: onConnect }}
            sx={{ ...SIDEBAR_WIDTH, zIndex }}
          />
        </Drawer>
      </Toolbar>
    </AppBar>
  )
}
