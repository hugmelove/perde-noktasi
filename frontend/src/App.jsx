import { useState } from 'react'
import axios from 'axios'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/auth/login', { email, password })
      setMessage('✅ Login başarılı!')
      setUser(response.data.data.user)
    } catch (error) {
      setMessage('❌ ' + (error.response?.data?.message || 'Login başarısız'))
    }
  }

  if (user) {
    return (
      <div className="container">
        <h1>Hoş Geldiniz! 🎉</h1>
        <p><strong>İsim:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Rol:</strong> {user.role}</p>
        <button onClick={() => setUser(null)}>Çıkış Yap</button>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>Perde Noktası</h1>
      <h2>Giriş Yap</h2>
      
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@perdenoktasi.com"
            required
          />
        </div>

        <div className="form-group">
          <label>Şifre:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="123456"
            required
          />
        </div>

        <button type="submit">Giriş Yap</button>
      </form>

      {message && <p style={{marginTop: '20px', textAlign: 'center'}}>{message}</p>}
      
      <div style={{marginTop: '30px', padding: '15px', background: '#fef3c7', borderRadius: '5px'}}>
        <p><strong>Demo Hesaplar:</strong></p>
        <p>Admin: admin@perdenoktasi.com / 123456</p>
        <p>Bayi: bayi@perdenoktasi.com / 123456</p>
      </div>
    </div>
  )
}

export default App
