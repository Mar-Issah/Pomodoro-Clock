import React from 'react'

//we are creating the length which will represent each parts ie break and session length of the app. this contains the title, buttons on the side , time in b/n buttons

//make sure you have all the props in place so you can pass the fcc test. includes ids/classname

//use destructure as props here in the parameter. use a fxn to refer to the onClick instead of calling it staightaway

function Lengths({ type,titleId, title, incrementId, lengthId, formatTime, decrementId, clickUp }) {
    return (
        <div>
            <h4 id={titleId}>{title}</h4>
            <div className="time-sets">
                <button id={incrementId} className="btn-small black" onClick={() => clickUp(-60, type)} >
                    <i className="material-icons">arrow_downward</i>
                </button>

                <p id={lengthId}>{formatTime}</p>

                  <button id={decrementId} className="btn-small black" onClick={() => clickUp(60, type)}>
                    <i className="material-icons">arrow_upward</i>
                </button>
            </div>
        </div>
    )
}

export default Lengths
