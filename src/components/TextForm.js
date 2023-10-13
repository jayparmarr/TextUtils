import React, { useState } from 'react'

export default function TextForm(props) {
    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to uppercase","success");
    }
    const handleDownClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to lowercase","success");
    }
    const handleSpaces = (event) => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra spaces removed","success");
    }
    const speak = () => {
        let msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
        const toogle = document.getElementById('toggle')
        if (toogle.textContent === "Hear out") {
            toogle.innerHTML = "Stop"
            props.showAlert("Hear out your text","success");
        }
        else {
            toogle.innerHTML = "Hear out"
            if (toogle.innerHTML === "Hear out") {
                window.speechSynthesis.cancel()
                props.showAlert("Stop","success");
            }
        }
    }
    const handleOnChange = (event) => {
        setText(event.target.value);
    }
    const handleCopyText = (event) => {
        var text = document.getElementById("myBox");
        text.select();
        navigator.clipboard.writeText(text.value);
        props.showAlert("Copied to clipboard","success");
    }
    const handleClearClick = () => {
        let newText = '';
        setText(newText)
        props.showAlert("Text Cleared","success");
    }

    const [text, setText] = useState("");
    return (
        <>
            <div className="container" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
                <h1>{props.heading}</h1>
                <div className="mb-3">
                    <textarea className="form-control" value={text} onChange={handleOnChange} style={{ backgroundColor: props.mode === 'dark' ? 'black' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }} id="myBox" rows="8"></textarea>
                </div>
                <button className="btn btn-primary" onClick={handleUpClick}>Convert to Uppercase</button>
                <button className="btn btn-primary mx-3" onClick={handleDownClick}>Convert to Lovercase</button>
                <button className="btn btn-primary mx-0" onClick={handleSpaces}>Remove spaces</button>
                <button className="btn btn-primary mx-2" onClick={handleCopyText}>Copy Text</button>
                <button className="btn btn-primary mx-2" onClick={speak} id="toggle">Hear out</button>
                <button className="btn btn-primary mx-2" onClick={handleClearClick}>Clear Text</button>
            </div>
            {/* <div className="container my-3" style={{color: props.mode==='dark'?'white':'black'}}>
                <h1>Text Summary</h1>
                <p> {text.split(" ").length} Words and {text.length} Characters</p>
                <p> {0.008 * text.split(" ").length} minutes required to read</p>
            </div> */}
            <div className="container my-3" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
                <h1>Text Summary</h1>
                {text.trim() === '' ? (
                    <p>No text entered</p>
                ) : (
                    <>
                        <p>{text.split(" ").length} Words and {text.length} Characters</p>
                        <p>{0.008 * text.split(" ").length} minutes required to read</p>
                    </>
                )}
            </div>

        </>
    )
}
