import React from 'react'

function Header({ email = 'kamranmohd89@gmail.com', setIsLoggedIn }) {
    const firstTwoLetters = email.substring(0, 2).toUpperCase();
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    }
    return (
        <header className='sticky top-0 z-50 bg-white px-4 py-2 shadow-sm'>
            <div className='max-w-4xl mx-auto'>
                <div className='flex items-center justify-between'>
                    <a className='text-rose-500 dark:text-offwhite font-bold text-2xl'>Fletnix</a>
                    <button onClick={handleLogout} className='flex items-center justify-center h-8 w-8 rounded-full bg-emerald-600 text-gray-100 text-sm font-medium'>{firstTwoLetters}</button>
                </div>
            </div>
        </header>
    )
}

export default Header