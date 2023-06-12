import { createLogger } from 'redux-logger';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from './slice/counterslice';
import chartReudcer from './slice/chartSlice';
import DNDBoxReducer from './slice/dndBoxSlice';


const logger = createLogger();

const rootReducer = combineReducers({
	counter: counterReducer,
	chart: chartReudcer,
	dndBox: DNDBoxReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
