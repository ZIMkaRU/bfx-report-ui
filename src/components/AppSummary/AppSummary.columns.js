import React from 'react'
import { Cell } from '@blueprintjs/table'

import { formatFee, fixedFloat } from 'ui/utils'
import { getTooltipContent } from 'utils/columns'

import {
  getIsTotal,
  formatUsdValue,
  formatPercentValue,
  formatUsdValueChange,
  shouldShowPercentCheck,
} from './AppSummary.helpers'

export const getFeesColumns = ({
  makerFee,
  isTurkishSite,
  derivTakerFee,
  takerFeeToFiat,
  takerFeeToStable,
  takerFeeToCrypto,
  derivMakerRebate,
}) => [
  {
    id: 'makerFee',
    name: 'summary.fees.maker',
    width: 100,
    renderer: () => (
      <Cell>
        {formatFee(makerFee)}
        %
      </Cell>
    ),
  },
  {
    id: 'takerFeeCrypto',
    name: 'summary.fees.taker_crypto',
    width: 140,
    renderer: () => (
      <Cell>
        {formatFee(takerFeeToCrypto)}
        %
      </Cell>
    ),
  },
  {
    id: 'takerFeeFiat',
    name: 'summary.fees.taker_fiat',
    width: 140,
    renderer: () => (
      <Cell>
        {formatFee(takerFeeToFiat)}
        %
      </Cell>
    ),
  },
  {
    id: 'takerFeeStable',
    name: 'summary.fees.taker_stables',
    width: 140,
    renderer: () => (
      <Cell>
        {formatFee(takerFeeToStable)}
        %
      </Cell>
    ),
  },
  ...(!isTurkishSite ? [{
    id: 'derivMakerRebate',
    name: 'summary.fees.deriv_maker',
    width: 140,
    renderer: () => (
      <Cell>
        {formatFee(derivMakerRebate)}
        %
      </Cell>
    ),
  },
  {
    id: 'derivTakerFee',
    name: 'summary.fees.deriv_taker',
    width: 140,
    renderer: () => (
      <Cell>
        {formatFee(derivTakerFee)}
        %
      </Cell>
    ),
  }] : []),
]

export const getAssetColumns = ({
  t,
  preparedData,
}) => [
  {
    id: 'currency',
    className: 'align-left',
    name: 'summary.by_asset.currency',
    width: 110,
    renderer: (rowIndex) => {
      const { currency } = preparedData[rowIndex]
      return (
        <Cell tooltip={getTooltipContent(currency, t)}>
          {currency}
        </Cell>
      )
    },
    copyText: rowIndex => preparedData[rowIndex]?.currency,
  },
  {
    id: 'balance',
    name: 'summary.by_asset.balance',
    width: 178,
    renderer: (rowIndex) => {
      const { currency, balance = null, balanceUsd = null } = preparedData[rowIndex]
      const isTotal = getIsTotal(currency, t)
      return (
        <Cell tooltip={getTooltipContent(balance, t)}>
          {isTotal ? (
            <span className='cell-value'>
              $
              {formatUsdValue(balanceUsd)}
            </span>
          ) : (
            <>
              <span className='cell-value'>
                {fixedFloat(balance)}
              </span>
              <br />
              <span className='cell-value secondary-value'>
                $
                {formatUsdValue(balanceUsd)}
              </span>
            </>
          )}
        </Cell>
      )
    },
    copyText: rowIndex => fixedFloat(preparedData[rowIndex]?.balance),
  },
  {
    id: 'valueChange30dUsd',
    name: 'summary.by_asset.balance_change',
    width: 178,
    renderer: (rowIndex) => {
      const { balanceUsd, valueChange30dUsd, valueChange30dPerc } = preparedData[rowIndex]
      const shouldShowPercentChange = shouldShowPercentCheck(balanceUsd, valueChange30dUsd)
      return (
        <Cell tooltip={getTooltipContent(valueChange30dUsd, t)}>
          <>
            <span className='cell-value'>
              {formatUsdValueChange(valueChange30dUsd)}
            </span>
            {shouldShowPercentChange && (
              <>
                <br />
                <span className='cell-value secondary-value'>
                  {formatPercentValue(valueChange30dPerc)}
                </span>
              </>
            )}
          </>
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => preparedData[rowIndex]?.valueChange30dUsd,
  },
  {
    id: 'volume30dUsd',
    name: 'summary.by_asset.volume',
    width: 178,
    renderer: (rowIndex) => {
      const { volume30dUsd } = preparedData[rowIndex]
      return (
        <Cell tooltip={getTooltipContent(volume30dUsd, t)}>
          $
          {formatUsdValue(volume30dUsd)}
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(preparedData[rowIndex]?.volume30dUsd, 2),
  },
  {
    id: 'tradingFees',
    name: 'summary.by_asset.trading_fees',
    width: 178,
    renderer: (rowIndex) => {
      const { volume30dUsd } = preparedData[rowIndex]
      return (
        <Cell tooltip={getTooltipContent(volume30dUsd, t)}>
          $
          {formatUsdValue(volume30dUsd)}
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(preparedData[rowIndex]?.volume30dUsd, 2),
  },
  {
    id: 'marginFundingPayment',
    name: 'summary.by_asset.fund_earnings',
    width: 178,
    renderer: (rowIndex) => {
      const { volume30dUsd } = preparedData[rowIndex]
      return (
        <Cell tooltip={getTooltipContent(volume30dUsd, t)}>
          $
          {formatUsdValue(volume30dUsd)}
        </Cell>
      )
    },
    isNumericValue: true,
    copyText: rowIndex => fixedFloat(preparedData[rowIndex]?.volume30dUsd, 2),
  },
]
