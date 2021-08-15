// inspired and forked from https://github.com/ribbon-finance/ribbon-frontend
import React, { useCallback, useMemo } from 'react'
import Chart, { ChartOptions, ChartData } from 'chart.js'
import { Line } from 'react-chartjs-2'
import currency from 'currency.js'

const getRange = (start: number, stop: number, step: number) => {
  const a = [start]
  let b = start
  while (b < stop) {
    a.push((b += step || 1))
  }
  return a
}

// const getData = useCallback(
//   (canvas: any): ChartData => {
//     const ctx = canvas.getContext('2d')
//     const green = ctx.createLinearGradient(0, 130, 0, 148)
//     // green.addColorStop(1, `${colors.green}05`)
//     // green.addColorStop(0, `${colors.green}14`)
//     const red = ctx.createLinearGradient(0, 250, 0, 148)
//     // red.addColorStop(1, `${colors.red}05`)
//     // red.addColorStop(0, `${colors.red}14`)

//     const neighbourPointToBreakeven = findNeighbourPoint(priceRange, breakeven)
//     const closestBreakevenPoint =
//       Math.abs(breakeven - neighbourPointToBreakeven[0]) < Math.abs(breakeven - neighbourPointToBreakeven[1])
//         ? neighbourPointToBreakeven[0]
//         : neighbourPointToBreakeven[1]

//     const neighbourPointToPrice = findNeighbourPoint(priceRange, price).filter((neighbour) => neighbour)
//     const closestPricePoint =
//       neighbourPointToPrice.length < 2 ||
//       Math.abs(price - neighbourPointToPrice[0]) < Math.abs(price - neighbourPointToPrice[1])
//         ? neighbourPointToPrice[0]
//         : neighbourPointToPrice[1]

//     return {
//       labels: priceRange.map((price) => price),
//       datasets: [
//         {
//           label: 'breakevenPoint',
//           data: priceRange.map((p) => (p === closestBreakevenPoint ? 0 : null)),
//           type: 'line',
//           pointRadius: 8,
//           pointHoverRadius: 8,
//           // backgroundColor: colors.primaryText,
//         },
//         {
//           label: 'breakeven',
//           data: priceRange.map(() => 0),
//           type: 'line',
//           pointRadius: 0,
//           pointHoverRadius: 0,
//           borderColor: '#FFFFFF66',
//           borderWidth: 1,
//           // lineTension: 0,
//         },
//         {
//           label: 'green',
//           // @ts-ignore
//           data: priceRange.map((p) =>
//             neighbourPointToBreakeven.includes(p) || calculateProfit(p) >= 0 ? calculateProfit(p) : null
//           ),
//           type: 'line',
//           pointRadius: 0,
//           pointHoverRadius: 0,
//           borderDash: undefined,
//           borderWidth: 2,
//           // borderColor: `${colors.green}`,
//           fill: '-1',
//           backgroundColor: green,
//           // lineTension: 0,
//         },
//         {
//           label: 'red',
//           // @ts-ignore
//           data: priceRange.map((p) =>
//             neighbourPointToBreakeven.includes(p) || calculateProfit(p) <= 0 ? calculateProfit(p) : null
//           ),
//           type: 'line',
//           pointRadius: 0,
//           pointHoverRadius: 0,
//           borderDash: undefined,
//           borderWidth: 2,
//           // borderColor: `${colors.red}`,
//           fill: '-2',
//           backgroundColor: red,
//           // lineTension: 0,
//         },
//         {
//           label: 'price',
//           data: priceRange.map((p) => (p === closestPricePoint ? price : null)),
//           type: 'line',
//           pointRadius: 0,
//           pointHoverRadius: 0,
//         },
//       ],
//     }
//   },
//   [breakeven, calculateProfit, findNeighbourPoint, price, priceRange]
// )

