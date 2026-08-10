"use client";

import React, { useState, useRef, FormEvent, ChangeEvent, useEffect } from "react";
import {
  MdOutlineEmail,
  MdLocationOn,
  MdPhone,
  MdCheckCircle,
  MdError,
} from "react-icons/md";
import {
  FaWhatsapp,
  FaLinkedinIn,
  FaUser,
  FaEnvelope,
  FaCommentDots,
  FaPaperPlane,
  FaTimesCircle,
} from "react-icons/fa";
import { IconType } from "react-icons";

// Formspree static endpoint
const FORMSPREE_URL = "https://formspree.io/f/myegepqk";

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
}

const ContactOptionCard: React.FC<{
  option: ContactOption;
  index: number;
}> = ({ option, index }) => {
  const Icon = option.icon;

  return (
    <div
      className="bg-gray-900/80 rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 flex items-center justify-between group"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
          <Icon className="text-xl text-gray-200" />
        </div>
        <div>
          <h4 className="font-bold text-white text-base mb-0.5">
            {option.title}
          </h4>
          <p className="text-gray-400 text-xs md:text-sm">{option.info}</p>
        </div>
      </div>
      <a
        href={option.link}
        target="_blank"
        rel="noreferrer"
        className="px-4 py-2 bg-gray-800 text-gray-200 rounded-lg text-xs font-semibold hover:bg-gray-700 hover:text-white transition-colors shrink-0"
      >
        {option.buttonText}
      </a>
    </div>
  );
};

const Notification: React.FC<{ notification: NotificationState }> = ({
  notification,
}) => {
  if (!notification.show) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl transition-all duration-300 ${
        notification.type === "success"
          ? "bg-emerald-950 border border-emerald-800 text-emerald-200"
          : "bg-red-950 border border-red-800 text-red-200"
      }`}
    >
      {notification.type === "success" ? (
        <MdCheckCircle className="text-xl text-emerald-400" />
      ) : (
        <MdError className="text-xl text-red-400" />
      )}
      <p className="text-sm font-medium">{notification.message}</p>
    </div>
  );
};

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationState>({
    show: false,
    type: "",
    message: "",
  });
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector("#contact");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showNotification = (
    type: "success" | "error",
    message: string
  ): void => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: "", message: "" });
    }, 5000);
  };

  const sendEmail = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        showNotification(
          "success",
          "Message sent successfully! I will get back to you shortly."
        );
        setFormData({ name: "", email: "", message: "" });
      } else {
        const result = await response.json();
        showNotification(
          "error",
          result.error || "Failed to send message. Please try again."
        );
      }
    } catch (error) {
      console.error("Contact Form Error:", error);
      showNotification("error", "Something went wrong. Please try again later.");
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
      buttonText: "Write Email",
    },
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      info: "+91 74841 84898",
      link: "https://wa.me/917484184898",
      buttonText: "Message",
    },
    {
      icon: FaLinkedinIn,
      title: "LinkedIn",
      info: "iamadityaranjan",
      link: "https://www.linkedin.com/in/iamadityaranjan/",
      buttonText: "Connect",
    },
  ];

  return (
    <>
      <Notification notification={notification} />

      <section id="contact" className="py-20 md:py-28 bg-gray-950 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-gray-500 text-sm font-medium uppercase tracking-widest mb-3">
              Get In Touch
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contact Me
            </h2>
            <div className="w-16 h-0.5 bg-gray-700 mx-auto"></div>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm md:text-base">
              Have a project in mind, a question, or an open role? Feel free to reach out directly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
            {/* Direct Contact Links */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">
                Reach Me Directly
              </h3>
              {contactOptions.map((option, index) => (
                <ContactOptionCard key={index} option={option} index={index} />
              ))}

              {/* Quick Info Box */}
              <div className="bg-gray-900/80 rounded-2xl p-6 border border-gray-800 mt-6">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
                  Quick Details
                </h4>
                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex items-center gap-3">
                    <MdLocationOn className="text-gray-400 text-lg" />
                    <span>Based in India (IST / UTC+5:30)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MdPhone className="text-gray-400 text-lg" />
                    <span>Open for Remote & Contract Work</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCommentDots className="text-gray-400 text-lg" />
                    <span>Average Response: Under 24 Hours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <div className="bg-gray-900/80 rounded-3xl p-8 border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-6">
                  Send a Message
                </h3>

                <form ref={form} onSubmit={sendEmail} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                      Your Name
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full pl-11 pr-4 py-3.5 bg-gray-950 border rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors ${
                          errors.name ? "border-red-500" : "border-gray-800"
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <FaTimesCircle /> {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`w-full pl-11 pr-4 py-3.5 bg-gray-950 border rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors ${
                          errors.email ? "border-red-500" : "border-gray-800"
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <FaTimesCircle /> {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                      Message
                    </label>
                    <div className="relative">
                      <textarea
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project or opportunity..."
                        className={`w-full p-4 bg-gray-950 border rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors resize-none ${
                          errors.message ? "border-red-500" : "border-gray-800"
                        }`}
                      ></textarea>
                    </div>
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <FaTimesCircle /> {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-white text-gray-950 font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <FaPaperPlane className="text-xs" />
                      </>
                    )}
                  </button>
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
