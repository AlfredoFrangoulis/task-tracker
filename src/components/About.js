import { Link } from 'react-router-dom'

const About = () => {
    return (
        <div className='about'>
            <h4 className='aboutH4'>Version 1.0.0</h4>
            <Link className='aboutLink' to='/'>Go Back</Link>            
        </div>
    )
}

export default About
