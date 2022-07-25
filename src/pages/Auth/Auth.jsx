import React,{useState} from 'react'
import "./Auth.css"
import icon from "../../assets/icon.png";
import AboutAuth from "./AboutAuth";
import { signup,login } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import axios from "axios";
const Auth = () => {
  const [isSignup,setIsSignup] = useState(false)
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [date,setDate] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSwitch = () => {
    setIsSignup(!isSignup)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!email && !password){
      alert("Enter email and password");
    }
    if(isSignup){
      if(name && date){
        const ipapi = axios.create({baseURL: "https://geolocation-db.com/json"})
        const response = ipapi.get('/')
        response.then((res,err) => {
            if(res.data){
                const ip = res.data.IPv4;
                dispatch(signup({name,email,password,date,ip},navigate))
            }
        })
      }else{
        alert("Enter a name and dob to continue");
      }
    }else{
      dispatch(login({email,password},navigate))
    }
    console.log({name,email,password,date});
  }
  return (
    <section className='auth-section'>
      {
        isSignup && <AboutAuth />
      }
      <div className='auth-container-2'>
        <img src={icon} alt="stack overflow" className='login-logo'/>
        <form onSubmit={handleSubmit}>
          {
            isSignup && (
              <label htmlFor='name'> 
                <h4>Display Name</h4>
                <input type="text" id='name' name='name' onChange={(e) => {setName(e.target.value)}} />
              </label>
            )
          }
          <label htmlFor='email'>
            <h4>Email</h4>
            <input type="email" name="email" id="email" onChange={(e) => {setEmail(e.target.value)}} />
          </label>
          <label htmlFor='password'>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <h4>Password</h4>
              {!isSignup && <p style={{color:"#007ac6",fontSize:"13px"}}>Forgot Password?</p>}
            </div>
            <input type="password" name="password" id="password" onChange={(e) => {setPassword(e.target.value)}} />
            {isSignup && <p style={{color:"#666767",fontSize:"13px"}}>Password must contain at least eight <br />characters, including at least 1 letter and 1 number.</p>}
          </label>
          {
            isSignup && (
              <label htmlFor='date'> 
                <h4>DOB</h4>
                <input type="date" id='date' name='date' onChange={(e) => {setDate(moment(e.target.value).format())}} />
              </label>
            )
          }
          {
            isSignup && (
              <label htmlFor='check'>
                <input type="checkbox" id="check" />
                <p style={{fontSize:"13px"}}>Opt-in to receive occasional,<br/> product updates, user research invitations,<br /> company announcements, and digests.</p>
              </label>
            )
          }
          <button type='submit' className='auth-btn'>{isSignup ? "Signup" : "Login"}</button>
          {
            isSignup && (
              <p style={{color:"#666767",fontSize:"13px"}}>
                By clicking "Sign up", you agree to our
                <span style={{color:"#007ac6"}}> terms of<br /> services</span>,
                <span style={{color:"#007ac6"}}> privacy policy</span> and
                <span style={{color:"#007ac6"}}> cookie policy</span>
              </p>
            )
          }
        </form>
        <p>
          {isSignup ? "Already have an account!" : "Don't have an account? "}
          <button type="button" className="handle-switch-btn" onClick={handleSwitch}>{isSignup ? "Login" : "Signup"}</button>
        </p>
      </div>
    </section>
  )
}

export default Auth