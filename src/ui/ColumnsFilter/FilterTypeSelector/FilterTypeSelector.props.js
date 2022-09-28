import PropTypes from 'prop-types'

export const propTypes = {
  isSelect: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  dataType: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {
  dataType: '',
}
