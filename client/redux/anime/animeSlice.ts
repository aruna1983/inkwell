import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEachImage } from "../../src/components/ImageViews";
import { RootState } from "../store";
interface IInitialState{
    datas: Record<number, IEachImage[]>,
    currentPage: number
}
const initialState:IInitialState = {
    datas: {},
    currentPage: 1
}
const animeSlice = createSlice({
    name: "anime",
    initialState,
    reducers: {
        setImages: (state, action: PayloadAction<{key: number, value: IEachImage[]}>) => {
            const { key, value } = action.payload;
            state.datas[key] = value
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
           state.currentPage = action.payload;
        }
    }
});
export const { setImages, setCurrentPage } = animeSlice.actions;
export const selectImages = (key: number) => (state: RootState) => {
    return Object.keys(state.anime.datas).includes(key+"") ? state.anime.datas[key] : []
}
export const selectCurrentPage = (state: RootState) => state.anime.currentPage;
export const selectKeys = (state: RootState) => {
    return Object.keys(state.anime.datas).map((obj) => +obj);
}
export default animeSlice.reducer;