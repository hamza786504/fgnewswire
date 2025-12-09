// components/BlogSection.jsx
import Image from "next/image";
import Link from "next/link";
import Button from "./Elements/Button";

const blogPosts = [
  {
    date: "JUL 09, 2025 11:30 AM",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image: "/imgs/blog/1-blog.webp",
  },
  {
    date: "JUL 09, 2025 7:40 AM",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image: "/imgs/blog/2-blog.webp",
  },
  {
    date: "JUL 08, 2025 8:12 AM",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image: "/imgs/blog/3-blog.webp",
  },
  {
    date: "JUL 03, 2025 10:55 AM",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image: "/imgs/blog/4-blog.webp",
  },
];

export default function BlogSection() {
  return (
    <section className="bg-[#f3f6fd] py-16 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-10 wow animate__animated animate__fadeInUp">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800">Latest News & Insights</h2>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Stay updated with the newest trends, tips, and stories to grow your brand and online presence.
        </p>
      </div>

      <div className="md:max-w-3xl lg:max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogPosts.map((post, index) => (
          <div
            key={index}
            className={`bg-white rounded-md shadow-sm overflow-hidden wow animate__animated animate__fadeInUp`}
            data-wow-delay={`${index * 0.2}s`} // stagger animation
          >
            <div className="relative h-48 w-full">
              <Image src={post.image} alt={post.title} layout="fill" objectFit="cover" />
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                <span className="text-blue-600 text-lg">•</span> {post.date}
              </p>
              <Link href="/blog" className="hover:underline text-base font-semibold text-gray-800 leading-snug mb-4">
                {post.title}
              </Link>
              <a
                href="#"
                className="mt-2 text-sm bg-gradient-to-r from-blue-500 to-purple-700 text-transparent bg-clip-text hover:underline flex items-center gap-1"
              >
                Read More <span>&#8594;</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className={`mt-12 wow text-center animate__animated animate__fadeInUp`} data-wow-delay="0.8s">
        <Button content="VISIT OUR BLOG" href="/news-room" />
      </div>
    </section>
  );
}
