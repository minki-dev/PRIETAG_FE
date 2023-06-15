/* eslint-disable import/no-cycle */
// import { createLogger } from 'redux-logger';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slice/counterslice';
import modalReducer from './slice/modalSlice';
import tableReducer from './slice/tableSlice';
import DNDBoxReducer from './slice/DNDBoxSlice';
import priceModalReducer from './slice/priceModalSlice';
import faqSliceReducer from './slice/faqSlice';

// const logger = createLogger();

const rootReducer = combineReducers({
	counter: counterReducer,
	modal: modalReducer,
	table: tableReducer,
	faq: faqSliceReducer,
	dndBox: DNDBoxReducer,
	priceModal: priceModalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
	reducer: rootReducer,
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
