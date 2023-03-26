import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { APIState, STATUS } from './apiSliceTypes';
import { createSession, invokeSession } from 'services/thunks/session';
import { getImage } from './thunks/image';

const initialSystemState: APIState = {
  sessionId: null,
  status: STATUS.idle,
  progress: null,
  progressImage: null,
};

export const apiSlice = createSlice({
  name: 'api',
  initialState: initialSystemState,
  reducers: {
    setSessionId: (state, action: PayloadAction<APIState['sessionId']>) => {
      state.sessionId = action.payload;
    },
    setStatus: (state, action: PayloadAction<APIState['status']>) => {
      state.status = action.payload;
    },
    setProgressImage: (
      state,
      action: PayloadAction<APIState['progressImage']>
    ) => {
      state.progressImage = action.payload;
    },
    setProgress: (state, action: PayloadAction<APIState['progress']>) => {
      state.progress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createSession.fulfilled, (state, { payload: { id } }) => {
      // HTTP 200
      // state.networkStatus = 'idle'
      state.sessionId = id;
    });
    builder.addCase(createSession.pending, (state, action) => {
      // HTTP request pending
      // state.networkStatus = 'busy'
    });
    builder.addCase(createSession.rejected, (state, action) => {
      // !HTTP 200
      console.error('createSession rejected: ', action);
      // state.networkStatus = 'idle'
    });
    builder.addCase(invokeSession.fulfilled, (state, action) => {
      // HTTP 200
      // state.networkStatus = 'idle'
    });
    builder.addCase(invokeSession.pending, (state, action) => {
      // HTTP request pending
      // state.networkStatus = 'busy'
    });
    builder.addCase(invokeSession.rejected, (state, action) => {
      // state.networkStatus = 'idle'
    });
    builder.addCase(getImage.fulfilled, (state, action) => {
      // !HTTP 200
      console.log(action.payload);
      // state.networkStatus = 'idle'
    });
    builder.addCase(getImage.pending, (state, action) => {
      // HTTP request pending
      // state.networkStatus = 'busy'
    });
    builder.addCase(getImage.rejected, (state, action) => {
      // !HTTP 200
      // state.networkStatus = 'idle'
    });
  },
});

export const { setSessionId, setStatus, setProgressImage, setProgress } =
  apiSlice.actions;

export default apiSlice.reducer;