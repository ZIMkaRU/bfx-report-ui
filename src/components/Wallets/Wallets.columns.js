import React from 'react'
import { Cell } from '@blueprintjs/table'

import { insertIf, fixedFloat } from 'ui/utils'
import {
  COLUMN_WIDTHS,
  getCellState,
  getTooltipContent,
} from 'utils/columns'
import config from 'config'

export default function getColumns(props) {
  const {
    t,
    isNoData,
    isLoading,
    filteredData,
  } = props

  return [
    {
      id: 'currency',
      name: 'column.currency',
      className: 'align-left',
      width: 100,
      renderer: (rowIndex) => {
        if (isLoading || isNoData) return getCellState(isLoading, isNoData, t('column.noResults'))
        const { currency } = filteredData[rowIndex]
        return (
          <Cell tooltip={getTooltipContent(currency, t)}>
            {currency}
          </Cell>
        )
      },
      copyText: rowIndex => filteredData[rowIndex].currency,
    },
    {
      id: 'balance',
      name: 'column.balance',
      width: COLUMN_WIDTHS.amount,
      renderer: (rowIndex) => {
        if (isLoading || isNoData) return getCellState(isLoading, isNoData)
        const { balance } = filteredData[rowIndex]
        const fixedBalance = fixedFloat(balance)
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={getTooltipContent(fixedBalance, t)}
          >
            {fixedBalance}
          </Cell>
        )
      },
      isNumericValue: true,
      copyText: rowIndex => fixedFloat(filteredData[rowIndex].balance),
    },
    ...insertIf(config.showFrameworkMode, (
      {
        id: 'balanceUsd',
        name: 'column.balanceUsd',
        width: COLUMN_WIDTHS.balanceUsd,
        renderer: (rowIndex) => {
          if (isLoading || isNoData) return getCellState(isLoading, isNoData)
          const { balanceUsd } = filteredData[rowIndex]
          const fixedBalanceUsd = fixedFloat(balanceUsd)
          return (
            <Cell
              className='bitfinex-text-align-right'
              tooltip={getTooltipContent(fixedBalanceUsd, t)}
            >
              {fixedBalanceUsd}
            </Cell>
          )
        },
        isNumericValue: true,
        copyText: rowIndex => fixedFloat(filteredData[rowIndex].balanceUsd),
      }
    )),
  ]
}
