//import { useAuthState } from 'react-firebase-hooks/auth'
//import {auth, registerUserWithEmailAndPassword} from './firebase'
import { useEffect, useState } from 'react'
import { Link, redirect } from 'react-router-dom'
function Register(props) {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    //const [user, loading, err] = useAuthState(auth)
    const register = () => {
        if (!name) alert("Please enter name");
        //registerUserWithEmailAndPassword(name, email, password);
    }
    useEffect(()=>{
        if(loading) return
        if(user) redirect('/app')
    }, [user, loading])
    return (<div>
        <div className='register'>
            <input type='text' placeholder='name' className='register__name'
                onChange={(e)=>{setName(e.target.value)}}></input>
            <input type='text' placeholder='E-mail' className='register__email'
                onChange={(e)=>{setEmail(e.target.value)}}/>
            <input type='password' placeholder='Senha' className='register__password'
                onChange={(e)=>{setPassword(e.target.value)}}/>
            <button className='register__btn' 
                onClick={()=>register()}/>
        </div>
        <div>Já tem uma conta? <Link to='/'>Faça o login</Link></div>
    </div>)
}
export default Register