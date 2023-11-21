import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './HomePage Style.css';
import MedicineLogo from './Medicine Logo.png';

const AuthenticationPage = () => {
    return (
        <Authenticator>
            {({ signOut }) => (
                <div>
                    <div class="header">
                    <img className="logo" src={MedicineLogo} alt="Medicine Logo" />
                        <div class="title-container">
                            <h1 class="main-title">Welcome to TeleMed</h1>
                            <h1 class="sub-title">A Telemedicine Portal</h1>
                        </div>
                        <button class="sign-out-button" onClick={signOut}>Sign Out</button>
                        <div class="menu-dropdown">
                            <div class="dropdown">
                                <button class="dropbtn">Menu ▼</button>
                                <div class="dropdown-content">
                                    <a href="Telemedicine.html">Know your Doctors</a>
                                    <a href="Hospitals.html">Hospitals Near You</a>
                                    <a href="Appointments.html">Book an Appointment</a>
                                    <a href="Diagnosis.html">Get a Diagnosis</a>
                                    <a href="Contact.html">Contact Us</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="content-box">
                        <h4>SOME INFORMATION ABOUT TELEMEDICINE:</h4>
                        <p>Telemedicine, also known as telehealth, has transformed the way healthcare is delivered. It is a promising solution that combines healthcare expertise with cutting-edge technology to improve patient outcomes and enhance access to healthcare services. It comes with several benefits such as:</p>
                        <ul>
                            <li>Convenience: Access healthcare services from anywhere with an internet connection.</li>
                            <li>Accessibility: Overcome geographical barriers and reach healthcare experts.</li>
                            <li>Cost-Efficiency: Reduce travel and administrative costs.</li>
                            <li>Safety: Especially valuable during public health crises, minimizing in-person contact.</li>
                        </ul>
                        <h4>ABOUT US:</h4>
                        <p>Our telemedicine services provide remote healthcare consultations and support, allowing you to connect with healthcare professionals from the comfort of your own home. We offer a range of medical services, including:</p>
                        <ul>
                            <li>General Health Check-ups</li>
                            <li>Specialist Consultations</li>
                            <li>Prescription Refills</li>
                            <li>Medical Advice</li>
                            <li>Mental Health Counseling</li>
                        </ul>
                        <p>We are dedicated to providing high-quality healthcare services through telecommunication technology, ensuring your health and safety are our top priorities.</p>
                    </div>
                </div>
            )}
        </Authenticator>
    )
}

export default AuthenticationPage;