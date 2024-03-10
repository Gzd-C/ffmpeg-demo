import common from '@/store/modules/common';
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    common: common
  },
  middleware: getdefaultMiddleware => getdefaultMiddleware({
    serializableCheck: false
  })
})

export default store;
