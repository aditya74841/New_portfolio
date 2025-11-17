"use client"

import React, { useState, useEffect, useRef, FormEvent, ChangeEvent } from "react";
import { MdOutlineEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { BsWhatsapp, BsLinkedin } from "react-icons/bs";
import {
  FaUser,
  FaEnvelope,
  FaCommentDots,
  FaPaperPlane,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { BiLoaderAlt } from "react-icons/bi";
import { IconType } from "react-icons";
import { SERVER_API_URL } from "../../../app/constant";

// Type definitions
interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface NotificationState {
  show: boolean;
  type: "success" | "error" | "";
  message: string;
}

interface ContactOption {
  icon: IconType;
  title: string;
  info: string;
  link: string;
  buttonText: string;
  color: string;
  bgColor: string;
}

interface ContactOptionProps {
  option: ContactOption;
  index: number;
}

interface NotificationProps {
  notification: NotificationState;
}

const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationState>({
    show: false,
    type: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("contact");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Show notification
  const showNotification = (type: "success" | "error", message: string): void => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: "", message: "" });
    }, 5000);
  };

  // Send email
  const sendEmail = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Fetch user's IP
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipResponse.json();
      const ip = ipData.ip;

      // Post data to backend
      const response = await fetch(
        `${SERVER_API_URL}/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            description: formData.message,
            ip,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        showNotification(
          "success",
          "Message sent successfully! I'll get back to you soon."
        );
        setFormData({ name: "", email: "", message: "" });
      } else {
        showNotification(
          "error",
          result.message || "Failed to send message. Please try again."
        );
      }
    } catch (error) {
      console.error("Contact Form Error:", error);
      showNotification(
        "error",
        "Something went wrong. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const contactOptions: ContactOption[] = [
    {
      icon: MdOutlineEmail,
      title: "Email",
      info: "aditya@iamadityaranjan.com",
      link: "mailto:aditya@iamadityaranjan.com",
      buttonText: "Send Email",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50 dark:bg-red-900/20",
    },
    {
      icon: BsWhatsapp,
      title: "WhatsApp",
      info: "+91 7481092465",
      link: "https://api.whatsapp.com/send?phone=+917481092465",
      buttonText: "Chat on WhatsApp",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      icon: BsLinkedin,
      title: "LinkedIn",
      info: "Connect with me",
      link: "https://www.linkedin.com/in/aditya-ranjan-56331b1b7/",
      buttonText: "View Profile",
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
  ];

  const ContactOption: React.FC<ContactOptionProps> = ({ option, index }) => {
    const Icon = option.icon;

    return (
      <div
        className={`${
          option.bgColor
        } backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transform hover:scale-105 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ animationDelay: `${index * 150}ms` }}
      >
        <div className="text-center">
          <div
            className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-linear-to-r ${option.color} flex items-center justify-center shadow-lg`}
          >
            <Icon className="text-white text-2xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            {option.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 font-medium">
            {option.info}
          </p>
          <a
            href={option.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block px-6 py-3 bg-linear-to-r ${option.color} text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm`}
          >
            {option.buttonText}
          </a>
        </div>
      </div>
    );
  };

  const Notification: React.FC<NotificationProps> = ({ notification }) => {
    if (!notification.show) return null;

    return (
      <div
        className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg transition-all duration-300 ${
          notification.type === "success"
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
        }`}
      >
        {notification.type === "success" ? (
          <FaCheckCircle className="text-xl" />
        ) : (
          <FaTimesCircle className="text-xl" />
        )}
        <span className="font-medium">{notification.message}</span>
      </div>
    );
  };

  return (
    <>
      <Notification notification={notification} />

      <section
        id="contact"
        className="py-12 md:py-20 bg-linear-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-900 relative overflow-hidden"
      >
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-linear-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-linear-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div
            className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h5 className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 font-light mb-2">
              Get In Touch
            </h5>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 md:mb-6">
              Contact Me
            </h2>
            <div className="w-16 md:w-24 h-1 bg-linear-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
            <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
              Have a project in mind? Let's discuss how we can work together to
              bring your ideas to life.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Options */}
            <div className="space-y-6">
              <div
                className={`transition-all duration-1000 delay-200 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                  Let's Connect
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  I'm always open to discussing new opportunities, interesting
                  projects, or just having a chat about technology. Choose your
                  preferred way to get in touch!
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {contactOptions.map((option, index) => (
                  <ContactOption key={index} option={option} index={index} />
                ))}
              </div>

              {/* Additional Info */}
              <div
                className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 transition-all duration-1000 delay-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Quick Info
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MdLocationOn className="text-indigo-500 text-xl" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Based in India
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MdPhone className="text-indigo-500 text-xl" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Available for remote work
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCommentDots className="text-indigo-500 text-xl" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Response within 24 hours
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                  Send a Message
                </h3>

                <form ref={form} onSubmit={sendEmail} className="space-y-6">
                  {/* Name Field */}
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Your Name
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={`w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ${
                          errors.name
                            ? "border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <FaTimesCircle className="text-xs" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        className={`w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ${
                          errors.email
                            ? "border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <FaTimesCircle className="text-xs" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="relative">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Your Message
                    </label>
                    <div className="relative">
                      <FaCommentDots className="absolute left-4 top-6 text-gray-400" />
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        placeholder="Tell me about your project or just say hello..."
                        className={`w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 resize-none ${
                          errors.message
                            ? "border-red-500"
                            : "border-gray-200 dark:border-gray-600"
                        }`}
                      />
                    </div>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <FaTimesCircle className="text-xs" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                      isLoading ? "cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <BiLoaderAlt className="animate-spin text-xl" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="text-lg" />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Your message will be sent directly to my email. I'll respond
                    within 24 hours.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
