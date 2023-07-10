import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export type AuthStatus = 'IDLE' | 'AUTHENTICATED' | 'UNAUTHENTICATED';

export type userInfoType = {
	id: number;
	email: string;
} | null;

interface AuthState {
	authenticated: AuthStatus;
	userInfo: userInfoType;
}

const initialState: AuthState = {
	authenticated: 'IDLE',
	userInfo: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loggedIn: (state: AuthState, action: PayloadAction<userInfoType>) => ({
			...state,
			authenticated: 'AUTHENTICATED' as AuthStatus,
			userInfo: action.payload,
		}),

		loggedOut: (state: AuthState) => ({
			...state,
			authenticated: 'UNAUTHENTICATED' as AuthStatus,
			userInfo: null
		}),
		updateAuthState: (state: AuthState, action: PayloadAction<AuthState>) => action.payload
	},
});
export const { loggedIn, loggedOut, updateAuthState } = authSlice.actions;
export function useAuth() {
	const auth = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();

	return {
		auth,
		dispatch,
	};
}

export default authSlice.reducer;
