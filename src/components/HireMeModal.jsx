import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import Button from './reusable/Button';
import { useState } from 'react';

const selectOptions = [
    'Web Application',
    'Mobile Application',
    'UI/UX Design',
    'Branding',
];

const HireMeModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        project: "",
        description: "",
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");

    const validate = (data) => {
        const errs = {};
        if (!data.name.trim()) errs.name = "Name is required";

        if (!data.email.trim()) errs.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
            errs.email = "Invalid email";

        if (!data.project.trim()) errs.project = "Project is required";

        if (!data.description.trim()) errs.description = "Description required";
        else if (data.description.trim().length < 25)
            errs.description = "Description must be at least 25 characters";

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
                    "http://localhost:3000/api/v1/hireme",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData),
                    }
                );

                const data = await response.json();

                if (data.success) {
                    setSuccess("Message sent successfully! I'll get back to you soon on your email.");
                    setFormData({ name: "", email: "", project: "", description: "" });
                    setErrors({});
                } else {
                    alert(data.message || "Something went wrong!");
                }
            } catch (err) {
                console.error(err);
                alert("Network error!");
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-general-medium fixed inset-0 z-30 transition-all duration-500"
        >
            <div className="bg-filter bg-black bg-opacity-50 fixed inset-0"></div>

            <main className="flex flex-col items-center justify-center h-full w-full">
                <div className="modal-wrapper flex items-center z-30">
                    <div className="modal max-w-md mx-5 xl:max-w-xl bg-secondary-light dark:bg-primary-dark shadow-lg rounded-lg relative">
                        <div className="modal-header flex justify-between p-5 border-b">
                            <h5 className="text-primary-dark dark:text-primary-light text-xl">
                                What project are you looking for?
                            </h5>
                            <button onClick={onClose}>
                                <FiX className="text-3xl" />
                            </button>
                        </div>

                        <div className="modal-body p-5">
                            <form onSubmit={handleSubmit} className="max-w-xl m-4">

                                {/* NAME */}
                                <input
                                    className="w-full px-5 py-2 border rounded-md bg-secondary-light dark:bg-ternary-dark"
                                    name="name"
                                    type="text"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                {errors.name && <p className="text-red-500">{errors.name}</p>}

                                {/* EMAIL */}
                                <div className="mt-6">
                                    <input
                                        className="w-full px-5 py-2 border rounded-md bg-secondary-light dark:bg-ternary-dark"
                                        name="email"
                                        type="text"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                                </div>

                                {/* PROJECT */}
                                <div className="mt-6">
                                    <select
                                        className="w-full px-5 py-2 border rounded-md bg-secondary-light dark:bg-ternary-dark"
                                        name="project"
                                        value={formData.project}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Project Type</option>
                                        {selectOptions.map((option) => (
                                            <option key={option}>{option}</option>
                                        ))}
                                    </select>
                                    {errors.project && <p className="text-red-500">{errors.project}</p>}
                                </div>

                                {/* DESCRIPTION */}
                                <div className="mt-6">
                                    <textarea
                                        className="w-full px-5 py-2 border rounded-md bg-secondary-light dark:bg-ternary-dark"
                                        name="description"
                                        cols="14"
                                        rows="6"
                                        placeholder="Project description"
                                        value={formData.description}
                                        onChange={handleChange}
                                    ></textarea>
                                    {errors.description && (
                                        <p className="text-red-500">{errors.description}</p>
                                    )}
                                </div>

                                {/* SUBMIT BUTTON */}
                                <div className="mt-6 pb-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 text-white bg-indigo-500 hover:bg-indigo-600 rounded-md"
                                    >
                                        <Button title="Send Request" />
                                    </button>
                                </div>

                                {success && (
                                    <p className="text-green-600 font-medium">{success}</p>
                                )}
                            </form>
                        </div>

                        <div className="modal-footer py-5 px-8 text-right">
                            <button
                                onClick={onClose}
                                className="px-6 py-2 bg-gray-600 text-white rounded-md"
                            >
                                <Button title="Close" />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </motion.div>
    );
};

export default HireMeModal;
