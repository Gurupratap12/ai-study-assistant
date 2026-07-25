import HeroSection from "./sections/HeroSection";
import TrustedSection from "./sections/TrustedSection";
import FeaturesSection from "./sections/FeaturesSection";
import HowItWorksSection from "./sections/HowItWorksSection";
import AIPreviewSection from "./sections/AIPreviewSection";
import WhyChooseUsSection from "./sections/WhyChooseUsSection";
import FAQSection from "./sections/FAQSection";
import ContactSection from "./sections/ContactSection";

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <TrustedSection />
      <FeaturesSection />
      <HowItWorksSection />
      <AIPreviewSection />
      <WhyChooseUsSection />
      <FAQSection />
      <ContactSection />
    </>
  );
};

export default LandingPage;