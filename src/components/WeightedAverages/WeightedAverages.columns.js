import React from 'react'
import { Cell } from '@blueprintjs/table'

import { formatAmount, fixedFloat } from 'ui/utils'
import { getCellState, getColumnWidth, getTooltipContent } from 'utils/columns'

export const getColumns = ({
  t,
  isNoData,
  isLoading,
  getFullTime,
  filteredData,
  columnsWidth,
}) => [
  {
    id: 'pair',
    name: 'column.pair',
    className: 'align-left',
    width: getColumnWidth('pair', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const { pair } = filteredData[rowIndex]
      return (
        <Cell tooltip={getTooltipContent(pair, t)}>
          {pair}
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].pair,
  },
  {
    id: 'buyingWeightedPrice',
    name: 'column.buyingWeightedPrice',
    width: getColumnWidth('buyingWeightedPrice', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const { buyingWeightedPrice } = filteredData[rowIndex]
      const fixedPrice = fixedFloat(buyingWeightedPrice)
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={getTooltipContent(fixedPrice, t)}
        >
          {fixedPrice}
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].buyingWeightedPrice),
  },
  {
    id: 'buyingAmount',
    name: 'column.buyingAmount',
    width: getColumnWidth('buyingAmount', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const { buyingAmount } = filteredData[rowIndex]
      const tooltip = fixedFloat(buyingAmount)
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={getTooltipContent(tooltip, t)}
        >
          {formatAmount(buyingAmount)}
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].buyingAmount),
  },
  {
    id: 'cost',
    name: 'column.cost',
    width: getColumnWidth('cost', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const { cost } = filteredData[rowIndex]
      const tooltip = fixedFloat(cost)
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={getTooltipContent(tooltip, t)}
        >
          {formatAmount(cost)}
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].cost),
  },
  {
    id: 'sellingWeightedPrice',
    name: 'column.sellingWeightedPrice',
    width: getColumnWidth('sellingWeightedPrice', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const { sellingWeightedPrice } = filteredData[rowIndex]
      const fixedPrice = fixedFloat(sellingWeightedPrice)
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={getTooltipContent(fixedPrice, t)}
        >
          {fixedPrice}
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].sellingWeightedPrice),
  },
  {
    id: 'sellingAmount',
    name: 'column.sellingAmount',
    width: getColumnWidth('sellingAmount', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const { sellingAmount } = filteredData[rowIndex]
      const tooltip = fixedFloat(sellingAmount)
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={getTooltipContent(tooltip, t)}
        >
          {formatAmount(sellingAmount)}
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].sellingAmount),
  },
  {
    id: 'sale',
    name: 'column.sale',
    width: getColumnWidth('sale', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const { sale } = filteredData[rowIndex]
      const tooltip = fixedFloat(sale)
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={getTooltipContent(tooltip, t)}
        >
          {formatAmount(sale)}
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].sale),
  },
  {
    id: 'cumulativeAmount',
    name: 'column.cumulativeAmount',
    width: getColumnWidth('cumulativeAmount', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const { cumulativeAmount } = filteredData[rowIndex]
      const tooltip = fixedFloat(cumulativeAmount)
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={getTooltipContent(tooltip, t)}
        >
          {formatAmount(cumulativeAmount)}
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].cumulativeAmount),
  },
  {
    id: 'firstTradeMts',
    name: 'column.firstTrade',
    width: getColumnWidth('firstTradeMts', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const timestamp = getFullTime(filteredData[rowIndex].firstTradeMts)
      return (
        <Cell tooltip={getTooltipContent(timestamp, t)}>
          {timestamp}
        </Cell>
      )
    },
    copyText: rowIndex => getFullTime(filteredData[rowIndex].firstTradeMts),
  },
  {
    id: 'lastTradeMts',
    name: 'column.lastTrade',
    width: getColumnWidth('lastTradeMts', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const timestamp = getFullTime(filteredData[rowIndex].lastTradeMts)
      return (
        <Cell tooltip={getTooltipContent(timestamp, t)}>
          {timestamp}
        </Cell>
      )
    },
    copyText: rowIndex => getFullTime(filteredData[rowIndex].lastTradeMts),
  },
]
