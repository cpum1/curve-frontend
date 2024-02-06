import type { NextPage } from 'next'

import { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { breakpoints, scrollToTop } from '@/ui/utils'
import usePageOnMount from '@/hooks/usePageOnMount'

import Dao from '@/components/PageDao/index'
import DocumentHead from '@/layout/DocumentHead'
import Settings from '@/layout/Settings'
import Spinner, { SpinnerWrapper } from '@/ui/Spinner'

const Page: NextPage = () => {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { routerParams } = usePageOnMount(params, location, navigate)
  const { rChainId } = routerParams

  useEffect(() => {
    scrollToTop()
  }, [])

  return (
    <>
      <DocumentHead title="" />
      <Container>
        {rChainId ? (
          <Dao />
        ) : (
          <SpinnerWrapper minHeight="50vh">
            <Spinner />
          </SpinnerWrapper>
        )}
      </Container>
      <Settings showScrollButton />
    </>
  )
}

const Container = styled.div`
  background-color: var(--table--background-color);
  min-height: 50vh;
  @media (min-width: ${breakpoints.lg}rem) {
    margin: 1.5rem;
  }
`

export default Page
