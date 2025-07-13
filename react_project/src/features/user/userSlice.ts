import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, UserLogin } from "../../models/User";
import { getUser, login, getUserById, updateUser, deleteUser, addUser } from '../../services/userService';
import { UserSignUp } from "../../models/UserSignUp";

const initialState = {
    users: [] as User[
    ],
    user: {} as User,
    userId: { id: -1 },
    error: '',
    selectUser: {
        userId: null,
        userName: null,
        fullName: null,
        password: null,
        email: null,
        phoneNumber: null,
        totalOfPoint: null,
        roomList:[]
    }
}

export const fetchUsers = createAsyncThunk(
    'user/fetchUser',
    async () => {
        const users = await getUser();
        return users;
    }
);

export const fetchUserById = createAsyncThunk(
    'user/fetchUserById',
    async (id: number) => {
        const users = await getUserById(id);
        return users;
    }
);

export const updateUserById = createAsyncThunk(
    'user/fetchUpdateUserById',
    async ({ id, user }: { id: number, user: User }) => {
        const users = await updateUser(id, user);
        return users;
    }
);

export const deleteUserById = createAsyncThunk(
    'user/fetchDeleteUser',
    async (id: number) => {
        const users = await deleteUser(id);
        return users;
    }
);



export const fetchAddUser = createAsyncThunk(
    'user/fetchAddUser',
    async (user: UserSignUp) => {
        const newUser = await addUser(user);
        return newUser;
    }
);


export const Login = createAsyncThunk(
    'user/login',
    async (user: UserLogin) => {
        console.log("user before server",user);

        const newUser = await login(user);
        console.log("user after server",newUser);


        return newUser;
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setFormData: (state, action) => {
            state.selectUser = { ...state.selectUser, ...action.payload };
        },
        logOutUser(state) {
            state.user = { ...initialState.user };
            state.error = "";
            state.selectUser = { ...initialState.selectUser };
            state.userId = { ...initialState.userId };
            state.users = []; 
        }
        
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchAddUser.fulfilled, (state, action) => {
            state.user = action.payload.data; 
            state.selectUser = action.payload.data; 
             })
            .addCase(fetchAddUser.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to fetch users';
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to fetch user by ID';
            })
            .addCase(updateUserById.fulfilled, (state, action) => {
                const index = state.users.findIndex((user: User) => user.userId === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(updateUserById.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to update user';
            })
            .addCase(deleteUserById.fulfilled, (state, action) => {
                state.users = state.users.filter(user => user.userId != action.payload);
            })
            .addCase(deleteUserById.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to delete user';
            })
            .addCase(Login.fulfilled, (state, action) => {
                state.selectUser = action.payload.data;

            })
            .addCase(Login.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to delete user';
            });



    }
});

export default userSlice.reducer;
export const { setFormData } = userSlice.actions;
export const {logOutUser}=userSlice.actions;
