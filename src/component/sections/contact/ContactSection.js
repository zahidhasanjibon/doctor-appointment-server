import React from "react";
import { AiOutlineCalendar, AiOutlinePhone } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
export default function ContactSection() {
  return (
    <section className="pt-14">
      <div className="w-4/5 mx-auto">
        <div className="contact-wrapper flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 pt-12">
            <h3 className="text-4xl ">Contact Us</h3>
            <p className="pt-4">Dont hesitate to contact me</p>

            <div className="mt-12">
              <div className="flex items-center">
                <span>
                  <GoLocation />
                </span>
                <div className="pl-4">
                  <h4 className="font-bold">Our Address</h4>
                  <p>dhaka,bangladesh block 3230</p>
                </div>
              </div>
              <div className="flex items-center py-6">
                <span>
                  <AiOutlinePhone />
                </span>
                <div className="pl-4">
                  <h4 className="font-bold">Phone</h4>
                  <p>Manger +016492245</p>
                </div>
              </div>

              <div className="flex items-center">
                <span>
                  <AiOutlineCalendar />
                </span>
                <div className="pl-4">
                  <h4 className="font-bold">Open Hours</h4>
                  <p>mn-st 8:00am - 9:00pm closed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29183.058637805916!2d89.12856715!3d23.89379095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fe96f1a5bf5e8d%3A0xc518a122b92d6b1f!2sKushtia%20Medical%20College%20Hospital!5e0!3m2!1sen!2sbd!4v1668073150112!5m2!1sen!2sbd"
                                
              style={{width:"100%",height:"100%", border: "0" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
