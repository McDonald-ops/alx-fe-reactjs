import { Link } from "react-router-dom";
import { Github, Search, User, MapPin, Code } from "lucide-react";

function Home() {
  return (
    <div className="min-h-[calc(100vh-15rem)] py-8">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24 animate-fade-in">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <div className="inline-block p-3 rounded-full bg-blue-100 dark:bg-blue-900 mb-6">
              <Github size={40} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold light-text-primary dark:text-white mb-6 leading-tight">
              Discover GitHub Users Effortlessly
            </h1>
            <p className="text-xl light-text-secondary dark:text-gray-300 mb-8 max-w-lg mx-auto md:mx-0">
              Find and connect with developers around the world using our powerful search tool. Search by username, location, or repository count.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/search"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center btn-hover"
              >
                <Search size={18} className="mr-2" />
                Search GitHub Users
              </Link>
              <Link
                to="/about"
                className="px-8 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-medium rounded-lg transition-all duration-300 shadow-sm btn-hover"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-20 animate-pulse-slow"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                <div className="mb-6">
                  <div className="h-6 bg-gray-100 dark:bg-gray-700 rounded-full mb-4 flex items-center px-3">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded-full mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded-full w-full"></div>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                      <div>
                        <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded-full mb-1 w-32"></div>
                        <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full w-24"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 bg-gray-50 dark:bg-gray-900/50 rounded-2xl mb-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold light-text-primary dark:text-white mb-4">
            Why Use Our GitHub Search
          </h2>
          <p className="text-xl light-text-secondary dark:text-gray-300 max-w-3xl mx-auto">
            Our tool makes it easy to find the right developers for your projects or collaborations
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<User size={32} className="text-blue-500 dark:text-blue-400" />}
            title="Find by Username"
            description="Search for specific developers by their GitHub username to view their profiles and repositories."
          />
          <FeatureCard
            icon={<MapPin size={32} className="text-green-500 dark:text-green-400" />}
            title="Location-based Search"
            description="Discover developers in specific regions or countries to find local talent or collaboration opportunities."
          />
          <FeatureCard
            icon={<Code size={32} className="text-purple-500 dark:text-purple-400" />}
            title="Repository Filter"
            description="Filter users by the number of repositories to find active contributors and experienced developers."
          />
        </div>
      </section>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 card-hover">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold light-text-primary dark:text-white mb-3">{title}</h3>
      <p className="light-text-secondary dark:text-gray-300">{description}</p>
    </div>
  );
}

export default Home;
