// import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
// import Link from "next/link";
// import { useSelector } from "react-redux";

// const Footer = () => {
//   return (
//     <footer className=" bg-gray-900 text-gray-100 py-8">
//       <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
//         {/* Company Info */}
//         <div>
//           <h2 className="text-2xl font-bold text-white">
//             Job<span className="text-red-500">Portal</span>
//           </h2>
//           <p className="text-gray-400 text-sm mt-4">
//             Connecting top talents with opportunities worldwide. Your career
//             starts here.
//           </p>
//           <p className="text-gray-400 text-sm mt-4">
//             &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
//           </p>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h3 className="text-lg font-medium mb-4">Quick Links</h3>
//           <ul className="space-y-2">
//             <li>
//               <Link href="/" className="text-gray-400 hover:text-white">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link href="/jobs" className="text-gray-400 hover:text-white">
//                 Jobs
//               </Link>
//             </li>
//             <li>
//               <Link href="/browse" className="text-gray-400 hover:text-white">
//                 Browse
//               </Link>
//             </li>
//             <li>
//               <Link href="/about" className="text-gray-400 hover:text-white">
//                 About Us
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Resources */}
//         <div>
//           <h3 className="text-lg font-medium mb-4">Resources</h3>
//           <ul className="space-y-2">
//             <li>
//               <Link href="/help" className="text-gray-400 hover:text-white">
//                 Help Center
//               </Link>
//             </li>
//             <li>
//               <Link href="/privacy" className="text-gray-400 hover:text-white">
//                 Privacy Policy
//               </Link>
//             </li>
//             <li>
//               <Link href="/terms" className="text-gray-400 hover:text-white">
//                 Terms of Service
//               </Link>
//             </li>
//             <li>
//               <Link href="/faq" className="text-gray-400 hover:text-white">
//                 FAQ
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Social Icons */}
//         <div>
//           <h3 className="text-lg font-medium mb-4">Follow Us</h3>
//           <div className="flex space-x-4">
//             <a
//               href="https://facebook.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="p-3 bg-gray-800 rounded-full hover:bg-gray-700"
//             >
//               <Facebook />
//             </a>
//             <a
//               href="https://twitter.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="p-3 bg-gray-800 rounded-full hover:bg-gray-700"
//             >
//               <Twitter />
//             </a>
//             <a
//               href="https://linkedin.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="p-3 bg-gray-800 rounded-full hover:bg-gray-700"
//             >
//               <Linkedin />
//             </a>
//             <a
//               href="https://instagram.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="p-3 bg-gray-800 rounded-full hover:bg-gray-700"
//             >
//               <Instagram />
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Divider */}
//       <div className="border-t border-gray-800 mt-8 pt-4 text-center text-sm text-gray-500">
//         Made with ❤️ by JobPortal Team
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-md">
              <h3 className="text-2xl font-bold mb-2">Stay Connected</h3>
              <p className="text-gray-400">
                Get the latest jobs and career insights
              </p>
            </div>
            <div className="flex-1 max-w-md">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="px-4 sm:px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold">
                Job<span className="text-purple-500">Portal</span>
              </h2>
              <p className="text-gray-400 mt-4">
                Connecting top talents with opportunities worldwide. Your career
                journey starts here.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <MapPin className="w-5 h-5" />
                <span>123 Career Street, Tech City</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
                <span>contact@jobportal.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
                <span>+1 234 567 890</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {["Home", "Jobs", "Browse", "About Us"].map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase().replace(" ", "-")}`}
                    className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Resources</h3>
            <ul className="space-y-4">
              {["Help Center", "Privacy Policy", "Terms of Service", "FAQ"].map(
                (link) => (
                  <li key={link}>
                    <Link
                      href={`/${link.toLowerCase().replace(" ", "-")}`}
                      className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      {link}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Connect With Us</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: <Facebook className="w-5 h-5" />,
                  name: "Facebook",
                  color: "hover:bg-blue-600",
                },
                {
                  icon: <Twitter className="w-5 h-5" />,
                  name: "Twitter",
                  color: "hover:bg-blue-400",
                },
                {
                  icon: <Linkedin className="w-5 h-5" />,
                  name: "LinkedIn",
                  color: "hover:bg-blue-700",
                },
                {
                  icon: <Instagram className="w-5 h-5" />,
                  name: "Instagram",
                  color: "hover:bg-pink-600",
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={`https://${social.name.toLowerCase()}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-3 bg-gray-800 rounded-lg ${social.color} transition-colors`}
                >
                  {social.icon}
                  <span className="text-sm">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-2">
              Made with <span className="text-red-500">❤️</span> by JobPortal
              Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
