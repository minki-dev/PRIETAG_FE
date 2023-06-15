/* eslint-disable import/no-cycle */
// import { createLogger } from 'redux-logger';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slice/counterslice';
import tableReducer from './slice/tableSlice';
import DNDBoxReducer from './slice/DNDBoxSlice';
import configReducer from './slice/configSlice';
import faqReducer from './slice/faqSlice'
import modalReducer from './slice/modalSlice'

// const logger = createLogger();

const rootReducer = combineReducers({
	counter: counterReducer,
	table: tableReducer,
	dndBox: DNDBoxReducer,
	config: configReducer,
	faq: faqReducer,
	modal: modalReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
	reducer: rootReducer,
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
