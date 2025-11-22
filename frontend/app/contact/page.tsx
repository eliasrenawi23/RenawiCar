'use client';

import { useState } from 'react';
import { Navbar, Footer, Container } from '@/components/layout';
import { Button, Input, Card, CardContent } from '@/components/ui';
import { useSubmitInquiry } from '@/hooks';
import { CheckCircle, DollarSign, Handshake } from 'lucide-react';

export default function ContactPage() {
  const submitInquiry = useSubmitInquiry();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitInquiry.mutateAsync(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Failed to submit inquiry:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 py-16">
        <Container>
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions? We're here to help. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              {/* Address Card */}
              <Card variant="shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Visit Us</h3>
                      <p className="text-gray-600 text-sm">
                        123 Auto Drive<br />
                        Los Angeles, CA 90001<br />
                        United States
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Phone Card */}
              <Card variant="shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                      <a
                        href="tel:+1234567890"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        +1 (234) 567-890
                      </a>
                      <p className="text-gray-600 text-sm mt-1">
                        Mon-Fri: 9am - 6pm<br />
                        Sat: 10am - 4pm<br />
                        Sun: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email Card */}
              <Card variant="shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                      <a
                        href="mailto:info@renawicars.com"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        info@renawicars.com
                      </a>
                      <p className="text-gray-600 text-sm mt-1">
                        We'll respond within 24 hours
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card variant="shadow">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Send us a Message
                  </h2>

                  {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start">
                        <svg
                          className="w-5 h-5 text-green-600 mt-0.5 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div>
                          <h4 className="font-medium text-green-800">Message sent!</h4>
                          <p className="text-green-700 text-sm mt-1">
                            Thank you for contacting us. We'll get back to you shortly.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Full Name"
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="John Doe"
                        required
                      />
                      <Input
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    <Input
                      label="Phone Number"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+1 (234) 567-8900"
                      required
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        rows={6}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        placeholder="Tell us how we can help you..."
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full md:w-auto"
                      isLoading={submitInquiry.isPending}
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-16 bg-blue-50 rounded-lg p-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Why Choose Renawi Cars?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div>
                  <div className="flex justify-center mb-2">
                    <div className="p-3 bg-green-100 rounded-full">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Quality Assured</h3>
                  <p className="text-gray-600 text-sm">
                    All vehicles thoroughly inspected and verified
                  </p>
                </div>
                <div>
                  <div className="flex justify-center mb-2">
                    <div className="p-3 bg-yellow-100 rounded-full">
                      <DollarSign className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Best Prices</h3>
                  <p className="text-gray-600 text-sm">
                    Competitive pricing with transparent costs
                  </p>
                </div>
                <div>
                  <div className="flex justify-center mb-2">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Handshake className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Expert Support</h3>
                  <p className="text-gray-600 text-sm">
                    Dedicated team to help you every step
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
