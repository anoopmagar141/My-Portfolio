const songs = [
    {
        title: "Me and the Devil",
        artist: "Artist One",
        src: "assets/song/song1.mp3",
        cover: "assets/img/cover1.png"
    },
    {
        title: "C02",
        artist: "Artist Two",
        src: "assets/song/song2.mp3",
        cover: "assets/img/cover2.jpg"
    },
    {
        title: "Blue",
        artist: "Artist Three",
        src: "assets/song/song3.mp3",
        cover: "assets/img/cover3.png"
    }
];

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const shuffleBtn = document.getElementById("shuffle");
const loopBtn = document.getElementById("loop");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");

let currentSongIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isLoop = false;

const audio = new Audio();
audio.src = songs[currentSongIndex].src;

function loadSong(index) {
    const song = songs[index];
    title.textContent = song.title;
    artist.textContent = song.artist;
    cover.src = song.cover;
    audio.src = song.src;
}

function playSong() {
    isPlaying = true;
    playBtn.textContent = "⏸️";
    audio.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.textContent = "▶️";
    audio.pause();
}

function nextSong() {
    if (isShuffle) {
        currentSongIndex = Math.floor(Math.random() * songs.length);
    } else {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
    }
    loadSong(currentSongIndex);
    playSong();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

playBtn.addEventListener("click", () => {
    isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

shuffleBtn.addEventListener("click", () => {
    isShuffle = !isShuffle;
    shuffleBtn.style.color = isShuffle ? "green" : "white";
});

loopBtn.addEventListener("click", () => {
    isLoop = !isLoop;
    loopBtn.style.color = isLoop ? "green" : "white";
    audio.loop = isLoop;
});

audio.addEventListener("timeupdate", () => {
    const { currentTime, duration } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progress.value = progressPercent || 0;

    const formatTime = (time) => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs < 10 ? "0" + secs : secs}`;
    };

    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration || 0);
});

progress.addEventListener("input", (e) => {
    audio.currentTime = (e.target.value / 100) * audio.duration;
});

volumeSlider.addEventListener("input", (e) => {
    audio.volume = e.target.value;
});

audio.addEventListener("ended", () => {
    if (!isLoop) nextSong();
});

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case " ":
            e.preventDefault();
            isPlaying ? pauseSong() : playSong();
            break;
        case "ArrowRight":
            nextSong();
            break;
        case "ArrowLeft":
            prevSong();
            break;
    }
});

// Initial load
loadSong(currentSongIndex);
