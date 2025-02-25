import "./Message.css";
import bus from '../../utils/bus'

import { useState, useEffect } from "react";

const Message = () => {
  const [visibility, setVisibility] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");


  useEffect(() => {

    bus.addListener('flash', ({message, type}) => {

        setVisibility(true),
        setMessage(message),
        setType(type)

        setTimeout(() => {
            setVisibility(false)
        }, 3000)
    })

  }, [])

  return (
    visibility && (
      <div className={`message ${type}`}>
        <p>{message}</p>
      </div>
    )
  );
};

export default Message;
