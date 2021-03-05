import './Button.css'
import {Link} from 'react-router-dom'

// STYLES will hold 2 classes for later use
const STYLES = ['btn--primary', 'btn--outline']

const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({
    children, 
    type, 
    onClick, 
    buttonStyle, 
    buttonSize}) => {
    // if "STYLES.includes(buttonStyle)" is true, then use the first class - btn--primary
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

    const chechButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

    return(
        <Link to='/' className='btn-mobile'>
            <button className={`btn ${checkButtonStyle} ${chechButtonSize}`}
            onClick = {onClick}
            type = {type}
            > 
            {children}
            
            </button>
        </Link>
    )
};