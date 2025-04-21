import { NavLink } from "react-router-dom";
import { Link } from "react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import {
  SlSocialFacebook,
  SlSocialInstagram,
  SlSocialTwitter,
} from "react-icons/sl";

const UFooter = () => {
  // return (
  //   <footer class="bg-white text-black py-12 px-4 sm:px-6 lg:px-8 drop-shadow-2xl shadow-2xl mt-2">
  //     <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  //       <div class="space-y-4">
  //         <h3 class="text-xl font-bold">CSPLMS</h3>
  //         <p class="text-gray-400">Streamline the borrow and return process.</p>
  //         <div class="flex space-x-4">
  //           <a href="#" class="text-gray-400 hover:text-white transition">
  //             <i class="fab fa-twitter"></i>
  //           </a>
  //           <a href="#" class="text-gray-400 hover:text-white transition">
  //             <i class="fab fa-linkedin"></i>
  //           </a>
  //           <a href="#" class="text-gray-400 hover:text-white transition">
  //             <i class="fab fa-github"></i>
  //           </a>
  //         </div>
  //       </div>

  //       <div class="space-y-4">
  //         <h4 class="text-lg font-semibold text-black">Quick Links</h4>
  //         <ul class="space-y-2">
  //           <li>
  //             <NavLink to="/" class="text-gray-400 hover:text-white transition">
  //               Home
  //             </NavLink>
  //           </li>
  //           <li>
  //             <NavLink
  //               to="/top-borrowed-books"
  //               class="hover:text-white transition text-black"
  //             >
  //               Top Borrowed Books
  //             </NavLink>
  //           </li>
  //           <li>
  //             <NavLink
  //               to="/new-arrivals"
  //               class="hover:text-white transition text-black"
  //             >
  //               New Arrivals
  //             </NavLink>
  //           </li>
  //           <li>
  //             <a href="/docs" class="transition text-black">
  //               Documentation
  //             </a>
  //           </li>
  //         </ul>
  //       </div>

  //       <div class="space-y-4 text-black">
  //         <h4 class="text-lg font-semibold">Legal</h4>
  //         <ul class="space-y-2">
  //           <li>
  //             <a
  //               href="/privacy"
  //               class="text-gray-400 hover:text-white transition"
  //             >
  //               Privacy Policy
  //             </a>
  //           </li>
  //           <li>
  //             <a
  //               href="/terms"
  //               class="text-gray-400 hover:text-white transition"
  //             >
  //               Terms of Service
  //             </a>
  //           </li>
  //           <li>
  //             <a
  //               href="/cookies"
  //               class="text-gray-400 hover:text-white transition"
  //             >
  //               Cookie Policy
  //             </a>
  //           </li>
  //         </ul>
  //       </div>

  //       <div class="space-y-4">
  //         <h4 class="text-lg font-semibold">Contact Us</h4>
  //         <ul class="space-y-2 text-gray-400">
  //           <li class="flex items-center space-x-2">
  //             <i class="fas fa-envelope"></i>
  //             <span>csplms@gmail.com</span>
  //           </li>
  //           <li class="flex items-center space-x-2">
  //             <i class="fas fa-map-marker-alt"></i>
  //             <span>Pokhara-29</span>
  //           </li>
  //         </ul>
  //       </div>
  //     </div>

  //     <div class="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
  //       <p>&copy; 2025 CSPLMS. All rights reserved.</p>
  //     </div>
  //   </footer>
  // );

  return (
    <footer className="bg-white text-black drop-shadow-2xl shadow-2xl mt-3">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* <div className="space-y-4">
            <h3 className="text-xl font-semibold">SajiloTicket.</h3>
            <p className="text-sm text-gray-400">
              Your trusted platform for discovering and booking tickets for the
              best events in Nepal.
            </p>
            <div>
              <p className="text-sm font-medium mb-2">Payment Accepted</p>
              <img src="/khalti.png" alt="Khalti Wallet" className="h-8" />
            </div>
          </div> */}

          <div>
            <h3 className="text-lg font-medium mb-4 uppercase">Quick Links</h3>
            <nav className="space-y-3 flex flex-col">
              <Link to="/" className=" text-gray-800 hover:text-[#206ea6]">
                Home
              </Link>
              <Link
                to="/new-arrivals"
                className="text-gray-800 hover:text-[#206ea6]"
              >
                New Arrivals
              </Link>
              <Link
                to="/top-borrowed-books"
                className="text-gray-800 hover:text-[#206ea6]"
              >
                Top Borrowed
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
                <p className="text-sm">+977 9806140735</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} />
                <p className="text-sm">csplms957@gmail.com</p>
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
            &copy; {new Date().getFullYear()} Chandra Surya Public Library
          </p>
        </div>

        {/* <div class="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; 2025 CSPLMS. All rights reserved.</p>
        </div> */}
      </div>
    </footer>
  );
};

export default UFooter;
