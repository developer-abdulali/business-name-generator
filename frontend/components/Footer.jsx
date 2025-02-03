import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" bg-gray-900 text-gray-100 py-8">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            Job<span className="text-red-500">Portal</span>
          </h2>
          <p className="text-gray-400 text-sm mt-4">
            Connecting top talents with opportunities worldwide. Your career
            starts here.
          </p>
          <p className="text-gray-400 text-sm mt-4">
            &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-medium mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/home" className="text-gray-400 hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/jobs" className="text-gray-400 hover:text-white">
                Jobs
              </Link>
            </li>
            <li>
              <Link href="/browse" className="text-gray-400 hover:text-white">
                Browse
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-400 hover:text-white">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-medium mb-4">Resources</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/help" className="text-gray-400 hover:text-white">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-gray-400 hover:text-white">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-gray-400 hover:text-white">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-lg font-medium mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700"
            >
              <i className="fab fa-facebook-f text-white"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700"
            >
              <i className="fab fa-twitter text-white"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700"
            >
              <i className="fab fa-linkedin-in text-white"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700"
            >
              <i className="fab fa-instagram text-white"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 mt-8 pt-4 text-center text-sm text-gray-500">
        Made with ❤️ by JobPortal Team
      </div>
    </footer>
  );
};

export default Footer;
