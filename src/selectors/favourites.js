export const getFavourites = state => state.favourites.favourites
export const createIsFavouritedSelector = id => state => getFavourites(state).includes(id)
