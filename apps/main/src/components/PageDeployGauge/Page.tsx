import type { NextPage } from 'next'

import { t } from '@lingui/macro'
import { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { breakpoints } from '@/ui/utils/responsive'

import DocumentHead from '@/layout/default/DocumentHead'
import DeployGauge from '@/components/PageDeployGauge/index'

import { scrollToTop } from '@/utils'
import usePageOnMount from '@/hooks/usePageOnMount'

const Page: NextPage<PageProps> = ({ curve }) => {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  usePageOnMount(params, location, navigate)

  useEffect(() => {
    scrollToTop()
  }, [])

  return (
    <>
      <DocumentHead title={t`Deploy Gauge`} />
      <Container>
        <DeployGauge curve={curve as CurveApi} />
      </Container>
    </>
  )
}

const Container = styled.div`
  margin: 0 auto;
  max-width: var(--width);
  min-height: 50vh;

  @media (min-width: 46.875rem) {
    margin: 1.5rem 0;
  }

  @media (min-width: ${breakpoints.lg}rem) {
    margin: 1.5rem;
  }
`

export default Page