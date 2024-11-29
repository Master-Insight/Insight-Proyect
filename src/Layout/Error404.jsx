import NavBar from './navbar/Navbar'
import config from '../../config/layout'
import Footer01 from './Footer01'
import company from '../../config/company'

const Error404 = () => {
  // const auth = !!localStorage.getItem('token')
  const navLinks = config.navbar.default

  return (
    <>
      <NavBar navLinks={navLinks} />
      <div>Global Not Found 🙄 a</div>
      <Footer01 config={company} />
    </>
  )
}

export default Error404