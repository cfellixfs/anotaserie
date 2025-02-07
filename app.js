const exerciseInput = document.getElementById('exerciseInput');
const seriesSelect = document.getElementById('seriesSelect');
const saveButton = document.getElementById('saveButton');
const exerciseList = document.getElementById('exerciseList');


function loadExercises() {
  const exercises = JSON.parse(localStorage.getItem('exercises')) || [];
  exerciseList.innerHTML = '';


  const displayedSeries = new Set();

  exercises.forEach(exercise => {
    
    if (!displayedSeries.has(exercise.series)) {
      const liSeries = document.createElement('p');
      liSeries.textContent = `Série: ${exercise.series}`;
      liSeries.style.fontWeight = 'bold';
      exerciseList.appendChild(liSeries);
      displayedSeries.add(exercise.series); 
    }

    
    const li = document.createElement('li');
    li.textContent = exercise.name;
    exerciseList.appendChild(li);
  });
}


function saveExercise() {
  const exerciseName = exerciseInput.value.trim();
  const series = seriesSelect.value;
  console.log("Botão de salvar clicado!"); 

  if (exerciseName !== '' && series !== 'Escolha') {
    
    const exercises = JSON.parse(localStorage.getItem('exercises')) || [];
    exercises.push({ name: exerciseName, series: series });
    localStorage.setItem('exercises', JSON.stringify(exercises));
    exerciseInput.value = ''; 
    seriesSelect.value = 'Escolha'; 
    loadExercises(); 
  }
}


function toggleSaveButton() {
  const exerciseName = exerciseInput.value.trim();
  const series = seriesSelect.value;

  if (exerciseName !== '' && series !== 'Escolha') {
    saveButton.disabled = false; 
  } else {
    saveButton.disabled = true; 
  }
}

document.getElementById('clearButton').addEventListener('click', function () {
  console.log("Botão de apagar clicado!"); 
  if (confirm("Tem certeza que deseja apagar todos os exercícios?")) {
    localStorage.removeItem('exercises'); 
    location.reload(); 
  }
});

saveButton.addEventListener('click', saveExercise);

exerciseInput.addEventListener('input', toggleSaveButton);
seriesSelect.addEventListener('change', toggleSaveButton);

toggleSaveButton();

loadExercises();
