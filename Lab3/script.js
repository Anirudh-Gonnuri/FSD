const form = document.getElementById('fitnessForm');
    const output = document.getElementById('output');
    const outName = document.getElementById('outName');
    const outEmail = document.getElementById('outEmail');
    const outGoal = document.getElementById('outGoal');
    const outTimes = document.getElementById('outTimes');

    const checkboxLabels = document.querySelectorAll('.checkbox-label');
    checkboxLabels.forEach(label => {
      label.addEventListener('click', () => {
        const input = label.querySelector('input');

        if (!input.checked) {
          label.classList.add('bg-green-100', 'border-green-500', 'ring-2', 'ring-green-300');
        } else {
          label.classList.remove('bg-green-100', 'border-green-500', 'ring-2', 'ring-green-300');
        }
      });
    });

    checkboxLabels.forEach(label => {
      label.addEventListener('click', () => {
        const input = label.querySelector('input');
        input.checked = !input.checked;
        label.classList.toggle('selected-label', input.checked);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.querySelector('#fullName').value;
      const email = document.querySelector('#email').value;
      const goal = document.querySelector('#goal').value;

      const checkedBoxes = document.querySelectorAll('input[name="preferredTime"]:checked');
      const times = Array.from(checkedBoxes).map(cb => cb.value).join(', ') || "None";

      outName.textContent = name;
      outEmail.textContent = email;
      outGoal.textContent = goal;
      outTimes.textContent = times;

      output.classList.remove('hidden');
    });