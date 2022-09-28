import { put, call } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'

import { fetchAccountBalance, getReqBalance } from '../saga'
import actions from '../actions'

describe('Account balance saga', () => {
  const generator = cloneableGenerator(fetchAccountBalance)(actions.fetchBalance())

  it('sets params from the payload', () => {
    const result = generator.next(true).value
    expect(result).toEqual(put(actions.setParams({})))
  })

  it('calls the API', () => {
    const result = generator.next().value
    expect(result).toEqual(call(getReqBalance, {}))
  })

  describe('request returns error', () => {
    let clone

    beforeAll(() => {
      clone = generator.clone()
      clone.next({ error: {} }) // skips data update
    })

    it('raises failed action', () => {
      const result = clone.next().value
      expect(result).toEqual(put(actions.fetchFail({
        id: 'status.fail',
        topic: 'accountbalance.title',
        detail: JSON.stringify({}),
      })))
    })
  })

  describe('request throws error', () => {
    let clone

    beforeAll(() => {
      clone = generator.clone()
    })

    it('raises failed action', () => {
      const result = clone.throw({}).value
      expect(result).toEqual(put(actions.fetchFail({
        id: 'status.request.error',
        topic: 'accountbalance.title',
        detail: JSON.stringify({}),
      })))
    })

    it('performs no further work', () => {
      const result = clone.next().done
      expect(result).toBe(true)
    })
  })

  it('updates data', () => {
    const result = generator.next({ result: [], error: false }).value
    expect(result).toEqual(put(actions.updateBalance([])))
  })
})
