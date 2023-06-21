/* eslint-disable import/no-cycle */
// import { createLogger } from 'redux-logger';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slice/counterslice';
import modalReducer from './slice/modalSlice';
import featureTableReducer from './slice/featureTableSlice';
import DNDBoxReducer from './slice/DNDBoxSlice';
import priceModalReducer from './slice/priceModalSlice';
import faqSliceReducer from './slice/faqSlice';
import monthYearToggleReducer from './slice/monthYearToggleSlice';
import configReducer from './slice/configSlice';
import priceCardReducer from './slice/priceCardSlice';
import uploadModalReducer from './slice/uploadModalSlice';
// const logger = createLogger();

const rootReducer = combineReducers({
	counter: counterReducer,
	modal: modalReducer,
	priceCard: priceCardReducer,
	featureTable: featureTableReducer,
	faq: faqSliceReducer,
	dndBox: DNDBoxReducer,
	priceModal: priceModalReducer,
	config: configReducer,
	uploadModal: uploadModalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
	reducer: rootReducer,
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
