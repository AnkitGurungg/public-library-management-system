import { NavLink } from "react-router-dom";
import { Link } from "react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import {
  SlSocialFacebook,
  SlSocialInstagram,
  SlSocialTwitter,
} from "react-icons/sl";

const UFooter = () => {
  const downloadUserManual = () => {
    const link = document.createElement("a");
    link.href = "/files/Transcript  Form of Anusha.pdf";
    link.download = "CSPLMS_User_Manual.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <footer className="bg-white text-black drop-shadow-2xl shadow-2xl mt-3">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4 uppercase">Quick Links</h3>
            <nav className="space-y-3 flex flex-col">
              <Link to="/" className=" text-gray-800 hover:text-[#206ea6]">
                Home
              </Link>
              <Link
                to="/popular-choices"
                className="text-gray-800 hover:text-[#206ea6]"
              >
                Popular Choices
              </Link>
              <Link
                to="/new-arrivals"
                className="text-gray-800 hover:text-[#206ea6]"
              >
                New Arrivals
              </Link>
              <Link
                to="/recently-published"
                className="text-gray-800 hover:text-[#206ea6]"
              >
                Recently Published
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4 uppercase">About</h3>
            <nav className="space-y-3 flex flex-col">
              <Link
                to="/about-us"
                className=" text-gray-800 hover:text-[#206ea6]"
              >
                About Us
              </Link>
              <Link
                to="/contact-us"
                className="text-gray-800 hover:text-[#206ea6]"
              >
                Contact Us
              </Link>

              <Link
                onClick={downloadUserManual}
                className="block text-gray-800 hover:text-[#206ea6] relative text-left"
              >
                User Manual (PDF)
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4 uppercase">Contact Us</h3>
            <div className="space-y-3 text-gray-800">
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <p className="text-sm">
                  Pokhara, Nepal
                  <br />
                  Bhandardhik-29
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} />
                <a href="tel:+9779806140735" className="hover:text-[#206ea6]">
                  <p className="text-sm">+977 9806140735</p>
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} />
                <a
                  href="mailto:contact.csplms@gmail.com"
                  className="text-sm hover:text-[#206ea6]"
                >
                  <p className="text-sm">contact.csplms@gmail.com</p>
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4 uppercase">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                className="text-gray-800 hover:text-[#206ea6] transition"
              >
                <SlSocialFacebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                className="text-gray-800 hover:text-[#206ea6] transition"
              >
                <SlSocialInstagram size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                className="text-gray-800 hover:text-[#206ea6] transition"
              >
                <SlSocialTwitter size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-12 pt-8">
          <p className="text-sm text-gray-800">
            &copy; {new Date().getFullYear()} CSPLMS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default UFooter;
