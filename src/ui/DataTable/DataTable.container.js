import { compose } from 'redux'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import { getDevice } from 'state/ui/selectors'
import { getTableScroll } from 'state/base/selectors'
import { showColumnsSum, setColumnsWidth } from 'state/columns/actions'

import DataTable from './_DataTable'

const mapStateToProps = state => ({
  device: getDevice(state),
  tableScroll: getTableScroll(state),
})

const mapDispatchToProps = {
  showColumnsSum,
  setColumnsWidth,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('translations'),
)(DataTable)
