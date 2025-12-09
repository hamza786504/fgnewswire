import {
    FaBriefcase,
    FaGear,
    FaUserTie,
    FaEnvelope,
} from "react-icons/fa6";
import Button from "./Elements/Button";

const AppointmentSection = () => {
    return (
        <section className="w-full bg-white py-12 px-4 md:px-12">
            <div className="md:max-w-3xl lg:max-w-5xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
                {/* Left Content */}
                <div className="w-full md:w-1/2 space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 wow animate__animated animate__fadeInLeft" data-wow-delay="0.1s">
                        Appointment Scheduling Software
                    </h2>

                    <p className="text-gray-600 wow animate__animated animate__fadeInLeft" data-wow-delay="0.2s">
                        Simple, flexible and powerful booking software for you or your business
                    </p>

                    {/* Features List */}
                    <ul className="space-y-5">
                        <li className="flex items-start gap-4 wow animate__animated animate__fadeInLeft" data-wow-delay="0.3s">
                            <div className="rounded md h-12 w-12 flex items-center justify-center text-blue border border-black">
                                <FaBriefcase className="text-black text-xl mt-1" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800">Organise your schedule</h4>
                                <p className="text-gray-600 text-sm">let clients easily book & reschedule</p>
                            </div>
                        </li>

                        <li className="flex items-start gap-4 wow animate__animated animate__fadeInLeft" data-wow-delay="0.4s">
                            <div className="rounded md h-12 w-12 flex items-center justify-center text-blue border border-black">
                                <FaGear className="text-black mx-auto text-xl mt-1" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800">Customize everything</h4>
                                <p className="text-gray-600 text-sm">to match your brand experience</p>
                            </div>
                        </li>

                        <li className="flex items-start gap-4 wow animate__animated animate__fadeInLeft" data-wow-delay="0.5s">
                            <div className="rounded md h-12 w-12 flex items-center justify-center text-blue border border-black">
                                <FaUserTie className="text-black text-xl mt-1" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800">Meet clients anywhere</h4>
                                <p className="text-gray-600 text-sm">through video conferencing integrations</p>
                            </div>
                        </li>

                        <li className="flex items-start gap-4 wow animate__animated animate__fadeInLeft" data-wow-delay="0.6s">
                            <div className="rounded md h-12 w-12 flex items-center justify-center text-blue border border-black">
                                <FaEnvelope className="text-black text-xl mt-1" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800">Easily share your calendar</h4>
                                <p className="text-gray-600 text-sm">via Facebook, Instagram, email or website</p>
                            </div>
                        </li>
                    </ul>

                    <div className={`mt-12 wow text-start animate__animated animate__fadeInUp" data-wow-delay="0.8s`}>
                        <Button content="Know More" href="/" />
                    </div>
                </div>

                {/* Right Image */}
                <div className="w-full md:w-1/2 flex justify-center wow animate__animated animate__flipInY" data-wow-delay="0.5s">
                    <img
                        src="/imgs/crmd-1.png"
                        alt="Illustration"
                        className="w-full max-w-sm md:max-w-md backface-hidden"
                    />
                </div>
            </div>
        </section>
    );
};

export default AppointmentSection;
