// import axios from "axios"
// import { useState } from "react"

// export const InputBox = () => {
//     const [prompt, setPrompt] = useState("")
//     const [answer, setAnswer] = useState("Answer Here")
//     const [loading, setLoading] = useState(false)
//     const handleSumbit = () => {
//         setLoading(true)
//         axios.post("http://localhost:8081/api/v1/question/ask", { question: prompt })
//             .then((res) => {
//                 setAnswer(res.data.response)
//                 setLoading(false)
//                 window.scrollTo({
//                     top: document.body.scrollHeight,
//                     behavior: 'smooth'
//                 });
//             })
//     }
//     return (
//         <>
//             <div className="flex justify-center items-center bg-slate-900 h-screen">
//                 <div className="flex flex-col h-1/2 w-1/2 m-2 justify-center items-center">
//                     <div className="h-3/4 w-3/4 flex flex-col justify-center items-center">
//                         <img className="rounded-lg" src={"src/assets/llama2.png"} alt="llama2" />
//                         <textarea value={prompt} onChange={(e) => {
//                             setPrompt(e.target.value)
//                         }} className="m-2 p-5 bg-slate-500 text-white place-content-center ring-offset-purple-900 w-96 h-32 rounded-3xl resize-none overflow-hidden" placeholder="Type your prompt here!" />
//                         <button onClick={handleSumbit} className="m-2 border rounded bg-blue-500 text-gray-100 p-2">{loading ? "Loading..." : "Generate"}</button>
//                     </div>
//                 </div>
//             </div>
//             <div className="h-screen bg-slate-900 flex justify-center items-center">
//                 <p className="text-white border rounded p-2">{answer}</p>
//             </div>
//         </>
//     )
// }

import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import axios from 'axios'

export const InputBox = () => {
    const [isChatbotVisible, setIsChatbotVisible] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'incoming', text: 'Hi there 👋\nHow can I help you today?' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const chatInputRef = useRef(null);

    useEffect(() => {
        if (chatInputRef.current) {
            chatInputRef.current.style.height = 'auto';
            chatInputRef.current.style.height = `${chatInputRef.current.scrollHeight}px`;
        }
    }, [inputValue]);

    const handleToggleChatbot = () => {
        setIsChatbotVisible(!isChatbotVisible);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            setMessages([...messages, { type: 'outgoing', text: inputValue.trim() }]);
            setInputValue('');
        }
        axios.post("http://localhost:8081/api/v1/question/ask", { question: inputValue })
            .then((res) => {
                // setAnswer(res.data.response)
                const incomingMessage = { type: 'incoming', text: res.data.response };
                setMessages(prevMessages => [...prevMessages, incomingMessage]);
            })
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 800) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className={`app ${isChatbotVisible ? 'show-chatbot' : ''}`}>
            <button className="chatbot-toggler" onClick={handleToggleChatbot}>
                <span className="material-symbols-rounded">mode_comment</span>
                <span className="material-symbols-outlined">close</span>
            </button>
            <div className="chatbot">
                <header>
                    <h2>Chatbot</h2>
                    <span className="close-btn material-symbols-outlined" onClick={handleToggleChatbot}>close</span>
                </header>
                <ul className="chatbox">
                    {messages.map((msg, index) => (
                        <li key={index} className={`chat ${msg.type}`}>
                            {msg.type === 'incoming' && <span className="material-symbols-outlined">smart_toy</span>}
                            <p>{msg.text}</p>
                        </li>
                    ))}
                </ul>
                <div className="chat-input">
                    <textarea
                        ref={chatInputRef}
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter a message..."
                        spellCheck="false"
                        required
                    ></textarea>
                    {/* <span id="send-btn" className="material-symbols-rounded" onClick={handleSendMessage}>send</span> */}

                    <span id="send-btn" className="material-symbols-rounded" onClick={handleSendMessage} >send</span>
                </div>
            </div>
        </div>
    );
};

