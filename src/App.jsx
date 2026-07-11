import 'css/App.css'
import { useEffect, useState } from 'react'
import envelopes from './envelopes'
import Navbar from './navbar'
import PixelBuddy from './PixelBuddy'
import { db } from './firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import Login from './Login'
import Letters from './Letters'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'

export default function App() {
    // states
    const [openId, setOpenId] = useState(null)
    const [flyDirections, setFlyDirections] = useState({})
    const [letterboxOpen, setLetterboxOpen] = useState(false)
    const [letterText, setLetterText] = useState('')
    const [showLogin, setShowLogin] = useState(false)
    const [showLetters, setShowLetters] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [authLoading, setAuthLoading] = useState(true)
    const [started, setStarted] = useState(false)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setAuthLoading(false)
        })
        return () => unsub()
    }, [])

    const handleClick = (id) => {
        const directions = {}
        envelopes.forEach((envelope) => {
            if (envelope.id != id) {
                directions[envelope.id] = {
                    x: (Math.random() - 0.5) * 1000,
                    y: (Math.random() - 0.5) * 1000
                }
            }
        })
        setFlyDirections(directions)
        setOpenId(id)
    }

    const handleSendLetter = async () => {
        if (!letterText.trim()) return

        const letterData = {
            text: letterText,
            timestamp: serverTimestamp(),
            read: false,
        }

        await addDoc(collection(db, 'letters'), letterData)


        await fetch(import.meta.env.VITE_DISCORD_WEBHOOK, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                content: `💌 **you have mail:**\n\n${letterText}`
            })
        })

        setLetterText('')
        setLetterboxOpen(false)
    }

    // if firebase is still checking user auth status
    if (authLoading) return <div className='loading'>loading...</div>

        // if no user is logged in
        if (!user) return <Login onLogin={() => {}} />

        if (!started) return (
            <div className='letter-overlay' onClick={() => setStarted(true)}>
            <div style={{ textAlign: 'center', color: '#e8d5a3' }}>
            <p style={{ fontSize: '1rem', marginBottom: '2rem' }}>💌</p>
            <p style={{ fontSize: '0.6rem', lineHeight: 2 }}>OPEN ONLY WHEN YOU NEED IT</p>
            <p style={{ fontSize: '0.4rem', marginTop: '2rem', opacity: 0.6 }}>click to open :)</p>
        </div>
        </div>
)

// open the app
return (
    <>
    <Navbar onLetterboxOpen={() => setLetterboxOpen(true)}
    onProfileClick={() => setShowLogin(true)}
    />
    <div className="envelope-grid">
    {envelopes.map((envelope) => (
        <div key={envelope.id}
        className="envelope"
        onClick={() => handleClick(envelope.id)}
        style={flyDirections[envelope.id] ? {
            transform: `translate(${flyDirections[envelope.id].x}px, ${flyDirections[envelope.id].y}px)`,
            opacity: 0,
            transition: 'transform 0.6s ease, opacity 0.6s ease',
        } : {}}>
        <p>{envelope.mood}</p>
        </div>
    ))}
    {openId && (
        <div className='letter-overlay' onClick={() => {
            setOpenId(null)
            setFlyDirections({})
        }}>
        <div className='letter-content' onClick={(e) => e.stopPropagation()}>
        <p>{envelopes.find(e => e.id === openId)?.letter}</p>
        </div>
        </div>
    )}
    {letterboxOpen && (
        <div className='letter-overlay' onClick={() => setLetterboxOpen(false)}>
        <div className='letter-content' onClick={(e) => e.stopPropagation()}>
        <h2>To Bub,</h2>
        <textarea
        className='letter-textarea'
        placeholder='write whatever your heart wishes'
        value={letterText}
        onChange={(e) => setLetterText(e.target.value)}
        />
        <button className='send-btn' onClick={handleSendLetter}>
        send:)
            </button>
            </div>
            </div>
    )}
    </div>
    <PixelBuddy />
    {showLogin && !isLoggedIn && (
        <Login onLogin={() => { setIsLoggedIn(true); setShowLogin(false); setShowLetters(true) }} />
    )}
    {showLetters && isLoggedIn && (
        <Letters onClose={() => setShowLetters(false)} />
    )}
    </>
)
}
