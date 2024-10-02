import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { isEmpty } from '@bitfinex/lib-js-util-base'

import DataTable from 'ui/DataTable'
import { fetchAPositions } from 'state/positionsActive/actions'
import {
  getEntries,
  getPageLoading,
  getDataReceived,
} from 'state/positionsActive/selectors'
import queryConstants from 'state/query/constants'
import { getColumnsWidth } from 'state/columns/selectors'
import { getIsSyncRequired, getIsFirstSyncing } from 'state/sync/selectors'

import { getPositionsColumns } from './AppSummary.columns'

const TYPE = queryConstants.SUMMARY_POSITIONS

const SummaryActivePositions = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const entries = useSelector(getEntries)
  const pageLoading = useSelector(getPageLoading)
  const dataReceived = useSelector(getDataReceived)
  const isFirstSync = useSelector(getIsFirstSyncing)
  const isSyncRequired = useSelector(getIsSyncRequired)
  const columnsWidth = useSelector((state) => getColumnsWidth(state, TYPE))
  const isLoading = isFirstSync || (!dataReceived && pageLoading)
  const isNoData = dataReceived && isEmpty(entries)
  const tableClasses = classNames('summary-by-asset-table', {
    'empty-table': isNoData,
  })

  useEffect(() => {
    if (!dataReceived && !pageLoading && !isSyncRequired) {
      dispatch(fetchAPositions())
    }
  }, [dataReceived, pageLoading, isSyncRequired])


  const columns = useMemo(
    () => getPositionsColumns({
      entries, t, isLoading, isNoData, columnsWidth,
    }),
    [entries, t, isLoading, isNoData, columnsWidth],
  )

  return (
    <div className='app-summary-item full-width-item'>
      <div className='app-summary-item-title--row'>
        <div>
          <div className='app-summary-item-title'>
            {t('summary.positions.title')}
          </div>
        </div>
      </div>
      <DataTable
        section={TYPE}
        defaultRowHeight={73}
        tableColumns={columns}
        className={tableClasses}
        numRows={isLoading ? 3 : entries.length}
      />
    </div>
  )
}

export default SummaryActivePositions
