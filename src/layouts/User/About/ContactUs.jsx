import { Mail, MapPin, Phone } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
        <p className="text-lg text-gray-700">We would love to hear from you!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="flex items-start space-x-3">
          <Phone className="h-5 w-5 text-gray-700 mt-1" />
          <div>
            <h3 className="font-medium">Pokhara</h3>
            <p className="text-gray-700">+977 9806140735</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="h-5 w-5 flex items-center justify-center mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-700"
            >
              <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
              <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
              <path d="M13 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
              <path d="M9 14a5 5 0 0 0 6 0" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium">Whatsapp, Viber</h3>
            <p className="text-gray-700">+977 9806140735</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Mail className="h-5 w-5 text-gray-700 mt-1" />
          <div>
            <h3 className="font-medium">General Inquiries</h3>
            <p className="text-gray-700">contact@csplms.com</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Mail className="h-5 w-5 text-gray-700 mt-1" />
          <div>
            <h3 className="font-medium">Help & Support</h3>
            <p className="text-gray-700">support@csplms.com</p>
          </div>
        </div>
      </div>

      {/* locatons */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-100 p-6 rounded-lg flex items-start space-x-3">
          <MapPin className="h-5 w-5 text-gray-700 mt-1" />
          <div>
            <h3 className="font-medium">Nepal Mandala Book Shop</h3>
            <p className="text-gray-700">Lakeside, Pokhara</p>
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg flex items-start space-x-3">
          <MapPin className="h-5 w-5 text-gray-700 mt-1" />
          <div>
            <h3 className="font-medium">Books Mandala</h3>
            <p className="text-gray-700">Balwatar, Kathmandu</p>
          </div>
        </div>
      </div> */}

      {/* half map */}
      {/* <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7645.869101081765!2d84.05857533825586!3d28.152047416095538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995bd739b036057%3A0xb81ef60290839525!2sBhandardhik%2C%20Lekhnath%2033700!5e0!3m2!1sen!2snp!4v1745274564320!5m2!1sen!2snp"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe> */}

      {/* full map */}
      <div className="w-full h-[400px] rounded-lg overflow-hidden border border-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7645.869101081765!2d84.05857533825586!3d28.152047416095538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995bd739b036057%3A0xb81ef60290839525!2sBhandardhik%2C%20Lekhnath%2033700!5e0!3m2!1sen!2snp!4v1745274564320!5m2!1sen!2snp"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="mt-4 bg-blue-50 p-4 rounded-lg">
        <div className="flex flex-col">
          <h3 className="font-medium">Chandra Surya Public Library</h3>
          <p className="text-gray-700">Bhandardhik-29, Pokhara</p>
          <div className="flex items-center mt-1">
            <div className="flex items-center">
              <span className="text-yellow-500">★★★★</span>
              <span className="text-yellow-500">☆</span>
            </div>
            <span className="ml-2 text-sm text-gray-600">4 · 102 reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
