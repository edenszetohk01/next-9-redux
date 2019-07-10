import { Store, applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware, { Task } from 'redux-saga'

import { ApplicationState, rootReducer } from './'
import { rootSaga } from './rootSaga'

export type NextStore = Store<ApplicationState> & {
  sagaTask?: Task
}

// Set the default InitialState as empty object for now
// InitialState would help injecting SSR actions to redux store
export const getStore = (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware()

  const store: NextStore = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  )

  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}
