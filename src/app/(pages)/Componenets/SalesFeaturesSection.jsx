import { FaCheckCircle } from "react-icons/fa";
import { BsFillPersonBadgeFill, BsPersonLinesFill, BsGraphUp } from "react-icons/bs";
import { MdOutlineTaskAlt, MdOutlineEmail, MdSms } from "react-icons/md";
import Button from "./Elements/Button";
const features = [
  {
    title: "Lorem Ipsum Dolor",
    icon: <BsFillPersonBadgeFill className="text-white text-xl" />,
    color: "bg-[#6b5bff]",
    points: [
      "Lorem ipsum dolor sit amet consectetur",
      "Adipisicing elit sed do eiusmod tempor",
      "Incididunt ut labore et dolore magna aliqua",
    ],
  },
  {
    title: "Consectetur Adipiscing",
    icon: <BsPersonLinesFill className="text-white text-xl" />,
    color: "bg-[#2971f5]",
    points: [
      "Ut enim ad minim veniam quis nostrud",
      "Exercitation ullamco laboris nisi ut aliquip",
      "Ex ea commodo consequat duis aute",
    ],
  },
  {
    title: "Sed Do Eiusmod",
    icon: <BsGraphUp className="text-white text-xl" />,
    color: "bg-[#00b341]",
    points: [
      "Tempor incididunt ut labore et dolore",
      "Magna aliqua ut enim ad minim veniam",
      "Quis nostrud exercitation ullamco laboris",
    ],
  },
  {
    title: "Tempor Incididunt",
    icon: <MdOutlineTaskAlt className="text-white text-xl" />,
    color: "bg-[#ff5e3a]",
    points: [
      "Duis aute irure dolor in reprehenderit",
      "In voluptate velit esse cillum dolore",
      "Eu fugiat nulla pariatur excepteur",
    ],
  },
  {
    title: "Dolore Magna Aliqua",
    icon: <MdOutlineEmail className="text-white text-xl" />,
    color: "bg-[#00e09d]",
    points: [
      "Velit esse cillum dolore eu fugiat",
      "Nulla pariatur excepteur sint occaecat",
      "Cupidatat non proident sunt in culpa",
    ],
  },
  {
    title: "Minim Veniam Quis",
    icon: <MdSms className="text-white text-xl" />,
    color: "bg-[#ff8f2f]",
    points: [
      "Officia deserunt mollit anim id est laborum",
      "Lorem ipsum dolor sit amet consectetur",
      "Adipisicing elit sed do eiusmod tempor",
    ],
  },
];

export default function SalesFeaturesSection() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="md:max-w-3xl lg:max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl capitalize font-bold text-gray-900">
            Streamlined solutions for <span className="text-[#2563eb]">modern businesses</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Efficient tools designed to simplify your workflow and boost productivity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-gray-200 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-5`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <ul className="space-y-3">
                {feature.points.map((point, i) => (
                  <li key={i} className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
  <button className="text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent hover:opacity-80 transition-colors">
    Explore feature →
  </button>
</div>

            </div>
          ))}
        </div>

        <div className={`mt-12 wow text-center animate__animated animate__fadeInUp" data-wow-delay="0.8s`}>
          <Button content="Know More" class="text-start" href="/" />
        </div>
      </div>
    </section>
  );
}
