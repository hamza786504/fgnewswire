import AppointmentSection from "./Componenets/AppointmentSection";
import Banner from "./Componenets/Banner";
import BlogSection from "./Componenets/BlogSection";
import BoostPresenceSection from "./Componenets/BoostPresenceSection";
import BusinessNetworkSection from "./Componenets/BusinessNetworkSection";
import CaseStudiesSection from "./Componenets/CaseStudiesSection";
import Faq from "./Componenets/Faq";
import FeaturedSection from "./Componenets/FeaturedSection";
import HowItWorks from "./Componenets/HowItWorks";
import Marquee from "./Componenets/Marquee";
import Packages from "./Componenets/Packages";
import SalesFeaturesSection from "./Componenets/SalesFeaturesSection";
import TrustedPartners from "./Componenets/TrustedPartners";
import WavyCarousel from "./Componenets/WavyCarousel";
import TestimonialCarousel from "./Componenets/TestimonialCarousel";


export default function Home() {


  return (
    <>
      <Banner />
      <WavyCarousel />
      <BoostPresenceSection />
      <HowItWorks />
      <SalesFeaturesSection />
      <TrustedPartners />
      <FeaturedSection />
      {/* <AppointmentSection /> */}
      <CaseStudiesSection />
      <TestimonialCarousel />
      <Packages />
      <BusinessNetworkSection />
      <Faq faqData={[
        {
          question: "What is FG Newswire?",
          answer:
            "FG Newswire is a platform that helps businesses and individuals share their news, press releases, and guest posts on trusted websites.",
        },
        {
          question: "How does guest posting work?",
          answer:
            "You provide your content or topic, and we publish it on high-quality websites relevant to your niche.",
        },
        {
          question: "What is a press release service?",
          answer:
            "We write and distribute your news to media outlets and online platforms to increase visibility and credibility.",
        },
        {
          question: "Who can use FG Newswire?",
          answer:
            "Startups, small businesses, established brands, and even individuals looking to share news can use our services.",
        },
        {
          question: "Are the websites real and high-quality?",
          answer:
            "Yes, we only publish on trusted, high-traffic websites that add real value.",
        },
        {
          question: "Do I need to pay upfront?",
          answer:
            "No credit card is required to get started, and you can cancel anytime.",
        },
        {
          question: "How long does it take to publish my content?",
          answer:
            "Most guest posts and press releases go live within a few days, depending on the package.",
        },
        {
          question: "Can I choose the websites for my guest posts?",
          answer:
            "Yes, we work with you to select websites that match your niche and goals.",
        },
        {
          question: "How many links can I include in a guest post?",
          answer:
            "Each post typically allows 1–2 backlinks to your website for SEO purposes.",
        },
        {
          question: "Will this help my SEO?",
          answer:
            "Yes, publishing on high-quality websites improves your search engine rankings and online visibility.",
        },
        {
          question: "Can I submit my own article?",
          answer:
            "Yes, you can provide your content, or we can write it for you.",
        },
        {
          question: "Is there a limit to how many posts I can submit?",
          answer:
            "No, you can choose packages that fit your needs, from single posts to multiple submissions.",
        },
        {
          question: "How much does it cost?",
          answer:
            "We offer flexible plans to suit every budget. Pricing depends on the number of posts and the authority of the websites.",
        },
        {
          question: "What industries do you cover?",
          answer:
            "We cover a wide range of industries, including tech, health, lifestyle, business, and more.",
        },
        {
          question: "How do I track my results?",
          answer:
            "We provide live links and reports so you can see where your content is published and track performance.",
        },
        {
          question: "Is this safe for my website?",
          answer:
            "Yes, we follow ethical publishing practices and avoid spammy sites.",
        },
        {
          question: "How do I get started?",
          answer:
            "Simply choose a plan, share your content or topic, and our team will handle the rest.",
        },
      ]} />
      {/* <BlogSection /> */}
      <Marquee />
    </>
  );
}
