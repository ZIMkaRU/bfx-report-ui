import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import _times from 'lodash/times'

class CollapsedTable extends PureComponent {
  render() {
    const { numRows, tableColumns, t } = this.props

    return (
      <div className='collapsed-table'>
        {_times(numRows, rowIndex => (
          <div className='collapsed-table-item' key={rowIndex}>
            {tableColumns.map((column) => {
              const {
                id, name, nameStr, renderer, description,
              } = column
              const cell = renderer(rowIndex)
              return (
                <div key={id}>
                  <div>
                    {nameStr || t(name)}
                    <br />
                    {description && t(description)}
                  </div>
                  <div>{cell.props.children}</div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    )
  }
}

const TABLE_COLUMNS_PROPS = PropTypes.shape({
  name: PropTypes.string,
  width: PropTypes.number,
  nameStr: PropTypes.string,
  id: PropTypes.string.isRequired,
  renderer: PropTypes.func.isRequired,
  copyText: PropTypes.func,
})

CollapsedTable.propTypes = {
  t: PropTypes.func.isRequired,
  numRows: PropTypes.number.isRequired,
  tableColumns: PropTypes.arrayOf(TABLE_COLUMNS_PROPS).isRequired,
}

export default withTranslation('translations')(CollapsedTable)
