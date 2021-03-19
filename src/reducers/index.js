// react是单一store所以需要合并reducers
import { combineReducers } from 'redux'
import locale from './locale'
import popup from './popup'

export default combineReducers({
  locale,
  popup,
})
