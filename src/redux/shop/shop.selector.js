import { createSelector } from "reselect";

const selectShop = (state) => state.shops;

export const selectShopCollections = createSelector(
    [selectShop],
    shopData => shopData.collections
)