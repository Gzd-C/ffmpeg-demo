import { createSlice } from '@reduxjs/toolkit';

const common = createSlice({
    name: 'common',
    initialState: {
        ffmpeg:{},
        progressRatio: 0,
        currentVideo: {
            url: '',
            name: '',
        },
        videoList: [] as any[],
        audioList: [] as any[],
        imageList: [] as any[],
        duration: 0,
    },
    reducers: {
        setFFmpeg(state, action) {
            console.log('action', action)
            state.ffmpeg = {
                ...state.ffmpeg,
                ...action.payload
            }
            console.log('state.ffmpeg', state.ffmpeg)
        },
        setVideoList(state, action) {
            state.videoList = [...action.payload]
            console.log('currentVideo', state.videoList)
        },
        setAudioList(state, action) {
            state.audioList = [...action.payload]
        },
        setImageList(state, action) {
            state.imageList = [...action.payload]
        },
        setCurrentVideo(state, action) {
            state.currentVideo = action.payload
            console.log('currentVideo', state.currentVideo)
        },
        setDuration(state, action) {
            state.duration = action.payload
        }
    }
})

const {
    setFFmpeg,
    setVideoList,
    setAudioList,
    setImageList,
    setCurrentVideo,
    setDuration,
} = common.actions;

const reducer = common.reducer;

export {
    setFFmpeg,
    setVideoList,
    setAudioList,
    setImageList,
    setCurrentVideo,
    setDuration,
};

export default reducer;