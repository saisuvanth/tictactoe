import React from 'react'

const Button = ({ text, variant, handleClick }) => {
	return (
		<button className={`btn ${variant} w-full py-3`} onClick={handleClick}>{text}</button>
	)
}

export default Button