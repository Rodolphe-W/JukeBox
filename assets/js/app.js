const playlist = document.getElementById("playlist");
const lecteur = document.querySelector("#lecteur");
const config = {
    urlCover : "uploads/cover/",
    urlSound : "uploads/musics/"
};

const getData = async () => {
    const req = await fetch("./assets/js/data.json");
    const dbMusics = await req.json();
    console.log(dbMusics);
    dbMusics.forEach((music) => {
        playlist.innerHTML += `<li id="${music.id}"><h2>${music.title}</h2><img src="${config.urlCover}${music.cover}" alt="${music.title}"/><div><small>${music.category}</small></div></li>`;
    });

    const allLi = document.querySelectorAll("li");

    allLi.forEach((li) => {
        li.addEventListener('click', function(){
            const id = parseInt(li.id);
            const searchById = dbMusics.find((element) => element.id === id);
            alert(`Veux-tu écouter le titre : ${searchById.title}`);
            lecteur.src = `${config.urlSound}${searchById.sound}`;
            lecteur.play();
        })
    });
};
getData();


// fonction à mettre dans le onclick des li de la boucle foreach
// function loadMusic(idMusic){
//     const id = idMusic;
//     const searchById = dbMusics.find((element) => element.id === id);
//     alert(`Veux-tu écouter le titre : ${searchById.title}`);
//     lecteur.src = `${config.urlSound}${searchById.sound}`;
//     lecteur.play();
// }

/* <li id="music1">
    <h2>Title</h2>
    <img src="">
    <div><small>Category</small></div>
</li> */