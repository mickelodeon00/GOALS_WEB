import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import goalService from "./goalService"

const initialState = {
    goals : [],
    isErorr: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

export const createGoal = createAsyncThunk('goals/create', async (goalData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        const result = await goalService.createGoal(goalData, token)
        console.log(result, "rrreessuullttweb")
        return result
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getGoals = createAsyncThunk('goals/get', async (_, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        const result = await goalService.getGoal(token)
        console.log(result, "rrreessuullttweb")
        return result
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteGoal = createAsyncThunk('goals/delete', async (goalId, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        const result = await goalService.deleteGoal(goalId, token)
        console.log(result, "rrreessuullttweb")
        return result
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})




const goalSlice = createSlice({
    name: "goal",
    initialState,
    reducers: {
        reset: (state)=> initialState
    },
    extraReducers : (builder) => {
        builder
        .addCase(createGoal.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createGoal.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            console.log(action.payload, "acttiioonnnppaayyllooaadd")
            state.goals.push(action.payload)
        })
        .addCase(createGoal.rejected, (state, action) => {
            state.isLoading = false
            state.isErorr = true
            state.message = action.payload
        })
        .addCase(getGoals.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getGoals.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            console.log(action.payload, "acttiioonnnppaayyllooaadd")
            state.goals = action.payload
        })
        .addCase(getGoals.rejected, (state, action) => {
            state.isLoading = false
            state.isErorr = true
            state.message = action.payload
        })
        .addCase(deleteGoal.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteGoal.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            console.log(action.payload, "acttiioonnnppaayyllooaadd")
            state.goals = state.goals.filter((goal) => goal._id !== action.payload.id)
        })
        .addCase(deleteGoal.rejected, (state, action) => {
            state.isLoading = false
            state.isErorr = true
            state.message = action.payload
        })
    }
})

export const {reset} = goalSlice.actions 
export default goalSlice.reducer
