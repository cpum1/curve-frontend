import { t } from '@lingui/macro'

import useStore from '@/store/useStore'

import {
  Wrapper,
  MainTransactionStep,
  StepTitle,
  SuccessIcon,
  TransactionLink,
  IconWrapper,
  StyledRCPinBottom,
  ResetButton,
} from './styles'

import Icon from '@/ui/Icon'
import Box from '@/ui/Box'
import Spinner from '@/ui/Spinner'

type WithdrawTrackingProps = {
  className?: string
}

const WithdrawTracking = ({ className }: WithdrawTrackingProps) => {
  const { withdrawTransaction, setTransactionsReset } = useStore((state) => state.scrvusd)

  const withdrawConfirmed = withdrawTransaction.transactionStatus === 'success'
  const withdrawConfirming = withdrawTransaction.transactionStatus === 'confirming'
  const withdrawLoading = withdrawTransaction.transactionStatus === 'loading'
  const getWithdrawTitle = () => {
    if (withdrawConfirming) {
      return t`Confirm Withdraw`
    }
    if (withdrawLoading) {
      return t`Withdraw awaiting confirmation`
    }
    return t`Withdraw Confirmed`
  }
  const withdrawTitle = getWithdrawTitle()

  return (
    <Wrapper className={className}>
      <MainTransactionStep approvalReady={true}>
        <StyledRCPinBottom />
        <Box flex flexColumn>
          <StepTitle>{withdrawTitle}</StepTitle>
          {withdrawConfirmed && (
            <TransactionLink href={withdrawTransaction.transaction ?? ''}>{t`View transaction`}</TransactionLink>
          )}
        </Box>
        <IconWrapper>
          {withdrawConfirmed && <SuccessIcon name="CheckmarkFilled" size={20} />}
          {withdrawConfirming && <Icon name="Wallet" size={20} />}
          {withdrawLoading && <Spinner size={16} />}
        </IconWrapper>
      </MainTransactionStep>
      {withdrawConfirmed && (
        <ResetButton
          variant="text"
          size="small"
          onClick={() => setTransactionsReset()}
        >{t`Make another withdrawl`}</ResetButton>
      )}
    </Wrapper>
  )
}

export default WithdrawTracking
