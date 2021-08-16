import React from 'react'
import { ButtonOutlined } from 'components/Button'
import { AutoRow } from 'components/Row'
import { TYPE } from 'theme'
import styled from 'styled-components/macro'
import { Trans } from '@lingui/macro'

const Button = styled(ButtonOutlined).attrs(() => ({
  padding: '8px',
  $borderRadius: '8px',
}))`
  color: ${({ theme }) => theme.text1};
  flex: 1;
`

export default function CoveredCall({ setCoveredCallRange }: { setCoveredCallRange: () => void }) {
  return (
    <AutoRow gap="4px" width="auto">
      <Button onClick={() => setCoveredCallRange()}>
        <TYPE.body fontSize={12}>
          <Trans>Call</Trans>
        </TYPE.body>
      </Button>
    </AutoRow>
  )
}

export function ProtectedPut({ setProtectedPutRange }: { setProtectedPutRange: () => void }) {
  return (
    <AutoRow gap="4px" width="auto">
      <Button onClick={() => setProtectedPutRange()}>
        <TYPE.body fontSize={12}>
          <Trans>Put</Trans>
        </TYPE.body>
      </Button>
    </AutoRow>
  )
}

export function Strangle({ setStrangleRange }: { setStrangleRange: () => void }) {
  return (
    <AutoRow gap="4px" width="auto">
      <Button onClick={() => setStrangleRange()}>
        <TYPE.body fontSize={12}>
          <Trans>Strangle</Trans>
        </TYPE.body>
      </Button>
    </AutoRow>
  )
}

export function Straddle({ setStraddleRange }: { setStraddleRange: () => void }) {
  return (
    <AutoRow gap="4px" width="auto">
      <Button onClick={() => setStraddleRange()}>
        <TYPE.body fontSize={12}>
          <Trans>Straddle</Trans>
        </TYPE.body>
      </Button>
    </AutoRow>
  )
}
