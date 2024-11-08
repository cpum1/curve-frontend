import type { FunctionComponent, ReactNode } from 'react'
import { List, ListSubheader } from '@mui/material'
import { SidebarItem } from './SidebarItem'
import type { AppPage } from 'curve-common/src/widgets/Header/types'
import Divider from '@mui/material/Divider'
import { Typography } from 'curve-ui-kit/src/shared/ui/Typography'

interface SidebarSectionProps {
  title: string
  pages?: AppPage[]
  children?: ReactNode
}

export const SidebarSection: FunctionComponent<SidebarSectionProps> = ({ pages, title, children }) => (
  <List
    subheader={
      <ListSubheader disableSticky>
        <Typography variant="bodyMBold" color="text.primary" sx={{ textTransform: 'uppercase' }}>
          {title}
        </Typography>
        <Divider />
      </ListSubheader>
    }
    sx={{ marginTop: 3 }}
  >
    {pages?.map((page) => <SidebarItem child key={page.route} page={page}  />)}
    {children}
  </List>
)
