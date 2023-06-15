/* eslint-disable import/no-cycle */
// import { createLogger } from 'redux-logger';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slice/counterslice';
import modalReducer from './slice/modalSlice';
import chartReudcer from './slice/chartSlice';
// import DNDBoxReducer from './slice/DNDBoxSlice';
import priceModalReducer from './slice/priceModalSlice';
import priceCardReducer from './slice/priceCardSlice';

// const logger = createLogger();

const rootReducer = combineReducers({
	counter: counterReducer,
	modal: modalReducer,
	chart: chartReudcer,
	// dndBox: DNDBoxReducer,
	priceModal: priceModalReducer,
	priceCard: priceCardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
	reducer: rootReducer,
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
