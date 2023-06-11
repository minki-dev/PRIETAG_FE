import { createLogger } from 'redux-logger';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from './slice/counterslice';

const logger = createLogger();

const rootReducer = combineReducers({
	counter: counterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
