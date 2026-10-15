import Hero from '../components/Hero';
import QuickAccessBar from '../components/home/QuickAccessBar';
import AboutSection from '../components/home/AboutSection';
import DepartmentsGrid from '../components/home/DepartmentsGrid';
import FeaturedServices from '../components/home/FeaturedServices';
import CtaBand from '../components/home/CtaBand';

export default function Home() {
  return (
    <div>
      <Hero />
      <QuickAccessBar />
      <AboutSection />
      <DepartmentsGrid />
      <FeaturedServices />
      <CtaBand />
    </div>
  );
}
