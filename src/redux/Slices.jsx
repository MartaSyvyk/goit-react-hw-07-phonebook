import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContacts,
  reducers: {
    add(state, action) {
      return [...state, action.payload];
    },
    remove(state, action) {
      return state.filter(contact => contact.id !== action.payload);
    },
  },
});

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    check(state, action) {
      return action.payload.toLowerCase();
    },
  },
});
const rootReducer = combineReducers({
  contacts: contactsSlice.reducer,

  filter: filterSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const { add, remove, getByName } = contactsSlice.actions;
export const { check } = filterSlice.actions;
