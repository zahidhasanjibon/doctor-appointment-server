// Import Swiper styles
import { FaTooth } from "react-icons/fa";
import { GiTooth } from "react-icons/gi";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import doct3img from "../assests/img/11111.jpg";
import doct4Img from "../assests/img/3333.jpg";
import doctImg from "../assests/img/h1_sl1_1.webp";
import AboutSection from "../component/sections/about/AboutSection";
import ContactSection from "../component/sections/contact/ContactSection";
import ServiceSection from "../component/sections/services/ServicesSection";

export default function Home() {
  // set title
           
 
 
  return (
    <>
      <section className="mt-6">
        <>
          <Swiper
            navigation={true}
            pagination={{
              clickable: true,
            }}
            modules={[Navigation, Pagination]}
            className="h-[510px]"
            spaceBetween={30}
          >
            <SwiperSlide>
              <div className="hero-wrapper">
                <div className="flex flex-col gap-4 md:flex-row px-12 md:px-32 items-center">
                  <div className=" md:w-1/2">
                    <h1 className="text-lg md:text-3xl">
                      High Innovative Technology & Professional Dentists
                    </h1>
                    <p className="py-4">
                      Dentists remove tooth decay, fill cavities, and repair
                      fractured teeth. Dentists diagnose and treat problems with
                      patients' teeth, gums, and related parts of the mouth.
                    </p>
                    <button className="btn-grad">
                      Make an appoinment
                    </button>
                  </div>
                  <div className=" md:w-1/2">
                    <img src={doctImg} alt="" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="hero-wrapper">
                <div className="flex gap-4 flex-col md:flex-row px-12 md:px-32 items-center">
                  <div className="w-1/2">
                    <h1 className="text-lg md:text-3xl ">
                      High Innovative Technology & Professional Dentists
                    </h1>
                    <p className="py-4">
                      Dentists remove tooth decay, fill cavities, and repair
                      fractured teeth. Dentists diagnose and treat problems with
                      patients' teeth, gums, and related parts of the mouth.
                    </p>
                    <button className="btn btn-secondary">
                      Make an appoinment{" "}
                    </button>
                  </div>
                  <div className="w-1/2">
                    <img src={doct4Img} alt="" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="hero-wrapper">
                <div className="flex flex-col gap-4 md:flex-row px-12 md:px-32 items-center">
                  <div className="w-1/2">
                    <h1 className="text-lg md:text-3xl ">
                      High Innovative Technology & Professional Dentists
                    </h1>
                    <p className="py-4">
                      Dentists remove tooth decay, fill cavities, and repair
                      fractured teeth. Dentists diagnose and treat problems with
                      patients' teeth, gums, and related parts of the mouth.
                    </p>
                    <button className="btn btn-secondary">
                      Make an appoinment{" "}
                    </button>
                  </div>
                  <div className="w-1/2">
                    <img src={doct3img} alt="" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </>

        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row">
            <div className="w-ful  md:w-1/3 px-8 py-10 flex items-center bg-sky-500">
              <div className="pr-4">
                <span>
                  <FaTooth size={30} color="white" />
                </span>
              </div>
              <div>
                <h2 className="text-2xl text-white">Tooth Protection</h2>
                <p className="text-white">
                  tooth, plural teeth, any of the hard, resistant structures
                  occurring on the jaws
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-8 py-10 flex items-center bg-lime-500">
              <div className="px-4">
                <span>
                  <GiTooth size={30} color="white" />
                </span>
              </div>
              <div>
                <h2 className="text-2xl text-white">Tooth Root Canal</h2>
                <p className="text-white">
                  The human teeth function to mechanically break down items of
                  food by cutting and crushing
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-8 py-10 flex items-center bg-zinc-600">
              <div className="px-4">
                <span>
                  <FaTooth size={30} color="white" />
                </span>
              </div>
              <div>
                <h2 className="text-2xl text-white">Tooth cleaning</h2>
                <p className="text-white">
                  Tooth decay is damage to a tooth's surface, or enamel. It
                  happens when bacteria in your mouth
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
