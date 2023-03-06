const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");
const current_time = $(".current-time");
const duration_time = $(".duration-time");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: {},
  // (1/2) Uncomment the line below to use localStorage
  // config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},

  songs: [
    // {
    //   name: "Damn",
    //   singer: "Raftaar x kr$na",
    //   path: "https://github.com/tamvt2/song/raw/37270d23b6e178cc754f73df5a297196c2b7d369/Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
    //   image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
    // },
    // {
    //   name: "Tu Phir Se Aana",
    //   singer: "Raftaar x Salim Merchant x Karma",
    //   path: "https://github.com/tamvt2/song/raw/37270d23b6e178cc754f73df5a297196c2b7d369/Tu%20Na%20Mileya-G%20Khan%20-VlcMusic.CoM.mp3",
    //   image:
    //     "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
    // },
    // {
    //   name: "Một Triệu Khả Năng",
    //   singer: "Hắc Kỳ Tử",
    //   path: "https://github.com/tamvt2/song/raw/37270d23b6e178cc754f73df5a297196c2b7d369/MotTrieuKhaNang-ChristineWelch-5833744.mp3",
    //   image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/e/1/c/c/e1cc362449dfa24d62c520eca491b0fe.jpg"
    // },
    // {
    //   name: "Thanh Đao Của Quỷ",
    //   singer: "Cung Lâm Na (Gong Linna)",
    //   path: "https://github.com/tamvt2/song/raw/37270d23b6e178cc754f73df5a297196c2b7d369/ThanhDaoCuaQuyNhatSinhChiHa5Ost-CungLamNaGongLinna-8751975.mp3",
    //   image:
    //     "https://avatar-ex-swe.nixcdn.com/song/2023/02/21/5/9/1/6/1676967307628_500.jpg"
    // },
    // {
    //   name: "Tia Sáng Rơi Xuống Sinh Mệnh",
    //   singer: "Lâm Tuấn Kiệt (JJ Lin)",
    //   path: "https://github.com/tamvt2/song/raw/37270d23b6e178cc754f73df5a297196c2b7d369/TiaSangRoiXuongSinhMenh-LamTuanKietJJLin-8689761.mp3",
    //   image:
    //     "https://avatar-ex-swe.nixcdn.com/song/2023/02/09/3/c/3/5/1675933302509_500.jpg"
    // },
    // {
    //   name: "Là Anh",
    //   singer: "Mộng Nhiên (Meng Ran)",
    //   path:
    //     "https://github.com/tamvt2/song/raw/37270d23b6e178cc754f73df5a297196c2b7d369/LaAnh-MongNhienMengRan-7839255%20(3).mp3",
    //   image:
    //     "https://avatar-ex-swe.nixcdn.com/song/2023/02/10/1/1/b/f/1676004847611_500.jpg"
    // },
    // {
    //   name: "Mày Của Hôm Nay",
    //   singer: "KIDz",
    //   path: "https://github.com/tamvt2/song/raw/main/MayCuaHomNay-KIDz-7198546.mp3",
    //   image:
    //     "https://avatar-ex-swe.nixcdn.com/song/2022/04/26/d/1/1/f/1650962596798_500.jpg"
    // },
    // {
    //   name: "Thương Lan Khế / 苍兰契 (Thương Lan Quyết Ost)",
    //   singer: "Lý Thường Siêu (Lão Can Ma)",
    //   path: "https://github.com/tamvt2/song/raw/main/ThuongLanKheThuongLanQuyetOst-LaoCanMa-7802229.mp3",
    //   image:
    //     "https://avatar-ex-swe.nixcdn.com/song/2022/08/18/f/9/4/5/1660801307091_500.jpg"
    // },
    // {
    //   name: "Ta Vẫn Nhớ Ngày Hôm Ấy / 我还记得那天 (Thương Lan Quyết Ost)",
    //   singer: "Thẩm Dĩ Thành (Shen Yi Cheng)",
    //   path: "https://github.com/tamvt2/song/raw/main/TaVanNhoNgayHomAy-ThamDiThanhChenYiCheng-7810313.mp3",
    //   image:
    //     "https://avatar-ex-swe.nixcdn.com/song/2022/08/23/b/0/1/e/1661247700485.jpg"
    // },
    // {
    //   name: "Quyết Ái / 诀爱 (Thương Lan Quyết Ost)",
    //   singer: "Chiêm Văn Đình (Faye Chan)",
    //   path: "https://github.com/tamvt2/song/raw/main/QuyetAiThuongLanQuyetOST-FayeChan-7793104.mp3",
    //   image:
    //     "https://avatar-ex-swe.nixcdn.com/song/2022/08/20/2/e/3/3/1661001765691.jpg"
    // },
    // {
    //   name: "Niệm / 念 (Thương Lan Quyết Ost)",
    //   singer: "Song Sênh",
    //   path: "https://github.com/tamvt2/song/raw/main/NiemThuongLanQuyetOst-SongSenh-7802226.mp3",
    //   image:
    //     "https://avatar-ex-swe.nixcdn.com/song/2022/08/23/b/0/1/e/1661247554122_500.jpg"
    // },
    // {
    //   name: "Mất Đi Ký Ức / 失忆 (Thương Lan Quyết Ost)",
    //   singer: "Ngu Thư Hân (Esther Yu)",
    //   path: "https://github.com/tamvt2/song/raw/main/MatDiKyUcThuongLanQuyetOst-NguThuHanEstherYu-7768187.mp3",
    //   image:
    //     "https://avatar-ex-swe.nixcdn.com/song/2022/08/11/e/f/7/d/1660230434957_500.jpg"
    // },
    // {
    //   name: "Dư Tình (Thương Lan Quyết OST)",
    //   singer: "Châu Thâm (Zhou Shen)",
    //   path: "https://github.comtamvt2/song/raw/main/DuTinhThuongLanQuyetOstBeat-ChauThamZhouShen-7768231.mp3",
    //   image:
    //     "https://avatar-ex-swe.nixcdn.com/song/2022/08/11/e/f/7/d/1660231192722_500.jpg"
    // },
    // {
    //   name: "Tìm Nàng / 寻一个你 (Thương Lan Quyết Ost)",
    //   singer: "Lưu Vũ Ninh (Liu Yu Ning)",
    //   path: "https://github.com/tamvt2/song/raw/main/TimNangThuongLanQuyetOst-LuuVuNinhLiuYuNing-7730958.mp3",
    //   image:
    //     "https://avatar-ex-swe.nixcdn.com/song/2022/08/11/e/f/7/d/1660231192722_500.jpg"
    // }
  ],
  getSong: function() {
    fetch("http://127.0.0.1:8000/list")
      .then((response) => response.json())
      .then((data) => {
        data.values.forEach(element => {
          this.songs.push(element)
        });
        this.render();
        this.loadCurrentSong();
      });
  },
  setConfig: function (key, value) {
    this.config[key] = value;
    // (2/2) Uncomment the line below to use localStorage
    // localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
              <div class="song ${
                index === this.currentIndex ? "active" : ""
              }" data-index="${index}">
                  <div class="thumb"
                      style="background-image: url('${song.url_image}')">
                  </div>
                  <div class="body">
                      <h3 class="title">${song.name}</h3>
                      <p class="author">${song.singer}</p>
                  </div>
                  <div class="option">
                      <i class="fas fa-ellipsis-h"></i>
                  </div>
              </div>
        `;
    });
    playlist.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      }
    });
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    // Xử lý CD quay / dừng
    // Handle CD spins / stops
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10 seconds
      iterations: Infinity
    });
    cdThumbAnimate.pause();

    // Xử lý phóng to / thu nhỏ CD
    // Handles CD enlargement / reduction
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    // Xử lý khi click play
    // Handle when click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // Khi song được play
    // When the song is played
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    // Khi song bị pause
    // When the song is pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    // Khi tiến độ bài hát thay đổi
    // When the song progress changes
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
        current_time.innerHTML = formatTime(audio.currentTime);
        duration_time.innerHTML = formatTime(audio.duration);
      }
    };

    // Xử lý khi tua song
    // Handling when seek
    progress.oninput = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    // Khi next song
    // When next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Khi prev song
    // When prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Xử lý bật / tắt random song
    // Handling on / off random song
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    // Xử lý lặp lại một song
    // Single-parallel repeat processing
    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    // Xử lý next song khi audio ended
    // Handle next song when audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // Lắng nghe hành vi click vào playlist
    // Listen to playlist clicks
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");

      if (songNode || e.target.closest(".option")) {
        // Xử lý khi click vào song
        // Handle when clicking on the song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }

        // Xử lý khi click vào song option
        // Handle when clicking on the song option
        if (e.target.closest(".option")) {
        }
      }
    };
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }, 300);
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.url_image}')`;
    audio.src = this.currentSong.link;
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    // Gán cấu hình từ config vào ứng dụng
    // Assign configuration from config to application
    this.loadConfig();

    // Định nghĩa các thuộc tính cho object
    // Defines properties for the object
    this.defineProperties();

    // Lắng nghe / xử lý các sự kiện (DOM events)
    // Listening / handling events (DOM events)
    this.handleEvents();

    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    // Load the first song information into the UI when running the app
    // this.loadCurrentSong();

    // Render playlist
    // this.render();
    this.getSong();

    // Hiển thị trạng thái ban đầu của button repeat & random
    // Display the initial state of the repeat & random button
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  }
};

app.start();

function formatTime(sec_num) {
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - hours * 3600) / 60);
  let seconds = Math.floor(sec_num - hours * 3600 - minutes * 60);

  hours = hours < 10 ? (hours > 0 ? '0' + hours : 0) : hours;

  if (minutes < 10) {
      minutes = '0' + minutes;
  }
  if (seconds < 10) {
      seconds = '0' + seconds;
  }
  return (hours !== 0 ? hours + ':' : '') + minutes + ':' + seconds;
} 