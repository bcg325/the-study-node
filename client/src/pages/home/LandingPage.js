import tasksPage from "../../assets/images/tasksPage.png";
import notesPage from "../../assets/images/notesPage.png";
import timerPage from "../../assets/images/timerPage.png";
import notesVector from "../../assets/images/notes.svg";
import tasksVector from "../../assets/images/tasks.svg";
import timeVector from "../../assets/images/time.svg";
import { Link } from "react-router-dom";

import LandingPageContainer from "../../components/utilities/LandingPageContainer";
const LandingPage = () => {
  return (
    <>
      <section>
        <div className="bg-space bg-cover text-white py-20">
          <LandingPageContainer>
            <div className=" flex flex-col items-center gap-7">
              <h1 className="text-5xl font-urbanist font-semibold text-center ">
                Get the most out of your study time
              </h1>
              <p className="font-urbanist text-xl text-center ">
                Take notes, organize tasks, and manage your time efficiently
              </p>
              <Link
                className="space-x-5 rounded-xl py-2 px-4 bg-snViolet text-white text-xl hover:scale-105 ease-in-out"
                to="/login"
              >
                Get Started
              </Link>
            </div>
          </LandingPageContainer>
        </div>

        <div className="bg-snGray text-white py-16 lg:py-18">
          <LandingPageContainer className=" font-urbanist">
            <div className="gap-6 flex flex-wrap justify-between">
              <div className=" flex-1 flex md:flex-col items-center">
                <h2 className="text-3xl text-center lg:pt-4 flex">
                  Save your notes and edit from any device
                </h2>
                <img
                  src={notesVector}
                  alt=""
                  className="w-[13rem] lg:w-[19rem] drop-shadow-xl mx-auto"
                />
              </div>
              <img
                src={notesPage}
                alt=""
                className="w-[35rem] rounded-2xl drop-shadow-xl mx-auto flex-1"
              />
            </div>
          </LandingPageContainer>
        </div>
        <div className="bg-snBlack text-white py-16 lg:py-18">
          <LandingPageContainer className=" border-black font-urbanist">
            <div className="gap-6 flex flex-wrap justify-between">
              <div className=" flex-1 flex md:flex-col items-center gap-4">
                <h2 className="text-3xl text-center">
                  Create tasks, set due dates, prioritize, and reorder
                </h2>
                <img
                  src={tasksVector}
                  alt=""
                  className="w-[12rem] lg:w-[15rem] drop-shadow-xl mx-auto order-first md:order-last "
                />
              </div>
              <img
                src={tasksPage}
                alt=""
                className="w-[35rem] rounded-2xl drop-shadow-xl mx-auto lg:order-first"
              />
            </div>
          </LandingPageContainer>
        </div>
        <div className="bg-snGray text-white py-16 lg:py-18">
          <LandingPageContainer className=" border-black font-urbanist">
            <div className="gap-6 flex flex-wrap justify-between">
              <div className=" flex-1 flex md:flex-col items-center gap-4">
                <h2 className="text-3xl text-center">
                  Manage your time using the pomodoro technique, adjusted to
                  your preferences
                </h2>
                <img
                  src={timeVector}
                  alt=""
                  className="w-[12rem] lg:w-[15rem] drop-shadow-xl mx-auto "
                />
              </div>
              <img
                src={timerPage}
                alt=""
                className="w-[35rem] rounded-2xl drop-shadow-xl mx-auto"
              />
            </div>
          </LandingPageContainer>
        </div>
      </section>
    </>
  );
};
export default LandingPage;
