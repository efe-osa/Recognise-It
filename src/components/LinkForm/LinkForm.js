import React from "react"
import "./LinkForm.css"
const LinkForm = ({onInputChange, onSubmit}) => {
    return (<div>
        <p className='f3'> {"This Magic brain will detect faces in your picture.  Try it Out!"}</p>
        <div className='center'>
            <div className=' form center pa4 br3 shadow-2'>
                <input className="f4 pa2 w-70 center" type='text' onChange={onInputChange} />
                <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onSubmit}>Detect</button>
            </div>
        </div>
    </div>)
}
export default LinkForm