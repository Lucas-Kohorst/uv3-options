import { Trans } from '@lingui/macro'
import { AutoColumn } from 'components/Column'
import { MinimalNetworkAlert } from 'components/NetworkAlert/MinimalNetworkAlert'
import { CHAIN_INFO, SupportedChainId } from 'constants/chains'
import { useActiveWeb3React } from 'hooks/web3'
import styled from 'styled-components/macro'
import { TYPE } from 'theme'
import Texture from '../../assets/images/sandtexture.webp'
import { ExternalLink } from '../../theme'

const CTASection1 = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  margin-top: 8px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: auto;
    grid-template-rows: auto;
  `};
`

const CTASection2 = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 8px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: auto;
    grid-template-rows: auto;
  `};
`

const CTA1 = styled(ExternalLink)`
  background-color: ${({ theme }) => theme.bg2};
  background: radial-gradient(
      92.78% 103.09% at 50.06% 7.22%,
      rgba(255, 58, 212, 0.072) 0%,
      rgba(255, 255, 255, 0.042) 100%
    ),
    radial-gradient(100% 97.16% at 0% 12.22%, rgba(235, 0, 255, 0.2) 0%, rgba(243, 19, 19, 0.2) 100%);
  padding: 2rem;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  border: 1px solid transparent;

  * {
    color: ${({ theme }) => theme.text1};
    text-decoration: none !important;
  }

  :hover {
    border: 1px solid ${({ theme }) => theme.bg0};
    text-decoration: none;
    * {
      text-decoration: none !important;
    }
  }

  :before {
    content: '';
    position: absolute;
    width: 800%;
    height: 480%;
    top: -390px;
    left: -310px;
    z-index: -1;
    opacity: 0.4;
    background: url(${Texture}) 0 0 repeat;
    transform: rotate(-4deg);
  }
`

const CTA2 = styled(ExternalLink)`
  position: relative;
  overflow: hidden;
  padding: 32px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid transparent;

  * {
    color: ${({ theme }) => theme.text1};
    text-decoration: none !important;
  }

  :hover {
    border: 1px solid ${({ theme }) => theme.bg0};
    text-decoration: none !important;
    * {
      text-decoration: none !important;
    }
  }

  :before {
    content: '';
    position: absolute;
    width: 340%;
    height: 280%;
    top: -170%;
    left: -134%;
    opacity: 0.4;
    z-index: -1;
    background: url(${Texture}) 0 0 repeat;
    transform: rotate(-4deg);
  }
`

const HeaderText = styled(TYPE.label)`
  align-items: center;
  display: flex;
  margin-bottom: 24px;
  font-weight: 400;
  font-size: 20px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 20px;
  `};
`

const ResponsiveColumn = styled(AutoColumn)`
  grid-template-columns: 1fr;
  width: 100%;
  gap: 12px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    gap: 8px;
  `};
  justify-content: space-between;
`

export default function CTACards() {
  const { chainId } = useActiveWeb3React()
  const { infoLink } = CHAIN_INFO[chainId ? chainId : SupportedChainId.MAINNET]
  return (
    <div>
      <MinimalNetworkAlert />
      <CTASection1>
        <CTA1 href={'#/add/ETH/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/3000'}>
          <ResponsiveColumn>
            <HeaderText>
              <Trans>V3 Option Framework</Trans>
            </HeaderText>
          </ResponsiveColumn>
        </CTA1>
      </CTASection1>
      <CTASection2>
        <CTA2 href={'#/add/ETH/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/3000'}>
          <ResponsiveColumn>
            <HeaderText style={{ alignSelf: 'flex-start' }}>
              <Trans>Call</Trans> ↗
            </HeaderText>
            <TYPE.body fontWeight={300} style={{ alignSelf: 'flex-start' }}>
              <Trans>Emulate a covered call payoff with a range order</Trans>
            </TYPE.body>
          </ResponsiveColumn>
        </CTA2>
        <CTA2 href={'#/add/ETH/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/3000'}>
          <ResponsiveColumn>
            <HeaderText style={{ alignSelf: 'flex-start' }}>
              <Trans>Put</Trans> ↗
            </HeaderText>
            <TYPE.body fontWeight={300} style={{ alignSelf: 'flex-start' }}>
              <Trans>Emulate a protected put payoff with a range order</Trans>
            </TYPE.body>
          </ResponsiveColumn>
        </CTA2>
        <CTA2 href={'#/add/ETH/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/3000'}>
          <ResponsiveColumn>
            <HeaderText style={{ alignSelf: 'flex-start' }}>
              <Trans>Strangle</Trans> ↗
            </HeaderText>
            <TYPE.body fontWeight={300} style={{ alignSelf: 'flex-start' }}>
              <Trans>Emulate a strangle payoff with a range order over multiple ticks</Trans>
            </TYPE.body>
          </ResponsiveColumn>
        </CTA2>
      </CTASection2>
    </div>
  )
}
