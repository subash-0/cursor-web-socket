import { useState } from 'react'

import { Lgoin } from './components/Login'
import Home from './Home';

function App() {
 const [username, setUsername] = useState("");

 return username? <Home user={username} />  : <Lgoin onSubmit={setUsername} />
   
}

export default App
