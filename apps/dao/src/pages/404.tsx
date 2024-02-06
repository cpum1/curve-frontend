import type { NextPage } from 'next'

import { t } from '@lingui/macro'

import DocumentHead from '@/layout/DocumentHead'
import ErrorVideo from 'components/Page404'

const Page404: NextPage<PageProps> = () => {
  return (
    <>
      <DocumentHead title={t`Error 404`} />
      <ErrorVideo />
    </>
  )
}

export default Page404
