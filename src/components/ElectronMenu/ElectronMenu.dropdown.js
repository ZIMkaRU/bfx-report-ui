import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Menu,
  Popover,
  Position,
  MenuItem,
  MenuDivider,
} from '@blueprintjs/core'
import _map from 'lodash/map'
import { isEqual } from '@bitfinex/lib-js-util-base'

import types from 'state/electronMenu/constants'
import { executeMenuCommand } from 'state/electronMenu/actions'

import SubMenu from './ElectronMenu.submenu'

const DropdownMenu = ({ label, items }) => {
  const dispatch = useDispatch()

  return (
    <div className='electron-menu-item'>
      <Popover
        minimal
        targetTagName='div'
        position={Position.BOTTOM_LEFT}
        content={(
          <div className='electron-menu-item-content'>
            <Menu>
              {_map(items, ({
                id, label: itemLabel, type, accelerator, enabled, submenu,
              }, index) => {
                if (isEqual(type, types.SEPARATOR)) return <MenuDivider key={index} />
                if (isEqual(type, types.SUBMENU)) return <SubMenu key={index} label={itemLabel} items={submenu} />

                return (
                  <MenuItem
                    key={index}
                    text={itemLabel}
                    disabled={!enabled}
                    label={accelerator}
                    onClick={() => dispatch(executeMenuCommand(id))}
                  />
                )
              })}
            </Menu>
          </div>
        )}
      >
        <div className='electron-menu-item-wrapper'>
          <div className='electron-menu-item-target'>
            <span className='electron-menu-item-username'>
              {label}
            </span>
          </div>
        </div>
      </Popover>
    </div>
  )
}

DropdownMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    enabled: PropTypes.bool,
    submenu: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
    accelerator: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  })),
  label: PropTypes.string,
}

DropdownMenu.defaultProps = {
  items: [],
  label: '',
}

export default memo(DropdownMenu)
