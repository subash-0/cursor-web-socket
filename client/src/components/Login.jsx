import {useState} from 'react'


export const Lgoin =({onSubmit})=>{

    const [username, setUsername] = useState("");

    return(
        <>
        <h1>Welcome</h1>
        <p>What should people call You ?</p>
      <form onSubmit={(e)=>{
        e.preventDefault();
        onSubmit(username)
      }}>
      <input type="text" placeholder="Please enter your name"
        onChange={(e)=> setUsername(e.target.value)}
        />

      <button type="submit">Submit</button>

      </form>

        
        </>
    )
}