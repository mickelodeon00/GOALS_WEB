import { useState } from "react"
import { useDispatch } from "react-redux"
import { createGoal } from "../features/goals/goalSlice"


function GoalForm() {
    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createGoal({text}))
        setText("")
    }
  return (
    <div className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="text"> Create a goal</label>
                <input type="text" name="text" value={text} id="text" onChange={(e)=>setText(e.target.value)} placeholder="my goal" />
            </div>
            <div className="form-group">
                <button className="btn btn-block" type="submit">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default GoalForm