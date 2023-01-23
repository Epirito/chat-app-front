import './Chat.css'
import { Component, useEffect, useState} from 'react'
import { io } from 'socket.io-client'
//import { auth } from './firebase'

function ChatMessage(props) {
    return (<div><span className='msg-bubble'>{props.text}</span></div>)
}
function MessageList(props) {
    return (<div className='msg-list'>
        { props.messages.map(x => <ChatMessage text={x}/>) }
    </div>)
}
function MessageField(props) {
    return (<div className='msg-field'>
                <textarea className='msg-field__area' onInput={props.onInput} value={props.message}/>
                <button className='msg-field__button' type='button' onClick={props.onSubmit}>Enviar</button>
            </div>)
}
const socket = io('ws://127.0.0.1:3000', {
    reconnectionDelay: 10000
})
function FunctionalChat() {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    function newMessage(msg) {
        setMessages(messages.concat([msg]))
    } 
    useEffect(()=>{
        socket.on('connected', (username)=>{
            newMessage("hello")
        })
        socket.on('relayedMsg', (msg)=>{
            newMessage(msg)
        })
        return ()=>{
            socket.off('connected')
            socket.off('relayedMsg')
        }
    })
    function onInput(event) {
        setInput(event.target.value)
    }
    function onSubmit() {
        if(input!=="") {
            socket.emit('msg', input)
            setInput('')
        }
    }
    return (
        <div>
            <MessageList messages={messages}/>
            <MessageField onInput={onInput} message={input} 
                onSubmit={onSubmit}/>
        </div>
    )
}
export default FunctionalChat