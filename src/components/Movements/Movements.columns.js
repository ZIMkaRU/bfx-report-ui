import React from 'react'
import { Cell } from '@blueprintjs/table'

import config from 'config'
import Explorer from 'ui/Explorer'
import { prepareCurrency } from 'state/symbols/utils'
import { getCellState, getColumnWidth } from 'utils/columns'
import { formatAmount, fixedFloat, insertIf } from 'ui/utils'

const getColumns = ({
  t,
  isNoData,
  isLoading,
  timeOffset,
  tetherNames,
  getFullTime,
  filteredData,
  columnsWidth,
  onDetailsClick,
}) => [
  {
    id: 'moreDetails',
    name: 'column.moreDetails',
    className: 'align-left',
    width: getColumnWidth('moreDetails', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const { id } = filteredData[rowIndex]
      return (
        <Cell tooltip={t('column.moreDetails')}>
          <>
            <a
              href='#'
              onClick={e => onDetailsClick(e, { id })}
            >
              {t('column.show')}
            </a>
          </>
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].id,
  },
  {
    id: 'id',
    name: 'column.id',
    className: 'align-left',
    width: getColumnWidth('id', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
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
    id: 'mtsUpdated',
    className: 'align-left',
    nameStr: `${t('column.date')} (${timeOffset})`,
    width: getColumnWidth('mtsUpdated', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const timestamp = getFullTime(filteredData[rowIndex].mtsUpdated)
      return (
        <Cell tooltip={timestamp}>
          {timestamp}
        </Cell>
      )
    },
    copyText: rowIndex => getFullTime(filteredData[rowIndex].mtsUpdated),
  },
  {
    id: 'currency',
    name: 'column.currency',
    className: 'align-left',
    width: getColumnWidth('currency', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const { currency, currencyName } = filteredData[rowIndex]
      const preparedCurrency = prepareCurrency(currency, currencyName, tetherNames)
      return (
        <Cell tooltip={preparedCurrency}>
          {preparedCurrency}
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].currency,
  },
  {
    id: 'status',
    name: 'column.status',
    className: 'align-left',
    width: getColumnWidth('status', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
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
    id: 'amount',
    name: 'column.amount',
    width: getColumnWidth('amount', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const { amount, currency } = filteredData[rowIndex]
      const tooltip = `${fixedFloat(amount)} ${currency}`
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={tooltip}
        >
          {formatAmount(amount)}
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].amount),
  },
  ...insertIf(config.showFrameworkMode, (
    {
      id: 'amountUsd',
      name: 'column.amountUsd',
      width: getColumnWidth('amountUsd', columnsWidth),
      renderer: (rowIndex) => {
        if (isLoading || isNoData) {
          return getCellState(isLoading, isNoData)
        }
        const { amountUsd } = filteredData[rowIndex]
        const tooltip = `${fixedFloat(amountUsd)} ${t('column.usd')}`
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={tooltip}
          >
            {formatAmount(amountUsd)}
          </Cell>
        )
      },
      isNumericValue: true,
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].amountUsd),
    }
  )),
  {
    id: 'fees',
    name: 'column.fees',
    width: getColumnWidth('fees', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const { fees, currency } = filteredData[rowIndex]
      const tooltip = `${fixedFloat(fees)} ${currency}`
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={tooltip}
        >
          <>
            {formatAmount(fees)}
            {' '}
            <span className='bitfinex-show-soft'>
              {currency}
            </span>
          </>
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(filteredData[rowIndex].fees),
  },
  {
    id: 'destinationAddress',
    name: 'column.destination',
    className: 'align-left',
    width: getColumnWidth('destinationAddress', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const { currency, destinationAddress } = filteredData[rowIndex]
      return (
        <Cell tooltip={destinationAddress}>
          <>
            {destinationAddress}
            {' '}
            <Explorer currency={currency} destinationAddress={destinationAddress} />
          </>
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].destinationAddress,
  },
  {
    id: 'transactionId',
    name: 'column.transactionId',
    className: 'align-left',
    width: getColumnWidth('transactionId', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const { transactionId } = filteredData[rowIndex]
      return (
        <Cell tooltip={transactionId}>
          {transactionId}
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].transactionId,
  },
  {
    id: 'note',
    name: 'column.note',
    className: 'align-left',
    width: getColumnWidth('note', columnsWidth),
    renderer: (rowIndex) => {
      if (isLoading || isNoData) {
        return getCellState(isLoading, isNoData)
      }
      const { note } = filteredData[rowIndex]
      return (
        <Cell tooltip={note}>
          {note}
        </Cell>
      )
    },
    copyText: rowIndex => filteredData[rowIndex].note,
  },
]

export default getColumns
