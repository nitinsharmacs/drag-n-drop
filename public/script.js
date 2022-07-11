const uploadFiles = (files) => {
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    console.log(xhr.responseText);
  };

  xhr.open('POST', '/upload');

  const formData = new FormData();
  files.forEach(file => {
    formData.append('file', file);
  });

  xhr.send(formData);
};

const convertFileToDataUrl = (file, cb) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => cb(reader.result);
};

const createThumbnail = (file, area) => {
  convertFileToDataUrl(file, (dataUrl) => {
    const thumbnailBox = document.createElement('div');
    thumbnailBox.classList = 'thumbnail-box';

    const thumbnailImg = document.createElement('img');
    thumbnailImg.src = dataUrl;

    const thumbnailText = document.createElement('p');
    thumbnailText.innerText = file.name;

    thumbnailBox.appendChild(thumbnailImg);
    thumbnailBox.appendChild(thumbnailText);

    area.appendChild(thumbnailBox);
  });
};

const createThumbnails = (files) => {
  const thumbnailArea = document.getElementById('thumbnails');
  thumbnailArea.innerText = '';

  for (let index = 0; index < files.length; index++) {
    createThumbnail(files[index], thumbnailArea);
  }
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


  createThumbnails(files);

  uploadFiles(files);
};

let files = [];
const main = () => {
  const dropArea = document.getElementById('drop-area');
  const uploadBtn = document.getElementById('upload-btn');


  dropArea.addEventListener('drop', (event) => {
    event.preventDefault();

    const dropArea = event.target;
    dropArea.classList.remove('drag-enter');

    files = [...files, ...event.dataTransfer.files];

    createThumbnails(files);
  });

  dropArea.addEventListener('dragover', handleDragOver);

  dropArea.addEventListener('dragenter', handleDragEnter);

  dropArea.addEventListener('dragleave', handleDragLeave);

  uploadBtn.addEventListener('click', () => uploadFiles(files));
};

window.onload = main;
