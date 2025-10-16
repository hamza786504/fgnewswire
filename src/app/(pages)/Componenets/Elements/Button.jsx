import Link from 'next/link'
import React from 'react'

function Button({ content, href, classes }) {
    return (
        <>
            <Link href={href} className={`${classes} uppercase bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 px-8 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 wow animate__animated animate__pulse`} data-wow-iteration="3">
                {content}
            </Link>
        </>
    )
}

export default Button;
