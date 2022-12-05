import { useState } from 'react'
import './App.css'

export const App = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const handleSubmit = async(ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    if(!name.length || !email.length){
      alert('Preencha os campos corretamente')
      return
    }

    const request = await fetch('http://localhost:8080/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( {name, email} )
    })

    const response = await request.json()

    alert(`Status: ${response.status} \nMensagem: ${response.message} `)
  }

  return (
    <div className="App">

      <h1>Cadastro de usuário</h1>

      <form onSubmit={handleSubmit}>

        <input value={name}
          placeholder='Nome'
          onChange={ev => setName(ev.currentTarget.value)}
        />

        <input value={email}
          placeholder='Email'
          onChange={ev => setEmail(ev.currentTarget.value)}
        />

        <button type='submit'>
          Submit
        </button>

      </form>

    </div>
  )
}
