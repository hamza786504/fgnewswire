import { CiMail } from "react-icons/ci"
import { MdOutlineLocalPhone } from "react-icons/md"
import { PiNavigationArrow } from "react-icons/pi"

function Contact() {
    return (
        <>
            <section className="w-full bg-white px-4 md:px-12 py-12">
                <div className="md:max-w-3xl lg:max-w-5xl mx-auto space-y-10">
                    <div className="text-center space-y-4">
                        <h2 className="text-2xl md:text-3xl capitalize text-blue-500 font-semibold">
                            Get in touch, let us know how we can help
                        </h2>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 text-center">
                        <div className="group flex flex-col items-center bg-gray-100 hover:bg-blue-500 rounded-lg p-4 py-10 flex-1 transition-all duration-300">
                            <div className="text-4xl p-2 rounded-full mb-2">
                                <CiMail className="text-black group-hover:text-white transition-colors duration-300" />
                            </div>
                            <p className="text-gray-500 group-hover:text-white text-sm transition-colors duration-300">Email Address</p>
                            <p className="font-medium group-hover:text-white transition-colors duration-300">Consulting@Gmail.Com</p>
                        </div>
                        <div className="group flex flex-col items-center bg-gray-100 hover:bg-blue-500 rounded-lg p-4 py-10 flex-1 transition-all duration-300">
                            <div className="text-4xl p-2 rounded-full mb-2">
                                <MdOutlineLocalPhone className="text-black group-hover:text-white transition-colors duration-300" />
                            </div>
                            <p className="text-gray-500 group-hover:text-white text-sm transition-colors duration-300">Phone Number</p>
                            <p className="font-medium group-hover:text-white transition-colors duration-300">+1 (123) 456-7890</p>
                        </div>
                        <div className="group flex flex-col items-center bg-gray-100 hover:bg-blue-500 rounded-lg p-4 py-10 flex-1 transition-all duration-300">
                            <div className="text-4xl p-2 rounded-full mb-2">
                                <PiNavigationArrow className="text-black group-hover:text-white transition-colors duration-300" />
                            </div>
                            <p className="text-gray-500 group-hover:text-white text-sm transition-colors duration-300">Our Office</p>
                            <p className="font-medium group-hover:text-white transition-colors duration-300">456 Business Ave, New York</p>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
                        {/* Left side: Map */}
                        <div className="w-full lg:w-1/2">
                            <iframe
                                className="rounded-lg w-full h-80"
                                src="https://www.google.com/maps?q=456+Business+Ave,+New+York&output=embed"
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>

                        {/* Right side: Contact Form */}
                        <div className="w-full lg:w-1/2 rounded-lg space-y-4">
                        <h2 className="text-3xl font-semibold text-blue-500">Contact Us</h2>
                            <div className="flex gap-4 flex-col md:flex-row">
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                                />
                                <input
                                    type="text"
                                    placeholder="Your last name"
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                                />
                            </div>
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                            />
                            <textarea
                                placeholder="Write something..."
                                className="w-full border border-gray-300 rounded-md px-4 py-2 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
                            ></textarea>
                            <button className="w-full uppercase bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 px-8 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact