import './Chat.css'
import { Component, useEffect, useState} from 'react'
import { io } from 'socket.io-client'
import userIcon from './assets/user.svg'
import { useRef } from 'react'

function TopBar(props) {
    return (<div className='top-bar'>
        <img onClick={props.onClickProfile} className='icon' src={userIcon}/>
    </div>)
}
function ChatMessage(props) {
    // Old protocol: just text
    if (typeof props.message === 'string') return (<div className='msg'>
            <span className='msg__bubble'>{props.message}</span>
        </div>)
    
    // New protocol: messages have authors
    const authorDiv = props.newAuthor ? <div className='author'>
            {props.message.author+':'}
        </div> : null
    
    return (
        <div>
            {authorDiv}
            <div className='msg'> 
                <span className='msg__bubble'>{props.message.content}</span>
            </div>
        </div>
    )
}
function MessageList(props) {
    return (<div className='msg-list'>
        { props.messages.map((x,i) => <ChatMessage key={i} message={x} newAuthor={x.author && props.messages[i-1]?.author!==x.author}/>) }
        <div className='scroll-down' ref={props.scrollDownRef}/>
    </div>)
}
function MessageField(props) {
    const minBlockHeight = 60
    return (<div style={{height: Math.max(minBlockHeight, props.inputHeight*.9+20)+'px'}} className='msg-field'>
                <textarea onKeyDown={props.onKeyDown} style={{height: props.inputHeight*.9+'px'}} className='msg-field__area' onInput={props.onInput} value={props.message}/>
                <button className='msg-field__button' type='button' onClick={props.onSubmit}>Enviar</button>
            </div>)
}
const socket = io('ws://127.0.0.1:3000', {
    reconnectionDelay: 10000
})
function FunctionalChat() {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [inputHeight, setInputHeight] = useState()
    const scrollDownRef = useRef(null)
    function newMessage(msg) {
        setMessages(messages.concat([msg]))
        scrollDownRef.current.scrollIntoView()
    }
    useEffect(()=>{
        socket.on('relayedMsg', (msg)=>{
            newMessage(msg)
        })
        return ()=>{
            socket.off('connected')
            socket.off('relayedMsg')
        }
    })
    function onInput(event) {
        setInput(event.target.value.replace('\n', ''))
        setInputHeight(event.target.scrollHeight)
    }
    function onSubmit() {
        if(input!=="") {
            socket.emit('msg', input)
            setInput('')
        }
    }
    return (
        <div className='chat'>
            <TopBar onClickProfile={()=>{console.log('profile')}}/>
            <MessageList messages={messages} scrollDownRef={scrollDownRef}/>
            <MessageField onInput={onInput} onKeyDown={(event)=>{
                if (event.key==='Enter') {
                    onSubmit()
                }
            }} message={input} 
                onSubmit={onSubmit} inputHeight={inputHeight}/>
        </div>
    )
}
export default FunctionalChat