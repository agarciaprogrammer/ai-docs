import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-6">
            AI Document Analyzer
          </h1>
          <p className="max-w-md mx-auto text-xl text-gray-600 mb-8">
            Upload PDFs, explore sections, and get instant answers with Claude AI
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/upload"
              className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
            >
              Get Started → Upload PDF
            </Link>
            <Link
              href="/#features"
              className="bg-white text-green-600 px-8 py-3 rounded-lg text-lg font-semibold border-2 border-green-600 hover:bg-gree-50 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📄</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-600">1. Upload PDF</h3>
              <p className="text-gray-600">
                Simply drag and drop your PDF or click to upload
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✂️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-600">2. Auto-Section</h3>
              <p className="text-gray-600">
                AI automatically splits your document into logical sections
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-600">3. Ask Questions</h3>
              <p className="text-gray-600">
                Get instant answers from Claude AI about your document
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">∞</div>
              <p className="text-gray-600 mt-2">Unlimited Documents</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">⚡</div>
              <p className="text-gray-600 mt-2">Instant Processing</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">🤖</div>
              <p className="text-gray-600 mt-2">Powered by Claude AI</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}