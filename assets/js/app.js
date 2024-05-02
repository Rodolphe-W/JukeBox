const playlist = document.getElementById("playlist");
const lecteur = document.querySelector("#lecteur");
const btnPlayRandom = document.querySelector("#btnPlayRandom");
const sidebar = new bootstrap.Offcanvas(document.getElementById('sidebar'));
const disque = document.querySelector(".disque");
const disqueCover = document.querySelector(".disque-cover");
const btnPause = document.getElementById("btnPause");
const btnStop = document.getElementById("btnStop");
const titleMusic = document.getElementById("titleMusic");

const config = {
    urlCover : "uploads/covers/",
    urlSound : "uploads/musics/",
    defaultCover: "uploads/pictures/vinyle-noir.png"
};

const getData = async () => {
    const req = await fetch("https://api-jukebox-18pt.onrender.com/api/v1/music");
    const dbMusics = await req.json();
    dbMusics.result.forEach((music) => {
        playlist.innerHTML += `<li id="${music.id}"><div class="music-info"><h2>${music.title}</h2><p>${music.artist}</p><small><i>${music.category}</i></small></div><img src="${config.urlCover}${music.cover}" alt="${music.title}"/></li>`;
    });

    const allLi = document.querySelectorAll("li");

    allLi.forEach((li) => {
        li.addEventListener('click', function(){
            const id = parseInt(li.id);
            const searchById = dbMusics.find((element) => element.id === id);
            lecteur.src = `${config.urlSound}${searchById.sound}`;
            disqueCover.src = `${config.urlCover}${searchById.cover}`;
            titleMusic.textContent = `${searchById.title}`;
            lecteur.play();
            sidebar.hide();
            btnPause.classList.remove("disabled");
            btnPause.innerHTML = `<img class="col-12" src="uploads/pictures/pause.png" alt="pause">`;
            disque.classList.remove("pause");
            
        })
    });

    btnPlayRandom.addEventListener('click', function(){
        const random = Math.floor(Math.random() * dbMusics.length) + 1;
        const searchById = dbMusics.find((element) => element.id === random);
        lecteur.src = `${config.urlSound}${searchById.sound}`;
        disqueCover.src = `${config.urlCover}${searchById.cover}`;
        titleMusic.textContent = `${searchById.title}`;
        lecteur.play();
        btnPause.classList.remove("disabled");
        btnPause.innerHTML = `<img class="col-12" src="uploads/pictures/pause.png" alt="pause">`;
        disque.classList.remove("pause");
    });
};

getData();

lecteur.addEventListener('ended', ()=>{
    btnPause.innerHTML = `<img class="col-12" src="uploads/pictures/play.png" alt="play">`;
    disque.classList.add("pause");
});

btnPause.addEventListener('click',()=>{
    disque.classList.toggle("pause");
    if(disque.classList.contains("pause")){
        btnPause.innerHTML = `<img class="col-12" src="uploads/pictures/play.png" alt="play">`;
        lecteur.pause();
    }else{
        btnPause.innerHTML = `<img class="col-12" src="uploads/pictures/pause.png" alt="pause">`;
        lecteur.play();
    }
});

btnStop.addEventListener('click',()=>{
    disqueCover.src = `${config.defaultCover}`;
    titleMusic.textContent = "Aucune musique sélectionnée";
    disque.classList.add("pause");
    lecteur.src="";
    btnPause.innerHTML = `<img class="col-12" src="uploads/pictures/play.png" alt="play">`;
    btnPause.classList.add("disabled");
});

lecteur.addEventListener("pause",()=>{
    disque.classList.add("pause");
    btnPause.innerHTML = `<img class="col-12" src="uploads/pictures/play.png" alt="play">`;
});

lecteur.addEventListener("play",()=>{
    disque.classList.remove("pause");
    btnPause.innerHTML = `<img class="col-12" src="uploads/pictures/pause.png" alt="pause">`;
})


