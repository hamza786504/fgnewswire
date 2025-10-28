"use client";
import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { BiArrowFromTop, BiUserCircle, BiUserPin } from 'react-icons/bi';

export default function CompanyCreate() {
    const [formData, setFormData] = useState({
        contactName: '',
        companyName: '',
        address1: '',
        address2: '',
        phone: '',
        email: '',
        country: null,
        city: '',
        state: '',
        url: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ success: null, message: '' });
    const [touched, setTouched] = useState({});
    const countries = countryList().getData();

    // Handle input changes for regular inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Validate field immediately after change if it's been touched before
        if (touched[name]) {
            const error = validateField(name, value);
            setErrors({
                ...errors,
                [name]: error
            });
        }
    };

    // Handle phone input change
    const handlePhoneChange = (value) => {
        setFormData({
            ...formData,
            phone: value
        });

        // Validate phone immediately after change if it's been touched before
        if (touched.phone) {
            const error = validateField('phone', value);
            setErrors({
                ...errors,
                phone: error
            });
        }
    };

    // Handle country select change
    const handleCountryChange = (selectedOption) => {
        setFormData({
            ...formData,
            country: selectedOption
        });

        // Validate country immediately after change if it's been touched before
        if (touched.country) {
            const error = validateField('country', selectedOption);
            setErrors({
                ...errors,
                country: error
            });
        }
    };

    // Handle blur events to mark fields as touched
    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched({
            ...touched,
            [name]: true
        });

        // Validate the field when it loses focus
        const error = validateField(name, formData[name]);
        setErrors({
            ...errors,
            [name]: error
        });
    };

    // Helper function to validate URLs
    const isValidUrl = (url) => {
        if (!url) return true; // Empty is valid for optional field

        // Simple regex for URL validation
        const pattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
        return pattern.test(url);
    };

    // Validate individual field
    const validateField = (name, value) => {
        switch (name) {
            case 'contactName':
                if (!value.trim()) return 'Contact name is required';
                break;
            case 'companyName':
                if (!value.trim()) return 'Company name is required';
                break;
            case 'address1':
                if (!value.trim()) return 'Address is required';
                break;
            case 'phone':
                if (!value) return 'Phone number is required';
                // Simple phone validation - at least 5 characters
                if (value.length < 5) return 'Phone number is too short';
                break;
            case 'email':
                if (!value.trim()) return 'Email is required';
                if (!/\S+@\S+\.\S+/.test(value)) return 'Email is invalid';
                break;
            case 'country':
                if (!value) return 'Country is required';
                break;
            case 'city':
                if (!value.trim()) return 'City is required';
                if (value.trim().length < 2) return 'City name is too short';
                break;
            case 'state':
                if (!value.trim()) return 'State is required';
                if (value.trim().length < 2) return 'State name is too short';
                break;
            case 'url':
                if (!value) return 'URL is invalid (e.g., https://example.com)';

                // Regular expression to validate URLs with required protocol
                const urlPattern = /^(https?:\/\/)(www\.)?[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[a-zA-Z]{2,}(\/[^\s]*)?$/;

                if (!urlPattern.test(value)) {
                    return 'Not a URL';
                }
                break;
            case 'address2':
                if (!value && value.trim().length < 5) return 'Address is too short (min 5 characters)';
                break;
            default:
                return '';
        }
        return '';
    };

    // Validate form function
    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        // Validate all fields
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) {
                newErrors[key] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Mark all fields as touched to show errors
        const allTouched = {};
        Object.keys(formData).forEach(key => {
            allTouched[key] = true;
        });
        setTouched(allTouched);

        if (!validateForm()) {
            console.log(formData);
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus({ success: null, message: '' });

        try {
            // Prepare data for API
            const submissionData = {
                contactName: formData.contactName,
                companyName: formData.companyName,
                address1: formData.address1,
                address2: formData.address2,
                phone: formData.phone,
                email: formData.email,
                country: formData.country ? formData.country.value : '',
                city: formData.city,
                state: formData.state,
                url: formData.url
            };

            console.log('Submitting data:', submissionData);

            // Replace with your actual API endpoint
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            setSubmitStatus({
                success: true,
                message: 'Company created successfully!'
            });

            // Reset form after successful submission
            setFormData({
                contactName: '',
                companyName: '',
                address1: '',
                address2: '',
                phone: '',
                email: '',
                country: null,
                city: '',
                state: '',
                url: ''
            });

            // Reset touched fields
            setTouched({});

        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus({
                success: false,
                message: 'There was an error submitting the form. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="flex-1 rounded-bl-4xl bg-[#ebecf0] min-h-full p-4 md:pb-6 md:px-4">
            <div className="max-w-7xl mx-auto">
                <div className='bg-white rounded-3xl p-3 md:p-5'>
                    {submitStatus.message && (
                        <div className={`mb-4 p-3 rounded-md ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {submitStatus.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base/7 font-semibold text-gray-900">Add New Company</h2>
                                <div className="border border-gray-300 p-4 mt-5 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
                                    {/* Contact Name */}
                                    <div className="block">
                                        <label htmlFor="contactName" className="block text-sm/6 font-medium text-gray-900">
                                            Contact name <span className="text-red-400">*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="contactName"
                                                name="contactName"
                                                type="text"
                                                value={formData.contactName}
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${errors.contactName ? 'outline-red-500' : ''
                                                    }`}
                                            />
                                            {errors.contactName && (
                                                <p className="mt-1 text-sm text-red-600">{errors.contactName}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Company Name */}
                                    <div className="block">
                                        <label htmlFor="companyName" className="block text-sm/6 font-medium text-gray-900">
                                            Company Name <span className="text-red-400">*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="companyName"
                                                name="companyName"
                                                type="text"
                                                value={formData.companyName}
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${errors.companyName ? 'outline-red-500' : ''
                                                    }`}
                                            />
                                            {errors.companyName && (
                                                <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Address 1 */}
                                    <div className="block">
                                        <label htmlFor="address1" className="block text-sm/6 font-medium text-gray-900">
                                            Address 1 <span className="text-red-400">*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="address1"
                                                name="address1"
                                                type="text"
                                                value={formData.address1}
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${errors.address1 ? 'outline-red-500' : ''
                                                    }`}
                                            />
                                            {errors.address1 && (
                                                <p className="mt-1 text-sm text-red-600">{errors.address1}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Address 2 */}
                                    <div className="block">
                                        <label htmlFor="address2" className="block text-sm/6 font-medium text-gray-900">
                                            Address 2
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="address2"
                                                name="address2"
                                                type="text"
                                                value={formData.address2}
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${errors.address2 ? 'outline-red-500' : ''
                                                    }`}
                                            />
                                            {errors.address2 && (
                                                <p className="mt-1 text-sm text-red-600">{errors.address2}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Phone Number */}
                                    <div className="block">
                                        <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-900">
                                            Phone Number <span className="text-red-400">*</span>
                                        </label>
                                        <div className={`mt-2 relative rounded-md ${errors.phone ? 'ring ring-red-500' : 'focus-within:ring focus-within:ring-blue-500'} transition-all duration-200  w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}>
                                            <PhoneInput
                                                international
                                                defaultCountry="US"
                                                value={formData.phone}
                                                onChange={handlePhoneChange}
                                                onBlur={() => {
                                                    setTouched({ ...touched, phone: true });
                                                    const error = validateField('phone', formData.phone);
                                                    setErrors({ ...errors, phone: error });
                                                }}
                                                className="phone-input"
                                            />
                                        </div>
                                        {errors.phone && (
                                            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div className="block">
                                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                            Email <span className="text-red-400">*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${errors.email ? 'outline-red-500' : ''
                                                    }`}
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Country */}
                                    <div className="block">
                                        <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                                            Country <span className="text-red-400">*</span>
                                        </label>
                                        <div className="mt-2">
                                            <Select
                                                options={countries}
                                                value={formData.country}
                                                onChange={handleCountryChange}
                                                onBlur={() => {
                                                    setTouched({ ...touched, country: true });
                                                    const error = validateField('country', formData.country);
                                                    setErrors({ ...errors, country: error });
                                                }}
                                                className={`react-select-container ${errors.country ? 'react-select-error' : ''}`}
                                                classNamePrefix="react-select"
                                            />
                                            {errors.country && (
                                                <p className="mt-1 text-sm text-red-600">{errors.country}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* City */}
                                    <div className="block">
                                        <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                                            City <span className="text-red-400">*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="city"
                                                name="city"
                                                type="text"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                autoComplete="address-level2"
                                                className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${errors.city ? 'outline-red-500' : ''
                                                    }`}
                                            />
                                            {errors.city && (
                                                <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* State */}
                                    <div className="block">
                                        <label htmlFor="state" className="block text-sm/6 font-medium text-gray-900">
                                            State <span className="text-red-400">*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="state"
                                                name="state"
                                                type="text"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${errors.state ? 'outline-red-500' : ''
                                                    }`}
                                            />
                                            {errors.state && (
                                                <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* URL */}
                                    <div className="block">
                                        <label htmlFor="url" className="block text-sm/6 font-medium text-gray-900">
                                            URL
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="url"
                                                name="url"
                                                type="text"
                                                value={formData.url}
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                autoComplete="url"
                                                placeholder="https://example.com"
                                                className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${errors.url ? 'outline-red-500' : ''
                                                    }`}
                                            />
                                            {errors.url && (
                                                <p className="mt-1 text-sm text-red-600">{errors.url}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-5 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-700 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-600 hover:to-purple-800'
                                    }`}
                            >
                                {isSubmitting ? 'Submitting...' : 'Add Company'}
                            </button>
                        </div>
                    </form>

                    <style jsx>{`
                .phone-input :global(.PhoneInput) {
                    display: flex;
                    align-items: center;
                }
                
                .phone-input :global(.PhoneInputInput) {
                    flex: 1;
                    border: none;
                    outline: none;
                    background: transparent;
                    padding: 0.375rem 0;
                    font-size: 1rem;
                }
                
                .phone-input :global(.PhoneInputCountry) {
                    margin-right: 0.5rem;
                }
                
                .react-select-error :global(.react-select__control) {
                    border-color: #ef4444;
                    box-shadow: 0 0 0 1px #ef4444;
                }
            `}</style>
                </div>
            </div>
        </main>
    )
}