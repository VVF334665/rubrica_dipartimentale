import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ItemNavBar } from "../Interface_store/ItemNavBar";

export const selectNavBarStore = createFeatureSelector<ItemNavBar[]>('barNav');

export const getItemNavBar = createSelector(
    selectNavBarStore,
    (item: ItemNavBar[]) => item.filter(x => x.show === true).sort((n1, n2) => {
        if (n1.id > n2.id) {
            return 1;
        }
        if (n1.id < n2.id) {
            return -1;
        }
        return 0;
    })
)

export const getWithPathRouter = (pathRouter: string) => createSelector(
    selectNavBarStore,
    (item: ItemNavBar[]) => item.find(x => x.pathRouter == pathRouter)?.id
)