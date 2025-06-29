
// Inisialize the songs
let songIndex = 0;
let audioElement = new Audio("../Songs/Tenu Lagga - Talwiinder (DJJOhAL.Com).mp3");
// audioElement.play()
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let masterSongArtist = document.getElementById('masterSongArtist');
let cover = document.getElementById('cover');
let songItem = Array.from(document.getElementsByClassName('songItem'));

// Creating the Song Array
let songs = [
    {songName : "Tauba-Tauba" , filePath:"../Songs/TaubaTauba.mp3" , coverPage:"../Cover/tauba-tauba cover.webp", artistName:" by Karan Aujala"},
    {songName : "Bas" , filePath:"../Songs/Bas - Jaz Dhami.mp3" , coverPage:"../Cover/bas-jaz-dhami.webp", artistName:" by Karan Aujala"},
    {songName : "Haseen" , filePath:"../Songs/Haseen - DjPunjab.Com.Se.mp3" , coverPage:"../Cover/Haseen.webp", artistName:"Talwiinder"},
    {songName : "Don't tell me" , filePath:"../Songs/Dont Tell Me - Dilpreet Dhillon.mp3" , coverPage:"../Cover/dont-tell-me.webp", artistName:" by Karan Aujala"},
    {songName : "Khayaal" , filePath:"../Songs/Khayaal - Talwiinder (DJJOhAL.Com).mp3" , coverPage:"../Cover/Khayaal.jpg",artistName:" by Talwiinder"},
    {songName : "Admirin you" , filePath:"../Songs/Admirin You - Karan Aujla.mp3" , coverPage:"../Cover/admirin-you.webp",artistName:" by Karan Aujala"},
    {songName : "Laut Aana" , filePath:"../Songs/Laut Aana - Karan Aujla.mp3" , coverPage:"../Cover/laut-aana.webp",artistName:" by Karan Aujala"},
    {songName : "Yaad" , filePath:"../Songs/Yaad - Talwiinder (DJJOhAL.Com).mp3" , coverPage:"../Cover/Yaad.jpg",artistName:" by Talwiinder"},
    {songName : "Jor" , filePath:"../Songs/Jor - Talwiinder (DJJOhAL.Com).mp3" , coverPage:"../Cover/Jor.jpg",artistName:" by Talwiinder"},
    {songName : "Tenu Lagga" , filePath:"../Songs/Tenu Lagga - Talwiinder (DJJOhAL.Com).mp3" , coverPage:"../Cover/Tenu Lagga.jpg",artistName:" by Talwiinder"},
    {songName : "Warning" , filePath:"../Songs/Warning.mp3" , coverPage:"../Cover/Warning-1.jpg",artistName:" by Masoom Sharma"},
    {songName : "Blender" , filePath:"../Songs/Blender(KoshalWorld.Com).mp3" , coverPage:"../Cover/Blender.jpg",artistName:" by Masoom Sharma"},
    {songName : "Pistol-Bole-Gi" , filePath:"../Songs/Pistol Bole Gi.mp3" , coverPage:"../Cover/Pistol-Bole-Gi.jpg",artistName:" by Masoom Sharma"},
]
songItem.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPage;
    element.getElementsByClassName('songName')[0].src = songs[i].songName;
    // element.getElementsByClassName('artistName')[0].innerHTML = songs[i].artistName;
})

// For playing all song from array
const makeAllPlay = ()=>{
    Array.from(document.getElementsByClassName('songItem')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    },false)
}

// Handeling Play/Pause Song
masterPlay.addEventListener('click' ,()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;

        // sync last
        makeAllPlay();
        document.getElementById(songIndex).classList.remove('fa-circle-play');
        document.getElementById(songIndex).classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;

        // left side sync
        document.getElementById(songIndex).classList.remove('fa-circle-pause');
        document.getElementById(songIndex).classList.add('fa-circle-play');
    }
},false);

// For song time line
audioElement.addEventListener('timeupdate' , ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(myProgressBar)
    myProgressBar.value = progress;
},false);
// for converting the percent to normal
myProgressBar.addEventListener('change' , ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100 ;
},false);



Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click' , (e)=>{
        gif.style.opacity = 1;
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerHTML = songs[songIndex].songName;
        masterSongArtist.innerHTML = songs[songIndex].artistName;
        cover.src = songs[songIndex].coverPage;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    },false)
},false)

// // For playnext song
// document.getElementById("next").addEventListener('click' , ()=>{
//     if(songIndex>=9){
//         songIndex=0;
//     }
//     else{
//         songIndex += 1;
//     }
//     audioElement.src = `songs/${songIndex+1}.mp3`;
//     masterSongName.innerText = songs[songIndex].songName; 
//     audioElement.currentTime = 0;
//     audioElement.play();
//     masterPlay.classList.remove('fa-circle-play');
//     masterPlay.classList.add('fa-circle-pause');
// },false)

// // For playprevious song
// document.getElementById("previous").addEventListener('click' , ()=>{
//     if(songIndex<=0){
//         songIndex=0;
//     }
//     else{
//         songIndex -= 1;
//     }
//     audioElement.src = `songs/${songIndex+1}.mp3`;
//     masterSongName.innerText = songs[songIndex].songName; 
//     audioElement.currentTime = 0;
//     audioElement.play();
//     masterPlay.classList.remove('fa-circle-play');
//     masterPlay.classList.add('fa-circle-pause');
// },false)

// Next song
document.getElementById('next').addEventListener('click', () => {
  songIndex = (songIndex + 1) % songs.length;
  
  makeAllPlay(); // reset all list icons
  gif.style.opacity = 1;
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  cover.src = songs[songIndex].coverPage;
  masterSongArtist.innerHTML = songs[songIndex].artistName;
  audioElement.currentTime = 0;
  audioElement.play();

  // Sync bottom icon:
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');

  // Sync list icon for new song:
  document.getElementById(songIndex).classList.remove('fa-circle-play');
  document.getElementById(songIndex).classList.add('fa-circle-pause');
});

// Previous song
document.getElementById('previous').addEventListener('click', () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;

  makeAllPlay(); // reset all list icons
  gif.style.opacity = 1;
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  cover.src = songs[songIndex].coverPage;
  masterSongArtist.innerHTML = songs[songIndex].artistName;
  audioElement.currentTime = 0;
  audioElement.play();

  // Sync bottom icon:
  masterPlay.classList.remove('fa-circle-play');
  masterPlay.classList.add('fa-circle-pause');

  // Sync list icon for new song:
  document.getElementById(songIndex).classList.remove('fa-circle-play');
  document.getElementById(songIndex).classList.add('fa-circle-pause');
});



// // Scroll bar for left div
// // Get the left container
// const leftContainer = document.querySelector('.left');

// // Get all the song items
// const songItems = document.querySelectorAll('.songItem');

// // Scroll to the 5th song (index 4)
// document.getElementById('scrollToSong5').addEventListener('click', () => {
//   songItems[4].scrollIntoView({ behavior: 'smooth', block: 'center' });
// });
