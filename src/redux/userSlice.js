import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from "lodash";
// import { useGetUsersQuery } from './api';

export const fetchUsersData = createAsyncThunk("users/fetchUsers",
    async () => {
        const { data } = await axios.get("http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}")
        console.log(data);
        return data
    }
)


export const userSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        pendingGet: false,
        pendingPost: false,
        errorGet: false,
        errorPost: false,
        idFilterDir: 'asc',
        modalShow: false,
        singleItemFullInfo: {},
        user: {
            firstName: '',
            lastName: '',
            about: '',
            phone: '',
            email: '',
            address: {
                street: '',
                city: '',
                zip: '',
            },
        },
    },
    reducers: {
        sortId: (state) => {
            const orderedData = _.orderBy(state.data, 'id', state.idFilterDir);
            state.data = orderedData
        },
        changeIdFilterDir: (state) => {
            state.idFilterDir = state.idFilterDir === 'asc' ? 'desc' : 'asc'
        },
        showFullInfo: (state, { payload }) => {
            state.modalShow = true
        },
        hideFullInfo: (state, { payload }) => {
            state.modalShow = false
        },
        addItemFullInfo: (state, { payload }) => {
            state.singleItemFullInfo = payload
        },
        prepareEdittingList: (state, { payload }) => {
            console.log(payload);
            state.user.firstName = payload.firstName
            state.user.lastName = payload.lastName
            state.user.about = payload.description
            state.user.email = payload.email
            state.user.phone = payload.phone
            state.user.address.street = payload.address.streetAddress
            state.user.address.city = payload.address.city
            state.user.address.zip = payload.address.zip
        },
        // prepareEdittingListAddress: (state, { payload }) => {
        //     state.user.address
        // },
        setUser: (state, { payload }) => {
            // payload = e.target.value
            state.user[payload.name] = payload.value
        },
        setUserAdress: (state, { payload }) => {
            state.user.address[payload.name] = payload.value
        },
        submitChanges: (state, { payload }) => {
            console.log(state.user);
        }

    },
    extraReducers: {
        [fetchUsersData.pending]: (state) => {
            console.log('data pending');
            state.pendingGet = true
            state.errorGet = false
        },
        [fetchUsersData.fulfilled]: (state, { payload }) => {
            console.log('data fulfilled');
            state.pendingGet = false
            console.log(payload);
            state.data = payload

        },
        [fetchUsersData.rejected]: (state, action) => {
            console.log('request rejected');
            state.errorGet = action.error.message
            console.log(action);

            state.pendingGet = false
        },
    }
})


export const { sortId, submitChanges, setUser, setUserAdress, addItemFullInfo, prepareEdittingList, hideFullInfo, showFullInfo, changeIdFilterDir } = userSlice.actions
export default userSlice.reducer