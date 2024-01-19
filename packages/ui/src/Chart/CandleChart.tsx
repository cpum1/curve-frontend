import type { LpPriceOhlcDataFormatted, ChartType, ChartHeight } from './types'

import { createChart, ColorType, CrosshairMode, LineStyle, IChartApi } from 'lightweight-charts'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

type Props = {
  chartType: ChartType
  chartHeight: ChartHeight
  lpTokenData: LpPriceOhlcDataFormatted[]
  timeOption: string
  wrapperRef: any
  chartExpanded?: boolean
  magnet: boolean
  themeType: string
}

const CandleChart = ({
  chartType,
  chartHeight,
  lpTokenData,
  timeOption,
  wrapperRef,
  chartExpanded,
  magnet,
  themeType,
}: Props) => {
  const chartContainerRef = useRef(null)
  const chartRef = useRef<IChartApi | null>(null)

  const [chartCreated, setChartCreated] = useState(false)
  const [lastTheme, setLastTheme] = useState(themeType)
  const [isUnmounting, setIsUnmounting] = useState(false)

  const [colors, setColors] = useState({
    backgroundColor: '#fafafa',
    lineColor: '#2962FF',
    textColor: 'black',
    areaTopColor: '#2962FF',
    areaBottomColor: 'rgba(41, 98, 255, 0.28)',
    chartGreenColor: '#2962FF',
    chartRedColor: '#ef5350',
    chartLabelColor: '#9B7DFF',
  })

  useEffect(() => {
    const style = getComputedStyle(document.body)
    const backgroundColor =
      chartType === 'crvusd'
        ? style.getPropertyValue('--tab-secondary--content--background-color')
        : style.getPropertyValue('--box--secondary--background-color')
    const lineColor = style.getPropertyValue('--line-color')
    const textColor = style.getPropertyValue('--page--text-color')
    const areaTopColor = style.getPropertyValue('--area-top-color')
    const areaBottomColor = style.getPropertyValue('--area-bottom-color')
    const chartGreenColor = style.getPropertyValue('--chart-green')
    const chartRedColor = style.getPropertyValue('--chart-red')
    const chartLabelColor = style.getPropertyValue('--chart-label')
    const warningColor = style.getPropertyValue('--warning-400')

    setColors({
      backgroundColor,
      lineColor,
      textColor,
      areaTopColor,
      areaBottomColor,
      chartGreenColor,
      chartRedColor,
      chartLabelColor,
    })
    setLastTheme(themeType)
  }, [chartType, lastTheme, themeType])

  useEffect(() => {
    if (chartCreated && !lpTokenData) return

    if (chartContainerRef.current) {
      chartRef.current = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: colors.backgroundColor },
          textColor: colors.textColor,
        },
        width: wrapperRef.current.clientWidth,
        height: chartExpanded ? chartHeight.expanded : chartHeight.standard,
        timeScale: {
          timeVisible: timeOption === 'day' ? false : true,
        },
        rightPriceScale: {
          autoScale: true,
          alignLabels: true,
          borderVisible: false,
          scaleMargins: {
            top: 0.1,
            bottom: 0.1,
          },
        },
        grid: {
          vertLines: {
            visible: false,
          },
          horzLines: {
            visible: false,
          },
        },
        crosshair: {
          mode: magnet ? CrosshairMode.Magnet : CrosshairMode.Normal,
          vertLine: {
            width: 4,
            color: '#C3BCDB44',
            style: LineStyle.Solid,
            labelBackgroundColor: '#9B7DFF',
          },
          horzLine: {
            color: '#9B7DFF',
            labelBackgroundColor: '#9B7DFF',
          },
        },
      })
      chartRef.current.timeScale()

      let totalDecimalPlaces = 4

      const candlestickSeries = chartRef.current.addCandlestickSeries({
        upColor: '#26a69a',
        downColor: '#ef5350',
        borderVisible: false,
        wickUpColor: '#26a69a',
        wickDownColor: '#ef5350',
        priceFormat: {
          type: 'custom',
          formatter: (price: any) => {
            let [whole, fraction] = price.toString().split('.')

            if (!fraction) {
              return price.toFixed(4)
            }

            let nonZeroIndex = fraction.split('').findIndex((char: any) => char !== '0')

            // If the price is less than 1, then there will be 4 decimal places after the first non-zero digit.
            // If the price is greater than or equal to 1, there will be 4 decimal places after the decimal point.
            totalDecimalPlaces = price >= 1 ? 4 : nonZeroIndex + 4

            return price.toFixed(totalDecimalPlaces)
          },
          minMove: 0.0000001,
        },
      })

      candlestickSeries.setData(lpTokenData)

      setChartCreated(true)

      return () => {
        chartRef.current?.remove()
      }
    }
  }, [
    lpTokenData,
    colors,
    timeOption,
    chartCreated,
    wrapperRef,
    chartExpanded,
    magnet,
    chartType,
    chartHeight.expanded,
    chartHeight.standard,
  ])

  useEffect(() => {
    wrapperRef.current = new ResizeObserver((entries) => {
      if (isUnmounting) return // Skip resizing if the component is unmounting

      let { width, height } = entries[0].contentRect
      width -= 1
      if (width <= 0) return // Skip resizing if the width is negative or zero

      chartRef.current?.applyOptions({ width, height })
      chartRef.current?.timeScale().getVisibleLogicalRange()
    })

    wrapperRef.current.observe(chartContainerRef.current)

    return () => {
      setIsUnmounting(true)
      wrapperRef?.current && wrapperRef.current.disconnect()
    }
  }, [wrapperRef, isUnmounting])

  return <Container ref={chartContainerRef} />
}

const Container = styled.div`
  position: absolute;
  width: 100%;
`

export default CandleChart