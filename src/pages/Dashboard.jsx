import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {toast} from 'react-toastify'

import {getGoals, reset} from "../features/goals/goalSlice"

import GoalForm from '../components/GoalForm.jsx'
import GoalList from "../components/GoalList.jsx"
import Spinner from "../components/Spinner"

function Dashboard() {

  const {user} = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {goals, isLoading, isError, message} = useSelector((state)=>state.goals)

  useEffect(()=> {
    if (!user) {
      // toast.error("Please log in")
      return navigate('/login')
    }

    if (isError) {
      console.log(message)
    }

    dispatch(getGoals())

    return () => {
      dispatch(reset())
    }

  },[navigate, dispatch, user, isError, message])



  if (isLoading) {
    return <Spinner/>
  }
  
  return (
    <>
      <div className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </div>
      <GoalForm/>
      <div className="content">
        { goals.length > 0 ? (
          <div className="goals">{goals.map((goal)=>
            (<GoalList goal={goal} />)
            )}
          </div>)
        : (<h3>You have not set any goals</h3>)
        }
      </div>
    </>
  )
}

export default Dashboard