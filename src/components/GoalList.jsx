
import { useEffect } from "react"
import {useDispatch, useSelector} from "react-redux"

import {getGoals, deleteGoal} from "../features/goals/goalSlice"

function GoalList({goal}) {
	const dispatch = useDispatch()
	const onClick = () => {
		dispatch(deleteGoal(goal._id))

	}

	


	return ( 
		<>
			<div className="goal">
				<h2> {goal.text}</h2>
				<button className="close" onClick={onClick}>X</button>
			</div>
		</>)
}

export default GoalList