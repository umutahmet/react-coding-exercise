/* global fetch:false */
import { fetchFavouritesActionCreator, REHYDRATED } from '../actions'
import { getFavouritesApiUrl } from '../selectors'

const fetchFavourites = async (apiUrl) => {
  const url = `${apiUrl}`
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json'
    }
  })

  const favourites = await response.json()

  if (!response.ok || !Array.isArray(favourites)) {
    const error = new Error('Failed to fetch favourites')
    error.status = response.status
    throw error
  }

  return favourites
}

export default store => next => action => {
  const ret = next(action)

  if (action.type === REHYDRATED) {
    const state = store.getState()
    const apiUrl = getFavouritesApiUrl(state)
    store.dispatch(fetchFavouritesActionCreator(fetchFavourites(apiUrl)))
  }

  return ret
}
