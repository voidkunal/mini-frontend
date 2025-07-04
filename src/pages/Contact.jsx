import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_nn5j8d6",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_zzsjtu9",
        form,
        import.meta.env.VITE_EMAILJS_USER_ID || "d8tPIl15rpb5ouH2E"
      )
      .then(() => {
        toast.success("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        toast.error("Failed to send message. Try again later.");
      });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      
      <div className="hidden md:flex w-1/2 bg-blue-400 text-white flex-col items-center justify-center p-8 rounded-tr-[80px] rounded-br-[80px]">
        <div className="text-center h-[450px]">
          <img src={logo_with_title} alt="logo_with_title" className="mb-12 h-44 mx-auto" />
          <h3 className="text-gray-100 text-3xl font-medium leading-10">
            GET IN TOUCH
          </h3>
        </div>
      </div>


      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
        <Link
          to="/"
          className="border-2 border-black rounded-3xl font-bold w-52 py-2 px-4 fixed top-10 -left-28 hover:bg-blue-400 hover:text-white transition duration-300 hidden md:block"
        >
          Back
        </Link>

        <div className="w-full max-w-sm">
          <div className="flex justify-center mb-12">
            <img src={logo} alt="logo" className="h-24 w-auto" />
          </div>
          <h1 className="text-4xl font-medium text-center mb-5">Contact Us</h1>
          <p className="text-gray-800 text-center mb-8">Please share your message or query</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <textarea
                name="message"
                required
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="5"
                className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="border-2 mt-5 border-black w-full font-semibold bg-blue-400 text-white py-2 rounded-lg hover:bg-white hover:text-blue-300 transition"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
