import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import toast, {Toaster} from 'react-hot-toast'
function App() {
  const[length,setLength]=useState('')
  const[error,setError]=useState()
  const[password,setPassword]=useState('')
  const[Options,setOptions]=useState({
    includeUppercase:true,
    includeLowercase:true,
    includeNumber:true,
    includeSpecialcharacter:true
  })

  function generatepassword(){
    const{
      includeUppercase,
      includeLowercase,
      includeNumber,
      includeSpecialcharacter
    }=Options
    if(!includeUppercase && !includeLowercase&& !includeNumber &&!includeSpecialcharacter){
      setError("Please select atleast One")
      return
    }
    let charset=''
    if(includeUppercase) charset+='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if(includeLowercase) charset+='abcdefghijklmnopqrstuvwxyz'
    if(includeNumber) charset+='1234567890'
    if(includeSpecialcharacter) charset+='!@#$%^&*()_+[]{}|;:,.<>?'
    let passwords=''
    for(let i=0;i<length;i++){
      const randomindex=Math.floor(Math.random()*charset.length)
      passwords+=charset[randomindex]
    }
    setPassword(passwords)
  }
  return (
    <div className="App">
        <Toaster/>
      <header className="App-header">
       <div className='img_text_container'>
        <img src={logo} className='App-logo' alt='logo' />
        <p style={{color:'wheat'}}>Password Generator</p>

       </div>
       <div>
        <div className='generator-container'>
          <fieldset style={{padding:'10px'}}>
              <legend>Type the length of the Password</legend>
              <div className='form__group'>
                <input type='number'
                className='inputField inputs'
                defaultValue={length}
                onChange={(e)=>{
                  setLength(e.target.value)
                }}>
              
                </input>

              </div>
            
          </fieldset>
          <fieldset>
            <legend>Options</legend>
            <div className='form__group'>
              <input
              type='checkbox'
              name='include Uppercase'
              checked={Options.includeUppercase}
              onChange={(e)=>{
                setOptions((preoptions)=>({
                  ...preoptions,
                  includeUppercase:!Options.includeUppercase
                }))
              }}
             
              />
              
              <label>Include Uppercase Letter</label>
            </div>
            <div className='form__group'>
              <input
              type='checkbox'
              name='include LowerCase'
              checked={Options.includeLowercase}
              onChange={(e)=>{
                setOptions((preoptions)=>({
                  ...preoptions,
                  includeLowercase:!Options.includeLowercase
                }))
              }}
             
              />
              
              <label>Include LowerCase Letter</label>
            </div>
            <div className='form__group'>
              <input
              type='checkbox'
              name='include Number'
              checked={Options.includeNumber}
              onChange={(e)=>{
                setOptions((preoptions)=>({
                  ...preoptions,
                  includeNumber:!Options.includeNumber
                }))
              }}
             
              />
              
              <label>Include Numbers</label>
            </div>
            <div className='form__group'>
              <input
              type='checkbox'
              name='include SpecialCharacter'
              checked={Options.includeSpecialcharacter}
              onChange={(e)=>{
                setOptions((preoptions)=>({
                  ...preoptions,
                  includeSpecialcharacter:!Options.includeSpecialcharacter
                }))
              }}
             
              />
              
              <label>Include SpecialCharacter </label>
            </div>
            
{error &&<p style={{color:'red'}}>{error}</p>}
          </fieldset>
          <button
          className='btn_generate'
          onClick={generatepassword}>
            Generate
          </button>
          <fieldset>
            <legend>Your generatepassword </legend>
            <div className='form__group display_box'>
              <input
              type='text'
              readOnly
              className='inputField'
              value={password}>
                
              </input>
              <button className='btn_copy'
              onClick={()=>{
                navigator.clipboard
                .writeText(password)
              .then(()=>toast.success('copied'))
              .catch((err)=>toast.error("something went wrong "))
              }}>
                
                 Copy
              </button>

            </div>
          </fieldset>

        </div>
       </div>
      </header>
    </div>
  );
}

export default App;
