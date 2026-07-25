import Hero from "../components/sections/home/Hero";
import PopularDestinations from "../components/sections/home/PopularDestinations";
import TrendingHotels from "../components/sections/home/TrendingHotels";
import TravelCategories from "../components/sections/home/TravelCategories";
import WhyChooseUs from "../components/sections/home/WhyChooseUs";
import Testimonials from "../components/sections/home/Testimonials";
import Newsletter from "../components/sections/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <TravelCategories />
      <PopularDestinations />
      <TrendingHotels />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </>
  );
}
