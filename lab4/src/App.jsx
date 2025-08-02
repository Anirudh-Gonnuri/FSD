import './index.css';
import './App.css';
function App() {

const visitedFlag = sessionStorage.getItem('visited');
const hasVisitedBefore = visitedFlag === 'true';

if (!visitedFlag) {
  setTimeout(() => {
    sessionStorage.setItem('visited', 'true');
  }, 0);
}


  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const feedback = {
      name: form.name.value,
      email: form.email.value,
      department: form.department.value,
      rating: form.rating.value,
      comments: form.comments.value,
    };

    const stored = JSON.parse(localStorage.getItem('feedbacks')) || [];
    stored.push(feedback);
    localStorage.setItem('feedbacks', JSON.stringify(stored));

    form.reset();
    document.getElementById('charCount').textContent = '0/300 characters';
    loadFeedbacks();
  };

  const loadFeedbacks = () => {
    const container = document.getElementById('feedbackList');
    container.innerHTML = '';
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];

    feedbacks.forEach((fb) => {
      const card = document.createElement('div');
      card.className = 'p-4 bg-gray-100 rounded shadow';
      card.innerHTML = `
        <p class="font-semibold text-lg">${fb.name}</p>
        <p class="text-sm text-gray-700">${fb.email} — ${fb.department}</p>
        <p class="mt-2"><strong>Rating:</strong> ${fb.rating}/5</p>
        <p class="mt-1"><strong>Comments:</strong> ${fb.comments}</p>
      `;
      container.appendChild(card);
    });
  };

  const handleClear = () => {
    localStorage.removeItem('feedbacks');
    loadFeedbacks();
  };

  const handleCharCount = (e) => {
    document.getElementById('charCount').textContent = `${e.target.value.length}/300 characters`;
  };
  window.onload = loadFeedbacks;
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl text-center font-bold mb-4">Student Feedback Form</h1>

    {hasVisitedBefore && (
      <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4">
        Welcome back! Thanks for visiting again.
      </div>
    )}


      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded p-6">
        <input name="name" type="text" required placeholder="Full Name" className="w-full p-2 border rounded" />
        <input name="email" type="email" required placeholder="Email" className="w-full p-2 border rounded" />
        <select name="department" required className="w-full p-2 border rounded">
          <option value="">Select Department</option>
          <option>MCA</option>
          <option>BCA</option>
          <option>CME</option>
          <option>BCOM</option>
          <option>ARTS</option>
        </select>
        <div>
          <p className="mb-2">Rate the session:</p>
          {[1, 2, 3, 4, 5].map((num) => (
            <label key={num} className="mr-4">
              <input type="radio" name="rating" value={num} required className="mr-1" />
              {num}
            </label>
          ))}
        </div>

        <div>
          <textarea
            name="comments"
            maxLength="300"
            rows="4"
            placeholder="Additional Comments"
            className="w-full p-2 border rounded"
            onInput={handleCharCount}
          ></textarea>
          <p id="charCount" className="text-sm text-gray-500">0/300 characters</p>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded block mx-auto hover:bg-blue-700">
          Submit Feedback
        </button>
      </form>

      <div className="flex justify-between items-center mt-8 mb-4">
        <h2 className="text-2xl font-semibold">All Feedbacks</h2>
        <button onClick={handleClear} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
          Clear All
        </button>
      </div>

      <div id="feedbackList" className="grid gap-4"></div>
    </div>

  );
}

export default App;
