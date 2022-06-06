import { createSelector } from "reselect";

const COLLECTION_ID_MAP = {
    hats: 1,
    sneakers: 2,
    jackets: 3,
    womens: 4,
    mens: 5
}

const selectShop = (state) => state.shops;

export const selectCollection = createSelector(
    [selectShop],
    shop => shop.collections
)


export const selectShopCollections = createSelector(
    [selectCollection],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
)

export const selectionCollection = collectionUrlParam => {
    console.log(`@@@@@@@@@collectionUrlParam@@@2`,collectionUrlParam)
    return createSelector(
        [selectShopCollections],
        collections => collections.find((collection)=> collection.id === COLLECTION_ID_MAP[collectionUrlParam])
    )
}

