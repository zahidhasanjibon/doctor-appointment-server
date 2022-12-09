import { GrMoney } from "react-icons/gr";
import { SiPhotobucket } from "react-icons/si";
import doct from "../../../assests/img/h1_sl1_1.webp";
export default function AboutSection() {
  return (
    <section className="">
      <h2 className="text-3xl text-center">Welcome to dentario</h2>
      <p className="text-center">
        this is jibon a dentis feel free to go thhrough my chember
      </p>

      <div className="flex flex-col md:flex-row gap-4 w-4/5 mx-auto pt-12 items-center">
        <div className="w-full md:w-1/2">
          <img src={doct} alt="" />
        </div>

        <div className="w-full md:w-1/2 pl-8">
          <h3 className="text-xl mb-8">
            Our focus is on your overall well being and helping you achieve
            optimal health and esthetics. We provide state-of-the-art dental
            care in a comfortable.
          </h3>

          <div>
            <div className="flex items-center">
              <span>
                <GrMoney color="blue" size={30} />
              </span>

              <div className="pl-4 items-center">
                <h4 className="font-bold">My Mission</h4>
                <p>has provided a high class facility for the treatment</p>
              </div>
            </div>

            <div className="flex items-center mt-4">
              <span>
                <SiPhotobucket color="red" size={30}/>
              </span>
              <div className="pl-4 mb-4">
                <h4 className="font-bold">Professionals in our Clinic</h4>
                <p>Has provided a high class facility for the treatment</p>
              </div>
            </div>

            <button className="btn btn-secondary mt-4">More about Me </button>
          </div>
        </div>
      </div>
    </section>
  );
}
