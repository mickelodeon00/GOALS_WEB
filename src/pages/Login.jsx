import { useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'

import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

import {FaSignInAlt} from 'react-icons/fa'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  
  const {email, password} = formData
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isError, isLoading, isSuccess, message} = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      navigate('/')

    }
    dispatch(reset())

  }, [user, isError, isSuccess, message, dispatch, navigate])

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password
    }

    dispatch(login(userData))
    
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }

  if (isLoading) <Spinner />

  return (
    <>
    <section className='heading'>
      <h1>
        <FaSignInAlt /> Login
      </h1>
      <p>Login and start setting Goals</p>
    </section>
    <section className='form'  onSubmit={onSubmit}>
      <form>
        <div className='form-group'>
          <input 
          className='form-control' 
          type="text"
          id='email' 
          name='email' 
          value={email} 
          placeholder="Enter your email"
          onChange={onChange} />
        </div>
        <div className='form-group'>
          <input 
          className='form-control' 
          type='password'
          id='password' 
          name='password' 
          value={password} 
          placeholder="Enter your password"
          onChange={onChange} />
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-block' >Submit</button>
        </div>
      </form>
    </section>
    </>
  )
}

export default Login