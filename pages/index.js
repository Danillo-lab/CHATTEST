import React, { useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {transports: ["websocket"]});

export default function Home() {

    const [name, setName] = useState("");
    const [list, setList] = useState([]);
    const handlepost = (e) => {
        socket.emit("sendMessage", {post: name});
    }
    
    socket.on("send", (data) => {
        setList([...list, data])
    })
    
    return (
        <div class="App">
            <div class="contain">
                <h1>FRONT END TO CHAT!</h1>
                {list.map((p) => (
                    <div><li>{p.post}</li></div>
                ))}
            </div>
            <input class="field" type="text" onChange={(e)=> setName(e.target.value)}/>
            <button onClick={handlepost}>Enviar</button>
        </div>
    )
}