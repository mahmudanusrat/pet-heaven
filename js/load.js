let allPets = [];


const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};
const loadPets = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
      allPets = data.pets;
      displayPets(allPets);
    })
    .catch((error) => console.log(error));
};

const loadCategoryPets = (id) => {
  const spinner = document.getElementById("spinner");
  const petsContainer = document.getElementById("pets-container");

  const activeBtn = document.getElementById(`btn-${id}`);
   removeActiveClass();      
  activeBtn.classList.add("active");
      
  spinner.style.display = "block";
  petsContainer.style.display = "none";
  setTimeout(() => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
      .then((res) => res.json())
      .then((data) => {
        allPets = data.data;
        spinner.style.display = "none";
        petsContainer.style.display = "grid";
        displayPets(allPets);

        })
      .catch((error) => {
        console.log(error);
        spinner.style.display = "none";
      });
  }, 2000);
};

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};
const sortByPrice = document.getElementById("sort-btn");
sortByPrice.addEventListener("click", () => {
  if (allPets.length > 0) {
    allPets.sort((a, b) => (b.price || 0) - (a.price || 0));
    displayPets(allPets);
  }
});

const loadDetails = async (petId) => {
  console.log(petId);
  const petsId = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
  const res = await fetch(petsId);
  const data = await res.json();
  displayDetails(data.petData);
};

let likedPets = [];
const addLikedPets = (petImage) => {
  likedPets.push({ petImage });
  displayLikedPets();
};
const displayLikedPets = () => {
  const likeContainer = document.getElementById("like");
  likeContainer.innerHTML = "";
  likedPets.forEach((pet) => {
    const likedPetElement = document.createElement("div");
    likedPetElement.classList = "liked-pet";
    likedPetElement.innerHTML = `
        <img src="${pet.petImage}" alt="Liked Pet" class="w-[100px] h-[100px] object-cover rounded-lg">
      `;
    likeContainer.append(likedPetElement);
  });
};

const adoptPet = (button) => {
  const modal = document.getElementById("myModal2");
  modal.showModal();
  let countdown = 3;
  const countdownText = document.getElementById("modal-countdown");
  countdownText.innerText = `${countdown}`;

  const interval = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      countdownText.innerText = `${countdown}`;
    } else {
      clearInterval(interval);
      modal.close();
      button.classList.add("adopted-btn");
      button.style.color = "#c5c3c3";
      button.innerText = "Adopted";
      button.disabled = true;
    }
  }, 1000);
};

const displayDetails = (petData) => {
  console.log(petData);
  const detailContainer = document.getElementById("modal-content");
  detailContainer.innerHTML = `
    <img class="w-full object-cover rounded-lg" src=${petData.image}>
    <p class="text-2xl font-bold text-[#131313]">${petData.pet_name}</p>
    <div class="grid grid-cols-2 border-b-2 border-[#1313131A]">
        <p class="text-[#131313B3] font-normal text-base"><i class="fa-regular fa-clone"></i> Breed: ${
          petData.breed || "Unknown Breed"
        }</p>
        <p class="text-[#131313B3] font-normal text-base"><i class="fa-regular fa-calendar"></i> Birth: ${
          petData.date_of_birth || "Unknown Birth Date"
        }</p>
        <p class="text-[#131313B3] font-normal text-base"><i class="fa-solid fa-mercury"></i> Gender: ${
          petData.gender || "Unknown Gender"
        }</p>
        <p class="text-[#131313B3] font-normal text-base"><i class="fa-solid fa-dollar-sign"></i> Price: ${
          petData.price != null ? petData.price + "$" : "N/A"
        } </p>
        <p class="text-[#131313B3] font-normal text-base"><i class="fa-solid fa-syringe"></i> Vaccinated Status: ${
          petData.vaccinated_status || "Not specified"
        }</p>
    </div>
    <div class="space-y-2">
        <h1 class="text-base font-semibold text-[#131313]">Details Information</h1>
        <p class="text-[#131313B3] font-normal text-base"> ${
          petData.pet_details || "No information available"
        }</p>
    </div>
`;
  document.getElementById("myModal").showModal();
};

const displayPets = (pets) => {
  const petsContainer = document.getElementById("pets");
  petsContainer.innerHTML = "";
  if (pets.length == 0) {
    petsContainer.classList.remove("grid");
    petsContainer.innerHTML = `
    <div class=" flex flex-col justify-center items-center space-y-6 px-3 py-3 lg:px-16 lg:py-20 bg-[#13131308] rounded-2xl">
        <img src="images/error.webp" alt="Error Image">
        <p class="text-[#131313] font-bold text-3xl">No Information Available</p>
        <p class="text-[#131313B3] font-normal text-base text-center">
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at
        its layout. The point of using Lorem Ipsum is that it has a.
        </p>
    </div>`;
    return;
  } else {
    petsContainer.classList.add("grid");
  }
  pets.forEach((pet) => {
    console.log(pet);
    const card = document.createElement("div");
    card.classList = "card p-1 md:p-5 border";
    card.innerHTML = `
    <img class="h-[160px] w-[272px] object-cover rounded-lg"
      src=${pet.image}
      alt="pet"
      class="rounded-xl" />
        <div class="space-y-2 mt-6">
            <h2 class="text-xl font-extrabold text-[#131313]">${
              pet.pet_name || "No Name Available"
            }</h2>
            <p class="text-[#131313B3] font-normal text-base"><i class="fa-regular fa-clone"></i> Breed: ${
              pet.breed || "Unknown Breed"
            }</p>
            <p class="text-[#131313B3] font-normal text-base"><i class="fa-regular fa-calendar"></i> Birth: ${
              pet.date_of_birth || "Unknown Birth Date"
            }</p>
            <p class="text-[#131313B3] font-normal text-base"><i class="fa-solid fa-mercury"></i> Gender: ${
              pet.gender || "Unknown Gender"
            }</p>
            <p class="text-[#131313B3] font-normal text-base"><i class="fa-solid fa-dollar-sign"></i> Price: ${
              pet.price != null ? pet.price + "$" : "N/A"
            }</p>
            <div class=" space-y-3 md:space-y-0 justify-between">
                <button onclick="addLikedPets('${
                  pet.image
                }')" class="font-bold text-lg text-[#0E7A81] border border[#0E7A8126] px-5 py-2 rounded-lg"><i class="fa-regular fa-thumbs-up"></i></button>
                <button onclick="adoptPet(this)" class="font-bold text-lg text-[#0E7A81] border border[#0E7A8126] px-5 py-2 rounded-lg">Adopt</button>
                <button onclick="loadDetails('${
                  pet.petId
                }')" class="font-bold text-lg text-[#0E7A81] border border[#0E7A8126] px-5 py-2 rounded-lg">Details</button>
            </div>
        </div>`;
    petsContainer.append(card);
  });
};

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");

  categories.forEach((element) => {
    console.log(element);

    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button id="btn-${element.category}" onclick="loadCategoryPets('${element.category}')" class="border border-[#0E7A8126] bg-base-100 flex justify-center items-center text-lg md:text-2xl font-bold text-[#131313] p-3 md:p-6 md:px-20 rounded-2xl category-btn">
      <img src="${element.category_icon}" alt="icon" class="w-8 h-8 md:w-14 md:h-14"> 
      <span class="ml-3">${element.category}s</span>
    </button>
    `;
    categoryContainer.append(buttonContainer);
  });
};

loadCategories();
loadPets();
