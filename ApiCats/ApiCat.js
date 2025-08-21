const API_KEY = "live_IdwNAwZoiuOuvHtKRFZoOJCW93KoWCMn8ecJdkdSWNFH7HI7YsYQE7EQ1tol0J5y";
const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=3';
const API_URL_FAVORITES = `https://api.thecatapi.com/v1/favourites?api_key=${API_KEY}`;
const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=${API_KEY}`
const buttonReload = document.getElementById("reload");
const spanError = document.getElementById("error");
const section = document.getElementById("favoritesMichis");
const messagePopUp = document.getElementById("Messmodal");

buttonReload.addEventListener("click", (e) => {
  e.preventDefault();
  location.reload();
})


const loadRandomMichis = async () => {

  const response = await fetch(API_URL_RANDOM);
  const data = await response.json();

  if (response.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + response.status
  } else {

    const img = document.getElementById("imgCat_1");
    const img2 = document.getElementById("imgCat_2");
    const img3 = document.getElementById("imgCat_3");
    const btn1 = document.getElementById("buttonSaveFavorite1");
    const btn2 = document.getElementById("buttonSaveFavorite2");
    const btn3 = document.getElementById("buttonSaveFavorite3");

    img.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;

    btn1.onclick = () => saveFavorites(data[0].id);
    btn2.onclick = () => saveFavorites(data[1].id);
    btn3.onclick = () => saveFavorites(data[2].id);

  }
  loadFavoriteMichis();
}


const saveFavorites = async (id) => {

  let rawBody = JSON.stringify({
    "image_id": id
  });

  const response = await fetch(API_URL_FAVORITES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: rawBody
  });
  const data = await response.json();

  if (response.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + response.status + data.message;
  } else {
    messagePopUp.innerText = "Haz agregado este michi a Favoritos 😻"
    openModal();
    loadFavoriteMichis();
  }

}

const loadFavoriteMichis = async () => {
  try {
    const response = await fetch(API_URL_FAVORITES);
    const data = await response.json();

    if (response.status !== 200) {
      spanError.innerHTML = "Hubo un error: " + response.status + data.message;
    } else {
      section.innerHTML = "";
      data.forEach(element => {
        const article = document.createElement("article");
        const img = document.createElement("img");
        const button = document.createElement("button");
        const btnText = document.createTextNode("Sacar Michi")

        img.src = element.image.url;

        button.appendChild(btnText);
        button.onclick = () => deleteMichis(element.id);
        article.appendChild(img);
        article.appendChild(button);
        section.appendChild(article);

      });
    }
  } catch (error) {
    console.error(error)
  }
}

const deleteMichis = async (id) => {

  const response = await fetch(API_URL_FAVORITES_DELETE(id), {
    method: 'DELETE'
  });
  const data = await response.json();

  if (response.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    messagePopUp.innerText = "Haz eliminado este michi de Favoritos 😿"
    openModal();
    loadFavoriteMichis();
  }

}

const openModal = async () => {
  document.getElementById("overlay").style.display = "flex";
}

const closeModal = async () => {
  document.getElementById("overlay").style.display = "none";
}

loadRandomMichis();





