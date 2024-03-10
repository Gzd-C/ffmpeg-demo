import { createSlice } from '@reduxjs/toolkit';

const common = createSlice({
    name: 'common',
    initialState: {
        ffmpeg:{},
        progressRatio: 0,
        uploadFileList: {

        }
    },
    reducers: {
        setFFmpeg(state, action) {
            console.log('action', action)
            state.ffmpeg = {
                ...state.ffmpeg,
                ...action.payload
            }
            console.log('state.ffmpeg', state.ffmpeg)
        }
    }
})

const { setFFmpeg } = common.actions;

const reducer = common.reducer;

export { setFFmpeg };

export default reducer;