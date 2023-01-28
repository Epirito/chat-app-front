//no longer using firebase
//import { useAuthState } from 'react-firebase-hooks/auth'
//import {auth, logInWithEmailAndPassword} from './firebase'
import './Login.css'
import { useEffect, useState } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //const [user, loading, err] = useAuthState(auth)
    const navigate = useNavigate()
    /*useEffect(()=>{
        if(loading) return
        if(user) navigate('/app')
    }, [user, loading])*/
    return (<div className='login-screen'>
        <div className='login'>
            <div><input type='text' placeholder='E-mail' className='login__email'
                onChange={(e)=>{setEmail(e.target.value)}}/></div>
            <div><input type='password' placeholder='Senha' className='login__password'
                onChange={(e)=>{setPassword(e.target.value)}}/></div>
            <div><button className='login__btn' type='button' 
                onClick={async()=>{
                    
                    //await logInWithEmailAndPassword(email, password)
                }}>Login</button></div>
        </div>
        <div><Link>Esqueceu sua senha?</Link></div>
        <div>Não tem uma conta? <Link to='/register'>Registre-se</Link></div>
    </div>)
}
export default Login