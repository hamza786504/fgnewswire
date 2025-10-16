import React from 'react'

function Footer() {
    return (
        <>
            <footer className="bg-white border-t border-gray-200 py-2">
                <div className="container mx-auto px-4 text-center text-gray-600">
                    © {new Date().getFullYear()} King Newswire
                </div>
            </footer>
        </>
    )
}

export default Footer
