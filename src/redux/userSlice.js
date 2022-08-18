import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from "lodash";
// import { useGetUsersQuery } from './api';

export const fetchUsersData = createAsyncThunk("users/fetchUsers",
    async () => {
        const { data } = await axios.get("http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}")
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
        currentPage: 1,
        postsPerPage: 10
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
            state.user.firstName = payload.firstName
            state.user.lastName = payload.lastName
            state.user.about = payload.description
            state.user.email = payload.email
            state.user.phone = payload.phone
            state.user.address.street = payload.address.streetAddress
            state.user.address.city = payload.address.city
            state.user.address.zip = payload.address.zip
        },
        setUser: (state, { payload }) => {
            // payload = e.target
            state.user[payload.name] = payload.value
        },
        setUserPhone: (state, { payload }) => {
            let format = "(xxx) xxx-xxxx";
            const numArr = payload.split("")
            for (var i = 0; i < numArr.length; i++) {
                format = format.replace("x", numArr[i]);
            }

            console.log(format);

            state.user.phone = format
        },
        setUserAdress: (state, { payload }) => {
            state.user.address[payload.name] = payload.value
        },
        submitChanges: (state, { payload }) => {
            state.data = state.data.map(item => {
                //id-lerde tekrarlanma ola bilir deye namelerle select edirem
                if (item.firstName === state.singleItemFullInfo.firstName) {
                    item.firstName = state.user.firstName
                    item.lastName = state.user.lastName
                    item.email = state.user.email
                    item.phone = state.user.phone
                    item.about = state.user.about
                    item.address.streetAddress = state.user.address.street
                    item.address.city = state.user.address.city
                    item.address.zip = state.user.address.zip
                }
                return item
            })
        },
        deleteUser: (state, { payload }) => {
            // payload = userName
            state.data = state.data.filter(item => item.firstName !== payload)
        },
        paginate: (state, { payload }) => {
            state.currentPage = payload
        },


    },
    extraReducers: {
        [fetchUsersData.pending]: (state) => {
            // console.log('data pending');
            state.pendingGet = true
            state.errorGet = false
        },
        [fetchUsersData.fulfilled]: (state, { payload }) => {
            // console.log('data fulfilled');
            state.pendingGet = false
            state.data = payload

        },
        [fetchUsersData.rejected]: (state, action) => {
            console.log('request rejected');
            state.errorGet = action.error.message
            state.pendingGet = false
        },
    }
})


export const { sortId, paginate, deleteUser, setUserPhone, submitChanges, setUser, setUserAdress, addItemFullInfo, prepareEdittingList, hideFullInfo, showFullInfo, changeIdFilterDir } = userSlice.actions
export default userSlice.reducer