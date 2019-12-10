/* global fetch:false */
import { fetchFavouritesActionCreator, TOGGLE_FAVOURITE_TYPE, REHYDRATED } from '../actions'
import { createIsFavouritedSelector, getFavouritesApiUrl } from '../selectors'

const fetchFavourites = async (apiUrl, config = {}) => {
  const response = await fetch(apiUrl, {
    headers: {
      Accept: 'application/json'
    },
    ...config
  })

  const favourites = await response.json()

  if (!response.ok || !Array.isArray(favourites)) {
    const error = new Error('Failed to fetch favourites')
    error.status = response.status
    throw error
  }

  return favourites
}

const toggleFavourite = (apiUrl, id, isFavourited) => {
  const url = `${apiUrl}/${id}`
  const config = {
    method: isFavourited ? 'DELETE' : 'PUT'
  }
  return fetchFavourites(url, config)
}

export default store => next => action => {
  const ret = next(action)
  const state = store.getState()
  const apiUrl = getFavouritesApiUrl(state)

  if (action.type === REHYDRATED) {
    store.dispatch(fetchFavouritesActionCreator(fetchFavourites(apiUrl)))
  }

  if (action.type === TOGGLE_FAVOURITE_TYPE) {
    const entityId = action.payload.entityId
    const isFavouritedSelector = createIsFavouritedSelector(entityId)
    const isFavourited = isFavouritedSelector(state)
    store.dispatch(fetchFavouritesActionCreator(toggleFavourite(apiUrl, entityId, isFavourited)))
  }

  return ret
}
