import { useState, useCallback, useEffect ,useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(7)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")


  // Ref Hook 
  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let password = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*(){}"

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      password += str.charAt(char)
    }
    setPassword(password)

  }, [length, numberAllowed, charAllowed])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, setPassword])




  return (
    <>
      <div
        className='w-110  mx-auto shadow-md rounded-lg px-4 py-4 my-8  bg-gray-700'>
        <h4
          className='text-3xl text-center text-white '>
          🔒Password-Generator🔒
        </h4>
        <input
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3 mt-3 bg-white rounded'
          readOnly
          ref={passwordRef} />
        <button onClick={copyPasswordToClipboard}  className='w-full bg-orange-500 text-amber-50 mt-4 mb-2 py-1 px-3 rounded'>Copy</button>
        <div className="flex text-sm gap-x-2">
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input
                type="range"
                min={6}
                max={25}
                value={length}
                className='cursor-pointer'
                onChange={(e) => {
                  setLength(e.target.value)
                }}
              />
              <label className='text-white'>Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev)
                  // prev => Give me the previous/current value of numberAllowed.
                }
                }
              />
              <label htmlFor="numberInput" className='text-white'>Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev)

                }}
              />
              <label htmlFor="characterInput" className='text-white'>
                Characters
              </label>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  )
}

export default App
