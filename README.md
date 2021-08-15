# Uniswap Option Interface

Just like you would not compare an option expected value to the underlying, you should not compare being an LP to holding the underlying. They have different risk profiles. 

Visualizing LP'ing in a framework of options can help with this. 

### Recomended Reading
- [Uniswap V3 LP Tokens as Perpetual Put and Call Options](https://lambert-guillaume.medium.com/uniswap-v3-lp-tokens-as-perpetual-put-and-call-options-5b66219db827)
- [Synthetic Options and Short Calls in Uniswap V3](https://lambert-guillaume.medium.com/synthetic-options-and-short-calls-in-uniswap-v3-a3aea5e4e273)
- [Rebalancing vs Passive strategies for Uniswap V3 liquidity pools](https://medium.com/@DeFiScientist/rebalancing-vs-passive-strategies-for-uniswap-v3-liquidity-pools-754f033bdabc)
- [Uniswap V3: A Quant Framework to model yield farming returns](https://medium.com/@DeFiScientist/uniswap-v3-a-quant-framework-to-model-yield-farming-returns-941a1600425e)
- [The Replicating Portfolio of a Constant Product Market with Bounded Liquidity](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3898384)

### TODO
- [x] Tick Selector for Multi Tick calls/puts or strangles 
- [ ] Fix strike price display 
- [ ] Payoff Charts
- [x] Covered Call in quote, protected put in base currency

### Trading 
- Trading UniV3 Options allows you to simulate a call or put payoff by using a single tick range order
- A strangle can be emulated by using multiple ticks, note as you increase the ticks you provide over your payoff begins to curve 
- This will be the most liquid place to trade with option like payoffs for any token and pair 
- You can settle your options in any any token pair (not just an ETH put denominated in USDC, but could be in any token) 
- Premium is not paid up front, but accrued over time in fees. Note: you have to consider thee time value of money here, as you only earn **once** the spot price crosses over your single tick range (capturang the entire fee rate once it does, ie 0.3%) 
- Functions like a perpetual option (there is no expiry, you must withdraw your liquidity) 
    - Knowing when to withdraw your liquidity can be hard, if above your tick you might loose a little to impermanent loss (you can think of this as your option being excersised). Best case is probally price rises/below your call/put so that you capture the fees (your preemium) and then reverts back below.
