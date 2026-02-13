import UploadForm from "../components/UploadForm";

function Home() {
  return (
    <div className="max-w-5xl mx-auto">
      
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          AI-Powered CSV Insights
        </h1>
        <p className="text-gray-600 text-lg">
          Upload your data. Analyze trends. Discover insights instantly.
        </p>
      </div>

      <div className="bg-white p-10 rounded-2xl shadow-xl">
        <UploadForm />
      </div>

    </div>
  );
}

export default Home;
