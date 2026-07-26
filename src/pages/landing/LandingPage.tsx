import HeroSection from "./sections/HeroSection";
import TrustedSection from "./sections/TrustedSection";
import FeaturesSection from "./sections/FeaturesSection";
import HowItWorksSection from "./sections/HowItWorksSection";
import AIPreviewSection from "./sections/AIPreviewSection";
import WhyChooseUsSection from "./sections/WhyChooseUsSection";
import FAQSection from "./sections/FAQSection";
import ContactSection from "./sections/ContactSection";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const { isLoaded, userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && userId) {
      navigate("/dashboard");
    }
  }, [isLoaded, userId, navigate]);
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
