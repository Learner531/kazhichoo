import React from "react";

function Contact() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-kerala-deep-green dark:text-kerala-muted-gold">Contact Us</h1>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-kerala-charcoal rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 dark:text-kerala-muted-gold">
            Get in Touch
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Have questions about our menu, want to place a special order, or
            need assistance? We're here to help! Reach out to us through any of
            the following channels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-kerala-charcoal rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-kerala-gold dark:text-kerala-muted-gold">
              Contact Information
            </h3>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <div>
                <strong>Phone:</strong> +91 8137835747
              </div>
              <div>
                <strong>Email:</strong> gmail.com
              </div>
              <div>
                <strong>WhatsApp:</strong> +91 8137835747
              </div>
              <div>
                <strong>Address:</strong>
                <br />
                123 Spice Street
                <br />
                Kochi, Kerala 682506
                <br />
                India
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
