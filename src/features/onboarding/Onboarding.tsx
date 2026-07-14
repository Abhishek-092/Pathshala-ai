import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const SLIDES = [
  {
    title: "Learn Anywhere.",
    coloredTitle: "No Internet Required.",
    description: "Our edge AI technology processes lessons directly on your device. High-quality education even in the most remote corners of the world.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCf_3hdPUIHHyZxxFGjpZTP_TPRHcd7Aiwhyc6DNEdQG7RVj9w4-szUr-Mzu2Gi4Ma1Pt9DLbTh-2zPqE4RA90z4sjvJo-juAc4LPjLINOmzm57zq0jiUUly1fl3z21S8Ifmqs0gayTkjck8TguW1m9NHjbNC4SjIiQfO5mOkvEAPtSme16NPOOb83hTSMg8VXLYL7eVtlty-ZNf8taXZJAZrdQYUIbOj6CZVp-gp2ohy4-AnYZAAMXpQ",
    bgBlur: "bg-cyan-500/10"
  },
  {
    title: "Your Personal Teacher.",
    coloredTitle: "AI explains every concept.",
    description: "Interactive step-by-step tutoring that adapts to your pace. Pathshala AI doesn't just give answers; it builds deep understanding.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDViaHw1XS3E1A_5dKtPsZX4m8n21tAT9YQ79bI69rvHDlspl6EEZUoLj6bzVswfWQNKrsY3F6kz4wJV7irCioUPze6BHm0Oh-QDDXGWCSucYakUYaqiVZxTQb87xV4GFusNk46l_koNB-IR2PcIwUUYdfNcaT3YYjBVfj8GGcY48u_4K40WNZqSM4Yx3lvA3iVOeWkylVlz2MdCgey4nhV9ZpjTfy1uj3cPJ3o4OurCZeNQOCAWYjTtA",
    bgBlur: "bg-indigo-500/10"
  },
  {
    title: "Download Packs.",
    coloredTitle: "Study forever. Offline.",
    description: "Curate your library. Once downloaded, your courses and AI models belong to you. No subscription fatigue, just pure learning.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrPlj80GV6ZT3__n1qlbMmPdcyImpUWXY9fg0p_bj19lvHHb06VxIHo7QNp7U_oU1UhE-pz3ibwF8eEVImA1I6U1hvtDiUuW9X3e1lECi6gWSh1YQfOKnbm6OKpjaCOTdE3gQs4QNml6Rg2LYSYeknYrA0tdxHfAAS-h2bAHwwZmTnkV3yC8JTxBJ0tNqBUC-QrpYc6zZ-LNv_y84CynQHNHIxTACJW1CBtcpVC6xI3IlH95MZhD_9uw",
    bgBlur: "bg-emerald-500/10"
  }
];

export const Onboarding: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();
  const slide = SLIDES[activeSlide];

  const handleNext = () => {
    if (activeSlide < SLIDES.length - 1) {
      setActiveSlide(activeSlide + 1);
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center py-12 min-h-screen bg-slate-50 dark:bg-slate-900 px-6">
      <div className="max-w-[1280px] w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide + "-text"}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-6 text-center md:text-left"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-indigo-600 dark:text-indigo-400 tracking-tight font-headline">
              {slide.title} <br />
              <span className="text-cyan-600 dark:text-cyan-400 font-headline">
                {slide.coloredTitle}
              </span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide + "-img"}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="relative w-full aspect-square max-w-md"
            >
              <div className={`absolute inset-0 ${slide.bgBlur} rounded-full blur-3xl`} />
              <img
                className="relative z-10 w-full h-full object-contain animate-float"
                src={slide.img}
                alt="Onboarding illustration"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-16 w-full flex flex-col items-center gap-8">
        <div className="flex gap-3">
          {SLIDES.map((_, idx) => (
            <div
              key={idx}
              className={`w-2.5 h-2.5 rounded-full ${
                idx === activeSlide ? "bg-indigo-600 w-6" : "bg-slate-200 dark:bg-slate-800"
              } transition-all duration-300`}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-5 rounded-full font-bold text-lg shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
        >
          <span>{activeSlide === SLIDES.length - 1 ? "Begin Learning" : "Continue"}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
