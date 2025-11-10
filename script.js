const songs = [
  {
    title: "Dreamy Vibes",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?fit=crop&w=500&h=500"
  },
  {
    title: "Sky Travel",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?fit=crop&w=500&h=500"
  },
  {
    title: "Calm Breeze",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?fit=crop&w=500&h=500"
  }
];

let songIndex = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const volumeSlider = document.getElementById("volume");
const playerContainer = document.querySelector(".player-container");

function loadSong(song) {
  title.textContent = song.title;
  audio.src = song.src;
  cover.src = song.cover;
}

function playSong() {
  audio.play();
  playBtn.textContent = "⏸️";
  playerContainer.classList.add("playing");
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶️";
  playerContainer.classList.remove("playing");
}

function togglePlay() {
  audio.paused ? playSong() : pauseSong();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const percent = (currentTime / duration) * 100;
  progress.style.width = `${percent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

volumeSlider.addEventListener("input", (e) => {
  audio.volume = e.target.value;
});

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong);

// Load first song
loadSong(songs[songIndex]);
