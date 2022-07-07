import React, { Fragment } from 'react'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

import JSONFormat from 'ui/JSONFormat'
import { formatAmount, fixedFloat } from 'ui/utils'
import { COLUMN_WIDTHS, getColumnWidth } from 'utils/columns'

export default function getColumns(props) {
  const {
    columnsWidth,
    filteredData,
    getFullTime,
    onIdClick,
    t,
    timeOffset,
  } = props

  return [
    {
      id: 'id',
      name: 'column.id',
      width: getColumnWidth('id', columnsWidth) || COLUMN_WIDTHS.ORDER_ID,
      renderer: (rowIndex) => {
        const { id, pair, amountExecuted } = filteredData[rowIndex]
        /* eslint-disable jsx-a11y/anchor-is-valid */
        return (
          <Cell tooltip={id}>
            <Fragment>
              {amountExecuted
                ? <a href='#' onClick={e => onIdClick(e, { id, pair })}>{id}</a>
                : id}
            </Fragment>
          </Cell>
        )
        /* eslint-enable jsx-a11y/anchor-is-valid */
      },
      copyText: rowIndex => filteredData[rowIndex].id,
    },
    {
      id: 'pair',
      name: 'column.pair',
      width: getColumnWidth('pair', columnsWidth) || COLUMN_WIDTHS.PAIR,
      renderer: (rowIndex) => {
        const { pair } = filteredData[rowIndex]
        return (
          <Cell tooltip={pair}>
            {pair}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].pair,
    },
    {
      id: 'type',
      name: 'column.type',
      width: getColumnWidth('type', columnsWidth) || COLUMN_WIDTHS.ORDER_TYPE,
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
      width: getColumnWidth('amountExecuted', columnsWidth) || COLUMN_WIDTHS.AMOUNT,
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
      id: 'price',
      name: 'column.price',
      width: getColumnWidth('price', columnsWidth) || COLUMN_WIDTHS.AMOUNT,
      renderer: (rowIndex) => {
        const { price } = filteredData[rowIndex]
        const fixedPrice = fixedFloat(price)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedPrice}
          >
            {fixedPrice}
          </Cell>
        )
      },
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].price),
    },
    {
      id: 'priceAvg',
      name: 'column.avgprice',
      width: getColumnWidth('priceAvg', columnsWidth) || COLUMN_WIDTHS.AMOUNT,
      renderer: (rowIndex) => {
        const { priceAvg } = filteredData[rowIndex]
        const fixedPrice = fixedFloat(priceAvg)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedPrice}
          >
            {fixedPrice}
          </Cell>
        )
      },
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].priceAvg),
    },
    {
      id: 'mtsCreate',
      nameStr: `${t('column.created')} (${timeOffset})`,
      width: getColumnWidth('mtsCreate', columnsWidth) || COLUMN_WIDTHS.DATE,
      renderer: (rowIndex) => {
        const timestamp = getFullTime(filteredData[rowIndex].mtsCreate)
        return (
          <Cell tooltip={timestamp}>
            <TruncatedFormat>
              {timestamp}
            </TruncatedFormat>
          </Cell>
        )
      },
      copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsCreate),
    },
    {
      id: 'mtsUpdate',
      nameStr: `${t('column.updated')} (${timeOffset})`,
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
      id: 'priceTrailing',
      name: 'column.pricetrail',
      width: getColumnWidth('priceTrailing', columnsWidth) || 125,
      renderer: (rowIndex) => {
        const { priceTrailing } = filteredData[rowIndex]
        const fixedPrice = fixedFloat(priceTrailing)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={fixedPrice}
          >
            {fixedPrice}
          </Cell>
        )
      },
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].priceTrailing),
    },
    {
      id: 'typePrev',
      name: 'column.typeprev',
      width: getColumnWidth('typePrev', columnsWidth) || COLUMN_WIDTHS.ORDER_TYPE,
      renderer: (rowIndex) => {
        const { typePrev } = filteredData[rowIndex]
        return (
          <Cell tooltip={typePrev}>
            {typePrev}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].typePrev,
    },
    {
      id: 'meta',
      name: 'column.meta',
      width: getColumnWidth('meta', columnsWidth) || COLUMN_WIDTHS.META,
      renderer: (rowIndex) => {
        const { meta } = filteredData[rowIndex]
        const formattedMeta = JSON.stringify(meta, undefined, 2)

        return (
          <Cell>
            <JSONFormat content={formattedMeta}>
              {formattedMeta}
            </JSONFormat>
          </Cell>
        )
      },
      copyText: rowIndex => JSON.stringify(filteredData[rowIndex].meta) || '',
    },
  ]
}
