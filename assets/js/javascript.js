const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const heading = $('.music-name');

const audio = $('#audio');
const cd = $('.cd');

const playBtn = $('.play-pause');
const playing = $('.play');

const processBar = $('#progress');

const playsList = $('.plays-list');

const nextBtn = $('.forward-btn');
const backBtn = $('.back-btn');
const shuffleBtn = $('.shuffle-btn');
const replayBtn = $('.replay-btn');





const app = {
    currentIndex: 0,
    isPlaying: false,
    isShuffleSong: false,
    isReplay: false,
    songs: [
        {
            name: 'Black Jack',
            singer: 'Soobin',
            path: './assets/song/BlackJack - Soobin_ Binz.mp3',
            image: './assets/img/blackjack.jpg'
        },
        {
            name: 'BIGCITYBOI',
            singer: 'Binz',
            path: './assets/song/Bigcityboi-Binz-Touliver.mp3',
            image: './assets/img/big-city-boy.jpg'
        },
        {
            name: 'Chơi Đồ',
            singer: 'MCK, Wxrdie, Sony Tran',
            path: './assets/song/Choi-Do-MCK-Wxrdie-Sony-Tran.mp3',
            image: './assets/img/choi do.jpg'
        },
        {
            name: 'Châu Báu',
            singer: 'MCK, TLinh',
            path: './assets/song/Em-La-Chau-Bau-MCK-tlinh.mp3',
            image: './assets/img/chau bau.jpg'
        },
        {
            name: 'OCEAN',
            singer: 'RPT MCK, RPT Nemo',
            path: './assets/song/OCEAN-MCK-RPT-Orijinn.mp3',
            image: './assets/img/ocean.jpg'
        },
        {
            name: 'OK',
            singer: 'Binz',
            path: './assets/song/OK-Binz.mp3',
            image: './assets/img/ok.jpg'
        },
        {
            name: 'Tay To',
            singer: 'MCK - RPT Phongkhin',
            path: './assets/song/Tay-To-Rapital-RPT-Phongkhin-MCK.mp3',
            image: './assets/img/tay to.jpg'
        },
        {
            name: 'Xin Đừng Lặng Im',
            singer: 'SOOBIN',
            path: './assets/song/Xin-Dung-Lang-Im-SOOBIN.mp3',
            image: './assets/img/xin đừng.png'
        },
        {
            name: 'Lối Nhỏ',
            singer: 'Lối Nhỏ ft. Phương Anh Đào',
            path: './assets/song/loi nho.mp3',
            image: './assets/img/loi-nho.jpg'
        },
        {
            name: 'Đi Theo Bóng Mặt Trời',
            singer: 'Đen ft Giang Nguyễn',
            path: './assets/song/Đen - Đi Theo Bóng Mặt Trời ft Giang Nguyễn.mp3',
            image: './assets/img/di theo bong mat troi.jpg'
        },
        {
            name: 'Bên Ấy Bên Này',
            singer: 'Long Cao',
            path: './assets/song/Long Cao - BÊN ẤY BÊN NÀY (Audio).mp3',
            image: './assets/img/Bên ấy bên này.jpg'
        },
        {
            name: 'Rap Chậm Thôi (#HNDCMM)',
            singer: 'RPT MCK x RPT Orijinn ft. RZ Ma$',
            path: './assets/song/Rap Chậm Thôi (#HNDCMM) - RPT MCK x RPT Orijinn ft. RZ Ma$ (Official Lyric Video).mp3',
            image: './assets/img/rap chậm thôi.jpg'
        },
    ],

    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
             <div class="play-list ${index == this.currentIndex ? 'active' : ''}" data-index="${index}">
                 <img src="${song.image}" alt="">
                <div>
                <h3 class="play-list-name">${song.name}</h3>
                <p class="singer-band">${song.singer}</p>
                 </div>
                 <i class="more-options fa-solid fa-ellipsis"></i>
                 </div>
             `;
        });
        $('.plays-list').innerHTML = htmls.join('');

    },

    defineProperties: function() {
        Object.defineProperty(this, 'currentSong' , {
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
    },

    handleEvents: function() {
        const _this = this;
        // const cd = $('.cd');
        const cdWidth = cd.offsetWidth;
        // const cdHeight = cd.offsetHeidth;

        // console.log([cd]);
        // console.log(cdWidth);


        // Xử lý quay đĩa/ dừng

        const animationCd = cd.animate ([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        });

        animationCd.pause();

        // Thu nhỏ đĩa nhạc

        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            // const newCdHeight = cdHeight - scrollTop;
      
            cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
            // cd.style.height = newCdHeight > 0 ? newCdHeight + "px" : 0;

            // cd.style.opacity = newCdWidth / cdWidth;
        };

        // Play button solution

        playBtn.onclick = function() {
            if (_this.isPlaying) {
                _this.isPlaying = false
                audio.pause ()
                playing.classList.remove('playing')
                animationCd.pause()
            } else {
                _this.isPlaying = true
                audio.play()
                playing.classList.add('playing')
                animationCd.play()
            };
        },
        
        // processbar chay khi play
        audio.ontimeupdate = function () {
            processBar.value = audio.currentTime / audio.duration * 100;
        },
        // Xử lý khi tua nhạc
        
        processBar.onchange = function(e) {
            // console.log(e.target.value);
            const audioCurrentTime = e.target.value * audio.duration / 100;
            audio.currentTime = audioCurrentTime;
        
        },


        nextBtn.onclick = function() {
            // console.log(_this.isPlaying);
            if (_this.isShuffleSong) {
                _this.shuffleSong()
            } else{_this.nextSong()}

            if (!_this.isPlaying) {
                playing.classList.add('playing')
                animationCd.play()
                _this.isPlaying = true;
            }
            _this.render()
            _this.autoScrolll()
            audio.play()
        }

        backBtn.onclick = function() {
            if (_this.isShuffleSong) {
                _this.shuffleSong() 
            } else {_this.backSong()}

            if (!_this.isPlaying) {
                _this.isPlaying = true
                playing.classList.add('playing')
                animationCd.play()
            }
            _this.render()
            _this.autoScrolll()
            audio.play()
        }

        shuffleBtn.onclick = function() {
            _this.isShuffleSong = !_this.isShuffleSong;
            shuffleBtn.classList.toggle('active', _this.isShuffleSong);
            // console.log(_this.isShuffleSong);
        }

        replayBtn.onclick = function() {
            _this.isReplay = !_this.isReplay;
            replayBtn.classList.toggle('active', _this.isReplay);
            if (_this.isReplay) {

            }
            console.log(_this.isReplay);
        }

        // XỬ lí bài hát khi hết bài (next)

        audio.onended = function() {
            if (_this.isReplay) {
                audio.play();
            } else {
                nextBtn.click();
            }
        }

        // Xử lý khi nhấn vào play-list

        playsList.onclick = function(e) {
            const songNode = e.target.closest('.play-list:not(.active)');
            if (
                songNode ||
                e.target.closest('.more-options')
                ) {
                    if (songNode && !e.target.closest('.more-options')) {
                        _this.currentIndex = songNode.dataset.index;
                        // _this.currentIndex = songNode.getAttribute('data-index')
                        _this.loadCurrentSong();
                        _this.render();
                        _this.changePlayPause();
                        audio.play();
                    }

            }
        }

         



        
    },


    

    
    
    loadCurrentSong: function() {
        
        
        heading.textContent = this.currentSong.name;
        cd.src = this.currentSong.image;
        audio.src = this.currentSong.path;
        
    },

    nextSong: function() {


        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();

    },

    backSong: function() {


        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        // console.log(this.currentIndex);
        this.loadCurrentSong();

    },

    shuffleSong: function() {
       let newIndex
       do {
           newIndex = Math.floor(Math.random() * this.songs.length);
       } while (newIndex === this.currentIndex)
       this.currentIndex = newIndex;
       console.log(this.currentIndex);
       this.loadCurrentSong();
    },

    autoScrolll: function() {
        setTimeout(() =>{
            $('.play-list.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            })
        }, 300);
    },

    changePlayPause: function() {
        if (!this.isPlaying) {
            this.isPlaying = true
            playing.classList.add('playing')
            cd.animate ([
                { transform: 'rotate(360deg)' }
            ], {
                duration: 10000,
                iterations: Infinity
            });
        }
    },
    

    start: function() {
        this.defineProperties();

        this.handleEvents();

        this.loadCurrentSong();

        this.render();
    }

};

app.start();
