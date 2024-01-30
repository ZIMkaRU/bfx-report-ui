import PropTypes from 'prop-types'

export const propTypes = {
  className: PropTypes.string,
  t: PropTypes.func.isRequired,
  type: PropTypes.string,
}

export const defaultProps = {
  className: '',
  type: 'Symbol',
}
