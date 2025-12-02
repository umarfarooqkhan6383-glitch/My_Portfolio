import { motion } from "framer-motion";
import ContactForm from "../components/contact/ContactForm.jsx";
import ContactDetails from "../components/contact/ContactDetails.jsx";

export default function ContactSection() {
  return (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      ease: "easeInOut",
      duration: 0.6,
      delay: 0.1,
    }}
    className="flex justify-center items-start px-4 lg:px-0 py-6 lg:py-12"
  >
    <div className="flex flex-col-reverse lg:flex-row items-start gap-8 lg:gap-16 w-full max-w-6xl">
      
      {/* Contact Form */}
      <div className="w-full lg:w-2/3">
        <ContactForm />
      </div>

      {/* Contact Details */}
      <div className="w-full lg:w-1/3">
        <ContactDetails />
      </div>

    </div>
  </motion.div>
);

}
