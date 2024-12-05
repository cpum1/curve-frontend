import { useEffect } from 'react'
import styled from 'styled-components'

import useStore from '@/store/useStore'
import { formatNumber } from '@/ui/utils'
import { t } from '@lingui/macro'

import Box from '@/ui/Box'
import MetricsComp, { MetricsColumnData } from '@/components/MetricsComp'
import Tooltip from '@/ui/Tooltip'

const CrvStats: React.FC = () => {
  const provider = useStore((state) => state.wallet.getProvider(''))
  const { veCrvData, getVeCrvData, veCrvFees, veCrvHolders } = useStore((state) => state.analytics)

  const noProvider = !provider
  const veCrvLoading = veCrvData.fetchStatus === 'LOADING'
  const veCrvFeesLoading = veCrvFees.fetchStatus === 'LOADING'

  useEffect(() => {
    if (provider && veCrvData.totalCrv === 0 && veCrvData.fetchStatus !== 'ERROR') {
      getVeCrvData(provider)
    }
  }, [veCrvData.totalCrv, veCrvData.fetchStatus, getVeCrvData, provider])

  const veCrvApr = veCrvLoading || veCrvFeesLoading ? 0 : calculateApr(veCrvFees.fees[1].fees_usd, veCrvData.totalVeCrv)

  return (
    <Wrapper>
      <Container>
        <h4>{t`VECRV METRICS`}</h4>
        <MetricsContainer>
          <MetricsComp
            loading={provider && veCrvLoading}
            title={t`Total CRV`}
            data={
              <MetricsColumnData>
                {noProvider ? '-' : formatNumber(veCrvData.totalCrv, { notation: 'compact' })}
              </MetricsColumnData>
            }
          />
          <MetricsComp
            loading={provider && veCrvLoading}
            title={t`Locked CRV`}
            data={
              <MetricsColumnData>
                {noProvider ? '-' : formatNumber(veCrvData.totalLockedCrv, { notation: 'compact' })}
              </MetricsColumnData>
            }
          />
          <MetricsComp
            loading={provider && veCrvLoading}
            title={t`veCRV`}
            data={
              <MetricsColumnData>
                {noProvider ? '-' : formatNumber(veCrvData.totalVeCrv, { notation: 'compact' })}
              </MetricsColumnData>
            }
          />
          <MetricsComp
            loading={veCrvHolders.fetchStatus === 'LOADING'}
            title={t`Holders`}
            data={
              <StyledTooltip
                tooltip={t`${veCrvHolders.canCreateVote} veCRV holders can create a new proposal (minimum 2500 veCRV is required)`}
              >
                <MetricsColumnData>
                  {formatNumber(veCrvHolders.totalHolders, { notation: 'compact' })}
                </MetricsColumnData>
              </StyledTooltip>
            }
          />
          <MetricsComp
            loading={provider && veCrvLoading}
            title={t`CRV Supply Locked`}
            data={
              <MetricsColumnData>
                {noProvider
                  ? '-'
                  : `${formatNumber(veCrvData.lockedPercentage, {
                      notation: 'compact',
                    })}%`}
              </MetricsColumnData>
            }
          />
          <MetricsComp
            loading={provider && (veCrvLoading || veCrvFeesLoading)}
            title={t`veCRV APR`}
            data={
              <AprRow>
                <MetricsColumnData noMargin>
                  {noProvider ? '-' : `~${formatNumber(veCrvApr, { notation: 'compact' })}%`}
                </MetricsColumnData>
              </AprRow>
            }
          />
        </MetricsContainer>
      </Container>
    </Wrapper>
  )
}

const calculateApr = (fees: number, totalVeCrv: number) => {
  return (((fees / totalVeCrv) * 52) / 0.3) * 100
}

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  background-color: var(--box--secondary--background-color);
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  padding: var(--spacing-3);
  background-color: var(--box--secondary--background-color);
  @media (min-width: 20.625rem) {
    grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
  }
  @media (min-width: 48rem) {
    display: flex;
    column-gap: var(--spacing-4);
  }
`

const MetricsContainer = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-3) var(--spacing-4);
  @media (min-width: 28.125rem) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`

const StyledTooltip = styled(Tooltip)`
  min-height: 0;
`

const AprRow = styled.div`
  display: flex;
  gap: 0 var(--spacing-1);
  padding-top: var(--spacing-1);
  align-items: flex-end;
`

export default CrvStats