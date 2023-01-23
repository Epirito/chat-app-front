//no longer using firebase
//import { useAuthState } from 'react-firebase-hooks/auth'
//import {auth, logInWithEmailAndPassword} from './firebase'
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
    return (<div>
        <div className='login'>
            <input type='text' placeholder='E-mail' className='login__email'
                onChange={(e)=>{setEmail(e.target.value)}}/>
            <input type='password' placeholder='Senha' className='login__password'
                onChange={(e)=>{setPassword(e.target.value)}}/>
            <button className='login__btn' 
                onClick={async()=>{
                    //await logInWithEmailAndPassword(email, password)
                }}/>
        </div>
        <div><Link>Esqueceu sua senha?</Link></div>
        <div>Não tem uma conta? <Link to='/register'>Registre-se</Link></div>
    </div>)
}
export default Login