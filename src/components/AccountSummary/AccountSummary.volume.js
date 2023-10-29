import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Cell } from '@blueprintjs/table'
import { isEmpty } from '@bitfinex/lib-js-util-base'

import DataTable from 'ui/DataTable'
import { fixedFloat, formatAmount } from 'ui/utils'
import { COLUMN_WIDTHS, getTooltipContent } from 'utils/columns'

const getColumns = ({ data, t }) => [
  {
    id: 'currency',
    name: 'column.currency',
    className: 'align-left',
    width: COLUMN_WIDTHS.SYMBOL,
    renderer: (rowIndex) => {
      const { curr } = data[rowIndex]
      return (
        <Cell tooltip={getTooltipContent(curr, t)}>
          {curr}
        </Cell>
      )
    },
    copyText: rowIndex => data[rowIndex].curr,
  },
  {
    id: 'volume',
    name: 'column.volume',
    width: COLUMN_WIDTHS.AMOUNT,
    renderer: (rowIndex) => {
      const { curr, vol } = data[rowIndex]
      const fixedVolume = fixedFloat(vol)
      return (
        <Cell
          className='bitfinex-text-align-right'
          tooltip={getTooltipContent(fixedVolume, t)}
        >
          {formatAmount(vol, {
            digits: 2,
            formatThousands: true,
            dollarSign: curr === 'USD' || curr === 'Total (USD)',
          })}
        </Cell>
      )
    },
    copyText: rowIndex => fixedFloat(data[rowIndex].vol),
  },
]

const AccountSummaryVolume = ({ data, t }) => {
  if (isEmpty(data)) {
    return null
  }

  const columns = getColumns({ data, t })

  return (
    <div className='section-account-summary-data-item'>
      <div>{t('accountsummary.30dVolume')}</div>
      <DataTable
        numRows={data.length}
        tableColumns={columns}
      />
    </div>
  )
}

const VOLUME_ENTRIES_PROPS = PropTypes.shape({
  curr: PropTypes.string.isRequired,
  vol: PropTypes.number.isRequired,
})

AccountSummaryVolume.propTypes = {
  t: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(VOLUME_ENTRIES_PROPS).isRequired,
}

export default memo(AccountSummaryVolume)
