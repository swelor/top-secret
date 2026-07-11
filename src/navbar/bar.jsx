import './navbar.css'
import { auth } from './firebase'
import { signOut } from 'firebase/auth'

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
                {/*<button className='nav-btn' title='profile' onClick={onProfileClick}>
                    👤
                </button>
        <button className='nav-btn' title='where is bub?'>
                    📍
            </button>
                <button className='nav-btn' title='ping bub'>
                    🔔
                </button>*/}
                <button className='nav-btn' onClick={onLetterboxOpen} title='write a letter back'>
                    📬
                </button>
                <button className='nav-btn' title='logout' onClick={handleLogout}>
                    🚪
                </button>
            </div>
        </nav>
    )
}

