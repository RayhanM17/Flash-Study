import { BsFillLightningChargeFill } from "react-icons/bs";

function Footer() {
    const footerYear = new Date().getFullYear()
    return (
        <footer className="footer p-10 bg-gray-700 text-primary-content footer-center">
            <div>
                <BsFillLightningChargeFill className="text-secondary mb-1"/>
                <p className="font-medium text-gray-400">
                    Copyright &copy; {footerYear} All rights reserved
                </p>
            </div>
        </footer>
    )
}

export default Footer