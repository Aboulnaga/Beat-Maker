class beatMaker {
  constructor() {
    this.beatSquares = document.querySelectorAll(".track");
    this.loopCounter = 0;
    this.bpm = 200;
    this.playBTN = document.querySelector(".play");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.isPlaying = null;
    this.selectTrackAudio = document.querySelectorAll(".select");
    this.muteBTN = document.querySelectorAll(".mute");
    this.bpmBTN = document.querySelector(".bpm");

    //console.log(this.selectTrackAudio);
  }

  loopBeatSquares() {
    let step = this.loopCounter % 10;
    const square = document.querySelectorAll(`.t${step}`);
    this.animateLoopBeatSquares(square);
    this.loopCounter++;

    square.forEach((oneSquare) => {
      if (oneSquare.classList.contains("active-beat-audio")) {
        if (oneSquare.classList.contains("kick-beat-track")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (oneSquare.classList.contains("snare-beat-track")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (oneSquare.classList.contains("hihat-beat-track")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
  }

  animateLoopBeatSquares(square) {
    square.forEach((oneSquare) => {
      oneSquare.classList.add("active-square-animation");
      oneSquare.addEventListener("animationend", () => {
        oneSquare.classList.remove("active-square-animation");
      });
    });
  }

  play = () => {
    this.playBTN.classList.add("active-play");
    this.playBTN.textContent = "Stop";
    const interval = (60 / this.bpm) * 1000;
    this.isPlaying = setInterval(() => {
      this.loopBeatSquares();
    }, interval);
  };

  stop = () => {
    this.playBTN.classList.remove("active-play");
    this.playBTN.textContent = "Play";
    clearInterval(this.isPlaying);
    this.isPlaying = null;
  };

  ActiveBeatSqure(e) {
    //console.log(e.target.classList);
    if (e.target.classList.contains("kick-beat-track")) {
      e.target.classList.toggle("active-kick-beat-square");
      e.target.classList.toggle("active-beat-audio");
    } else if (e.target.classList.contains("snare-beat-track")) {
      e.target.classList.toggle("active-snare-beat-square");
      e.target.classList.toggle("active-beat-audio");
    } else if (e.target.classList.contains("hihat-beat-track")) {
      e.target.classList.toggle("active-hihat-beat-square");
      e.target.classList.toggle("active-beat-audio");
    }
  }

  selectTrackAudioType(e) {
    const selectTrackAudio = e.target.value;
    if (e.target.classList.contains("select-kick-track")) {
      this.kickAudio.src = selectTrackAudio;
    } else if (e.target.classList.contains("select-snare-track")) {
      this.snareAudio.src = selectTrackAudio;
    } else if (e.target.classList.contains("select-hihat-track")) {
      this.hihatAudio.src = selectTrackAudio;
    }
  }

  MuteTrack(e) {
    e.target.classList.toggle("active-mute");
    if (e.target.classList.contains("active-mute")) {
      if (e.target.classList.contains("mute-kick-track")) {
        this.kickAudio.volume = 0;
      }
      if (e.target.classList.contains("mute-snare-track")) {
        this.snareAudio.volume = 0;
      }
      if (e.target.classList.contains("mute-hihat-track")) {
        this.hihatAudio.volume = 0;
      }
    } else {
      if (e.target.classList.contains("mute-kick-track")) {
        this.kickAudio.volume = 1;
      }
      if (e.target.classList.contains("mute-snare-track")) {
        this.snareAudio.volume = 1;
      }
      if (e.target.classList.contains("mute-hihat-track")) {
        this.hihatAudio.volume = 1;
      }
    }
  }

  changeBPM(e) {
    const bpmValue = document.querySelector(".bpm-value");
    bpmValue.textContent = e.target.value;
    this.bpm = e.target.value;
    clearInterval(this.isPlaying);
    if (this.isPlaying != null) {
      this.play();
    }
  }

  //class end
}

const myBeat = new beatMaker();
myBeat.isPlaying;
//myBeat.tst();

myBeat.beatSquares.forEach((beatSquare) => {
  beatSquare.addEventListener("click", function (e) {
    myBeat.ActiveBeatSqure(e);
  });
});

myBeat.playBTN.addEventListener("click", () => {
  if (myBeat.isPlaying === null) {
    myBeat.play();
  } else {
    myBeat.stop();
  }
});

myBeat.selectTrackAudio.forEach((oneSelect) => {
  oneSelect.addEventListener("change", (e) => {
    myBeat.selectTrackAudioType(e);
  });
});

myBeat.muteBTN.forEach((oneMute) => {
  oneMute.addEventListener("click", (e) => {
    myBeat.MuteTrack(e);
  });
});

myBeat.bpmBTN.addEventListener("input", (e) => {
  myBeat.changeBPM(e);
});
