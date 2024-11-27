/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "@/lib/styles";
// import { EarthCanvas } from "./canvas";
import { slideIn } from "@/utils/motion";
import dynamic from "next/dynamic";
import { StarsCanvas } from "./canvas";
import { sendEmail } from "@/app/actions";
import MagicButton from "./MagicButton";
import { FaLocationArrow } from "react-icons/fa6";


const EarthCanvas = dynamic(
  () => import("./canvas").then((m) => m.EarthCanvas),
  { ssr: false }
);
const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
    console.log(form);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    console.log(e.target?.name?.value, form);

    sendEmail({
      clientMail: e.target?.email?.value,
      subject: "Portfolio Contact",
      message: e.target?.message?.value,
    }).then(
      () => {
        setLoading(false);
        alert("Thank you. I will get back to you as soon as possible.");

        setForm({
          name: "",
          email: "",
          message: "",
        });
      },
      (error) => {
        setLoading(false);
        console.error(error);

        alert("Ahh, something went wrong. Please try again.");
      }
    );
  };

  return (
    <div>
    <div className="w-full pb-20">
      <div className="max-w-screen-xl mx-auto xl:mt-12 flex xl:flex-row flex-col-reverse gap-0 overflow-hidden">
        <motion.div
          variants={slideIn({
            direction: "left",
            type: "tween",
            delay: 0.2,
            duration: 1,
          })}
          className="w-full md:w-3/6 bg-black-100 pr-12 rounded-2xl"
        >
          <p className={styles.sectionSubText}>Get in touch</p>
          <h3 className={styles.sectionHeadText}>Contact.</h3>

          <form
            ref={formRef}
            onSubmit={handleSubmit} // Correctly binding the submit handler
            className="mt-12 flex flex-col gap-8"
          >
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Name</span>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                placeholder="What's your good name?"
                className="bg-tertiary py-4 px-6 placeholder:text-white/40 text-white rounded-lg outline-none border-none font-medium"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your email</span>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                placeholder="What's your email address?"
                className="bg-tertiary py-4 px-6 placeholder:text-white/40 text-white rounded-lg outline-none border-none font-medium"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Message</span>
              <textarea
                rows={7}
                name="message"
                value={message}
                onChange={(e) => setMessage(e.currentTarget.value)}
                placeholder="What you want to say?"
                className="bg-tertiary py-4 px-6 placeholder:text-white/40 text-white rounded-lg outline-none border-none font-medium"
              />
            </label>

            <MagicButton
              htmlType="submit"
              position="right"
              otherClasses="bg-transparent !text-base"
              icon={<FaLocationArrow />}
              // className="bg-purple py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
              title={loading ? "Sending..." : "Send"}
            ></MagicButton>
          </form>
        </motion.div>

        <motion.div
          variants={slideIn({
            direction: "right",
            type: "tween",
            delay: 0.2,
            duration: 1,
          })}
          className="xl:flex-1 xl:h-auto md:h-[350px] h-[150px] w-full md:w-3/6"
        >
          <EarthCanvas />
        </motion.div>
      </div>
      <StarsCanvas></StarsCanvas>
    </div>
    </div>
  );
};

// export default Contact;

export default Contact;
