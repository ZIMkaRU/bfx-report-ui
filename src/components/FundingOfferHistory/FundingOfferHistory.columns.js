import React from 'react'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import { formatAmount, fixedFloat } from 'ui/utils'
import { COLUMN_WIDTHS, getColumnWidth } from 'utils/columns'

export default function getColumns(props) {
  const {
    columnsWidth,
    filteredData,
    getFullTime,
    t,
    timeOffset,
  } = props

  return [
    {
      id: 'id',
      name: 'column.id',
      width: getColumnWidth('id', columnsWidth) || COLUMN_WIDTHS.ID,
      renderer: (rowIndex) => {
        const { id } = filteredData[rowIndex]
        return (
          <Cell tooltip={id}>
            {id}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].id,
    },
    {
      id: 'symbol',
      name: 'column.currency',
      width: getColumnWidth('symbol', columnsWidth) || COLUMN_WIDTHS.SYMBOL,
      renderer: (rowIndex) => {
        const { symbol } = filteredData[rowIndex]
        return (
          <Cell tooltip={symbol}>
            {symbol}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].symbol,
    },
    {
      id: 'amountOrig',
      name: 'column.amount',
      width: getColumnWidth('amountOrig', columnsWidth) || COLUMN_WIDTHS.AMOUNT,
      renderer: (rowIndex) => {
        const { amountOrig } = filteredData[rowIndex]
        const fixedAmount = fixedFloat(amountOrig)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedAmount}
          >
            {fixedAmount}
          </Cell>
        )
      },
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].amountOrig),
    },
    {
      id: 'amountExecuted',
      name: 'column.amount-exe',
      width: getColumnWidth('amountExecuted', columnsWidth) || 152,
      renderer: (rowIndex) => {
        const { amountExecuted } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedFloat(amountExecuted)}
          >
            {formatAmount(amountExecuted)}
          </Cell>
        )
      },
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].amountExecuted),
    },
    {
      id: 'type',
      name: 'column.type',
      width: getColumnWidth('type', columnsWidth) || 100,
      renderer: (rowIndex) => {
        const { type } = filteredData[rowIndex]
        return (
          <Cell tooltip={type}>
            {type}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].type,
    },
    {
      id: 'status',
      name: 'column.status',
      width: getColumnWidth('status', columnsWidth) || COLUMN_WIDTHS.ORDER_STATUS,
      renderer: (rowIndex) => {
        const { status } = filteredData[rowIndex]
        return (
          <Cell tooltip={status}>
            {status}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].status,
    },
    {
      id: 'rate',
      name: 'column.rateperc',
      width: getColumnWidth('rate', columnsWidth) || COLUMN_WIDTHS.RATE,
      renderer: (rowIndex) => {
        const { rate } = filteredData[rowIndex]
        const fixedRate = fixedFloat(rate)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedRate}
          >
            {fixedRate}
          </Cell>
        )
      },
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].rate),
    },
    {
      id: 'period',
      name: 'column.period',
      width: getColumnWidth('period', columnsWidth) || COLUMN_WIDTHS.PERIOD,
      renderer: (rowIndex) => {
        const period = `${filteredData[rowIndex].period} ${t('column.days')}`
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={period}
          >
            {period}
          </Cell>
        )
      },
      copyText: (rowIndex) => {
        const days = t('column.days')
        return `${filteredData[rowIndex].period} ${days}`
      },
    },
    {
      id: 'mtsUpdate',
      nameStr: `${t('column.date')} (${timeOffset})`,
      width: getColumnWidth('mtsUpdate', columnsWidth) || COLUMN_WIDTHS.DATE,
      renderer: (rowIndex) => {
        const timestamp = getFullTime(filteredData[rowIndex].mtsUpdate)
        return (
          <Cell tooltip={timestamp}>
            <TruncatedFormat>
              {timestamp}
            </TruncatedFormat>
          </Cell>
        )
      },
      copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsUpdate),
    },
  ]
}
