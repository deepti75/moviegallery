let cl = console.log;

const showModal = document.getElementById("showModal");
const backDrop = document.getElementById("backDrop");
const myModal = document.getElementById("myModal");
const addMovie = document.getElementById("addMovie");
const title = document.getElementById("title");
const imgUrl = document.getElementById("imgUrl");
const rateing = document.getElementById("rateing");
const info = document.getElementById("info");
const movieForm = document.getElementById("movieForm");
const updateMovie = document.getElementById("updateMovie");

const myCloseBtn = Array.from(document.querySelectorAll(".myClose"));
let movieArray = [];

if (localStorage.getItem("setMovie")) {
  movieArray = JSON.parse(localStorage.getItem("setMovie"));
  // let movieData = JSON.parse(localStorage.getItem("setMovie"));
  // cl(movieData);
  templeting(movieArray);
}

const showModalHandler = (eve) => {
  // toggleShowClass(backDrop ,'show');
  // toggleShowClass(myModal ,'show');
  // backDrop.classList.toggle('show');
  // myModal.classList.toggle('show');
  toggleShowClass();
};
const onCloseHandler = (e) => {
  // backDrop.classList.toggle('show');
  // myModal.classList.toggle('show');
  // toggleShowClass(backDrop ,'show');
  // toggleShowClass(myModal ,'show');
  toggleShowClass();
};

function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

const addMoveHandler = (eve) => {
  // eve.preventDefault();
  let movieObj = {
    title: title.value,
    imgUrl: imgUrl.value,
    rateing: rateing.value,
    id: uuidv4(),
  };
  movieArray.push(movieObj);
  localStorage.setItem("setMovie", JSON.stringify(movieArray));
  templeting(movieArray);
  // let result =' ';
  // movieArray.forEach(obj =>{
  //     result +=`
  //     <div class="col-md-4">
  // 		<div class="card">
  // 			<div class="card-body">
  // 				<h5>${obj.title}</h5>
  // 				<img src="${obj.imgUrl}" alt="">
  // 				<p>${obj.rateing}/5</p>
  // 			</div>
  // 		</div>
  // 	</div>
  //     `
  // })

  // info.innerHTML = result;
  title.value = "";
  imgUrl.value = "";
  rateing.value = "";
  toggleShowClass();
};
function onEditHandler(ele){
    // cl("edit")
    let getId = ele.getAttribute("data-id");
    localStorage.setItem("setMoieId", getId);
    // cl(getId);
     let editData = movieArray.find(obj => obj.id === getId);
    // cl(editData)
    title.value = editData.title;
    imgUrl.value = editData.imgUrl;
    rateing.value = editData.rateing;
    toggleShowClass();
    addMovie.classList.add('d-none');
    updateMovie.classList.remove('d-none')
}

function onupdateHandler(eve){
  let updateId = localStorage.getItem("setMoieId");
  cl(updateId);
  movieArray.forEach(obj =>{
    if(obj.id === updateId){
      obj.title = title.value;
      obj.imgUrl = imgUrl.value;
      obj.rateing = rateing.value;
    }
  })
  localStorage.setItem('setMovie', JSON.stringify(movieArray));
  templeting(movieArray);
  movieForm.reset();
  addMovie.classList.remove('d-none');
  updateMovie.classList.add('d-none')
  toggleShowClass();
  // addMovie.classList.remove('d-none')
}



function onDeleteHandler(ele){
    // cl("delete")
    let deleteData = ele.dataset.id;
    let newMovieArray = movieArray.filter(obj => obj.id !== deleteData);
    cl(newMovieArray);
    localStorage.setItem("setMovie", JSON.stringify(newMovieArray));
    templeting(newMovieArray);
    location.reload();
}


function toggleShowClass() {
  backDrop.classList.toggle("show");
  myModal.classList.toggle("show");
}
// let movieData = JSON.parse(localStorage.getItem("setMovie"));
// cl(movieData);

 
function templeting(arr) {
  let result = " ";
  arr.forEach((obj) => {
    result += `
        <div class="col-md-3">
			<div class="card mb-4">
				<div class="card-body">
					<h5>${obj.title}</h5>
					<img src="${obj.imgUrl}" alt="" class="img-fluid movieGallery">
					<p>${obj.rateing}/5</p>
          <span class="editDelete">
            <i class="fas fa-edit" data-id=${obj.id} onclick="onEditHandler(this)"></i>
            <i class="fas fa-trash-alt" data-id=${obj.id} onclick="onDeleteHandler(this)"></i>
          </span>
				</div>
			</div>
		</div>
        `;
  });

  info.innerHTML = result;

}

showModal.addEventListener("click", showModalHandler);
addMovie.addEventListener("click", addMoveHandler);
myCloseBtn.forEach((btn) => {
  btn.addEventListener("click", onCloseHandler);
});
updateMovie.addEventListener('click', onupdateHandler)