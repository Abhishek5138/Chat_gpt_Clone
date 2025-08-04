// src/Context.jsx
import React, { createContext, useState } from "react";
import runChat from "../config/gemini"; // Import default export from gemini.js

export const Context = createContext();

const ContextProvider = (props) => {

    const [input,setInput]=useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [previousPrompts, setPreviousPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara=(index,nextWord)=>{
        setTimeout(function(){
            setResultData((prev) => prev + nextWord);   

        }, 75 * index);
    }
    const newChat=()=>{
        setLoading(false);
        setShowResult(false);
    }
    const onSent = async (prompt) => {
    try {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if(prompt!==undefined){
            response= await runChat(prompt);
            setRecentPrompt (prompt);
        }
        else{
            setPreviousPrompts((prev) => [...prev, input]);
            setRecentPrompt(input);
            response = await runChat(input);
        }
      let responseArray= response.split("**");
      let newArray=" ";
      for(let i=0;i<responseArray.length;i++){
        // newArray.push(responseArray[i]);
        if(i===0 || i%2 !==1){
          newArray += responseArray[i];
        }
        else{
            newArray += `<br/>${responseArray[i]}<br/>`;
        }
      }
      let response2= newArray.split("*").join("</br>");
    //   setResultData(response2);
      let newResponseArray= response2.split(" ");
      for(let i=0;i<newResponseArray.length;i++){
        delayPara(i,newResponseArray[i]+" ");
      }
      setLoading(false);
      setInput("");
      console.log("Chat Response:", response);
    } catch (error) {
      console.error("Error during chat:", error);
    }
  };

  // Example call to onSent
//   React.useEffect(() => {
    // onSent("tellme a joke");
//   }, []);

  const contextValue = {
    previousPrompts,
    setPreviousPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat

    // define context values or methods here if needed
  };

  return (
    <Context.Provider value={{ ...contextValue }}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;