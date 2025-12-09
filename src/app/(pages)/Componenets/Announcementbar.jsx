import Link from 'next/link';
import { FaPhone, FaEnvelope, FaLocationDot, FaFacebookF, FaXTwitter, FaInstagram, FaPinterestP, FaYoutube } from 'react-icons/fa6';

export default function AnnouncementBar() {
  return (
    <div className="w-full flex items-center from-blue-500 to-purple-500 bg-gradient-to-r transition-all duration-300 ease-in-out">
      <div className="flex flex-1 items-stretch space-x-3 md:space-x-8 flex-col  px-3 md:px-6 lg:px-12 gap-1 sm:flex-row sm:justify-start sm:items-center text-white text-[12px] sm:text-xs">

        {/* Left - Phone */}
        <div style={{ textWrap: "nowrap" }} className="inline-flex items-center gap-2">
          <FaPhone className="text-white" />
          <span>(000) 000-0000</span>
        </div>

        {/* Center - Email */}
        {/* <div className="hidden sm:inline-flex items-center gap-2 overflow-hidden whitespace-nowrap text-ellipsis hover:underline cursor-pointer transition duration-300 ease-in-out">
          <FaEnvelope className="text-white" />
          <span className="truncate">example@gmail.com</span>
        </div> */}

        {/* Right - Address */}
        {/* <div className="hidden sm:inline-flex items-center gap-2 overflow-hidden whitespace-nowrap text-ellipsis hover:underline cursor-pointer transition duration-300 ease-in-out">
          <FaLocationDot className="text-white" />
          <span className="truncate">2464 Royal Ln. Mesa, New Jersey 45463</span>
        </div> */}
      </div>

      <Link href="/contact" className="text-sm text-white">Contact</Link>

      {/* Social Icons Section */}
      <div className="flex clip-mask-announcementbar max-w-[200px] bg-[#8810c8] py-2.5 ps-10 pe-5 justify-center items-center gap-3 text-white text-[13px] sm:text-sm">
        <Link href="www.facebook.com" className="hover:scale-110 transition duration-300 ease-in-out"><FaFacebookF className="text-white" /></Link>
        <Link href="www.facebook.com" className="hover:scale-110 transition duration-300 ease-in-out"><FaXTwitter className="text-white" /></Link>
        <Link href="www.facebook.com" className="hover:scale-110 transition duration-300 ease-in-out"><FaInstagram className="text-white" /></Link>
        <Link href="www.facebook.com" className="hover:scale-110 transition duration-300 ease-in-out"><FaPinterestP className="text-white" /></Link>
        <Link href="www.facebook.com" className="hover:scale-110 transition duration-300 ease-in-out"><FaYoutube className="text-white" /></Link>
      </div>
    </div>
  );
}