const ProfitChart = () => {
  const options = useMemo((): ChartOptions => {
    return {
      maintainAspectRatio: false,
      layout: { padding: { top: 24 } },
      // scales: {
      //   yAxes: [
      //     {
      //       display: false,
      //       ticks: {
      //         min: isPut ? calculateProfit(priceRange[0]) : calculateProfit(priceRange[priceRange.length - 1]),
      //         max: Math.abs(isPut ? calculateProfit(priceRange[0]) : calculateProfit(priceRange[priceRange.length - 1])),
      //       },
      //     },
      //   ],
      //   xAxes: [{ display: false }],
      // },
      animation: { duration: 0 },
    }
  }, [])

  const drawPricePoint = useCallback((chart: any, price: number, drawIndex: number) => {
    const ctx = chart.chart.ctx
    // Get breakeven datasaet because of stability over every point
    const datasetIndex = chart.chart.data.datasets.findIndex((dataset: any) => dataset.label === 'breakeven')
    const meta = chart.chart.getDatasetMeta(datasetIndex)
    // draw line behind dot
    // ctx.globalCompositeOperation = "destination-over";
    const leftX = chart.chart.scales['x-axis-0'].left
    const rightX = chart.chart.scales['x-axis-0'].right
    const topY = chart.chart.scales['y-axis-0'].top
    const bottomY = chart.chart.scales['y-axis-0'].bottom - 1
    /**
     * Draw price point
     */
    const priceElement = meta.data[drawIndex]
    const priceX = priceElement._view.x

    ctx.save()
    ctx.beginPath()
    ctx.moveTo(priceX, topY)
    ctx.lineTo(priceX, bottomY)
    ctx.lineWidth = 2
    // ctx.strokeStyle = colors.primaryText
    ctx.stroke()
    ctx.restore()

    /**
     * Draw price text
     */
    ctx.fillStyle = 'white'
    const fontSize = 12
    const fontStyle = 'normal'
    const fontFamily = 'VCR, sans-serif'
    // ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    const padding = 8

    const text = `${drawIndex === 0 ? '<<< ' : ''}${currency(price).format()}${
      drawIndex === meta.data.length - 1 ? ' >>>' : ''
    }`
    const textLength = ctx.measureText(text).width

    let xPosition = priceX

    if (xPosition - textLength / 2 < leftX) {
      xPosition = leftX + padding + textLength / 2
    }

    if (xPosition + textLength / 2 > rightX) {
      xPosition = rightX - padding - textLength / 2
    }

    ctx.fillText(text, xPosition, topY - fontSize / 2 - padding)

    ctx.globalCompositeOperation = 'source-over'
  }, [])

  const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  }

  const chart = useMemo(() => {
    // const neighbourPointToStrike = findNeighbourPoint(priceRange, strike)
    // const closestStrikePoint =
    //   Math.abs(strike - neighbourPointToStrike[0]) < Math.abs(strike - neighbourPointToStrike[1])
    //     ? neighbourPointToStrike[0]
    //     : neighbourPointToStrike[1]
    // const closestStrikeIndex = priceRange.findIndex((p) => p === closestStrikePoint)

    return (
      <Line
        data={data}
        options={options}
        plugins={[
          {
            afterDraw: (chart: any) => {
              const ctx = chart.chart.ctx
              // Get breakeven dataset because of stability over every point
              const datasetIndex = chart.chart.data.datasets.findIndex((dataset: any) => dataset.label === 'breakeven')
              const meta = chart.chart.getDatasetMeta(datasetIndex)
              // draw line behind dot
              // ctx.globalCompositeOperation = "destination-over";
              const leftX = chart.chart.scales['x-axis-0'].left
              const rightX = chart.chart.scales['x-axis-0'].right
              const topY = chart.chart.scales['y-axis-0'].top
              const bottomY = chart.chart.scales['y-axis-0'].bottom - 1

              /**
               * Draw top and bottom border
               */
              ctx.save()
              ctx.beginPath()
              ctx.moveTo(leftX, topY)
              ctx.lineTo(rightX, topY)
              ctx.lineWidth = 1
              // ctx.strokeStyle = colors.border
              ctx.stroke()
              ctx.beginPath()
              ctx.moveTo(leftX, bottomY)
              ctx.lineTo(rightX, bottomY)
              ctx.stroke()
              ctx.restore()

              /**
               * Draw strike point
               */
              const strikeElement = meta.data[10] //closestStrikeIndex
              const strikeX = strikeElement._view.x

              ctx.save()
              ctx.beginPath()
              ctx.setLineDash([5, 5])
              ctx.moveTo(strikeX, topY)
              ctx.lineTo(strikeX, bottomY)
              ctx.lineWidth = 1
              // ctx.strokeStyle = `${colors.primaryText}66`
              ctx.stroke()
              ctx.restore()

              /**
               * Draw price point
               */
              const priceDatasetIndex = chart.chart.data.datasets.findIndex((dataset: any) => dataset.label === 'price')
              const priceDataset = chart.chart.data.datasets[priceDatasetIndex]

              drawPricePoint(
                chart,
                priceDataset.data.find((data: any) => data !== null),
                priceDataset.data.findIndex((data: any) => data !== null)
              )
            },
          },
        ]}
      />
    )
  }, [drawPricePoint])

  return chart
}

export default ProfitChart
