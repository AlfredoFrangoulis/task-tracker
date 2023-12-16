import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='footer'>
            <p className='footerP'>Copyright &copy; 2021</p>
            <Link className='footerLink' to='/about'>About</Link>
        </footer>
    )
}

export default Footer
