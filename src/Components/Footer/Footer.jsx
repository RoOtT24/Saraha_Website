import React from 'react'
import { Li, Link, LinknkLink } from 'react-router-dom'
import styles from './Footer.module.css'

const Footer = () => {
  return (
   <div className={styles.footer-dark}>
  <footer>
    <div className={styles.container}>
      <div className="row">
        <div className="col-sm-6 col-md-3 item">
          <h3>Services</h3>
          <ul>
            <li><Link to="/" />Web design</li>
            <li><Link to="/" />Development</li>
            <li><Link to="/" />Hosting</li>
          </ul>
        </div>
        <div className="col-sm-6 col-md-3 item">
          <h3>About</h3>
          <ul>
            <li><Link to="/" />Company</li>
            <li><Link to="/" />Team</li>
            <li><Link to="/" />Careers</li>
          </ul>
        </div>
        <div className="col-md-6 item text">
          <h3>Company Name</h3>
          <p>Praesent sed lobortis mi. Suspendisse vel placerat ligula. Vivamus ac sem lacus. Ut vehicula rhoncus elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit pulvinar dictum vel in justo.</p>
        </div>
        <div className="col item social"><Link to="/" /><i className="icon ion-social-facebook" /><Link to="/" /><i className="icon ion-social-twitter" /><Link to="/" /><i className="icon ion-social-snapchat" /><Link to="/" /><i className="icon ion-social-instagram" /></div>
      </div>
      <p className={styles.copyright}>Company Name © 2018</p>
    </div>
  </footer>
</div>

  )
}

export default Footer