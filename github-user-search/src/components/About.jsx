import { Link } from "react-router-dom";
import { Github, Search, Users, Globe, Code, Sparkles } from "lucide-react";

function About() {
  return (
    <div className="min-h-[calc(100vh-15rem)] py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-blue-100 dark:bg-blue-900 mb-6">
            <Github size={40} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold light-text-primary dark:text-white mb-6">
            About GitHub User Search
          </h1>
          <p className="text-xl light-text-secondary dark:text-gray-300 max-w-3xl mx-auto">
            A powerful tool designed to help you discover and connect with developers worldwide through GitHub.
          </p>
        </section>

        {/* Mission Section */}
        <section className="max-w-4xl mx-auto mb-16 animate-slide-in-right">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold light-text-primary dark:text-white mb-6">Our Mission</h2>
            <p className="text-lg light-text-secondary dark:text-gray-300 mb-6">
              GitHub User Search was created to bridge the gap between developers looking to connect, collaborate, and discover talent. Whether you're searching for contributors for your open-source project, potential collaborators for a new idea, or simply want to expand your professional network, our tool provides the features you need to find the right people.
            </p>
            <p className="text-lg light-text-secondary dark:text-gray-300">
              We believe in the power of community and collaboration in software development. Our mission is to make it easier for developers to connect, share knowledge, and build amazing things together.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold light-text-primary dark:text-white mb-4">Key Features</h2>
            <p className="text-xl light-text-secondary dark:text-gray-300 max-w-3xl mx-auto">
              Our search tool offers powerful features to help you find exactly what you're looking for
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureItem
              icon={<Search size={28} className="text-blue-500 dark:text-blue-400" />}
              title="Advanced Search"
              description="Find users by username, location, or repository count with our powerful search functionality."
            />
            <FeatureItem
              icon={<Users size={28} className="text-green-500 dark:text-green-400" />}
              title="Profile Details"
              description="View detailed profiles including repositories, followers, and other important information."
            />
            <FeatureItem
              icon={<Globe size={28} className="text-purple-500 dark:text-purple-400" />}
              title="Global Reach"
              description="Connect with developers from all around the world regardless of their location or time zone."
            />
            <FeatureItem
              icon={<Code size={28} className="text-red-500 dark:text-red-400" />}
              title="Repository Filtering"
              description="Filter users based on the number of repositories to find active and experienced developers."
            />
            <FeatureItem
              icon={<Sparkles size={28} className="text-yellow-500 dark:text-yellow-400" />}
              title="User-Friendly Interface"
              description="Navigate and use our tool with ease thanks to our intuitive and responsive design."
            />
            <FeatureItem
              icon={<Github size={28} className="text-gray-700 dark:text-gray-300" />}
              title="GitHub Integration"
              description="Seamlessly connect to GitHub profiles directly from our search results."
            />
          </div>
        </section>

        {/* Call to Action */}
        <section className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-6">Ready to Find Your Next Collaboration?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Start your search today and connect with developers who can help bring your ideas to life.
            </p>
            <Link
              to="/search"
              className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 btn-hover"
            >
              <Search size={18} className="mr-2" />
              Start Searching
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

// Feature Item Component
function FeatureItem({ icon, title, description }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 card-hover">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold light-text-primary dark:text-white mb-2">{title}</h3>
      <p className="light-text-secondary dark:text-gray-300">{description}</p>
    </div>
  );
}

export default About;
