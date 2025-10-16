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
      <Faq />
      <BlogSection />
      <Marquee />
    </>
  );
}
