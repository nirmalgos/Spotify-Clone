let songindex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let playbar = document.getElementById('playbar');
let songinfo = document.getElementById('songinfo');
let songList = document.getElementById('songList');
let prev = document.getElementById('prev');
let next = document.getElementById('next');
let song = Array.from(document.getElementsByClassName('song'));

let songs = [
    { songName: "Kojola Sokur", filePath: "songs/1.mp3", coverPath: "covers/1.jpg", songDur: "6.19" },
    { songName: "Sharry Maan - 3 Peg", filePath: "songs/2.mp3", coverPath: "covers/2.jpg", songDur: "3.24" },
    { songName: "Aashona - Borbaad", filePath: "songs/3.mp3", coverPath: "covers/3.jpg", songDur: "4.03" },
    { songName: "Tu Hi Toh Hai - Holiday", filePath: "songs/4.mp3", coverPath: "covers/4.jpg", songDur: "3.55" },
    { songName: "Kudi Nu Nachne De", filePath: "songs/5.mp3", coverPath: "covers/5.jpg", songDur: "6.64" },
    { songName: "Ale - Golmaal 3", filePath: "songs/6.mp3", coverPath: "covers/6.jpg", songDur: "4.41" },
    { songName: "Tu Mohabbat Hai", filePath: "songs/7.mp3", coverPath: "covers/7.jpg", songDur: "5.20" },
    { songName: "Tum Hi Ho Bandhu", filePath: "songs/8.mp3", coverPath: "covers/8.jpg", songDur: "4.42" },
    { songName: "Thunder - Imagine Dragons", filePath: "songs/9.mp3", coverPath: "covers/9.jpg", songDur: "3.07" },
    { songName: "Roar - Katy Perry", filePath: "songs/10.mp3", coverPath: "covers/10.jpg", songDur: "4.29" },
]
songs.forEach((e) => {
    songList.innerHTML +=
        `
    <div class="song">
    <img src="${e.coverPath}" alt="">
    <span class="songName">${e.songName}</span>
    <span>${e.songDur}<i class="songPlay fa-solid fa-circle-play"></i></span>
</div>
`;
})


audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    playbar.value = progress;
})

playbar.addEventListener('change', () => {
    audioElement.currentTime = (playbar.value * audioElement.duration) / 100;
})


const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songPlay')).forEach((element, i) => {
    element.addEventListener('click', (e) => {
        songindex = i;

        if (e.target.classList.contains("fa-circle-play")) {
            makeAllPlays();
            e.target.classList.remove("fa-circle-play");
            e.target.classList.add("fa-circle-pause");

            masterPlay.classList.remove("fa-circle-play");
            masterPlay.classList.add("fa-circle-pause");

            audioElement.src = `songs/${songindex + 1}.mp3`;
            songinfo.innerText = songs[songindex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
        }
        else {
            e.target.classList.remove("fa-circle-pause");
            e.target.classList.add("fa-circle-play");

            masterPlay.classList.remove("fa-circle-pause");
            masterPlay.classList.add("fa-circle-play");

            audioElement.src = `songs/${songindex + 1}.mp3`;
            songinfo.innerText = songs[songindex].songName;
            audioElement.currentTime = 0;
            audioElement.pause();
        }


    })

})

const SyncSongPlayback = () => {
    Array.from(document.getElementsByClassName('songPlay')).forEach((e, i) => {
        if (songs[i].songName == songinfo.innerText) {

            if (audioElement.paused || audioElement.currentTime <= 0) {
                audioElement.play();
                masterPlay.classList.add('fa-circle-pause');
                masterPlay.classList.remove('fa-circle-play');

                e.classList.add("fa-circle-pause");
                e.classList.remove("fa-circle-play");
            }
            else {
                audioElement.pause();
                masterPlay.classList.remove('fa-circle-pause');
                masterPlay.classList.add('fa-circle-play');

                e.classList.add("fa-circle-play");
                e.classList.remove("fa-circle-pause");
            }
        }
    })
}

document.getElementById('prev').addEventListener('click', () => {
    makeAllPlays();
    
    if (songindex <= 0) {

        songindex = songs.length - 1;
    }
    else {
        songindex -= 1;
    }
    audioElement.src = `songs/${songindex + 1}.mp3`
    audioElement.currentTime = 0;
    audioElement.play();
    songinfo.innerText = songs[songindex].songName;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

    SyncSongPlayback();
})


masterPlay.addEventListener('click', () => {
    makeAllPlays();
    SyncSongPlayback();
})

document.getElementById('next').addEventListener('click', () => {
    makeAllPlays();
    
    if (songindex >= songs.length - 1) {
        songindex = 0;
    }
    else {
        songindex += 1;
    }
    audioElement.src = `songs/${songindex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    songinfo.innerText = songs[songindex].songName;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

    SyncSongPlayback();
})

function toggleMobileMenu(menu) {
    menu.classList.toggle('open');
}
