function Home() {
  return (
    <div className="text-white bg-gradient-to-b from-gray-900 via-gray-800 to-black min-h-screen p-8">

      <section className="text-center py-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Welcome to <span className="text-blue-500">FitTrack</span>
        </h1>
        <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
          Your personal fitness companion. Track workouts, log progress, and reach your health goals with ease.
        </p>
        <a
          href="/contact"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg"
        >
          Get Started
        </a>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Why Choose FitTrack?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { title: "Workout Logs", desc: "Easily record your workouts with sets, reps, and notes." },
            { title: "Daily Goals", desc: "Track calories, steps, water intake, and sleep." },
            { title: "Progress Reports", desc: "Visualize your improvements over time with charts." },
            { title: "Custom Plans", desc: "Request tailor-made plans from certified trainers." },
            { title: "Device Sync", desc: "Integrate with your smartwatch or fitness band." },
            { title: "Reminders", desc: "Get gentle nudges to stay consistent and on track." },
          ].map((item, i) => (
            <div key={i} className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition duration-200">
              <h3 className="text-xl font-semibold mb-2 text-blue-400">{item.title}</h3>
              <p className="text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
