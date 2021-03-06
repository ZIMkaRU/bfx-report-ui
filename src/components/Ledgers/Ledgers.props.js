import PropTypes from 'prop-types'

const LEDGERS_ENTRIES_PROPS = PropTypes.shape({
  id: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  mts: PropTypes.number.isRequired,
  wallet: PropTypes.string,
})

export const propTypes = {
  addTargetSymbol: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
  entries: PropTypes.arrayOf(LEDGERS_ENTRIES_PROPS).isRequired,
  existingCoins: PropTypes.arrayOf(PropTypes.string),
  fetchLedgers: PropTypes.func.isRequired,
  fetchNext: PropTypes.func.isRequired,
  fetchPrev: PropTypes.func.isRequired,
  getFullTime: PropTypes.func,
  getQueryLimit: PropTypes.func.isRequired,
  jumpPage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pageOffset: PropTypes.number.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  removeTargetSymbol: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  targetSymbols: PropTypes.arrayOf(PropTypes.string),
  timeOffset: PropTypes.string.isRequired,
  nextPage: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]),
}

export const defaultProps = {
  addTargetSymbol: () => {},
  offset: 0,
  entries: [],
  existingCoins: [],
  fetchLedgers: () => {},
  fetchNext: () => {},
  fetchPrev: () => {},
  getFullTime: () => {},
  getQueryLimit: () => {},
  jumpPage: () => {},
  loading: true,
  pageOffset: 0,
  pageLoading: false,
  refresh: () => {},
  removeTargetSymbol: () => {},
  targetSymbols: [],
  nextPage: false,
}
