import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // Validation function
  const validate = (data) => {
    const errs = {};
    if (!data.username.trim()) errs.username = "Full Name is required";
    else if (data.username.trim().length < 3) errs.username = "Full Name must be at least 3 characters";

    if (!data.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
      errs.email = "Invalid email address";

    if (!data.subject.trim()) errs.subject = "Subject is required";
    else if (data.subject.trim().length < 3) errs.subject = "Subject must be at least 3 characters";

    if (!data.message.trim()) errs.message = "Message is required";
    else if (data.message.trim().length < 10) errs.message = "Message must be at least 10 characters";

    return errs;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setSuccess("");

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch(
          "https://unvanquishing-conjugally-meda.ngrok-free.dev/api/v1/students",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );
        const data = await response.json();
        if (data.success) {
          setSuccess("Message sent successfully!");
          setFormData({ username: "", email: "", subject: "", message: "" });
          setErrors({});
        } else {
          setSuccess("");
          alert(data.message || "Something went wrong!");
        }
      } catch (err) {
        console.error(err);
        alert("Network error!");
      }
    }
  };

  return (
  <div className="flex justify-center items-center rounded-2xl bg-linear-to-r from-purple-400 via-pink-500 to-red-500 p-4">
    <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 relative overflow-hidden">

      {/* Decorative shapes */}
      <div className="absolute -top-16 -left-16 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse-slow"></div>
      <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse-slow"></div>

      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
        Contact Us
      </h2>

      {success && (
        <div className="bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100 p-3 rounded-md mb-4 text-center font-medium">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Full Name</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your full name"
            value={formData.username}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 
                        border ${errors.username ? "border-red-500" : "border-gray-300 dark:border-gray-600"} 
                        text-gray-800 dark:text-gray-100 
                        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600 outline-none transition`}
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 
                        border ${errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"} 
                        text-gray-800 dark:text-gray-100 
                        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600 outline-none transition`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Subject */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Subject</label>
          <input
            type="text"
            name="subject"
            placeholder="Enter subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 
                        border ${errors.subject ? "border-red-500" : "border-gray-300 dark:border-gray-600"} 
                        text-gray-800 dark:text-gray-100 
                        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600 outline-none transition`}
          />
          {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
        </div>

        {/* Message */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Message</label>
          <textarea
            name="message"
            placeholder="Write your message..."
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 
                        border ${errors.message ? "border-red-500" : "border-gray-300 dark:border-gray-600"} 
                        text-gray-800 dark:text-gray-100 
                        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600 outline-none transition`}
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-lg shadow-md transition transform active:scale-95"
        >
          Send Message
        </button>
      </form>
    </div>
  </div>
);


};

export default ContactForm;
