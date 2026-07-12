import './navbar.css'
import { auth } from './firebase'
import { signOut } from 'firebase/auth'
import { Anime } from 'react-anime'
import { iconAnimation } from './animations.js'

export default function Navbar({ onLetterboxOpen, onProfileClick }) {
    const handleLogout = async () => {
        await signOut(auth)
    }

    return (
        <nav className='navbar'>
            <div className='navbar-brand'>
                <span>💌</span>
            </div>
            <div className='navbar-buttons'>
                <Anime animation={iconAnimation}>
                <button className='nav-btn' title='profile' onClick={onProfileClick}>
                    👤
                </button>
                </Anime>
        <button className='nav-btn' title='where is bub?'>
                    📍
            </button>
                <button className='nav-btn' title='ping bub'>
                <Anime animation={iconAnimation}>
                    🔔
                </Anime>
                </button>
                <button className='nav-btn' onClick={onLetterboxOpen} title='write a letter back'>
                <Anime animation={iconAnimation}>
                    📬
                </Anime>
                </button>
                <button className='nav-btn' title='logout' onClick={handleLogout}>
                <Anime animation={iconAnimation}>
                    🚪
                </Anime>
                </button>
            </div>
        </nav>
    )
}

