import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalReducers from './Reducers';
const persistConfigure = {
  key: 'root',
  storage: AsyncStorage,
};

const perReducer = persistReducer(persistConfigure, GlobalReducers);

export const store = configureStore({
  reducer: {global: perReducer},
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export const persister = persistStore(store);