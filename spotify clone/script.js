// / console.log("deepu");
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myprogerssbar = document.getElementById("myprogressbar");
let gif = document.getElementById("gif");
let songname = document.getElementById("songname");
let songItem = Array.from(document.getElementsByClassName("songItem"));
let songs = [
  { songName: "Aao Na", filePath: "songs/1.mp3", coverPath: "cover/song1.png" },
  {
    songName: "you are mine",
    filePath: "songs/1.mp3",
    coverPath: "cover/song1.png",
  },
  {
    songName: "dekhte de",
    filePath: "songs/1.mp3",
    coverPath: "cover/song1.png",
  },
  { songName: "saal", filePath: "songs/1.mp3", coverPath: "cover/1.jpg" },
  { songName: "yo yo", filePath: "songs/1.mp3", coverPath: "cover/song1.png" },
];
songItem.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

masterPlay.addEventListener("click", (e) => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.add("fa-play-circle");
    masterPlay.classList.remove("fa-pause-circle");
    gif.style.opacity = 0;
  }
});
audioElement.addEventListener("timeupdate", () => {
  // console.log("timeupdate");
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myprogerssbar.value = progress;
});
myprogerssbar.addEventListener("change", () => {
  audioElement.currentTime =
    (myprogerssbar.value * audioElement.duration) / 100;
});
const makeallplay = () => {
  Array.from(document.getElementsByClassName("songPlay")).forEach((element) => {
    songname.innerText = songs[songIndex].songName;
    element.classList.remove("fa-pause-circle");
    element.classList.add("fa-play-circle");
  });
};
Array.from(document.getElementsByClassName("songPlay")).forEach((element) => {
  element.addEventListener("click", (e) => {
    makeallplay();
    songIndex = parseInt(e.target.id);
    e.target.classList.remove("fa-play-circle");
    e.target.classList.add("fa-pause-circle");
    songname.innerText = songs[songIndex].songName;
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.play();
    audioElement.currentTime = 0;
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  });
});
document.getElementById("next").addEventListener("click", () => {
  if (songIndex > 5) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex}.mp3`;
  audioElement.play();
  audioElement.currentTime = 0;
  songname.innerText = songs[songIndex - 1].songName;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});
document.getElementById("prev").addEventListener("click", () => {
  if (songIndex < 1) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }

  audioElement.src = `songs/${songIndex}.mp3`;
  audioElement.play();
  songname.innerText = songs[songIndex - 1].songName;
  audioElement.currentTime = 0;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});
