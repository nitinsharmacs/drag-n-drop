const uploadFile = (file) => {
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    console.log(xhr.responseText);
  };

  xhr.open('POST', '/upload');

  const formData = new FormData();
  formData.append('file', file);

  xhr.send(formData);
};

const handleDragEnter = (event) => {
  const dropArea = event.target;
  dropArea.classList.add('drag-enter');
};

const handleDragLeave = (event) => {
  const dropArea = event.target;
  dropArea.classList.remove('drag-enter');
};

const handleDragOver = (event) => {
  event.preventDefault();
};

const handleDrop = (event) => {
  event.preventDefault();

  const dropArea = event.target;
  dropArea.classList.remove('drag-enter');

  const [file] = event.dataTransfer.files;

  uploadFile(file);
};

const main = () => {
  const dropArea = document.getElementById('drop-area');

  dropArea.addEventListener('drop', handleDrop);

  dropArea.addEventListener('dragover', handleDragOver);

  dropArea.addEventListener('dragenter', handleDragEnter);

  dropArea.addEventListener('dragleave', handleDragLeave);
};

window.onload = main;
