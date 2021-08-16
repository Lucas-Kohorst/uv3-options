import { Trans } from '@lingui/macro'
import { AutoColumn } from 'components/Column'
import { MinimalNetworkAlert } from 'components/NetworkAlert/MinimalNetworkAlert'
import { CHAIN_INFO, SupportedChainId } from 'constants/chains'
import { useActiveWeb3React } from 'hooks/web3'
import styled from 'styled-components/macro'
import { TYPE } from 'theme'
import Texture from '../../assets/images/sandtexture.webp'
import { ExternalLink } from '../../theme'

import TweetEmbed from 'react-tweet-embed'

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

const CTA3 = styled(TYPE.main)`
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
        <CTA1 href={'https://github.com/Uv3Framework/uv3-options#readme'}>
          <ResponsiveColumn>
            <HeaderText>
              <Trans>Uniswap V3 Option Framework ↗</Trans>
            </HeaderText>
            <TYPE.body fontWeight={300} style={{ alignSelf: 'flex-start' }}>
              <Trans>Emulate option payoffs with range orders</Trans>
            </TYPE.body>
          </ResponsiveColumn>
        </CTA1>
      </CTASection1>
      <CTASection1>
        <CTA3>
          <h3>Overview</h3>
          <ul>
            <li>
              Trading UniV3 Options allows you to simulate a call or put payoff by using a single tick range order
            </li>
            <li>
              A strangle can be emulated by using multiple ticks, note as you increase the ticks you provide over your
              payoff begins to curve{' '}
            </li>
            <li>This might be the most liquid place to trade with option like payoffs for any given token pair </li>
            <li>
              You can settle your options in any any token pair (not just an ETH put denominated in USDC, but could be
              in any token){' '}
            </li>
            <li>
              Knowing when to withdraw your liquidity can be hard, if above your tick you might loose a little to
              impermanent loss (you can think of this as your option being exercised). Best case is probably price
              rises/below your call/put so that you capture the fees (your premium) and then reverts back below.
            </li>
          </ul>
          <h3>Premium</h3>
          <ul>
            <li>Premium is not paid up front, but accrued over time in fees. </li>
            <br />
            <i>
              Note: you have to consider the time value of money here, as you only earn fees<strong>once</strong> the
              spot price crosses over your single tick range (capturing the entire fee rate once it does, ie 0.3%)
            </i>{' '}
            <br /> <br />
            <li>
              Ideally the spot price crosses over your tick and then back below, in this case you will capture fees
              twice.
            </li>
          </ul>
          <h3>Expiration</h3>
          <ul>
            <li>Functions like a perpetual option (there is no expiry, you must withdraw your liquidity)</li>
          </ul>
          <h3>Payoff</h3>
          <ul>
            <li>A single tick range order has the exact payoff of a covered call option</li>
            <li>A multiple tick range order has a curved payoff chart</li>
          </ul>
          <h3>Resources</h3>
          <ul>
            <li>
              <a
                style={{ textDecorationLine: 'underline' }}
                href="https://lambert-guillaume.medium.com/uniswap-v3-lp-tokens-as-perpetual-put-and-call-options-5b66219db827"
              >
                Uniswap V3 LP Tokens as Perpetual Put and Call Options ↗
              </a>
            </li>
            <li>
              <a href="https://lambert-guillaume.medium.com/synthetic-options-and-short-calls-in-uniswap-v3-a3aea5e4e273">
                Synthetic Options and Short Calls in Uniswap V3 ↗
              </a>
            </li>
            <li>
              <a href="https://medium.com/@DeFiScientist/rebalancing-vs-passive-strategies-for-uniswap-v3-liquidity-pools-754f033bdabc">
                Rebalancing vs Passive strategies for Uniswap V3 liquidity pools ↗
              </a>
            </li>
            <li>
              <a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3898384">
                The Replicating Portfolio of a Constant Product Market with Bounded Liquidity ↗
              </a>
            </li>
          </ul>
        </CTA3>
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
