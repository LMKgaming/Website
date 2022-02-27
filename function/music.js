var playBtn = document.querySelector(".play")
var audio = document.querySelector("#audio")
var isPlaying = true
var progress = document.querySelector("#progress-bar")
var cdThumb = document.querySelector(".song-thumb img")
var songName = document.querySelector(".song-name h2")
var songAuthor = document.querySelector(".song-name h3")
var nextBtn = document.querySelector(".next")
var backBtn = document.querySelector(".back")
var repeatBtn = document.querySelector(".repeat")
var playList = document.querySelector(".playlist")
var randomBtn = document.querySelector(".random")
var volumeBar = document.querySelector("#volume-bar")
var outputNumVol = document.querySelector(".output")
var seekNext = document.querySelector(".next-seek")
var seekBack = document.querySelector(".back-seek")
var lyricBtn = document.querySelector(".lyric")
var lyricContent = document.querySelector("#lyric")
var left = document.querySelector(".left")
var right = document.querySelector(".right")

const PLAYER_STORAGE_KEY = 'KHOAYEUBINH'

const defineProperties = {
    currentSong: 0,
    isRepeating: false,
    isShuffling: false,
}

var config = JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {}

function setConfig(key, value) {
    config[key] = value
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(config))
}

songList = [
    {
        name: "Đừng nghe! Nghiện đấy nhạc chơi game Liên quân bê nhất 3-2019",
        author: "Moba Việt",
        img: "",
        path: "./song/Đừng nghe! Nghiện đấy nhạc chơi game Liên quân bê nhất 3-2019.mp3",
        lyric: "Not Found"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/doi-anh-xe-om-despacito-parody-.8U21NYBYHHsg.html",
        name: "Đời Anh Xe Ôm (Despacito Parody)",
        lyric: "Bài hát: Đời Anh Xe Ôm (Despacito Parody) - LEG\n\nBài hát chế :\nCây Đàn Sinh Viên - Quốc An\nDespacito - Luis Fonsi ft Daddy YanKee\nYên Bình - Nguyễn Hồng Hải\n\nĐời cha tôi đã đi làm xe ôm\nLàm xe ôm mới *** được mẹ tôi\ntrước lúc rời quê nhà, cha đã dặn dò thiết tha\n(con ơi, con hãy nghe lời cha)\nhãy nối nghiệp của cha\n(bố đưa con chìa khóa\ncon đi luôn)\n\nĐi...Từ đây ra đến bến xe Mỹ Đình bao nhiêu?\nÀ mà đi từ đây mà ra tận tới Mỹ Đình à?\n2 lít!\nVãi, làm gì mà chém đắt thế em không có tiền đi đâu\nĐắt cái mẹ cháu mày, đi thằng khác còn đắt hơn.\n\nÁ đù, nhìn mặt mày sinh viên anh bớt cho 5 chục.\nNgồi vật vờ từ sáng nên anh có tí bực\nHồi còn làm sinh viên anh cũng éo có tiền\nAh Yeh. Giờ, giờ đã làm xe ôm anh vẫn tiến có đèo\nCuộc đời thằng xe ôm nói chung là như...\nNghĩ về mẹ về cha ở quê mà thấy đau\nThấy đau Vô Cùng\nLời của cha ấm áp như là vầng thái dương\nLời của mẹ ngọt ngào như là dòng sữa bò\nChỉ vì lời dặn dò năm xưa mà con vẫn lái xe\nVẫn luôn Yêu Nghề\nDù nghề này gập ghềnh chông gai nhiều khó khăn\nMà lòng đã nguyện thề là sẽ hi sinh cho nghề\nChờ một ngày giàu sang thành danh là con sẽ trở về\n\nBao đời nay nhà anh chạy xe từ lâu và đã có tiếng rồi\nChú biết Chiến Xe ôm không?\nÔng Chiến là bố của anh\nGia đình anh truyền thống đời con đời cháu là sẽ phải nối nghiệp\nPhải tiếp bước cha anh\nNên anh mới lái xe ôm.\n\nĐôi chân lang thang ở Trần Duy Hưng\nMãi không kiếm được hàng\nHôm nay đói rồi\nXe ôm không em, anh chở em đi\nsao đi đâu trông xinh thế?\nĐẹp thế\nLàm tí xe ôm không cô?\nLên ngồi xe làm vòng hồ\nAnh sẽ không lấy tiền mà\nĐồng ý thì ta đi luôn\nAnh đây chưa vợ con gì\nBao năm nay chạy xe ôm\nNhưng hôm nay mới gặp được một cô gái xinh như là em đấy (x2)\n\nBố tiên sư mẹ\nÀ thằng này là thằng mặt lờ xe ôm mà trêu vợ\nĐờ cờ mờ nhà mày, mày thích chết à?\nLàm gì mà sồn sồn Như là chó sắp cắn người\n\nBố đây không sợ\nCuộc đời này gập ghềnh chông gai tao còn không sợ\nVậy thì mày tuổi gì làm tao phải sợ\nMày đủ tuổi thì hãy Chờ tao gọi cho người thân đến cứu trợ\n\nĐang ở đâu chạy xe về đây về luôn và ngay tao có việc\nCó đứa sắp đánh tao\nGọi thêm cả thằng Thắng Xe ôm đi\n\nÊ thằng kia chờ tí bình tĩnh đừng nóng bạn tao sắp đến rồi\nNó đang đến kia kìa\nNó đang đứng sau lưng mày\n\nĐánh tao xem nào\nMày đừng tưởng rằng là xe ôm dễ bắt nạt\nVậy thì mày nhầm rồi anh em tao khắp nơi\nChỉ một cuộc gọi điện là anh em tao xuất hiện\nBất cứ khi nào...",
        author: "LEG",
        img: "",
        path: "./song/Đời Anh Xe Ôm.mp3"
    },
    {
        name: "Động Thăng Thiên",
        author: "Động Thăng Thiên",
        img: "",
        path: "./song/Động Thăng Thiên.mp3",
        lyric: "Not Found"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/do-ta-khong-do-nang-.91NNJF4dfsSh.html",
        name: "Độ Ta Không Độ Nàng",
        lyric: "- Hiện chưa có lời bài hát nào cho Độ Ta Không Độ Nàng do ca sĩ Diệu Thúy trình bày. Bạn có thể click vào đây để đăng lời cho bài hát này.",
        author: "Diệu Thúy",
        img: "",
        path: "./song/Độ Ta Không Độ Nàng.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/de-vuong-.w8lmuII1Yn2G.html",
        name: "Đế Vương",
        lyric: "Một bậc quân vương mang trong con tim hình hài đất nước\nNgỡ như dân an ta sẽ chẳng bao giờ buồn\nNào ngờ một hôm ngao du nhân gian chạm một ánh mắt\nKhiến cho ta say ta mê như chốn thiên đường\nTrời cao như đang trêu ngươi thân ta khi bông hoa ấy\nTrót mang con tim trao cho một nam nhân thường\nGiận lòng ta ban cho bông hoa thơm hồi về cung cấm\nKhiến em luôn luôn bên ta mãi mãi không buông\n\nMà nào ngờ đâu thân em nơi đây tâm trí nơi nào ?\nNhìn về quê hương em ôm tương tư nặng lòng biết bao\nMột người nam nhân không vinh không hoa mà có lẽ nào ?\nNgười lại yêu thương quan tâm hơn ta một Đế Vương sao ?\nGiọt lên Quân Vương không khi nao rơi khi nước chưa tàn\nMà tình chưa yên nên vương trên mi giọt buồn chứa chan\nĐành lòng buông tay cho em ra đi với mối tình vàng\nMột bậc quân vương uy nghiêm oai phong nhưng tim nát tan",
        author: "Đình Dũng, ACV",
        img: "",
        path: "./song/Đế Vương.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/dung-nguoi-dung-thoi-diem-rap-version-.HqOO9NiDsfCD.html",
        name: "Đúng Người Đúng Thời Điểm (Rap Version)",
        lyric: "Hôm nay em nói em cần đôi tay\nÔm lấy em và dắt em đến những chốn yêu xa ngàn mây\nHôm nay tạm ngưng hết những âu lo thường ngày\nChỉ cần em ngồi sau cùng anh ta đi đến đâu cũng được\n\nNếu như một ngày anh không giống như em từng trông mong\nChẳng ôm được thế giới liệu em có yêu không\nVì anh ôm được mỗi trái tim thật nhỏ bé của người anh yêu\nCó em thật ấm áp như một bài hát anh phiêu\n\n[ĐK:]\nMình giữ nhau thật chắc nhé nếu đi ta cùng đi\nMọi bão giông đều qua khi con tim cùng theo lí trí\nGiờ gió đông lạnh giá lắm cứ yêu tâm còn anh và nắng vàng\nCùng sưởi ấm để em cảm thấy yêu thương nhiều hơn\n\nViệc của em là yêu anh có mưa dông thì để anh lo\nChẳng hứa xua được mây đen nhưng bình yên khi bên anh\nTìm thấy em người anh yêu lúc yêu thương tựa như nắng cuối chiều\nTừ nay em sẽ làm cuộc sống tốt hơn bao điều\n\n[Rap:]\nĐể anh nói hết cho em nghe, bản tình ca mà anh còn viết giở\nBởi tình yêu anh dành cho em nó còn dài dòng hơn cả sách vở\nAnh không phải là Osad, học tán gái theo kiểu ngôn tình\nChẳng sến sủa rung động tim em theo kiểu người ta thường hay gọi là thính\n\nAnh không phải là Back Ti, cần lý do để ở bên em\nBởi tấm lòng chung thủy của anh đến cả trời đất cũng phải thầm khen\nChẳng cần vượt muôn trùng khơi, bởi tình yêu đang ở ngay trước mắt\nBiết trân trọng giữ gìn em thôi nếu không một mai tình yêu lại vụt mất\n\nVì em là người con gái mà bấy lâu nay anh chờ đợi\nĐẹp nết đẹp người chẳng có ai hơn chẳng cần kiếm ở xa xôi\nGặp được nhau là một chứ duyên nên ta giữ đừng để mất\nTìm đúng người ở đúng thời điểm là điều anh muốn bấy lâu nay\n\nĐời nghệ sĩ chẳng có gì hơn chỉ biết tặng em đôi câu rap\nChỉ mong em hiểu tấm chân tình để con tim anh được đền đáp\nViệc của em chỉ cần yêu anh giông tố trên đời đừng suy nghĩ\nCả thế giới đã có anh rồi nắm chặt tay anh ta cùng đi\n\n[ĐK:]\nMình giữ nhau thật chắc nhé nếu đi ta cùng đi\nMọi bão giông đều qua khi con tim cùng theo lí trí\nGiờ gió đông lạnh giá lắm cứ yêu tâm còn anh và nắng vàng\nCùng sưởi ấm để em cảm thấy yêu thương nhiều hơn\n\nViệc của em là yêu anh có mưa giông thì để anh lo\nChẳng hứa xua được mây đen nhưng bình yên khi bên anh\nTìm thấy em người anh yêu lúc yêu thương tựa như nắng cuối chiều\nTừ nay em sẽ làm cuộc sống tốt hơn bao điều",
        author: "Thanh Hưng Idol",
        img: "",
        path: "./song/Đúng Người Đúng Thời Điểm.mp3"
    },
    {
        name: "Yêu Em Nhiều Lòng Này Nhói Đau",
        author: "Yêu Em Nhiều Lòng Này Nhói Đau",
        img: "",
        path: "./song/Yêu Em Nhiều Lòng Này Nhói Đau.mp3",
        lyric: "Not Found"
    },
    {
        name: "Way Back Obsidian Project",
        author: "Way Back Obsidian Project",
        img: "",
        path: "./song/Way Back Obsidian Project.mp3",
        lyric: "Not Found"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/way-back-home-.vEbSQ584MMdY.html",
        name: "Way Back Home",
        lyric: "Bài hát: Way Back Home - SHAUN\n\nMeomchun sigan sok jamdeun neoreul chajaga\nAmuri magado gyeolguk neoui gyeotin geol\nGilgo gin yeohaengeul kkeutnae ijen doraga\nNeoraneun jibeuro jigeum dasi way back home\nAmuri himkkeot dadado dasi yeollin seorap gata\n\nHaneullo nopi nallin neon jakku naega doedorawa\nHimdeulge samkin ibyeoldo da geudaeroin geol oh oh oh\nSueopsi tteonan gil wieseo nan neoreul balgyeonhago\nBiuryeo haessdeon mameun tto ireohge neoro chaolla\nBalgeoreumui kkeute neul niga budijihyeo geuman geuman\nMeomchun sigan sok jamdeun neoreul chajaga\nAmuri magado gyeolguk neoui gyeotin geol\n\nGilgo gin yeohaengeul kkeutnae ijen doraga\nAmuri magado gyeolguk neoui gyeotin geol\nNeoraneun jibeuro jigeum dasi way back home\nJoyonghi jamdeun bangeul yeoreo gieogeul kkneonae deureo\nBuseojin sigan wieseo seonmyeonghi neoneun tteoolla\nGil ilheun mam soge neol gadun chae sara geuman geuman\nMeomchun sigan sok jamdeun neoreul chajaga\n\nAmuri magado gyeolguk neoui gyeotin geol\nGilgo gin yeohaengeul kkeutnae ijen doraga\nNeoraneun jibeuro jigeum dasi way back home\nSesangeul dwijibeo chajeuryeo hae ojik neoro wangyeoldoen iyagireul\nModeun geol ilheodo nan neo hanamyeo dwae\n\nBicci da kkeojin yeogi anajwo\nNuneul gameumyeon sori eopsi millyeowa\nI maeum geu wiro neon tto han gyeop ssahyeoga\nNaegen geu nugudo anin niga piryohae\nDorawa nae gyrote geunalkkaji I'm not done",
        author: "SHAUN",
        img: "",
        path: "./song/Way Back Home.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/vo-nguoi-ta-.DRfuHT6Q2LvC.html",
        name: "Vợ Người Ta",
        lyric: "Bài hát: Vợ Người Ta - Phan Mạnh Quỳnh\n\nTấm thiệp mời trên bàn\nThời gian địa điểm rõ ràng\nLại một đám mừng ở trong làng\nNgó tên bỗng dưng thấy hoang mang.\n\nRồi ngày cưới rộn ràng khắp vùng\nAi theo chân ai tới già trẻ đi cùng\nNhiều ngày tháng giờ này tương phùng\nMà lòng cay cay cay.\n\nGiờ em đã là vợ người ta\nÁo trắng cô dâu cầm hoa\nnhạc tung tóe thanh niên hòa ca\nVài ba đứa lên lắc lư theo.\n\nẤy là thành đám cưới em với người ta\nAnh biết do anh mà ra\nTình yêu ấy nay xa càng xa\nBuồn thay.\n\nNghĩ nhiều chuyện trong đời\nAnh thấy lòng càng rối bời\nLiệu ngày đó nhiệt tình ngỏ lời\nChúng ta lấy nhau chứ em ơi?\n\nĐành bảo phó mặc ở duyên trời\nNhưng thâm tâm anh trách nàng tại sao vội\nMột người bước, một người không đợi\nThì đành tìm ai?\n\nMà giờ em đã là vợ người ta\nHãy sống vui hơn ngày qua\nNhạc cũng tắt thanh niên rời bar\nCòn năm sáu tên đứng lơ ngơ.\n\nẤy là tàn lễ cưới em theo người ta\nAnh bước đi như hồn ma\nNgày hôm ấy như kéo dài ra\nBuồn thay.",
        author: "Phan Mạnh Quỳnh",
        img: "",
        path: "./song/Vợ Người Ta-Phan Mạnh Quỳnh.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/ve-day-em-lo-khanh-lee-remix-.3WxRQCw4p3Lm.html",
        name: "Về Đây Em Lo (Khánh Lee Remix)",
        lyric: "Bài hát: Về Đây Em Lo (Khánh Lee Remix) - DJ\n\nĐêm hôm nay sao quá chơi vơi đặng lòng đau bước chân rã rời\nYêu đơn phương đau lắm ai ơi hạnh phúc đã xa mù khơi.\nKhi xưa còn bên nhau em giấu không nói ra.\n\nNên anh đâu biết yêu thương trong em là.\nBao nhiêu là mong,nhiêu là mơ, nhiêu là yêu.\nSuốt cuộc đời này, chắc không bao giờ anh hiểu.\n\n[Điệp khúc:]\nTôi ơi buồn làm gì, tôi ơi bước đi đi.\nĐừng hoài mong nữa anh ấy không yêu mình đâu mà.\nĐã cố phải dằn lòng, quên anh chẳng an tâm.\nVì em cảm thấy ai kia không yêu anh thật lòng.\n\nEm vẫn sẽ chờ hoài, em không bỏ anh đi.\nDù cuộc đời sóng gió có mỏi mệt thì anh.\nAnh cứ quay về đây, em lo lắng cho anh.\nEm sẽ không yêu ai ngoài anh.\n\nXa nhau mình em đâu, em giấu anh có hay.\nChia tay nước mắt buông tay anh đâu cần.\nBên em và yêu, yêu rồi xa xa càng quên.\nĐớn đau yêu anh chắc không bao giờ anh biết.\n\nTôi ơi buồn làm gì, tôi ơi bước đi đi.\nĐừng hoài mong nữa anh ấy không yêu mình đâu mà.\nĐã cố phải dằn lòng, quên anh chẳng an tâm.\nVì em cảm thấy ai kia không yêu anh thật lòng.\n\nEm vẫn sẽ chờ hoài, em không bỏ anh đi.\nDù cuộc đời sóng gió có mỏi mệt thì anh.\nAnh cứ quay về đây, em lo lắng cho anh.\nEm sẽ không yêu ai ngoài anh.",
        author: "DJ",
        img: "",
        path: "./song/Về Đây Em Lo.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/vay-cuoi-trung-tu-progressive-house-remix-.oWfJIWNXbKwx.html",
        name: "Váy Cưới (Trung Tự Progressive House Remix)",
        lyric: "Bài hát: Váy Cưới (Trung Tự Progressive House Remix) - Trung Tự\n\n1. Đừng lo lắng em ơi chuyện ngày mai đã có anh rồi\nEm chỉ cần luôn nhớ và hướng trái tim về anh\nDù giông bão ghé qua đây thì sẽ có anh luôn đứng lại\nVà dẹp hết ưu phiền xung quanh em để mang đến những điều tuyệt vời.\n\n[ĐK:]\nBờ vai anh đây dựa vào đi nếu em đang buồn\nĐiều hạnh phúc nhất với anh giờ là được nhìn em cười\nVà anh muốn thấy từng nỗi buồn của em vơi dần\nLại đây với anh đi em, mình xây hạnh phúc lâu dài.\n\nTa sẽ nắm tay và đi hết cuộc đời này em ơi\nTa sẽ sẻ chia mọi buồn đau hay bao ngọt ngào\nHãy khoác lên mình chiếc váy cưới nhỏ xinh này em ơi\nLại đây với anh, mình cùng xây hạnh phúc lâu dài.\n\n2. Chung nhà rồi em ơi, giờ cuộc sống hai ta là một\nMọi buồn phiền lo lắng trước kia để anh giữ ***\nDù giông bão ghé qua đây thì sẽ có anh luôn đứng lại\nVà dẹp hết ưu phiền xung quanh em để mang đến những điều tuyệt vời.",
        author: "Trung Tự",
        img: "",
        path: "./song/Váy Cưới.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/tung-yeu-.tnvcYCYt7lmv.html",
        name: "Từng Yêu",
        lyric: "Bài hát: Từng Yêu - Phan Duy Anh\n\nCó kí ức nào đẹp hơn ngày đôi ta bắt đầu\nCó đớn đau nào nặng hơn ngày mình xa nhau\nCó đôi mắt nào buồn hơn bờ mi em tuôn sầu\nCó đắng cay nào bằng em vội vàng qua mau\nNgười đàn ông đang đi bên em là người như thế nào\nSợ người ta không yêu thương em anh biết phải làm sao\n\n[ĐK]:\nNếu 1 ngày người em yêu bội bạc\nEm đừng cần những thứ cao sang\nNếu sau này họ ra đi vội vàng\nAnh vẫn chờ em dẫu muộn màng\nBiết em thương người ấy đã rất nhiều\nAnh hỏi lòng anh có bao nhiêu\nTrái tim em giờ đã quên nuông chiều\nXin đừng quên ta đã từng yêu\n",
        author: "Phan Duy Anh",
        img: "",
        path: "./song/Từng Yêu.mp3"
    },
    {
        name: "Tết Nhà Bà Hoan",
        author: "Tết Nhà Bà Hoan",
        img: "",
        path: "./song/Tết Nhà Bà Hoan.mp3",
        lyric: "Not Found"
    },
    {
        name: "Tướng Quân",
        author: "Nhật Phong",
        img: "",
        path: "./song/Tướng Quân-Nhật Phong.mp3",
        lyric: "Ngàn vạn binh đao giương cao hướng về phía trước ta\nChẳng làm ta bất an như  khi ta ở trước mặt nàng\nĐầu đội trời cao chân giẫm đất ngạo nghễ núi sông\nMà lòng như chết đi khi hay tin nàng đã theo chồng\nBiển rộng trời cao đâu cũng là nhà đối với ta\nMà một nơi trú chân trong tim nàng quá sao xa lạ\nGiọt lệ nam nhi  không khi nào được rơi xuống đâu\nMà giờ em trót theo ai nên ta đành phải buông sầu\nĐK\nRượu sầu nâng suốt đêm cho quên đi ngày tháng u buồn\nRằng người ta mãi thương nay cũng đã mỗi người một phương\nNàng còn hay nhớ chăng khi xưa ta đã nói những lời\nDù ngày sau có ra sao ta vẫn muốn bên người thôi\nNàng sợ ta chiến chinh bao năm không có ngày trở lại\nNàng cần người ở bên chăm lo săn sóc cho ngày mai\nNgày ra đi chiếc khăn em trao ta vẫn mang giữ lại\nHình dung em vẫn đang theo ta đi hết chặng đường dài"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/tinh-yeu-mau-hong-.eJ4UnTgbMGlM.html",
        name: "Tình Yêu Màu Hồng",
        lyric: "Bài hát: Tình Yêu Màu Hồng - Hồ Văn Quý, Xám\n\nMây mang bao yêu thương gửi trao em\nNgàn khúc hát cho ngày xanh thật dịu êm\nĐôi môi yêu thương trong sang còn ngát hương\nNgày yêu dấu cho tình anh sẽ mãi thương\n\nDịu dàng hương hoa em đến bên đời ta\nBầu trời chợt thắm mang yêu dấu vào khúc ca\nNgày xanh như hoa tình yêu sẽ không phai nhòa\nLặng nhìn cơn mơ nhẹ du em vào vần thơ\n\n[ĐK:]\nNgàn câu ca đến bên bầu trời tình mình đẹp biết bao nhiêu\nDịu dàng như nắng mai hiền cho khóe môi được bình yên\nDịu lại một chút hương thơm cho đời ngọt ngào tiếng ca\nĐể em đến bên đời ta rồi dịu dàng lại hóa thiết tha\n\nNgàn muôn hoa thắm trong một buổi chiều tháng ba\nTình ta như hoa ngọt ngào giữa khung trời bao la\nTình yêu nhiệm màu dìu nhau qua cơn bão going\nĐể ta trông ngóng vào một tình yêu màu hồng\n\n[RAP:]\nNhững lời ca còn đọng lại bên tai\nAnh đặt nhẹ bàn tay này lên vai\nThành phố này nhỏ lại\nChỉ còn bằng đôi mắt em\nTa hòa vào nhau bằng những nốt nhạc\nThời gian đừng trôi mất đi\n\nGóc ban công , ở lầu hai , nhạc lofi và đèn trời\nEm gỡ hết đi mọi phòng thủ chẳng sợ nỗi buồn nào tràn vào\nMột nụ hôn lên đôi môi\nCho con tim em ngưng đọng\nDưới bầu trời đêm trong không gian\nCó hai cá thể rung động\n\nVà rồi mọi thứ sẽ ổn thôi như những gì ta hằng mong\nEm đưa tầm mắt vào bầu trời nơi vì sao phía đằng đông\nTựa vào vai anh, không phiền muộn một buổi tối chủ nhật\nThì thầm lời yêu, đan bàn tay ,đôi mi em ngủ gật\nTa cùng nghe lại những giai điệu phía bên kia bầu trời\nMang cho em con tim khao khát như một lời yêu đầu đời\nDạt dào như những con sóng\nNgập cả một đại dương xanh\nRồi rơi vào giữa tim ai chạng vạng nếu như e cũng ngỏ lời thương a\n\n2. Bao vần thơ nhẹ ru\nKhi ánh nắng vẫn còn vương\nĐôi mi em vẫn thương\n\nNhẹ trao hết bao câu ca\nTình ta sẽ không xa\nKhung trời kia dịu êm\n\n[ĐK:]\nNgàn câu ca đến bên bầu trời tình mình đẹp biết bao nhiêu\nDịu dàng như nắng mai hiền cho khóe môi được bình yên\nDịu lại một chút hương thơm cho đời ngọt ngào tiếng ca\nĐể em đến bên đời ta rồi dịu dàng lại hóa thiết tha\n\nNgàn muôn hoa thắm trong một buổi chiều tháng ba\nTình ta như hoa ngọt ngào giữa khung trời bao la\nTình yêu nhiệm màu dìu nhau qua cơn bão going\nĐể ta trông ngóng vào một tình yêu màu hồng\n\nDịu dàng hương hoa em đến bên đời ta\nBầu trời chợt thắm mang yêu dấu vào khúc ca\nNgày xanh như hoa tình yêu sẽ không phai nhòa\nLặng nhìn cơn mơ nhẹ du em vào vần thơ\n\n[ĐK:]\nNgàn câu ca đến bên bầu trời tình mình đẹp biết bao nhiêu\nDịu dàng như nắng mai hiền cho khóe môi được bình yên\nDịu lại một chút hương thơm cho đời ngọt ngào tiếng ca\nĐể em đến bên đời ta rồi dịu dàng lại hóa thiết tha\n\nNgàn muôn hoa thắm trong một buổi chiều tháng ba\nTình ta như hoa ngọt ngào giữa khung trời bao la\nTình yêu nhiệm màu dìu nhau qua cơn bão going\nĐể ta trông ngóng vào một tình yêu màu hồng\n",
        author: "Hồ Văn Quý, Xám",
        img: "",
        path: "./song/Tình Yêu Màu Hồng.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/tinh-sau-thien-thu-muon-loi-wrc-remix-.nPCsD2VOzOmG.html",
        name: "Tình Sầu Thiên Thu Muôn Lối (WRC Remix)",
        lyric: "Tình sầu thiên thu muôn lối, nỗi nhớ mang theo 1 đời\nĐể lại bao nhiêu kí ức cùng ngàn nỗi đau ở đây em hỡi\nBiển rộng trời cao tăm tối, bởi em đi mất rồi\nĐể lại anh bơ vơ 1 mình, giữa chốn đông người\n\nGiá như em ở lại\nKể từ khi em ra đi lòng này nát tan chẳng yêu 1 ai\nĐể lòng tương tư em mãi\nNhững cơn mê u hoài\n\nChuyện tình yêu luôn lênh đênh theo anh những tháng năm dài\nGiờ người nơi đâu em hỡi, chắc em đã đi rồi\nChỉ còn anh nơi đây một mình, phải uống cho quên mà thôi\nChuyện đời đâu ai biết trước, lúc ta yêu điên cuồng\n\nTưởng rằng sẽ mãi thiên thu lòng chẳng đổi thay hết yêu cũng buông\nHuh huh\nNà na na náaaaa ná há ha hà\nNhiều lần con tim lênh đênh ở lại 1 chút thôi mà\n\nTình sầu thiên thu muôn lối, nỗi nhớ mang theo 1 đời\nĐể lại bao nhiêu kí ức cùng ngàn nỗi đau ở đây em hỡi\nBiển rộng trời cao tăm tối, bởi em đi mất rồi\nĐể lại anh bơ vơ 1 mình, giữa chốn đông người\n\nNgười làm tim anh nhức nhối\nGiá như em ở lại\nKể từ khi em ra đi lòng này nát tan chẳng yêu 1 ai\nĐể lòng tương tư em mãi\n\nNhững cơn mê u hoài\nChuyện tình yêu luôn lênh đênh theo anh những tháng năm dài\nHuh huh\nHuh huhh\n\nGiờ người nơi đâu em hỡi, chắc em đã đi rồi\nChỉ còn anh nơi đây một mình, phải uống cho quên mà thôi\nChuyện đời đâu ai biết trước, lúc ta yêu điên cuồng\nTưởng rằng sẽ mãi thiên thu lòng chẳng đổi thay hết yêu cũng buông\n\nHuh huh\nNà na na náaaaa ná há ha hà\nNhiều lần con tim lênh đênh ở lại 1 chút thôi mà\nTình sầu thiên thu muôn lối, nỗi nhớ mang theo 1 đời\n\nĐể lại bao nhiêu kí ức cùng ngàn nỗi đau ở đây em hỡi\nBiển rộng trời cao tăm tối, bởi em đi mất rồi\nĐể lại anh bơ vơ 1 mình, giữa chốn đông người\nGiá như em ở lại\n\nKể từ khi em ra đi lòng này nát tan chẳng yêu 1 ai\nĐể lòng tương tư em mãi\nNhững cơn mê u hoài\nChuyện tình yêu luôn lênh đênh theo anh những tháng năm dài",
        author: "Doãn Hiếu",
        img: "",
        path: "./song/Tình Sầu Thiên Thu Muôn Lối.mp3"
    },
    {
        name: "Tình Bạn Diệu Kỳ",
        author: "Tình Bạn Diệu Kỳ",
        img: "",
        path: "./song/Tình Bạn Diệu Kỳ.mp3",
        lyric: "[Amee]\nTa đã ở bên nhau những năm tháng nhọc nhằn\nYou make me feel like, i got everything\nDù mai có ra sao\nTa vẫn sẽ tự hào\nVì đã luôn bên nhau\nWe do everything\nĐưa tay lên nào, mãi bên nhau bạn nhớ\nBên ngoài thế giới trời cao đất dày\nỞ trong team có anh em chất đầy\nĐưa tay lên nào, mãi bên nhau bạn nhớ\nCùng mặc lên người chiếc áo bóng bẩy sau những ngày tháng trầy da tróc vẩy\n\n[Ricky Star]\nTrôi đi trôi đi trôi đi trôi dòng thời gian\nĐã nuôi ta khôn lớn lên đôi khi không được bình an yeah yeah\nBạn ơi tôi sẽ mãi thật lòng sau mưa thì sẽ có cầu vồng\nTuổi trẻ thường háo thắng\nVẫn giữ màu áo trắng\nĐôi khi ta bí lối cùng đường\nVẫn có homie luôn cùng đường\nĐi qua ngày mưa ngày nắng\nĂn chung vị cay vị đắng\nTừ mặt trời chuyển thành mặt trăng\nTấm lòng vẫn luôn ngay ngắn\nBụi phấn cùng với quả chò ba\nTan trường cùng những quyển truyện hay\nQuấy phá giáo viên bắt đứng phạt\nNhưng bạn bè thì không bỏ một ai\n\n[Amee]\nTa đã ở bên nhau những năm tháng nhọc nhằn\nYou make me feel like, i got everything\nDù mai có ra sao\nTa vẫn sẽ tự hào\nVì đã luôn bên nhau\nWe do everything\nĐưa tay lên nào, mãi bên nhau bạn nhớ\nBên ngoài thế giới trời cao đất dày\nỞ trong team có anh em chất đầy\nĐưa tay lên nào, mãi bên nhau bạn nhớ\nCùng mặc lên người chiếc áo bóng bẩy sau những ngày tháng trầy da tróc vẩy\n\n[Lăng LD]\nWhat's up!\nThat's break boy, 2009\nTuổi thơ gắn bó, anh em Tiền Giang\nNhảy bboy, chạy show đám cưới\nTập ngoài công viên, mặc đồ second hand\nKhu lao động đó, những ngày bình yên lộng gió\nTiếng đồng lúa phát ra từ giọng nó\nCám ơn vì đã trân trọng nó\nCùng ôm một giấc mộng khó\nYeah! Và mic cầm cứng tay\nLike a Travis Scott, ước gì mày đứng đây\nCùng tận hưởng khoảnh khắc này, nà ní\nChưa dịp tái ngộ còn nhờ là quý\nOTD for life\nNhững đứa con xứ ruộng thẳng cánh cò ba\nVượt cùng ải khó trò hay\nChung tay bẻ lái hướng đò ngay\nEy\nCâu từ này là bạn hiền\nLà đồng minh ở bên cạnh dù cạn tiền\nLà lòng tin cho tâm hồn mình lên tiếng\nNên hiến vì đam mê không nên tiếc\nNên viết trước khi thời gian dập tắt ý chí nha\nNhìn lại thanh xuân bằng cặp mắt quyến luyến\nCái đập tay không phân biệt chiến tuyến\nTa luôn biết nhận sai và lắng nghe lời chí lý\n\n[Amee]\nI know we won't stop\nI know we won't\nVì chúng ta sinh ra là để bước đi mà\nI know we can't stop\nI know we can't\nLet it be\nTa đã ở bên nhau những năm tháng nhọc nhằn\nYou make me feel like, i got everything\nDù mai có ra sao\nTa vẫn sẽ tự hào\nVì đã luôn bên nhau\nWe do everything"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/tren-tinh-ban-duoi-tinh-yeu-.adEZfVuRfAhW.html",
        name: "Trên Tình Bạn Dưới Tình Yêu",
        lyric: "Ta biết nhau từ lâu rồi\nTa hiểu từng thói *** của nhau\nTuy không phải người yêu với nhau\nTa vẫn hơn là bạn\n\nTa biết nhau luôn nghĩ gì\nKhông cần phải nói ra làm chi\nCâu chuyện này cứ như vậy đi\nVẫn tiếc thêm làm gì\n\nMình bên nhau giống như người yêu\nNhìn nhau giống như người yêu\nDù không phải là tình yêu\nNhưng chắc chắn không phải tình bạn\n\nDù có lẽ sẽ không dài lâu\nNhưng ta sẽ thật đậm sâu\nMối tình này không cần định nghĩa gì đâu\n\n[ĐK:]\nĐôi ta ở trên tình bạn, ở dưới tình yêu\nĐược vui biết bao nhiêu khi có người nuông chiều\nĐôi ta ở trên tình bạn, ở dưới tình yêu\nĐược vui biết bao nhiêu khi có người thấu hiểu\n\nKhông phải người yêu mà vui hơn rất nhiều\nYah\nKhông phải người yêu mà vui hơn rất nhiều\nYah\nKhông phải người yêu mà vui hơn rất nhiều\nYah\nRất nhiều Rất nhiều Rất nhiều\n\nKhông biết mai dù thế nào\nCâu chuyện này diễn ra làm sao\nNhưng mà một khi đã đâm lao\nTa cứ theo làm nào\n\nKhông thiết tha về sau này\n(sau này sau này)\nKhi cuộc đời bước sang một trang\nNếu một ngày chúng ta dở dang\nTa cũng không cần rõ ràng\n(Đúng rồi)\n\nMình bên nhau giống như người yêu\nNhìn nhau giống như người yêu\nDù không phải là tình yêu\nNhưng chắc chắn không phải tình bạn\n\nDù có lẽ sẽ không dài lâu\nNhưng ta sẽ thật đậm sâu\nMối tình này không cần định nghĩa gì đâu\n\nĐôi ta ở trên tình bạn, ở dưới tình yêu\nĐược vui biết bao nhiêu khi có người nuông chiều\nĐôi ta ở trên tình bạn, ở dưới tình yêu\nĐược vui biết bao nhiêu khi có người thấu hiểu\n\nKhông phải người yêu mà vui hơn rất nhiều\nYah\nKhông phải người yêu mà vui hơn rất nhiều\nYah\nKhông phải người yêu mà vui hơn rất nhiều\nYah\nRất nhiều Rất nhiều Rất nhiều\n\nKhông phải người yêu mà vui hơn rất nhiều\nYah\nKhông phải người yêu mà vui hơn rất nhiều\nYah\nRất nhiều Rất nhiều Rất nhiều\nOkey okey\n\nCó lẽ sẽ rất buồn khi một ai trong hai chúng ta\nGặp một ai rồi yêu thiết tha, vậy là đôi ta cách xa\nNhưng sẽ không bao giờ ta quên đi khoảnh khắc có nhau\nVà ta thầm cảm ơn vì ta đã từng có trong đời nhau\n\nĐôi ta ở trên tình bạn, ở dưới tình yêu\nYe ye\nĐược vui biết bao nhiêu khi có người nuông chiều\nYe ye\nĐôi ta ở trên tình bạn, ở dưới tình yêu\nYe ye\nĐược vui biết bao nhiêu khi có người thấu hiểu\n\nKhông phải người yêu mà vui hơn rất nhiều\nYah\nKhông phải người yêu mà vui hơn rất nhiều\nYah\nRất nhiều Rất nhiều Rất nhiều\n\nKhông phải người yêu mà vui hơn rất nhiều\nYah\nKhông phải người yêu mà vui hơn rất nhiều\nYah\nRất nhiều Rất nhiều Rất nhiều",
        author: "MIN",
        img: "",
        path: "./song/Trên Tình Bạn Dưới Tình Yêu-MIN.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/tranh-duyen-dinhlong-remix-.fBbC727py4m4.html",
        name: "Tránh Duyên (DinhLong Remix)",
        lyric: "Chuyện một nàng công chúa mang gia tộc đế vương muôn đời.\nVà một vị hành tu nay đã thoát bụi trần nhân thế\nNàng trót thương cho thân chàng dù biết là điều không thể\nNgười xuất gia không nói đến chuyện phu thê.\n\nNgọc Đế ơn trên ban chàng vào cung hướng nhân, truyền tâm phật\nNào biết đâu lương duyên công chúa sư đồ lại thầm thương\nNgày nhớ đêm ôm mong nàng lệnh cho phá giới để kết đôi\nChàng tránh duyên xin lui về nương nhờ cửa Phật\n\n[ĐK:]\nSự đời trớ trêu thay ngay khi nghe tin chàng đi về nơi rất xa\nNàng buồn hóa tâm tư đau thương phát tâm bệnh trong lòng như khóc òa\nNgười mượn cớ đi nơi linh thiêng, mong quên đi hết u sầu triền miên\nĐể lại thấy được chàng bớt đau trong tim nàng mang.\n\nLòng chàng đớn đau hơn khi duyên nhân gian chàng gieo vào tâm ý nàng\nMột người xuất gia sao yêu thương huống chi nàng lại là công chúa vàng\nTuyệt tình tránh yêu thương nhân gian chàng gieo thân xác trong biển lửa tràn\nĐể lại mối nhân duyên đắng cay lưu truyền trần gian.",
        author: "Đình Dũng, DJ",
        img: "",
        path: "./song/Tránh Duyên-Đình Dũng.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/tra-xanh-.66jxyuh5W8QS.html",
        name: "Trà Xanh",
        lyric: "- Hiện chưa có lời bài hát nào cho Trà Xanh do ca sĩ V.A trình bày. Bạn có thể click vào đây để đăng lời cho bài hát này.",
        author: "V.A",
        img: "",
        path: "./song/Trà Xanh.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/thang-hau-htrol-remix-.CGZ14bejkkYU.html",
        name: "Thằng Hầu (Htrol Remix)",
        lyric: "Bài hát: Thằng Hầu (Htrol Remix) - Nhật Phong, DJ\n\nTôi sinh ra trong gia đình\nLàm hầu thiên hạ\nLuôn tha hương đi muôn phương\nLàm việc trong nhà\n\nCơ duyên đưa chúng tôi đến với một nơi xa lạ\nNơi có nàng\nTiêu thư lá ngọc cành vàng\nThân tôi mang kiếp phu không được lại gần bên nàng\n\nNhưng đôi đũa mốc meo vẫn mơ được chòi mâm vàng\nEm thương tôi trái ngang dấu cha mẹ gọi tôi chàng\nĐắng cay mối tình, hầu tôi\nTiểu thư đài các\n\nNàng có hay biết rằng nay cha mẹ nàng biết chúng ta\nCảm mến nhau lâu rồi liệu có thứ tha\nSợ đớn đau cho nàng nên ta đành nhận do chính ta\nKhông biết thân phận\n\nKiếp phu *** mơ cành hoa\nĐể cách xa đôi mình nên cha mẹ nàng đăng kén con\nChọn tướng công cho nàng lầu tía gác son\n\nNàng bước đi nhẹ nhàng nhưng trong lòng ta sao héo hon\nNước mắt thằng hầu\nCó ai đớn đau gì đâu",
        author: "Nhật Phong, Htrol",
        img: "",
        path: "./song/Thằng Hầu-Nhật Phong.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/that-bat-ngo-.RfpGrTBL3tKT.html",
        name: "Thật Bất Ngờ",
        lyric: "Bài hát: Thật Bất Ngờ - Trúc Nhân\n\nTrên báo những thông tin chen nhau đi một hàng\nNgười đàn bà hở hang\nXong đến chuyện người thì nở nang\nXong đến chuyện mặt hàng thời trang\nLôi cuốn người người đọc vào ban sáng.\n\nCô ấy mới hôm qua không ai nhớ khuôn mặt\nChỉ một xì căng đan, khóc lóc về chuyện tình dở dang\nLên báo hình thì đầy một trang\nÔi dễ dàng để đời ta tươi sáng...\n\nĐK:\nThế nên, bây giờ, điều quan tâm nhất là:\nAnh kia cặp với chị này\nAnh kia lừa dối chị này,\nAnh kia đập đánh chị này,\nVà chị ngã xuống đây\n\nCư dân cùng với đồng bào\nThông tin miệng đói cồn cào\nBa hoa lời ra lời vào\nMột ngày mới nhốn nhao, nhốn nhao, nhốn nhao ao ao ao ao...\n\nTừng ngày vội vội vàng đi qua,\ncâu chuyện ngày ngày càng đi xa\nTrên bản tin có lẽ anh hơi ngây ngô khi chia tay tôi, tôi không có lỗi\nVà màn hình ti vi, đêm ngày trồng trọt vào trong trí óc\nVề một thế giới, như mơ, như thơ, như ly kem bơ ôi thật bất ngờ!\n\nTrên sóng những âm thanh xôn xao đang mời chào\nChị cần gì ở đây...? (Tôi muốn đẹp xuất sắc)\nThì ngồi vào đây... (Tôi muốn đẹp xuất sắc)\nThì điền vào đây ...\nKhông có gì thì mình sẽ mua nấy!\n\nTôi muốn những đám đông xôn xao đang hô hào\nHọ thì thầm về tôi, tôi muốn họ thì thầm về tôi\nMơ ước được cuộc đời như tôi.\nĐem gối đầu để nằm mơ mỗi tối.\n\nĐK:\nThế nên, bây giờ, điều quan tâm nhất là:\nAnh kia cặp với chị này\nAnh kia lừa dối chị này,\nAnh kia đập đánh chị này,\nVà chị ngã xuống đây\n\nCư dân cùng với đồng bào,\nThông tin miệng đói cồn cào\nba hoa lời ra lời vào\nMột ngày mới nhốn nhao, nhốn nhao, nhốn nhao ao ao ao ao...\n\nTừng ngày vội vội vàng đi qua,\ncâu chuyện ngày ngày càng đi xa\nTrên bản tin có lẽ anh hơi ngây ngô khi chia tay tôi, tôi không có lỗi\nVà màn hình ti vi, đêm ngày trồng trọt vào trong trí óc\nVề một thế giới như mơ, như thơ, như ly kem bơ ôi thật bất ngờ!\n\nÔi thật bất ngờ! (x4)\n\nÔi từng ngày...\nAo ước từng ngày.. Ứm hưm hừm... (x2)\n\nNgày đó không còn xa... Không còn xa.....ha ha ha ha ....... Đâu!\n\nTừng ngày vội vội vàng đi qua,\ncâu chuyện ngày ngày càng đi xa\nTrên bản tin có lẽ anh hơi ngây ngô khi chia tay tôi, tôi không có lỗi\nVà màn hình ti vi, đêm ngày trồng trọt vào trong trí óc\nVề một thế giới như mơ, như thơ, như ly kem bơ ôi thật bất ngờ.\nmột thế giới như mơ, như thơ, như ly kem bơ ôi thật bất ngờ.\nmột thế giới như mơ, như thơ, như ly kem bơ ôi thật bất ngờ.\n",
        author: "Trúc Nhân",
        img: "",
        path: "./song/Thật Bất Ngờ-Trúc Nhân.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/thang-nam-khong-quen-edm-version-.DFD6ELsRWb3h.html",
        name: "Tháng Năm Không Quên (EDM Version)",
        lyric: "Giờ làm sao để quên tháng năm đó in sâu vào trong tim\nNgày nào rong chơi đã bỏ quên những âu sầu\nMùa hạ say màu nắng khát khao những cơn mưa rào thân yêu\nTạ từ nhau có những thứ ta chưa kịp nói ra\n\nNgập ngừng nhìn ra trời mơ ngày xưa kia\nNhững cánh hoa rơi khắp muôn nơi\nLòng ai cảm thấy xôn xao\nTừng ngày, êm ấm bao la ở nơi này\n\nĐường đi phía trước thêm chông gai\nHoà trong cơn bão\nMơ ước bay cao tận chân trời, bạn tôi vẫn hiên ngang\nCó những câu ca dường không lời, nghẹn trong phút giây này\n\nNgày tháng không về đây nữa có những nỗi nhớ phấn rơi\nDòng nhật ký mãi mãi chẳng phai, chỉ mong rằng\nCảm xúc như ngày đầu tiên\nGiờ làm sao để quên tháng năm đó in sâu vào trong tim\n\nNgày nào rong chơi đã bỏ quên những âu sầu\nMùa hạ say màu nắng khát khao những cơn mưa rào thân yêu\nTạ từ nhau có những thứ ta chưa kịp nói ra\n\n[Rap:]\n(Sau hôm nay) Có chút nắng còn vương nơi sân trường\n(Sau hôm nay) Giây phút ấy ôi sao mà thân thương\nSau hôm nay tay còn đan lên nhau, bao lời ca khi xa ai vấn vương\nVí cái thời cấp ba là những ngày chưa nhập ngũ\n\nBạn bè không hẹn, khi nào cũng tụ tập đủ\nMuôn ngàn tâm tình, bạn và tôi luôn ấp ủ\nVà cất giữ từ những giây phút hay cây bút ngay cả quyển tập cũ\nĐường dài còn phía trước\n\nKhông ai, sợ chông gai, vẫn cứ bước\nBên nhau, đừng để lãng phí thời gian\nVì trời ban cho ta gặp gỡ là hỏa chí trời nam vì\nCó đi thì cũng có đến\n\nCó nhớ thì cũng khó quên\nNhưng tình cảm đã trao\nKhông thể nào kể tên\nGiờ thì làm sao để quên\n\n[Mel:]\nGiờ làm sao để quên tháng năm đó in sâu vào trong tim\nNgày nào rong chơi đã bỏ quên những âu sầu\nMùa hạ say màu nắng khát khao những cơn mưa rào thân yêu\nTạ từ nhau có những thứ ta chưa kịp nói ra",
        author: "H2K, KN, DJ Eric T-J",
        img: "",
        path: "./song/Tháng Năm Không Quên.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/thiep-hong-nguoi-dung-.0tuLZEaPUvDu.html",
        name: "Thiệp Hồng Người Dưng",
        lyric: "Bài hát: Thiệp Hồng Người Dưng - X2X\n\nNgậm ngùi nước mắt nghe tin cô theo chồng về nơi xứ xa chốn phồn hoa\nLòng này đau thắt khi trên tấm thiệp hồng kèm theo lá thư gởi về nhà\nAi kia có mang tình yêu trao cô mỗi ngày nuông chiều\nHay là chỉ như cuộc vui nước mắt đổi lại quá nhiều\n\nĐau xót cho thân tôi cơ hàn đò đưa mối lương tình sang ngang\nNâng chén cô liu trong đêm tàn rồi ôm lấy cô trong mơ màng\n\nNhận ra tôi đã sai từ lâu cứ giữ người dưng trong đầu\ntthiệp hồng kia trao đến tay tôi mới ngỡ ngàng\nNhìn cô sánh bước bên người ta áo hoa lụa là nhung gấm\nTại sao tôi không thể quên đi một người dưng.\n\n[RAP:]\nMá nói là nhà mình nghèo không lấy được cô\nPhận con gái giữ tròn chữ hiếu sau này lại khổ\nLấy chồng khác mang tiếng ác rồi cuộc sống tui đầy chông chênh\nNhưng tại sao tui càng cố gắng thì tôi càng nhớ càng không quên\nÀ mà thôi nơi thành đô lời hoa mỹ\nCô bước đi theo người ta khoác lụa đào thứ xa xỉ\nBởi tôi vướng cái chữ tình đặt nặng này trong tim\nTrai nhà quê chân đất nói thương cả cuộc đời tôi mãi kiếm.\n\nAi kia có mang tình yêu trao cô mỗi ngày nuông chiều\nHay là chỉ như cuộc vui nước mắt đổi lại quá nhiều\n\nĐau xót cho thân tôi cơ hàn đò đưa mối lương tình sang ngang\nNâng chén cô liu trong đêm tàn rồi ôm lấy cô trong mơ màng\n\nNhận ra tôi đã sai từ lâu cứ giữ người dưng trong đầu\nThiệp hồng kia trao đến tay tôi mới ngỡ ngàng\nNhìn cô sánh bước bên người ta áo hoa lụa là nhung gấm\nTại sao tôi không thể quên đi một người dưng.\n\n[RAP:]\nHợp rồi tan vui rồi buồn xây đấp ân tình rồi thương đau\nCô bước theo chồng tôi ở lại nơi chốn quê nghèo còn xương máu\nVai gầy mang sương gió ao ước cả đời được bên cô\nNhưng mà nơi phố thị tôi đâu được mời khi toàn xe hơi đi trên phố\nTôi cười trong hơi men, kệ đời chán ghét hoặc chê khen\nĐâu ai lưu luyến ân tình đứt đoạn sao người đành bon chen\nĐêm về mi rớt bờ mi cay, đô thành trải thảm người đi ngay\nTôi bước giữa đời đầy hiêu quạnh, cố gọi người về làm chi đây.\n\nTôi ôm đau thương vấn vươn người dưng nơi này\nNước mắt tràn mi khi đêm một mình ai thấy\n\nNhận ra tôi đã sai từ lâu cứ giữ người dưng trong đầu\nThiệp hồng kia trao đến tay tôi mới ngỡ ngàng\nNhìn cô sánh bước bên người ta áo hoa lụa là nhung gấm\nTại sao tôi không thể quên đi một người dưng.\n",
        author: "X2X",
        img: "",
        path: "./song/Thiệp Hồng Người Dưng.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/simple-love-trong-rmx-remix-.Ecdp4mBDQerp.html",
        name: "Simple Love (Trọng RMX Remix)",
        lyric: "Đôi chân dạo quanh nơi khắp phố xá bụi bay vào mắt yah\nBụng reo đói mãi anh tấp vô shop mua ly mì gói yah\nĐập vào đôi mắt anh muốn chới với woah omg wao\nNàng tựa là ai xinh đến đắm đuối không may thì ngất\n\nĐứng chết im tức khắc nàng nhẹ nhàng bước qua\nTiếng sét ái tình đã đánh xem như duyên chúng ta\nTay buông cả ly mì xuống nhiều người nhìn quá đê\nAnh không biết nói tiếng Hàn Quốc chỉ biết nói sarang hae\n\nLỡ đứng mộng mơ em đi đâu mất yah\nIn fall in love yah\nĐôi chân chạy nhanh hết tốc ngốch nghếch\nTo find you girl yah\n\nEm trôi thật mau giữa đám đông bon chen người qua yah\nAnh mãi chạy theo sau bóng em dẫu xa thật xa yah\nLạc vào hình bóng nàng nét tinh tươm xinh ghê yah\nEm tựa tiên chốn nào ghé sang qua nơi anh vậy\n\nMỗi ngày ngâu đỏ mềm khiến anh như thẫn ra yah\nThôi thì đã lỡ rồi trót yêu em luôn yah yah\nSimple love girl\nSimple love girl\nSimple love simple love oh simple love girl ×2\n\n[Lời 2:]\nĐôi chân chạy nhanh qua khắp góc phố, dừng lại một chút (thôi)\nNằm đây vi vu với gió đã thiếp từ khi nào mất (rồi)\nChợt nghe âm thanh em ca đã khiến anh đây tỉnh giấc wow\nGiật mình quay sang, nghe tiếng con tim anh hơi xuyến xao\n\nGió khẽ đưa câu hát, thật nhẹ nhàng lướt qua\nSuy tư bỗng chợt tan biến anh trôi về nơi rất xa\nHôm nay tiết trời hơi nóng, hay là do em kế bên\nAnh đây vụng về hơi ngốc nhưng mà được cái hên\n\nEm hát vài câu là anh đây ngất (liền)\nDon’t wanna be friends\nEm đây đẹp xinh có chút bối rối làm anh chỉ biết khen\n“Em tên gì đấy? Sao cứ thấy em rất là *** ***”\n\n“Thôi anh xạo ấy, cho số đi anh xin làm ***”\nMột vài câu hát tình khiến anh như si mê\nRồi nụ hôn vô hình, muốn trao cho em ghê à\nMôi mềm ngâu đỏ hồng suýt chút nữa anh tan ra\n\nThôi thì đã lỡ rồi trót yêu luôn đi em à\nOh simple love yah\nOh simple love yah\n\nĐợi thêm một lát có lẽ anh đây sẽ phải nói ra\nOh simple love yah\nOh simple love yah\n\n[Chorus:]\nSimple love yah",
        author: "Obito, Seachains, Davis",
        img: "",
        path: "./song/Simple Love.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/sau-tat-ca-.sznIjPgt2sMc.html",
        name: "Sau Tất Cả",
        lyric: "Bài hát: Sau Tất Cả - Anh Khang\n\nSau tất cả mình lại trở về với nhau\nTựa như chưa bắt đầu, tựa như ta vừa mới ***\nSau tất cả lòng chẳng hề đổi thay\nTừng ngày xa lìa khiến con tim bồi hồi\nVà ta lại gần nhau hơn nữa\n\n[Pre-chorus]\nCó những lúc đôi ta giận hờn\nThầm trách nhau không một ai nói điều gì\nThời gian cứ chậm lại, từng giây phút sao quá dài\nĐể khiến anh nhận ra mình cần em hơn\n\n[Chorus]\nTình yêu cứ thế đong đầy trong anh từng ngày\nVì quá yêu em nên không thể làm gì khác\nChỉ cần ta mãi luôn dành cho nhau những chân thành\nMọi khó khăn cũng chỉ là thử thách\nVì trái tim ta luôn luôn thuộc về nhau\n\nSau tất cả mình lại chung lối đi\nĐoạn đường ta có nhau, bàn tay nắm chặt bấy lâu\nSau tất cả mình cùng nhau sẻ chia\nMuộn phiền không thể khiến đôi tim nhạt nhoà\nVà ta lại gần nhau hơn nữa\n\n[Pre-chorus]\n\n[Chorus]\n\nGiữ chặt bàn tay mình cùng nhau đi hết bao tháng ngày\nMọi điều gian khó ta luôn vượt qua\nĐể khiến ta nhận ra mình gần nhau hơn",
        author: "Anh Khang",
        img: "",
        path: "./song/Sau Tất Cả.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/que-boi-.2V2Lvxnwed65.html",
        name: "Quẻ Bói / 卜卦",
        lyric: "Bài hát : Quẻ Bói - Thôi Tử Cách\n\n风吹沙 蝶恋花 千古佳话\nFēng chuī shā dié liàn huā qiān gǔ jiā huà\nNhững giai thoại đẹp từ ngàn đời nay, gió và cát, bướm và hoa\n似水中月 情迷着镜中花\nSì shuǐ zhōng yuè qíng mí zhe jìng zhōng huā\nTựa như ánh trăng ẩn hiện trong nước, đóa hoa phản chiếu trong gương\n竹篱笆 木琵琶 拱桥月下\nZhú lí bā mù pí pá gǒng qiáo yuè xià\nHàng rào trúc, chiếc đàn Tì Bà gỗ , cây cầu cong cong sáng soi dưới trăng\n谁在弹唱 思念远方牵挂\nShuí zài tán chàng sī niàn yuǎn fāng qiān guà\nCó ai đó đang ngân nga tiếng hát , tâm tư vương vấn gửi về phương trời xa xôi\n那年仲夏 你背上行囊离开家\nNà nián zhòng xià nǐ bèi shàng xíng náng lí kāi jiā\nMùa hè năm đấy, hành trang mang theo trên lưng, anh đã rời xa quê nhà\n古道旁 我欲语泪先下\nGǔ dào páng wǒ yù yǔ lèi xiān xià\nBên con đường cũ, nước mắt em nghẹn ngào tuôn rơi\n庙里求签 我哭诉青梅等竹马\nMiào lǐ qiú qiān wǒ kū sù qīng méi děng zhú mǎ\nRút một quẻ bói trong chùa, em khóc vì sự chia cách lứa đôi\n求 菩萨保佑我俩\nQiú pú sà bǎo yòu wǒ liǎ\nVẫn thầm nguyện cầu Bồ Tát sẽ ban phúc cho hai ta\n不停的猜 猜 猜 又卜了一卦\nBù tíng de cāi cāi cāi yòu bo le yī guà\nKhông ngừng suy đoán, suy đoán , lại xin thêm một quẻ bói nữa\n吉凶祸福 还是担惊受怕\nJí xiōng huò fú hái shì dān jīng shòu pà\nPhúc họa tốt xấu hay là lo lắng hãi hùng đây\n对你的爱 爱 爱 望断了天涯\nDuì nǐ de ài ài ài wàng duàn le tiān yá\nTình yêu của em giành cho anh, không lời nào có thể nói hết được\n造化弄人 缘分阴错阳差\nZào huà nòng rén yuán fèn yīn cuò yáng chā\nTạo hóa trêu ngươi , duyên số không cho ta ở bên nhau.\n风吹沙 蝶恋花 千古佳话\nFēng chuī shā dié liàn huā qiān gǔ jiā huà\nNhững giai thoại đẹp từ ngàn đời nay, gió và cát, bướm và hoa\n似水中月 情迷着镜中花\nSì shuǐ zhōng yuè qíng mí zhe jìng zhōng huā\nTựa như si tình ánh trăng hiện dưới nước, đóa hoa phản chiếu trong gương\n竹篱笆 木琵琶 拱桥月下\nZhú lí bā mù pí pá gǒng qiáo yuè xià\nHàng rào trúc, chiếc đàn Tì Bà gỗ , cây cầu cong cong hiện dưới ánh trăng\n谁在弹唱 思念远方牵挂\nShuí zài tán chàng sī niàn yuǎn fāng qiān guà\nCó ai đó đang hát 1 mình , tâm tư vương vấn gửi về phương trời xa xôi\n那年仲夏 你背上行囊离开家\nNà nián zhòngxià nǐ bèi shàng xíng náng lí kāi jiā\nMùa hè năm đấy, hành trang mang theo trên lưng, anh đã rời xa quê nhà\n古道旁 我欲语泪先下\nGǔ dào páng wǒ yù yǔ lèi xiān xià\nBên con đường cũ, nước mắt em nghẹn ngào tuôn rơi\n田里庄稼 收获了一茬又一茬\nTián lǐ zhuāng jià shōu huò le yī chá yòu yī chá\nLúa trên cánh đồng, đã gặt hết gốc này đến gốc khác\n而 我们何时发芽\nÉr wǒ men hé shí fā yá\nNhưng đến khi nào chúng ta mới thành đôi\n不停的猜 猜 猜 又卜了一卦\nBù tíng de cāi cāi cāi yòu bo le yī guà\nKhông ngừng suy đoán, suy đoán , lại thêm 1 quẻ bói nữa\n吉凶祸福 还是担惊受怕\nJí xiōng huò fú hái shì dān jīng shòu pà\nPhúc họa tốt xấu hay là lo lắng hãi hùng đây\n对你的爱 爱 爱 望断了天涯\nDuì nǐ de ài ài ài wàng duàn le tiān yá\nTình yêu của em giành cho anh, không lời nào có thể nói hết được\n造化弄人 缘分阴错阳差\nZào huà nòng rén yuán fèn yīn cuò yáng chā\nTạo hóa trêu ngươi , duyên số không cho ta ở bên nhau\n猜 猜 猜 又卜了一卦\nCāi cāi cāi yòu bole yī guà\nLại xin thêm 1 quẻ bói nữa\n是上上签 可还是放不下\nShì shàng shàng qiān kě hái shì fàng bù xià\nVẫn là quẻ bói đấy , lẽ nào không bỏ đi được\n对你的爱 爱 挨过几个冬夏\nDuì nǐ de ài ài āi guò jǐ gè dōng xià\nTình yêu của em giành cho anh đợi chờ đã biết bao năm rồi\n日夜思念 祈求别再变卦\nRì yè sī niàn qí qiú bié zài biàn guà\nNgày đêm em vẫn nguyện cầu mong sao đừng mất đi\n",
        author: "Thôi Tử Cách (Queena Cui)",
        img: "",
        path: "./song/Quẻ Bói.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/phai-chang-em-da-yeu-.MRUP1c69kN0R.html",
        name: "Phải Chăng Em Đã Yêu?",
        lyric: "Phải chăng em đã yêu ngay từ cái nhìn đầu tiên\nPhải chăng em đã say ngay từ lúc thấy nụ cười ấy\nTình yêu ta ngất ngây, xây được chín tầng trời mây, khuất xa mờ\nÁnh lên từng giấc mơ ngày có anh.\n\nCuộc đời em vốn, chỉ là đường thẳng mà thôi\nMà sao tình cờ gặp anh, em rẽ ngang qua đời\nVài người vội vã, vội đến rồi đi\nMà sao em yêu anh đâu cần nghĩ suy\n\nTừng đêm nhớ mong về người\nBiết anh còn chờ đợi\nChơi vơi bao đêm em thấy đủ rồi\n\nNgàn tia nắng anh gần lại\nÁnh dương màu mắt xanh ngời\nLóe lên ngàn giấc mơ còn trong đời\n\n[ĐK:]\nPhải chăng em đã yêu ngay từ cái nhìn đầu tiên\nPhải chăng em đã say ngay từ lúc thấy nụ cười ấy\nTình yêu ta ngất ngây, xây được chín tầng trời mây, khuất xa mờ\nÁnh lên từng giấc mơ ngày có anh.\n\nTrái đất vốn lạ thường\nMà sao em cứ đi nhầm đường\nLạc vào tim anh lẻ loi\nĐằng sau chữ yêu đây là thương\n\nWhen you call me a baby\nMake me so crazy\nMy heart is breaking slowly\nChầm chậm bờ môi khẽ trôi\nÔi mình yêu thật rồi\n\nTình cờ biết nhớ những lúc ngây thơ\nTình cờ lắm lúc chỉ biết vu vơ\nTình cờ bơ vơ lạc trong những giấc mơ\n\nLắm lúc chỉ muốn nói anh mãi thương em\nNhưng trong tim bâng khuân chẳng biết có ai xem này\nVì chữ thương nặng lắm đâu thể phơi bày\n\n[ĐK:]\nPhải chăng em đã yêu ngay từ cái nhìn đầu tiên\nPhải chăng em đã say ngay từ lúc thấy nụ cười ấy\nTình yêu ta ngất ngây, xây được chín tầng trời mây, khuất xa mờ\nÁnh lên từng giấc mơ ngày có anh.\n\nYêu hay không yêu\nThương em anh hãy nói\nTrao nhau đôi môi\nRồi sẽ trở thành đôi\n\nEm đang chơi vơi\nLiệu anh có bước tới\nChầm chậm nói đôi lời, khiến em chợt vui cười",
        author: "Juky San, RedT",
        img: "",
        path: "./song/Phải Chăng Em Đã Yêu.mp3"
    },
    {
        name: "Phía Sau Một Cô Gái",
        author: "Sobin Hoàng Sơn",
        img: "",
        path: "./song/Phía Sau Một Cô Gái-Sobin Hoàng Sơn.mp3",
        lyric: "Not Found"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/noi-ay-con-tim-ve-live-.Zi9PjpyVykKd.html",
        name: "Nơi Ấy Con Tìm Về (Live)",
        lyric: "Bài hát: Nơi Ấy Con Tìm Về (Live) - Trịnh Đình Quang\n\nNgày con cất tiếng khóc chào đời\nNgày mẹ đã nói niềm vui trào dâng ngập trời.\nBằng yêu thương của cha đã dành,\nđể trong mái ấm từng ngày qua con lớn lên.\nLà lời ru mẹ đưa bên cánh võng cho con say\ngiấc ngủ,\nlà lời cha từng ngày ấm êm mong sao cho con nên người.\nThời gian lấy đi mùa xuân của mẹ,và con lấy đi sức sống mẹ cha.\nĐK:\nCuộc đời con sẽ không quên\ntình yêu thương mẹ cha đã dành cho con người ơi, tình yêu bao la,\ntheo con như như câu ru xưa cho vơi đi nỗi nhọc nhằn trong đời của người.\nĐường tương lai nhiều chông gai và những lúc gian nan làm con ngã quỵ,\nđể con nhớ rằng nơi ấy một góc bình yên luôn có mẹ cha chờ con tìm về",
        author: "Trịnh Đình Quang",
        img: "",
        path: "./song/Nơi Ấy Con Tìm Về.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/niu-duyen-.WxXR1SGXHAR7.html",
        name: "Níu Duyên",
        lyric: "1. Biết trước sẽ đau em à\nNhưng mọi chuyện rồi sẽ qua\nEm vẫn còn tương lai\nEm phải yêu thêm ai\nChẳng lẽ anh níu em hoài\n\nMãi bận rộn như anh\nTheo sau anh đôi khi em buồn\nAnh nào đâu biết\nSợ anh lo lắng\nNên em cứ mãi lặng im\n\n[ĐK:]\nNụ cười đã tắt\nĐằng sau nước mắt\nNgười vì anh cố níu duyên\nChỉ toàn nhận lấy ưu phiền\nChỉ vì anh vô tâm\nMột điều đơn giản lắm\n\nChăm lo em anh cũng không trọn vẹn\nChẳng ngờ người đến sau\nHiểu rằng anh đã sai\nNên làm điều ngược lại\nNgày trôi mưa thấm\nNhìn nhau lạ lẫm\nEm yêu ai rồi\n\nBuồn ơi đau hơn\nDày vò cô đơn\nTừng dòng tin đến vô tận\nChờ hoài vẫn thấy im lặng\nNhận ra sau tất cả\nMọi lần anh vấp ngã\nKhông đau bằng như lúc này\nNhìn mưa anh thấm sâu\nNgoài trời mưa rất lâu\nChỉ biết tự trách mình\nLạc mất em\nAnh mới biết\nAnh đã sai!\n\n2. Vì anh đâu biết rằng\nAnh như đang ngồi nơi đáy giếng\n\nQuanh em bao người trác tuyệt\nEm chẳng rung động cũng vì yêu anh\n\nMọi chuyện dường như đã đi quá xa\nTất cả những giới hạn của em\nNên điều gì đến sẽ đến\nAnh không thể níu tay em\n",
        author: "Lê Bảo Bình",
        img: "",
        path: "./song/Níu Duyên-Lê Bảo Bình.mp3"
    },
    {
        name: "Nhạc Chế Halloween",
        author: "Nhạc Chế Halloween",
        img: "",
        path: "./song/Nhạc Chế Halloween.mp3",
        lyric: "Not Found"
    },
    {
        name: "Như Ngày Hôm Qua",
        author: "Sơn Tùng",
        img: "",
        path: "./song/Như Ngày Hôm Qua-Sơn Tùng.mp3",
        lyric: "Not Found"
    },
    {
        name: "Người Ơi Người Đừng Về",
        author: "Đức Phúc",
        img: "",
        path: "./song/Người Ơi Người Đừng Về-Đức Phúc.mp3",
        lyric: "Not Found"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/mot-trieu-kha-nang-.JodqQC0YwOV1.html",
        name: "Một Triệu Khả Năng / 一百万个可能",
        lyric: "Bài hát: Một Triệu Khả Năng / 一百万个可能 - Phùng Đề Mạc\n\n幽静窗外满地片片寒花\nYōujìng chuāngwài, mǎn dì piàn piàn hán huā\nBên ngoài cửa sổ yên tĩnh, ngập trời hoa nở rộ giữa mùa đông\n\n一瞬间,永恒的时差 窝在棉被里\nYī shùnjiān, yǒnghéng de shíchā wō zài mián bèi lǐ\nTrong nháy mắt, khoảnh khắc thời gian sai giờ được gói trong chiếc khăn ấm\n\n倾听 踏雪听沉默的声音\nQīngtīng tà xuě tīng chénmò de shēngyīn\nKhi bước trên tuyết, lắng nghe thanh âm của tĩnh lặng\n\n飘雪藏永恒的身影 雪树下等你\nPiāo xuěcáng yǒnghéng de shēnyǐng xuě shù xià děng nǐ\nTuyết giấu đi bong dáng của vĩnh hằng đang đợi người dưới bóng cây\n\n在一瞬间 有一百万个可能\nZài yī shùnjiān yǒu yībǎi wàn gè kěnéng\nKhoảnh khắc này có hàng triệu khả năng\n\n该向前走 或者继续等?\nGāi xiàng qián zǒu huòzhě jìxù děng?\nEm nên bỏ đi hay tiếp tục chờ?\n\n这冬夜里 有百万个不确定\nZhè dōng yèlǐ yǒu bǎi wàn gè bù quèdìng\nGiữa đêm đông giá rét, có hàng triệu điều không chắc chắn có thể xảy ra\n\n渐入深夜 或期盼天明?\nJiàn rù shēnyè huò qī pàn tiānmíng?\nChậm rãi hòa mình vào bong đêm hay nên hy vọng vào ngày mai?\n\n云空的泪 一如冰凌结晶了 成雪花垂\nYún kōng de lèi yī rú bīnglíng jiéjīngle chéng xuěhuā chuí\nNước mắt của mây kết tinh thành những bong hoa tuyết\n\n这一瞬间 有一百万个可能\nZhè yī shùnjiān yǒu yībǎi wàn gè kěnéng\nNgay giờ phút này có hàng triệu khả năng\n\n窝进棉被 或面对寒冷\nWō jìn mián bèi huò miàn duì hánlěng\nEm nên chôn mình vào trong chăn ấm hay đối mặt với giá rét",
        author: "Phùng Đề Mạc",
        img: "",
        path: "./song/Một Triệu Khả Năng.mp3"
    },
    {
        name: "Một Giấc Mơ Cũ",
        author: "Một Giấc Mơ Cũ",
        img: "",
        path: "./song/Một Giấc Mơ Cũ.mp3",
        lyric: "Not Found"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/mot-buoc-yeu-van-dam-dau-cover-.2WfCPiNJigkL.html",
        name: "Một Bước Yêu Vạn Dặm Đau Cover",
        lyric: "Bài hát: Một Bước Yêu Vạn *** Đau Cover - Hương Trà\n\nHôm nay dành hết lầm lỗi để chia tay\nTình ta từ nay vỡ đôi\nMột dòng nước mắt lăn chạm qua môi\n\n[Lời 1:]\nMột thế giới hư ảo, nhưng thật ấm áp\nEm xuất hiện khiến những băng giá đời anh bỗng dần tan đi\nCuộc đời anh đặt tên là Muộn Phiền nên làm sao *** mơ mình may mắn được trọn vẹn cùng em\nTa phải xa em mặc kệ nước mắt em rơi\nVì những nguyên do cả đời không *** đối diện\nChỉ còn vài gang tấc nhưng lại xa xôi\nTình mình tựa đôi đũa lệch đành buông trôi\nCầu mong em sẽ sớm quên được tất cả\nTìm thấy một người xứng đáng ở bên\n\n[Chorus:]\nTừ nay duyên kiếp bỏ lại phía sau\nNgày và bóng tối chẳng còn khác nhau\nChẳng có nơi nào yên bình được như em bên anh\n(Tình yêu một lần lỡ bước là muôn *** trường đau thương)\nHạt mưa bỗng hóa thành màu nỗi đau\nTrời như muốn khóc ngày mình mất nhau\nCó bao nhiêu đôi ngôn tình, cớ sao lìa xa mình ta?\n\n[Giang tấu:]\nLà nhân duyên trời ban cớ sao mình chẳng thể thành đôi\n\n[Lời 2:]\nTại sao quá ngu ngốc bỏ lại mảnh ghép\nMà đối với nhau là tất cả còn mình thì vụn vỡ\nThế giới thực tại ồn ào vẫn thấy cô đơn\nCòn hai ta thì khác, chỉ nhìn thôi tim đã thấu\n\n[Chorus cuối:]\nTừ nay ranh giới của hai chúng ta là yêu nhưng không thể nào bước qua\nNgọn cỏ ven đường thôi mà làm sao với được mây\nTừ sau câu giã từ êm ái kia\nChẳng cơn bão lớn nào bằng bão lòng\nGặp trong mơ mà cũng không *** gào lên: \"Anh thương em\"",
        author: "Hương Trà",
        img: "",
        path: "./song/Một Bước Yêu Vạn Dặm Đau.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/muon-ruou-to-tinh-.ir71rb8MT5ki.html",
        name: "Mượn Rượu Tỏ Tình",
        lyric: "Bài hát: Mượn Rượu Tỏ Tình - BigDaddy, Emily\n\nBIGDADDY: ohhh, sự chú ý của ta lỡ va phải vào ánh mắt của nàng\nRồi bùng lên trong tim ta như một đốm lửa vàng\nAct cool đứng hình mất 5 giây\nNhìn em bên ngoài có lẽ ăn đứt mấy tấm hình đăng face\nHey em ăn tối chưa nhở? Nếu rồi thì làm 1 ly\nAnh chỉ muốn cởi mở hơn, đừng lo mình sẽ dại dột đi\nEm là cô gái đẹp, phải nói với em bằng những lời hay ho\nĐược ngồi cùng em khiến anh cảm thấy mình cũng rất gì và này nọ\nEm đang thôi miên anh bằng nụ cười thật duyên\nCho anh cảm giác này, em là người đầu tiên\nNgồi đây uống ly whisky này nhưng lại say em là chính\nAnh nói thật đấy không *** đùa đâu em đừng nghĩ đó là thính\nTừng giờ đồng hồ chậm trôi mà chả 1 ai thèm quan tâm đến\nLy này ly khác, 3 say chưa chai 2 ta mới chỉ hơi chuếnh\nAnh mượn rượu để được giãi bày những điều nói ra vốn khó\nÀ thì mà là anh đã kết em rồi đó, nói điêu làm chó\n\nEMILY: Uống đi nào hôm nay trời rất đẹp\nChính ra em cũng hơi buồn lúc anh\nĐứng bên ai kia khoác tay ai kìa\nThôi em say rồi đừng chấp em\n\nVẫn biết rằng mình là bạn bè bao lâu nay\nThế nhưng liệu, liệu rằng lòng anh có đang thấy rung động khi gần em\nSay là cơ hội dễ nhất để\nĐể người ta chân thật\n\nEm mượn rượu tỏ tình đấy thì sao nào\nEm yêu anh yêu anh đấy thì sao nào\nHu hú hu hú hu...Hu hú hu hu hu\nHi vọng anh đừng ngơ ngác đừng cau mày\nThôi coi như chưa nghe thấy cạn ly vậy\nHu hú hu hú hu...Hu hú hu hu hu\n\nBIGDADDY: Và dường như là cô ta đã thích tôi\nTa vẫn uống hết không 1 ly nào nhấp môi\nCả 2 say sưa và cùng gần lại sát ngồi\nKề vai bên tôi em nói rằng chỉ thích nghe Bích rap thôi\nTa sẽ lêu hêu khắp phố phường vì giờ này còn sớm chán\nNhững nụ hôn, cái ôm mặc kệ cho trời tới sáng\nEm có uống được tiếp hay không thì mình có thể thả phanh\nCòn nếu như em đồng ý thì sau đó có thể về nhà anh\n\nEMILY: Ta đi chơi tiếp đi bên nhau cho hết đêm dài\nBao lâu không biết say không được thoải mái như vậy..\nSợ rằng vào ngày mai 2 ta lại ngại ngùng nhau đôi khi không *** nhìn mặt\nMặc kệ đời đi quan tâm chi chỉ cần ngày hôm nay 2 ta thích nhau thật...\n\nEm mượn rượu tỏ tình đấy thì sao nào\nEm yêu anh yêu anh đấy thì sao nào\nHu hú hu hú hu...Hu hú hu hu hu\nEm tỏ ra hồn nhiên đấy thì sao nào..\nEm yêu anh yêu anh đấy thì sao nào\nHu hú hu hú hu...Hu hú hu hu hu",
        author: "BigDaddy, Emily",
        img: "",
        path: "./song/Mượn Rượu Tỏ Tình.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/mashup-audition-.IKTlMnv733P6.html",
        name: "Mashup Audition",
        lyric: "Bài hát: Mashup Audition - Vicky Nhung\n\nMy baby, I love you so much forever you and I\nI love you oh~I love you so much forever you and I\nMy baby, I love you so much forever you and I\nI love you oh~I love you so much forever you and I\nNo matter how I try I don't find a reason why\nBelieve me’ it's no lie\nI always have you on my mind\nNo matter what I see guess where I wanna be\nLove is the answer I will find\nIt's gonna be another day with the sunshine\nhaet sal eun na yeh chang eul bal ge bi choo go ban jjeum noon eul ddut seul ddaen geu dae mi so ga na reul ban gyuh yo...\nWhen we can get togheter.. My baby, I love you so much forever you and I\nI love you oh~I love you so much forever you and I\n\n(Tuyết yêu thương 2006)\nLê đôi bàn chân bước đi trên con phố dài năm xưa\nNhẹ nhàng bông tuyết rớt rơi trong tim, thân ai đắm chìm trong mưa\nChỉ một lần thôi muốn nghe tiếng em cười\nXinh như ngàn bông tuyết kia.\nMột nụ hôn trao về em sẽ mãi ko như bông tuyết tan\nGiữ cho phút đắm đuối đôi tim ta đã xách xa\nRồi mùa đông qua, ngàn ánh dương quay trở về.\nTa bên nhau hát khúc ca...Tuyết yêu thương đã xa\nHạt mưa tuyết vẫn rơi cho nỗi nhớ đầy vơi\nAnh chìm trong bao nỗi nhớ khi em nay đã xa thật rồi.\n\nDoctor, actor, lawyer or a singer\nWhy not president, be a dreamer\nYou can be just the one you wanna be\nPolice man, fire fighter or a post man\nWhy not something like your old man\nYou can be just the one you wanna be\nMy baby, I love you so much forever you and I\nI love you oh~I love you so much forever you and I\nCause your love is so sweet you are my everything\nj'ut nal bam dh dahn kkoom eh juht uh\nha neun mal ee ah nya nan byun ha ji ahn ah\noh jik nuh man ba ra bol kuh ya oh~ oh~\nha neun mal ee ah nya nan, năn gô na dzì ah gá\noh jik nuh man ba ra bol kuh ya oh~ oh~\n\nVà có 1 điều anh dối gian\nVà chợt có 1 nụ hôn đánh mất nồng nàn\nVà rồi có 1 người đang trách than\nNgậm ngùi ai oán trong đớn đau ...\nCơn mưa qua cơn mưa qua tựa dòng lệ anh phôi pha..\nJust one 10 minutes\nne goshi doenun shigan\nsunjinhan nesunge soga unun namjadul\nThinkin' of you I'm thinkin' of you.haet sal eun na yeh chang eul bal ge bi choo go\nIt’s gonna be another.. My baby love you so much forever you and I\nI love you oh I love you so much forever you and I\n",
        author: "Vicky Nhung",
        img: "",
        path: "./song/Mashup Audition.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/mang-chung-.29xpL9CrWwtt.html",
        name: "Mang Chủng",
        lyric: "Nhớ người thấy lòng mình wooo\nLàm đào phai liễu tàn\nWooo\nYêu thương xưa người đã chôn vùi\n\nDuyên như nhành hoa mỏng manh\nYêu thương người nay không cần\nÁi nhân lúc xưa nay hoá cố nhân\n\nTrời làm hoàng hôn cho lòng thêm sầu bi\nKhó tránh lệ tuôn ướt khoé mi\nNgười bước đi\n\nVạn lời người đã từng nói\nTiêu tan tựa như làn khói\nDù một ngàn kiếp sau cũng không đành lòng woo\nMây xanh ngoài tầm với\nĐã hết những mong đợi\nTự hỏi mình nếu buông xuôi thì lòng sẽ vơi?\n\nNhớ người thấy lòng mình wooo\nSay trong cơn mơ bi hài câu “vẫn chờ”\nWooo\nTay ai từ bi một bài hát không gì\nWoo\nYêu thương làm chi, bây giờ có nghĩa?\nWoo\nHết lòng ích gì?\n\nHoa sen ngồi nghe lòng ta\nNhân gian hồng trần gĩai bày\nCớ sao phải đi đến bước hôm nay?\n\nTrùng phùng là hư không, chỉ như vần thơ\nÁi ố từng qua đã hoá cơn mơ\nAi vẫn chờ?",
        author: "Hà Nhi",
        img: "",
        path: "./song/Mang Chủng.mp3"
    },
    {
        name: "Làm Người Yêu Em Nhé Baby",
        author: "Wendy Thảo",
        img: "",
        path: "./song/Làm Người Yêu Em Nhé Baby-Wendy Thảo.mp3",
        lyric: "Not Found"
    },
    {
        name: "Hồng Nhan",
        author: "Jack",
        img: "",
        path: "./song/Hồng Nhan-Jack.mp3",
        lyric: "Not Found"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/gac-lai-au-lo-.1uWWUf6ZAHC4.html",
        name: "Gác Lại Âu Lo",
        lyric: "Anh đi lạc trong sóng gió cuộc đời\nNào biết đâu sớm mai liệu bình yên có tới?\nÂu lo chạy theo những ánh sao đêm\nNgày cứ trôi chớp mắt thành phố đã sáng đèn\nTa cứ lặng lẽ chạy thật mau, yêu thương chẳng nói kịp thành câu...\nBiết đâu liệu mai còn thấy nhau?\nThức giấc để anh còn được thấy ánh mắt của em nhẹ nhìn anh, đôi tay này sẽ không xa rời\n\nTạm gác hết những âu lo lại, cùng anh bước trên con đường\nTa sẽ không quay đầu để rồi phải tiếc nuối những chuyện cũ đã qua\nGiữ trái tim luôn yên bình và quên hết những ưu phiền vấn vương\nCuộc đời này được bao lần nói yêu\nAnh biết nơi để quay về, em biết nơi phải đi\nAnh biết chỗ trú chân dọc đường để tránh cơn mưa hạ đến mỗi chiều\nTa biết trao nhau ân cần, biết mỗi khi vui buồn có nhau\nThời gian để ta trưởng thành với nhau\n\n\nNhảy với anh đến khi đôi chân rã rời\nHát anh nghe những câu ca từ ngày xưa cũ\nThì thầm khẽ anh nghe em vẫn còn bao niềm mơ\nÔm lấy anh nghe mưa đầu mùa ghé chơi\nMột giây không thấy nhau như một đời cô đơn quá\nTrời mù mây bỗng nhiên ngát xanh khi em khẽ cười\nMột ngày anh biết hết nguyên do của những yên vui trong đời\nNgày mà duyên kiếp kia đưa ta gần lại với nhau\n\nTạm Gác hết những âu lo lại, cùng anh bước trên con đường\nTa sẽ không quay đầu để rồi phải tiếc nuối những chuyện cũ đã qua\nGiữ trái tim luôn yên bình và quên hết những ưu phiền vấn vương\nCuộc đời này được bao lần nói yêu\nAnh biết nơi để quay về, em biết nơi phải đi\nAnh biết chỗ trú chân dọc đường để tránh cơn mưa hạ đến mỗi chiều\nTa biết trao nhau ân cần, biết mỗi khi vui buồn có nhau\nThời gian để ta trưởng thành với nhau\n\nBờ vai anh rộng đủ để che chở cho emmmmm\nWas a boy now a man cho emmm\nTừng đi lạc ở trong thế giới điên zồ ngoài kia\nvà tình yêu em trao anh ngày ấy đã mang anh về bên emmmm\nYêu em như a Fat kid loves cake\nNhắm mắt cảm nhận tình yêu tan dịu ngọt trên môi khi em hôn môi anh đây, yo\nKhông phải happy ending, mỗi bình minh ta viết thêm trang mới, nối dài câu chuyện mình\n\nNhư trong mơ nơi xa kia xanh biếc xanh biếc\nThiên đàng bên em nơi đây anh biết anh biết\nBóng đêm đã qua yên bình có thêm chúng ta nghe lòng đàn từng câu ca\nCuộc đời này chẳng hề hối tiếc\nNhững tháng năm ta đi cùng nhau\n\nAnh biết em luôn ở đó nơi anh thuộc về\nTạm Gác hết những âu lo lại, cùng anh bước trên con đường\nTa sẽ không quay đầu để rồi phải tiếc nuối những chuyện cũ đã qua\nGiữ trái tim luôn yên bình và quên hết những ưu phiền vấn vương\nCuộc đời này được bao lần nói yêu\nAnh biết nơi để quay về, em biết nơi phải đi\nAnh biết chỗ trú chân dọc đường để tránh cơn mưa hạ đến mỗi chiều\nTa biết trao nhau ân cần, biết mỗi khi vui buồn có nhau\nThời gian để ta trưởng thành với nhau",
        author: "Da LAB, Miu Lê",
        img: "",
        path: "./song/Gác Lại Âu Lo.mp3"
    },
    {
        name: "Giấc Mộng Ca Sĩ",
        author: "Giấc Mộng Ca Sĩ",
        img: "",
        path: "./song/Giấc Mộng Ca Sĩ.mp3",
        lyric: "Not Found"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/em-se-la-co-dau-dj-vmark-tk-remix-version-2-.mMOfeW7b8IfT.html",
        name: "Em Sẽ Là Cô Dâu (DJ V'Mark TK Remix Version 2)",
        lyric: "Từ khi yêu em phút ban đầu\nCuộc sống anh khác xưa nhiều lắm\nCho anh cảm nhận tình yêu lớn lên đổi thay từng ngày\nAnh biết quý trọng\n\nTừng phút giây khi có em bên cạnh\nTìm được em\nLà điều vô giá nhất trong anh hằng mong\nỞ bên em bao muộn phiền\n\nLo lắng trong anh tan biến hết\nChỉ có nụ cười hạnh phúc ở trong trái tim mà thôi\nEm hãy nhắm mắt lại nhận lời đính hôn của anh thật lòng\nVòng tròn tình yêu của chiếc nhẫn cưới\n\nSẽ minh chứng tình yêu anh dành cho em\nEm sẽ là cô dâu xinh đẹp nhất trong đời anh\nCho anh cuộc sống mới đầy ắp tiếng cười rộn vang\nCho anh sự bình yên thật ấm áp mỗi khi đêm về\n\nCho anh ngàn nụ hôn chắp cánh ước mơ bay thật xa\nEm sẽ là cô dâu\nHạnh phúc nhất trong đời anh\nDẫu vui buồn gian khó hai ta sẽ cố gắng vượt qua\n\nAnh sẽ là bờ vai che chở em dõi theo từng ngày\nHãy làm vợ anh yêu anh đến hết cuộc đời\nAnh sẽ luôn ở bên người\nVà đời này người sẽ mãi che trở cho em\n\nSẽ bên nhau không xa rời\nVà mình cùng nguyện ước bên nhau mãi thôi\nCô dâu trong anh, duy nhất trong anh\nChính em, hãy là vợ anh em nhé\n\nCho nụ hôn thật sâu rất lâu\nSẽ nắm tay nhau đến bạc mái đầu\nVượt qua bao ngày gian khó ta đã có nhau rồi\nHãy làm vợ anh em nhé, người yêu ơi",
        author: "Minh Vương M4U",
        img: "",
        path: "./song/Em Sẽ Là Cô Dâu-Minh Vương.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/em-gi-oi-dj-sonzpro-remix-.AhdsC3EORYBc.html",
        name: "Em Gì Ơi (DJ Sonzpro Remix)",
        lyric: "- Hiện chưa có lời bài hát nào cho Em Gì Ơi (DJ Sonzpro Remix) do ca sĩ K-ICM, Jack - J97 trình bày. Bạn có thể click vào đây để đăng lời cho bài hát này.",
        author: "K-ICM, Jack - J97",
        img: "",
        path: "./song/Em Gì Ơi-Jack.mp3"
    },
    {
        name: "Em Gái Mưa",
        author: "Hương Tràm",
        img: "",
        path: "./song/Em Gái Mưa-Hương Tràm.mp3",
        lyric: "Not Found"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/em-co-nghe-lofi-version-.jzEhJ9eOaqFI.html",
        name: "Em Có Nghe (Lofi Version)",
        lyric: "[Ver 1:]\nEm có nghe ngàn muôn suy tư trong màn đêm\nEm có nghe lời yêu kia theo gió lay vội đêm\nVụt qua con phố chắc có đến nơi bình yên\nChẳng cần cơn mơ chiếu lấp lánh nơi thần tiên\nTừ bao tan nát hóa một trái tim vẹn nguyên\nBầu trời kia tha thiết thêm chắc có lẽ là vì em\n\n[Chorus:]\nGiữa khung trời hoa mộng đôi mình có nhau\nDưới cung trăng êm đềm cùng nhau ước ao\nDẫu có khi ta sầu vì không thấy nhau\nVẫn yêu nhau đong đầy cho nghìn kiếp sau\n\n[Ver 2:]\nEm có nghe mùa xuân trong tim rộn vang\nEm, em có nghe tình yêu mà anh hôm nay vội mang\nTựa như muôn đóa hoa lấp kín nơi lòng ta\nĐể cho bao nhớ thương kia không bao giờ xa\nDù nhận lấy đắng cay giết chết chân tình anh\nThật lòng anh vẫn không, không đổi thay\n\n[Bridge:]\nNgười yêu ơi! Hoa mai đâm chồi\nCho thơm hương muôn ngàn lối\nCòn anh chỉ mong rằng em vẫn mãi bên cạnh tôi\nLời ca anh viết nên chắc có lẽ sẽ tàn phai\nDù cho bao thiết tha kia đúng hay là sai\nThì vẫn luôn ở đây cất câu hát anh vừa feel\nRằng ngày mai đón em chắc có lẽ đó là yêu",
        author: "Kha, Freak D",
        img: "",
        path: "./song/Em Có Nghe.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/cuoi-nhau-di-yes-i-do-remix-.S2Z4ChoSoceg.html",
        name: "Cưới Nhau Đi (Yes I Do) Remix",
        lyric: "Hỡi em yêu!\nAnh chỉ muốn nói 1 điều\nLấy anh đi, để thôi đường về cô liêu\nBên nhau sớm chiều\n\nThương nhau thật nhiều\nVà yêu như chưa từng yêu\nHỡi anh yêu!\nEm cũng muốn nói 1 lời\n\nMình cưới nha anh\nVì em chỉ cần anh thôi\nYêu anh mất rồi\nChưa bao giờ nguôi\n\nVì sinh ra để thành đôi\nĐừng ngại ngần gọi tên em đi\nĐừng ngại ngần gọi tên anh đi\nĐừng ngại ngần gọi tên nhau đi\n\nMình cưới nhau đi\nChần chờ gì chồng ơi em đây\nChần chờ gì vợ ơi anh đây\nLời tuyệt vời nào hơn hôm nay\n\nMình cưới nhau ngay\nYes i do\nAnh sẽ mãi là chồng của em\nYes i do\n\nEm sẽ mãi là vợ của anh\nHôn nhau đi em còn chờ gì\nHôn em đi anh còn chờ gì\nTừ nay về sau mình chung bước đi\n\nYes i do\nAnh yêu em hơn ngày đắm say\nYes i do\nEm yêu anh trong từng phút giây\n\nYêu nhau đến mai về sau\nYêu nhau đến khi bạc đầu\nMình sẽ hạnh phúc suốt nơi đâu\nChỉ cần có nhau.",
        author: "Bùi Anh Tuấn, Hiền Hồ, Tuấn Anh FM-TP",
        img: "",
        path: "./song/Cưới Nhau Đi.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/minh-cuoi-nhau-di-.QU0ByG99EQtd.html",
        name: "Mình Cưới Nhau Đi",
        lyric: "Bài hát: Mình Cưới Nhau Đi - Huỳnh James, Pjnboys\n\n[Hook: Pjnboys]\nHay là mình, mình cưới nhau đi.\nHay là mình, mình cưới nhau đi.\nThanh xuân kia đi qua vội lắm ai ơi.\nCho anh xây tình nồng trọn kiếp bên em.\nHay là mình, mình cưới nhau đi.\nHay là mình, mình cưới nhau đi.\nHẹn hò rồi làm gì mà để đó em ơi.\nHay là mình, mình cưới nhau đi.\n\n[Vers 1: Pjnboys]\nThế nào thế nào? Em tính đi.\nHay là lên phường, ta đăng kí kết hôn liền.\nTa yêu nhau bao lâu? Anh chẳng chờ thêm nữa đâu.\nYêu nhau tới tầm này anh chợt cảm thấy lắng lo.\nLỡ mai mốt em chán, tự nhiên cái mám trai.\nChắc lúc đó anh chết làm sao mà sống được.\nThế là quyết phải cưới! Cưới sớm em ơi!\nKhông thể để lâu, lỡ may nó dính bầu.\n\n[Vers 2: Huỳnh James]\nCô Ba Chú Bảy đang ngồi chơi ở bàn bên.\nTân Lang hai họ đang mời bia ở bàn trên.\nHay mình cưới nhau đi em.\nCưới nhau đi em.\nHay mình cưới ngay trong đêm.\nCưới luôn nha em.\nĐể tao nói cho tụi mày nghe, tụi nó dính bầu tụi nó mới cưới.\nĐâu có dễ mà ăn đám cưới của cặp tình nhân ở tuổi đôi mươi.\nÔng thầy bói ổng cũng đã nói thằng này tuổi Thân con kia tuổi Tý.\nQua sang năm nó làm tiền tỷ, trong tay nó cầm nhiều đô la Mỹ.\nNắng hồng ban mai chiếu sáng hết con đường.\nHôm nay là ngày tốt anh với em cùng lên phường.\nNhấc cái tay, ký cái tên coi như là chung giường.\nNhất bái thiên địa.\nNhị bái cao đường.\nPhu thê giao phối.\nQua sang năm sau năm ba má có cháu.\nYêu là phải cưới, mà lỡ dính cũng phải cưới.\nXóm của anh là xóm dân chơi, còn xóm của em là xóm biển khơi.\nNên vì thế đừng lo em ơi, anh chịu trách nhiệm trên mọi cuộc chơi.\nTuy chiều cao anh hơi có hạn, nếu em chịu là em có vàng.\nChờ ngày mai bình minh ló dạng, anh đốt vàng mã anh thỉnh luôn nàng.\nEm ơi em em có bằng lòng, đừng dẫn anh nữa anh thấy lòng vòng.\nVì ngoài kia nhiều người đang hóng, em mà lạng quạng coi chừng ế chồng.\nĐậm đà chất chất tình yêu mùi mắm nhĩ.\nPhan Thiết biển rộng hôm nay sẽ có hỷ.\nĐể anh hỏi em lại lần cuối, em muốn theo anh hay là Pjnboys.\nNhưng mà thôi em đừng nói nữa, 2 đứa tụi anh cũng là 1 đôi.\nYyyyyyy!\n\n[Huỳnh James]\nEm ơi em có nhớ không em.\nĐừng ham chơi nữa quay về bên anh.\nBao tháng bao năm bao chờ bao đợi.\nBao ăn bao uống bao cưới luôn em.\nAnh chờ em về.\nEm ơi em đừng nên đánh số.\nLo cho tương lai của con chúng mình.\nEm mà cà chớn.\nChớn.\nChén với xoong có ngày lên đầu.",
        author: "Huỳnh James, Pjnboys",
        img: "",
        path: "./song/Mình Cưới Nhau Đi.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/cuoc-vui-co-don-va-remix-.09Kfwz67LHRp.html",
        name: "Cuộc Vui Cô Đơn (Va Remix)",
        lyric: "- Hiện chưa có lời bài hát nào cho Cuộc Vui Cô Đơn (Va Remix) do ca sĩ Lê Bảo Bình trình bày. Bạn có thể click vào đây để đăng lời cho bài hát này.",
        author: "Lê Bảo Bình",
        img: "",
        path: "./song/Cuộc Vui Cô Đơn-Lê Bảo Bình.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/co-tham-khong-ve-.mlnzEWoupew1.html",
        name: "Cô Thắm Không Về",
        lyric: "Từng là hơi ấm bên đời\ngiờ là cơn gió ngang trời\nMọi người xung quanh thay nhau cho tôi biết\nCô Thắm không về nữa đâu\nĐặt trọn niềm tin sai người\nGiờ này ai khóc ai cười\nThề hẹn làm chi\nĐể rồi bỏ đi\nTôi cố đem tình vun đắp mây hoá ngang trời che lấp\nTôi vẫn nơi này đợi chờ cô về với tôi\nLà vì tôi quá ngốc nghếch\nHay là do gia cảnh tôi nghèo\nGốc đa chỉ còn mình tôi ngồi nhìn trăng lên\nBao nhiêu kí ức một thời\nGiờ thành cay đắng một đời\nNhà cao xe sang váy cưới lộng lẫy\nSớm tối có người đón đưa\nHình dung theo gió mây ngàn\nNgồi ôm thương nhớ bẽ bàng\nPhận đời ngang trái\nGiờ biết nói cùng với ai\nDẫu biết phận mình cay đắng\nNhưng cớ sao lòng vẫn buồn\nLàm phu, làm thuê\nLàm sao mơ cho được ngọc ngà\nCô Thắm ngày nào bên tôi\nNay khuất xa dần mất rồi\nĐành thôi\nTôi phải quên . ..\n\nRap:\nTôi còn nhớ ngày cô đi\nMưa lâm râm nặng hạt\nCô vội trao chiếc nhẫn cỏ\nGương mặt cô lạnh nhạt\nThề hẹn xưa nay còn đâu\nKhi tôi đã không còn cạnh cô\nÁo gấm lụa đào\nCô cất bước đi giữa chốn phù phiếm nơi thành đô\nCô Thắm ơi! Mỗi 1 ngày thiếu điều\nTôi nhớ cô lắm\nÁnh đèn vàng\nThành phố xa hoa đã cướp mất đi cô Thắm\nTúp lều tranh\nNay chỉ lẻ bóng đơn điệu trong đó 1 trái tim\nChỉ biết đợi chờ cô về\nTrong nổi tuyệt vọng bóng ai dưới mái hiên\nTui lau! Giọt nước mắt\nSau còn động 2 hàng mi\nĐã bao lần\nTui nắm lấy thứ tình cảm phai tàn đi\nCon sông xưa\nMà vẫn khúc Bồi, giờ đây lòng người chỉ Lỡ\nSao nỡ quên đi\nThứ ân tình xưa là cả 1 đời tui ghi nhớ\nChờ cô về, chờ chiếc hôn\nChờ 1 vòng tay ấm áp\nChờ cô nói: “Cô nhớ tui“ chỉ là câu nói thấm thoát\nCâu hỏi đó, nợ tình duyên, liệu cô có trả lời?\nCô bắt tui chờ\nVà chờ bao giờ hay tui phải chờ đến chờ đến cả đời\n\nTừng là hơi ấm bên đời...\nGiờ là cơn gió ngang trời....\nMọi người xung quanh thay nhau cho tôi biết\nCô Thắm không về nữa đâu\nĐặt trọn niềm tin sai người\nGiờ này ai khóc ai cười...\nThề hẹn làm chi\nĐể rồi bỏ đi\n\nBao nhiêu kí ức 1 thời\nGiờ thành cay đắng 1 đời\nNhà cao xe sang\nVáy cưới lộng lẫy sớm tối có người đón đưa\nHình dung theo gió mây ngàn\nNgồi ôm thương nhớ bẻ bàng\nPhận đời ngang trái\nGiờ biết nói cùng với ai!\n\nRap:\nMột tiểu thư đài các\nCô không còn là cô Thắm xưa\nNơi đô thành tấp nập\nCuộc sống cô giờ êm ấm chưa?\nSao buồn vương trên mắt\nSao đôi lần khóc ướt mi\nTôi vẫn luôn dõi theo từ cái ngày cô bước đi\nCô xa nơi mái chèo bến sông nhỏ ta thường qua\nCô xa nơi đồng cỏ mái tranh nghèo cạnh vườn hoa\nÁnh trăng kia còn đợi\nNhưng bóng người giờ nơi đâu\nTôi chỉ biết mượn hơi men\nTâm sự cùng trăng cho vơi sầu",
        author: "Phát Hồ, Jokes Bii, Sinike",
        img: "",
        path: "./song/Cô Thắm Không Về.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/co-giang-tinh-.xyWHnC5qxlbd.html",
        name: "Cố Giang Tình",
        lyric: "[Ver 1:]\nTrái ngang, vỡ tan ai đưa con đò sang\nBến xưa vẫn mong, trông ngóng trong vô vọng\nĐắng cay còn đây, sao buông xuôi đôi bàn tay\nMá hồng hây hây thẹn thùng bên anh giờ đâu chẳng thấy\nTrót yêu nhau từ thời mộng mơ, tựa vần thơ ghi vào trang vở\nThuở ban sơ thẹn thùng thương nhớ bằng tất cả ngây thơ\nLối em đi thì ngày một khác, ngọt ngào không thấy chỉ toàn chua chát\nXuân sắc em tôi sao giờ đây hao gầy xơ xác\nSiết đôi tay ngậm ngùi nơi đây, nhìn trời mây duyên mình ai lấy\nTiếng ai than thở lòng hiu vắng, làn sương khói bao vây\nTrách do thân phận anh chẳng thể lo em hương sắc trời\nMong ngày tới em vui cùng tình nhân mới\n\n[ĐK:]\nKhóc cho nhau một lần rồi thôi không gặp nhau nữa đâu\nBến sông xưa nơi mình thường ngồi, cạnh bên nhau rất lâu\nÁng mây bay ngang trời tựa như, ân tình trôi thế thôi\nLòng không nói nhưng sâu bên trong tim đau nhói mỉm chặt môi\n\n[Rap:]\nLời em nói, lời em quên như dao cứa vào tim gan\nNỗi buồn anh nếm là từng vị đắng, rồi say trong miên man\nLà vì anh nhớ thương em, cô thiếu nữ bên sông quê\nBóng dáng tình xưa ngày nào còn đó sao em đi mãi vẫn không về\nNhiều lần than thân trách phận trách do vì anh đã phải lòng\nCảnh đẹp, cây đa bến quê sông nước, em đi còn ai để trải lòng\nEm, cười nói, vui vẻ, hạnh phúc, say đắm bên người ta\nNón lá đội nghiêng bao ngày anh đợi mặc cho bão táp hay mưa sa\n\n[Ver 2:]\nPhút chia ly nhìn nhau rời đi ta cố, không được rưng hàng mi\nNgấm bao nhiêu sầu bi tại vì anh cứ mãi thương nhớ li bì\nLá vẫn vương hạt sương mà sao nay cố nhân người thương đâu mất\nVất vả hứa hẹn chi giờ đây cũng phải đem vùi sâu chôn cất\n\n[ĐK:]\nKhóc cho nhau một lần rồi thôi không gặp nhau nữa đâu\nBến sông xưa nơi mình thường ngồi, cạnh bên nhau rất lâu\nÁng mây bay ngang trời tựa như, ân tình trôi thế thôi\nLòng không nói nhưng sâu bên trong tim đau nhói mỉm chặt môi\n\n[Rap:]\nCâu hò ơi, nghe đau nhói, khi em buông bỏ đi chữ tình\nĐể rồi người bước, rồi người quên, lúc xưa trao nhau bức thư tình\nTiếng đàn cò, tích tịch tình tang, gió đung đưa áng mây hồng\nHơi men còn vương, cạn chén rượu cần, nhớ về người thương giấc say nồng\nAnh có thể nói, có quyền nhớ, không quyền được yêu\nDù biết là không còn thương, không nên chờ, lệ ướt ngược chiều\nLưu bút ghi dòng thương nhớ, hoài niệm cũ trên bến sông xưa\nHương thơm tóc, người vương trong nắng, khẽ thôi gió nhẹ nhàng đung đưa",
        author: "X2X",
        img: "",
        path: "./song/Cố Giang Tình.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/co-gai-vang-.Meok0iuwHvzv.html",
        name: "Cô Gái Vàng",
        lyric: "Bài hát: Cô Gái Vàng - HuyR, Tùng Viu\n\nSon môi em đánh, mới order ở bên Tây\nBao anh điêu đứng, lúc em tải hình lên face\nÁo quần thuê thiết kế riêng\nEm ngồi siêu xe rất duyên\nBa em bác sĩ, má em làm chủ công ty\nMỗi cô con gái, nên nuông chiều nhiều hơn ai\nChỉ cần em nói thích gì\nMai là có, không nghĩ suy\nVậy mà chẳng thể hiểu kiểu gì em không thích anh\nMột người vừa hiền lành, học giỏi, lại tính toán nhanh\n4-3 bằng 2\nYêu anh không thể sai\nBao chàng trai ngoài kia làm sao sánh với anh được\n\n[ĐK:]\nNhà giàu lại còn xinh, em là cô gái vàng\nMọi người gặp đều khen anh đẹp trai nhất làng\nMình vừa hợp một đôi, như giành cho nhau ấy\nChẳng hiểu kiểu gì luôn, cứ giống như phim vậy\nThường ngày kể về em, ba mẹ anh hết lời\nGiờ mà về làm dâu, chắc là thương suốt đời\nVì nụ cười của em anh mộng mơ sớm tối\nVừa gặp lần đầu tiên anh đã say mê rồi\n\n[RAP:]\nBao đời nhà anh úp bát vào chạn bây giờ anh muốn được úp vào em\nMà nếu em thấy cuộc đời còn nhạt để anh dùng nhạc cùng muối xào lên\nAnh biết em khổ từ nhỏ ngày nào cũng phải nghĩ cách tiêu tiền\nKhi em phải sống trong một gia đình có một năng lực tài chính siêu nhiên\nNghe thoang thoáng ba em chủ tịch\nHọp cả tháng vẫn không đủ lịch\nMẹ làm chủ một chuỗi nhà hàng mở chục chi nhánh ở tận bên Sing\nThời gian bên em thì ít vì có những hôm phải bận quên mình\nEm đi siêu xe em ở biệt thự cớ sao em vẫn lận đận duyên tình\nHuy bạn anh thì on da beat\nAnh nhìn em thì yêu ra phết\nBa mẹ anh thì lo ra Tết\nSợi dây tơ hồng của đôi ta kết\nKhông còn phải một mình mỗi ngày 2 chục nghìn lẻ năm trăm\nHai mình ăn mẹt bún đậu ngập mặt luôn để cuộc tình mình sẽ trăm năm\nCó lẽ những chân thành em lại nghĩ bông đùa\nĐẹp trai nhưng anh không dối đâu (dối đâu)\nAnh không giống như là bao chàng trai em thường thấy bấy lâu\nBé đến lớn bây giờ anh chỉ yêu một người\nMọi người ở xung quanh chứng kiến giúp anh\nChỉ có mỗi em là, anh thương nhớ thôi mà\nNắng sớm đến đến trăng tà a ì a i á i a i à",
        author: "HuyR, Tùng Viu",
        img: "",
        path: "./song/Cô Gái Vàng-HuyR.mp3"
    },
    {
        name: "Cô Gái M52",
        author: "HuyR",
        img: "",
        path: "./song/Cô Gái M52-HuyR.mp3",
        lyric: ""
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/co-ay-da-tung-cover-.e1mrj9hEI2ZU.html",
        name: "Cô Ấy Đã Từng Cover",
        lyric: "Bài hát: Cô Ấy Đã Từng Cover - Anh Trung\n\nCô ấy đã từng nghĩ mình chẳng yêu ai vì những tổn thương ngày xưa sót lại\nNhưng đến một ngày nghe được thanh âm ấy khiến cô yếu lòng\nCô ấy đã từng ngâm nga giai điệu yêu thương, vì đơn giản mong người say giấc nồng\nCô ấy đã từng đợi cả ngày trông mong, chỉ để hỏi câu “Anh có ổn không?”\n\nCuộc sống vốn dĩ bao la làm sao, tìm được nhau khó thế nào\nEm vẫn đứng đó nhìn theo bóng ai dù xa xôi, muôn trùng cách trở\nRồi tương lai có biết bao điều sẽ khiến em bận lòng\nVậy thì giờ đây cho ai kia dõi theo bóng em được không\n\nAnh muốn em từng giận hờn vu vơ, vì đôi lúc anh khiến em phiền lòng\nAnh muốn em từng nở nụ cười trong mơ, nhớ đến anh mỗi ngày\nAnh muốn anh từng nói “Em để tâm đấy” khi thấy anh vui đùa bên ai\nNhững thứ em đã từng làm cho anh, tuy không nói ra nhưng anh biết người ơi\n\nCuộc sống vốn dĩ bao la làm sao, tìm được nhau khó thế nào\nTa vẫn đứng mỗi người một phương, trông về hình bóng ai dù khác hướng\nĐường tương lai có biết bao điều sẽ khiến ta bận lòng\nGhì nhẹ bàn tay, đưa nhau qua bão giông, khó khăn được không?!\n(Vậy thì giờ đây cho ai kia dõi theo bóng em được không)\n\nCó biết bao điều em từng làm cho anh, cả trời nhớ mong, cả trời hư không\nNhưng có một điều anh chẳng cần đâu em\nĐó là... trở thành người em đã từng yêu.\n\n",
        author: "Anh Trung",
        img: "",
        path: "./song/Cô Ấy Đã Từng.mp3"
    },
    {
        name: "Chuyện Tình Thợ Xây",
        author: "Chuyện Tình Thợ Xây",
        img: "",
        path: "./song/Chuyện Tình Thợ Xây.mp3",
        lyric: "Not Found"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/chung-ta-cua-hien-tai-lofi-version-.2srIfPGiKOqh.html",
        name: "Chúng Ta Của Hiện Tại (Lofi Version)",
        lyric: "[Verse 1]\nMùa thu mang giấc mơ quay về\nVẫn nguyên vẹn như hôm nào\nLá bay theo gió xôn xao\nChốn xưa em chờ\nĐoạn đường ngày nào nơi ta từng đón đưa\nCòn vấn vương không phai mờ\nGiấu yêu thương trong vần thơ\n\n[Pre-Chorus]\nChúng ta là áng mây bên trời vội vàng ngang qua\nChúng ta chẳng thể nâng niu những câu thề\nCứ như vậy thôi, không một lời, lặng lẽ thế chia xa\nChiều mưa bên hiên vắng buồn, còn ai thương ai, mong ai?\n\n[Chorus]\nĐiều anh luôn giữ kín trong tim\nThương em đôi mắt ướt nhòa\nĐiều anh luôn giữ kín trong tim này\nThương em đâu đó khóc òa\nĐiều anh luôn giữ kín trong tim này\nNgày mai nắng gió, sương lam\nCó ai thương lắng lo cho em?\n(Whoo-whoo-whoo)\n\nĐiều anh luôn giữ kín trong tim\nThương em, anh mãi xin là\nĐiều anh luôn giữ kín trong tim này\nThương em vì thương thôi mà\nĐiều anh luôn giữ kín trong tim này\nDù cho nắng tắt, xuân thay màu\nHéo khô đi tháng năm xưa kia\n(Anh nguyện ghi mãi trong tim)\n\n[Breakdown]\n(Nắng vương trên cành héo khô những kỉ niệm xưa kia\nNgày mai, người luyến lưu về giấc mơ từng có, liệu có ta?)\nCó anh nơi đó không?\nCó anh nơi đó không?\n\n[Pre-Chorus]\nChúng ta là áng mây bên trời vội vàng ngang qua\nChúng ta chẳng thể nâng niu những câu thề\nCứ như vậy thôi, không một lời, lặng lẽ thế chia xa\nChiều mưa bên hiên vắng buồn, còn ai thương ai, mong ai?\n\n[Chorus]\nĐiều anh luôn giữ kín trong tim\nThương em đôi mắt ướt nhòa\nĐiều anh luôn giữ kín trong tim này\nThương em đâu đó khóc òa\nĐiều anh luôn giữ kín trong tim này\nNgày mai nắng gió, sương lam\nCó ai thương lắng lo cho em?\n(Whoo-whoo-whoo)\n\nĐiều anh luôn giữ kín trong tim\nThương em, anh mãi xin là\nĐiều anh luôn giữ kín trong tim này\nThương em vì thương thôi mà\nĐiều anh luôn giữ kín trong tim này\nDù cho nắng tắt, xuân thay màu\nHéo khô đi tháng năm xưa kia\n(Anh nguyện ghi mãi trong tim)\n\n[Breakdown]\nNo, no, no\nNo, no, no\n\n[Bridge]\nĐiều anh luôn giữ kín trong tim (Giữ kín trong tim này)\nGiữ mãi trong tim này (Giữ mãi trong tim này)\nGiữ mãi trong tim mình\nGiữ...\n\nCó anh nơi đó không?\nCó anh nơi đó không?\n(Whoo-whoo-whoo-whoo)\n\nĐiều anh luôn giữ kín trong tim (No, no, no)\nĐiều anh luôn giữ kín trong tim này (No, no, no)\nĐiều anh luôn giữ kín trong tim này\n(Ngày mai, nắng gió, sương hao gầy)\n(Có ai luôn lắng lo cho em?)\n\nĐiều anh luôn giữ kín trong tim (No, no, no)\nĐiều anh luôn giữ kín trong tim này (No, no, no)\nĐiều anh luôn giữ kín trong tim này\n(Dù cho nắng tắt, xuân thay màu)\n(Héo khô đi tháng năm xưa kia)\n(Anh nguyện ghi mãi trong tim)\n\n[Chorus]\nĐiều anh luôn giữ kín trong tim\nThương em đôi mắt ướt nhòa\nĐiều anh luôn giữ kín trong tim này\nThương em đâu đó khóc òa\nĐiều anh luôn giữ kín trong tim này\nNgày mai nắng gió, sương lam\nCó ai thương lắng lo cho em?\n(Whoo-whoo-whoo)\n\nĐiều anh luôn giữ kín trong tim\nThương em, anh mãi xin là\nĐiều anh luôn giữ kín trong tim này\nThương em vì thương thôi mà\nĐiều anh luôn giữ kín trong tim này\nDù cho nắng tắt, xuân thay màu\nHéo khô đi tháng năm xưa kia\n(Anh nguyện ghi mãi trong tim)\n\n[Outro]\n(Anh nguyện ghi mãi trong tim)\n(Anh nguyện ghi mãi trong tim)\n(Anh nguyện ghi mãi trong tim)\n(Anh nguyện ghi mãi trong tim)",
        author: "Sơn Tùng M-TP, Nighttt",
        img: "",
        path: "./song/Chúng Ta Của Hiện Tại-Sơn Tùng.mp3"
    },
    {
        name: "Cho Bạn Cho Tôi",
        author: "Lam Trường",
        img: "",
        path: "./song/Cho Bạn Cho Tôi-Lam Trường.mp3",
        lyric: "Not Found"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/chac-ai-do-se-ve-remix-.dMTjN17omhAo.html",
        name: "Chắc Ai Đó Sẽ Về (Remix)",
        lyric: "Bài hát: Chắc Ai Đó Sẽ Về (Remix) - Sơn Tùng (M-TP), DJ\n\nAnh tìm nỗi nhớ....Anh tìm quá khứ.\nNhớ lắm kí ức anh và em....\nTrả lại anh yêu thương ấy, xin người hãy về nơi đây.\nBàn tay yếu ớt cố níu em ở lại....\nNhững giọt nước mắt...Lăn dài trên mi.\nCứ thế anh biết phải làm sao...\nTình yêu trong em đã mất,phai dần đi theo gió bay.\nCòn lại chi nơi đây cô đơn riêng anh ....\n\nEm đi xa quá ... Em đi xa anh quá ..\nCó biết không nơi đây anh vẫn đứng đợi một giấc mơ.\nAnh chờ đợi một cơn mưa,sẽ xóa sạch giọt nước mắt.\nNgồi trong đêm bơ vơ anh thấy đau em có biết không????\nEm ơi anh nhớ ... Em ơi anh rất nhớ ..\nTừng câu nói ánh mắt của em giờ này ở nơi đâu.\nChắc ai đó sẽ sớm quay lại thôi ...\nChắc ai đó sẽ sớm quay về thôi ...\nCầm bông hoa trên tay nước mắt rơi ..\nAnh nhớ em !\n\nNhững giọt nước mắt...Lăn dài trên mi.\nCứ thế anh biết phải làm sao.\nTình yêu trong em đã mất,phai dần đi theo gió bay.\nCòn lại chi nơi đây cô đơn riêng anh ....\n\nEm đi xa quá ... Em đi xa anh quá ..\nCó biết không nơi đây anh vẫn đứng đợi một giấc mơ.\nAnh chờ đợi một cơn mưa,sẽ xóa sạch giọt nước mắt.\nNgồi trong đêm bơ vơ anh thấy đau em có biết không????\nEm ơi anh nhớ ... Em ơi anh rất nhớ ..\nTừng câu nói ánh mắt của em giờ này ở nơi đâu.\nChắc ai đó sẽ sớm quay lại thôi ...\nChắc ai đó sẽ sớm quay về thôi ...\nCầm bông hoa trên tay nước mắt rơi ..\nAnh nhớ em !\n\nAnh sẽ mãi nhớ thật nhiều những thứ thuộc về em\nTrong tim này vẫn mãi yêu người riêng em ...\nUh ohhhh ...\n\nEm đi xa quá ... Em đi xa anh quá ..\nCó biết không nơi đây anh vẫn đứng đợi một giấc mơ.\nAnh chờ đợi một cơn mưa,sẽ xóa sạch giọt nước mắt.\nNgồi trong đêm bơ vơ anh thấy đau em có biết không????\nEm ơi anh nhớ ... Em ơi anh rất nhớ ..\nTừng câu nói ánh mắt của em giờ này ở nơi đâu.\nChắc ai đó sẽ sớm quay lại thôi ...\nChắc ai đó sẽ sớm quay về thôi ...\nCầm bông hoa trên tay nước mắt rơi ..\nAnh nhớ em !",
        author: "Sơn Tùng M-TP",
        img: "",
        path: "./song/Chắc Ai Đó Sẽ Về-Sơn Tùng.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/beautiful-in-white-.6wxzvEkMn8.html",
        name: "Beautiful In White",
        lyric: "Actually if you know this\nbut when we first met\nI got so nervous\nI couldn’t speak\nIn that very moment\nI found the one and\nmy life had found its missing piece\n\nSo as long as I live I’ll love you,\nwill have and hold you\nYou look so beautiful in white\nAnd from now til my very last breath\nThis day I’ll cherish\nYou look so beautiful in white tonight\n\nWhat we have is timeless\nMy love is endless\nand with this ring I say to the world\nYou’re my every reason\nYou’re all that I believe in\nWith all my heart I mean every word\n\nSo as long as I live I’ll love you,\nwill have and hold you\nYou look so beautiful in white\nAnd from now til my very last breath\nThis day I’ll cherish\nYou look so beautiful in white tonight\n\nohh ohh\nYou look so beautiful in white tonight\nna na na na\nso beautiful in white tonight\n\nAnd if a daughter is what our future holds\nI hope she has your eyes\nfinds love like you and I did\nand when she falls in love we’ll let her go\nand I’ll walk her down the aisle\nShe’ll look so beautiful in white\n\nYou look so beautiful in white\n\nSo as long as I live I’ll love you,\nwill have and hold you\nYou look so beautiful in white\nAnd from now til my very last breath\nThis day I’ll cherish\nYou look so beautiful in white tonight\nYou look so beautiful in white tonight\n\n\n-------------------------------------------------------------------------------------------------------------------------\n\nChẳng *** chắc rằng em có biết điều này không\nNhưng khi chúng ta gặp nhau lần đầu\nAnh đã rất bồn chồn\nAnh chẳng thể nói được lời nào\nVào cái khoảnh khắc đó\nAnh đã tìm thấy một người\nVà cuộc đời anh đã tìm được mảnh ghép còn thiếu\n\nChỉ cần anh sống anh sẽ yêu em,\nSẽ có em và giữ em thật chặt\nTrông em thật rạng rỡ trong bộ váy cưới\nVà kể từ giây phút này cho đến khi anh trút hơi thở cuối cùng\nNgày hôm nay anh sẽ nâng niu tình cảm này\nĐêm nay trông em thật rạng rỡ trong bộ váy cưới\n\nNhững gì chúng ta có là mãi mãi\nTình yêu của anh là bất diệt\nVà với chiếc nhẫn này anh nói cho cả thế giới biết\nEm là lẽ sống của đời anh\nEm là mọi thứ anh tin tưởng\nAnh nói những lời này bằng cả trái tim\n\nChỉ cần anh sống anh sẽ yêu em\nSẽ có em và giữ em thật chặt\nTrông em thật rạng rỡ trong bộ váy cưới\nVà kể từ giây phút này cho đến khi anh trút hơi thở cuối cùng\nNgày hôm nay anh sẽ nâng niu tình cảm này\nĐêm nay trông em thật rạng rỡ trong bộ váy cưới\n\nohh ohh\nTrông em thật rạng rỡ trong bộ váy cưới đó\nna na na na\nĐêm nay trông em thật rạng rỡ trong bộ váy cưới\n\nVà nếu trong tương lai chúng ta có con gái\nAnh mong rằng nó sẽ có đôi mắt của em\nTìm ra được tình yêu như chúng ta đã có\nVà khi nó yêu chúng ta sẽ để nó tự trải nghiệm\nVà anh sẽ là người dẫn nó đi giữa nhà thờ này\nNó sẽ trông thật rạng rỡ trong bộ váy cưới\n\nTrông em thật rạng rỡ trong bộ váy cưới\n\nChỉ cần anh sống anh sẽ yêu em\nSẽ có em và giữ em thật chặt\nTrông em thật rạng rỡ trong bộ váy cưới\nVà kể từ giây phút này cho đến khi anh trút hơi thở cuối cùng\nNgày hôm nay anh sẽ nâng niu tình cảm này\nĐêm nay trông em thật rạng rỡ trong bộ váy cưới\nĐêm nay trông em thật rạng rỡ trong bộ váy cưới",
        author: "Shane Filan",
        img: "",
        path: "./song/Beautiful In White.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/ban-tinh-oi-.ZL3N1InExMvS.html",
        name: "Bạn Tình Ơi",
        lyric: "Ta hãy cùng đi.\nĐi đến chốn xa xôi.\nTa đã trãi qua. Gió sương phong ba bụi trần.\nHãy vứt lại sau. Những năm tháng mệt nhoài.\nCứ vui tươi cười hoài.\nĐời giống như bức tranh thêm màu sắc tươi.\nĐoạn đường kia phủ lắm chông gai.\nGió sương phủi bờ. Tương lai đang chờ.\nThì anh xin. Nguyện yêu em dù có thế nào.\nNgàn hương hoa tỏa khắp nhân gian.\nNắng kia nhẹ nhàng chờ em đến.\nCó em bên đời thấy ôi sao bình yên.\nMong thời gian sẽ mãi ngưng lại.\nSẽ mãi cho em tình yeu.\nMãi cho em bài ca.\nMãi cho em những điều đẹp nhất trên đời.\nNgàn vì sao sẽ minh chứng tình anh gửi em.\nMong đến khi ta gặp nhau.\nNhẫn đính hôn tặng em.\nTrái tim sẽ chung nhịp từ phút giây này.\nMong ta mãi bên nhau.\nNguyện sẽ không thay đổi lòng.\nBạn tinh ơi. Ới bạn tinh ơi.\nSóng võ miên man.\nÁng mây nhẹ nhàng.\nBạn tình ơi. Ới bạn tình ơi.\nSưởi ấm trong nắng chan hòa.\nBạn tinh ơi. Ới bạn tình ơi.\nTa sẽ lên xe đón em về nhà.\nBạn tình ơi. Ới bạn tình ơi.\nSẽ không rời xa.....\n\nRap: YuniBoo\nAnh ơi có bao nhiêu, 60 năm cuộc đời\nThương anh không đổi dời nên đừng nói chuyện buông lơi\nNhà anh thì ở xóm dưới còn em ở bên kia sông\nQuê em thì chẳng có gì ngoài đặt sản cá cua đồng\nAnh chịu làm chồng em không?nói để em còn chờ mông\nThành thị bôn ba mệt lắm thôi ở lại cùng em vuông trồng\nEm đã đến tuổi cưới chồng nhưng chỉ chờ đợi anh qua\nBa em thì cũng không khó chỉ cần anh mang lể đến nhà\n\nCây nào rồi lớn lên chờ đến ngày đơm bông kết quả\nEm kua anh cả năm rồi chần chờ gì ?anh không mệt hả?\n“Thầy bói nói là cưới em về đời anh bớt khổ\nThành thị làm chi gái thời nay phụ lắm anh ơi”\nYêu anh em yêu cho trọn đến kiếp này hẹn cả kiếp sâu\nĐến khi bạc trắng mái đầu ''ông và tôi'' hủ hỉ với nhau",
        author: "Yuni Boo, Goctoi Mixer",
        img: "",
        path: "./song/Bạn Tình Ơi.mp3"
    },
    {
        name: "Bài Hát Liên Quân",
        author: "Bài Hát Liên Quân",
        img: "",
        path: "./song/Bài Hát Liên Quân.mp3",
        lyric: "Not Found"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/bac-phan-remix-2019-.HwF4wo4DMfmi.html",
        name: "Bạc Phận (Remix 2019)",
        lyric: "Bạc Phận (Remix 2019) - Jack (G5R), DJ Future\n\nAi gieo tình này, ai mang tình này, để lệ trên khóe mi cay\n\nAi đưa về nhà, ai cho ngọc ngà, giờ người xa cách ta\n\nTừng là một thời thiếu nữ trong vùng quê nghèo\n\nHồn nhiên cài hoa mái đầu\n\nDòng người vội vàng em hóa thân đời bẽ bàng\n\nRời xa tình anh năm tháng ...\n\n[Điệp khúc]\n\nÔi phút giây tương phùng anh nhớ và mong\n\nDòng lưu bút năm xưa in dấu mãi đậm sâu\n\nTrong nỗi đau anh mệt nhoài\n\nTrong phút giây anh tìm hoài\n\nMuốn giữ em ở lại một lần này vì anh mãi thương\n\nXa cách nhau thật rồi sương trắng chiều thu\n\nNgày em bước ra đi nước mắt ấy biệt li\n\nHoa vẫn rơi bên thềm nhà\n\nLá xát xơ đi nhiều và\n\nAnh chúc em yên bình mối tình mình hẹn em kiếp sau ...\n\nThoáng thoáng, ngày miêng mang, giờ con nước dài thênh thang\n\nKhông trách, người không thương, mà hương tóc còn vương vương\n\nRap:\n\nGửi tặng em màu son cỏ dại\n\nChút bình yên trên môi bỏ lại\n\nNước mắt nào thấm đẩm cả hai vai\n\nMắt phượng mày ngài người phải tìm đến thiên thai\n\nÀ ơi câu hát em không cần những lời khuyên\n\nEm buông thả mình và chẳng màng đến tình duyên\n\nĐời em phiêu bạc đau đớn lắm lúc cũng vì tiền\n\nThương thân em khổ để một lần cùng chí tuyến ...\n\nGiờ em ở nơi khuê phòng\n\nNgày mai nữa em theo chồng\n\nVà tô má em thêm hồng ôi đớn đau lòng ôi đớn đau lòng\n\nBình minh dẫn em đi rồi\n\nVòng xoay bánh xe luân hồi\n\nHoàng hôn khuất sau lưng đồi ôi vỡ tan rồi ôi vỡ tan rồi!\n\nMột ngày buồn mây tím, em về thôn làng ...\n\nMẹ cha của em vỡ òa ...\n\nGiọt lệ chạnh lòng em khóc, thương người sang đò\n\nHồng nhan bạc phận - sóng gió!\n\n[Điệp khúc]\n\nÔi phút giây tương phùng anh nhớ và mong\n\nDòng lưu bút năm xưa in dấu mãi đậm sâu\n\nTrong nỗi đau anh mệt nhoài\n\nTrong phút giây anh tìm hoài\n\nMuốn giữ em ở lại một lần này vì anh mãi thương\n\nXa cách nhau thật rồi sương trắng chiều thu\n\nNgày em bước ra đi nước mắt ấy biệt li\n\nHoa vẫn rơi bên thềm nhà\n\nLá xát xơ đi nhiều và\n\nAnh chúc em yên bình mối tình mình hẹn em kiếp sau ...",
        author: "Jack - J97, DJ Future",
        img: "",
        path: "./song/Bạc Phận-Jack.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/astronomia-.pwcLw04cSEJQ.html",
        name: "Astronomia",
        lyric: "- Hiện chưa có lời bài hát nào cho Astronomia do ca sĩ MaxRiven trình bày. Bạn có thể click vào đây để đăng lời cho bài hát này.",
        author: "MaxRiven",
        img: "",
        path: "./song/Astronomia.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/anh-thanh-nien-.uyFukm9X7wX0.html",
        name: "Anh Thanh Niên",
        lyric: "Anh thanh niên năm nay đã ngót nghét 30 rồi\nSáng mua 5 nghìn xôi tối 3 nghìn trà đá\nAnh luôn luôn on face để biết hết chuyện trên đời\nĐăng cái status bình thường cũng phải gần nghìn like\nAnh thanh niên năm nay vẫn chẳng thấy vợ con gì\nAnh nói mấy cô yêu nhưng anh không cần người yêu\nBa má anh sáng ra vẫn vội vã chạy đi làm\nAnh nói anh còn nhỏ nên đã biết làm gì đâu\n\nRồi một hôm anh gặp cô gái và\nCứ thế lòng thẫn thờ đêm lại ôm nhớ mong\nĐể rồi chợt nhận ra anh bỏ quên quá nhiều\nNghĩ đến ba má anh lại thấy thật buồn\n\nLà do em tất cả chính em đã\nKhiến chàng trai đổi thay và không còn như trước kia\nTình yêu đã dẫn lối anh bối rối\nThế là bây giờ đây anh đã biết yêu rồi\nChẳng lê la quán xá, anh đã khác\nKhông còn như ngày xưa mải mê mộng mơ nữa đâu\nVì lo cho ba má, cho em á\nNên anh thanh niên học cách đổi thay bản thân mỗi ngày\n\nAnh kể về những ngày xưa, lúc anh còn chạy con Dream trên đường\nSửa soạn sáng đến tận trưa, tóc tai vuốt ngược bảnh như Đan Trường\nNhưng mà anh có tính hay ngại, tụi con gái cứ lại làm ***\nChẳng qua là anh không thích, chứ một khi nhích thiếu gì một em\nChuyện ngày xưa ghê thế nhờ\nSao mấy năm vẫn như thế này\nChuyện thật hay anh nói đùa\nCứ nói đi, dối lòng làm chi???\n\n\nAnh thanh niên hôm nay thức dậy sớm từ 6 giờ\nGiúp má đi chợ sáng, mua rau thịt về nấu\nAnh lên online face đăng tus kiếm tìm công việc\nAnh biết mình đã lớn nên phải trưởng thành hơn\nAnh thanh niên hôm nay đã nghĩ đến chuyện gia đình\nNhưng chưa có ai yêu, anh biết lấy vợ làm sao\nMấy cô gái anh khoe, hóa ra cũng chỉ nói xạo\nChẳng có chi là thật, anh cứ mơ mộng vậy thôi\nKể từ khi anh gặp cô gái rồi\nCứ thế lòng thẩn thơ đêm ngày ôm nhớ mong\nVà rồi chợt nhận ra, anh đã yêu mất rồi\nChẳng giống những lúc xưa, anh giờ đã khác thật nhiều\n\nLà do em tất cả chính em đã\nKhiến chàng trai đổi thay và không còn như trước kia\nTình yêu đã dẫn lối anh bối rối\nThế là bây giờ đây anh đã biết yêu rồi\nChẳng lê la quán xá, anh đã khác\nKhông còn như ngày xưa mải mê mộng mơ nữa đâu\nVì lo cho ba má, cho em á\nNên anh thanh niên học cách đổi thay bản thân mỗi ngày",
        author: "HuyR",
        img: "",
        path: "./song/Anh Thanh Niên-HuyR.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/holo-.T9mKrrQOX0r8.html",
        name: "Holo",
        lyric: "- Hiện chưa có lời bài hát nào cho Holo do ca sĩ Ampyx trình bày. Bạn có thể click vào đây để đăng lời cho bài hát này.",
        author: "Ampyx",
        img: "",
        path: "./song/Ampyx-Holo.mp3"
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/999-doa-hong-.lxa5GbCZtje5.html",
        name: "999 Đóa Hồng",
        lyric: "Bài hát: Chín, Chín, Chín Đóa Hồng - Lam Trường\n\nVắng em chiều nay, áng mây nhẹ theo gió bay\nvương vấn đâu đây, điệu buồn nhung nhớ giăng đầy\nNắng đã nhạt phai, trên con đường nghiêng bóng dài\nanh mãi yêu em trong kỷ niệm\n\nBóng trăng ngày xưa, với khung trời anh ước mơ\nvẫn đứng bơ vơ, một mình đơn bóng mong chờ\nTuyết rơi mùa đông, tiễn em về trong giá băng\ncho anh mãi đơn côi, người tình ơi !\n\nVườn hồng ngày xưa đã úa tàn,\ncon tim khổ đau đã héo mòn,\nChờ đợi tình yêu đã lỡ làng,\nchôn đi bao nhiêu những ước mong\nMãi sống với những kỷ niệm tuyệt vời,\nmãi sống với ước mơ yêu em mà thôi....\n\nCó những chiều mưa, anh đi về trên lối xưạ\nMưa ướt trên vai, lạc loài những tiếng nhạc buồn.\nCó những chiều đông, khi tâm hồn anh giá băng,\ntên em khắc trên môi, người tình ơi !\n\nVườn hồng ngày xưa đã úa tàn,\ncon tim khổ đau đã héo mòn,\nChờ đợi tình yêu đã lỡ làng,\nchôn đi bao nhiêu những ước mong\nMãi sống với những kỷ niệm tuyệt vời,\nmãi sống với ước mơ yêu em mà thôi....\n\nVắng em chiều nay, áng mây nhẹ theo gió bay\nvương vấn đâu đây, điệu buồn nhung nhớ giăng đầy\nNắng đã nhạt phai, trên con đường nghiêng bóng dài\nanh mãi yêu em trong kỷ niệm...",
        author: "Lam Trường",
        img: "",
        path: "./song/999 Đóa Hồng.mp3"
    },
    {
        name: "999 Đóa Hồng Remix",
        author: "999 Đóa Hồng Remix",
        img: "",
        path: "./song/999 Đóa Hồng Remix.mp3",
        lyric: "Bài hát: Chín, Chín, Chín Đóa Hồng - Lam Trường\n\nVắng em chiều nay, áng mây nhẹ theo gió bay\nvương vấn đâu đây, điệu buồn nhung nhớ giăng đầy\nNắng đã nhạt phai, trên con đường nghiêng bóng dài\nanh mãi yêu em trong kỷ niệm\n\nBóng trăng ngày xưa, với khung trời anh ước mơ\nvẫn đứng bơ vơ, một mình đơn bóng mong chờ\nTuyết rơi mùa đông, tiễn em về trong giá băng\ncho anh mãi đơn côi, người tình ơi !\n\nVườn hồng ngày xưa đã úa tàn,\ncon tim khổ đau đã héo mòn,\nChờ đợi tình yêu đã lỡ làng,\nchôn đi bao nhiêu những ước mong\nMãi sống với những kỷ niệm tuyệt vời,\nmãi sống với ước mơ yêu em mà thôi....\n\nCó những chiều mưa, anh đi về trên lối xưạ\nMưa ướt trên vai, lạc loài những tiếng nhạc buồn.\nCó những chiều đông, khi tâm hồn anh giá băng,\ntên em khắc trên môi, người tình ơi !\n\nVườn hồng ngày xưa đã úa tàn,\ncon tim khổ đau đã héo mòn,\nChờ đợi tình yêu đã lỡ làng,\nchôn đi bao nhiêu những ước mong\nMãi sống với những kỷ niệm tuyệt vời,\nmãi sống với ước mơ yêu em mà thôi....\n\nVắng em chiều nay, áng mây nhẹ theo gió bay\nvương vấn đâu đây, điệu buồn nhung nhớ giăng đầy\nNắng đã nhạt phai, trên con đường nghiêng bóng dài\nanh mãi yêu em trong kỷ niệm..."
    },
    {
        "url": "https://www.nhaccuatui.com/bai-hat/100-years-love-.w8bNshpQFyAP.html",
        name: "100 Years LOVE",
        lyric: "Vài cơn nắng phiêu du theo làn khói mong manh\nLà công chúa hay nàng tiên nữ ở trong tranh\nGió cuốn mây mang theo tình ta đến mây ngàn\nĐể anh hát cho em những giai điệu ngân vang\nNàng ơi em có muốn theo anh, ta về chốn phương xa\nVề một nơi yên bình mà chỉ có đôi ta\nLá khẽ đong đưa trên cành cây chốn xa xăm\nEm có muốn theo anh, ta về chốn trăm năm\n\"Vài cơn nắng phiêu du theo làn khói mong manh\nLà công chúa hay nàng tiên nữ ở trong tranh\nGió cuốn mây mang theo tình ta đến mây ngàn\nĐể anh hát cho em những giai điệu ngân vang \"\n\n[RAP:]\n1. Em có biết là vài nụ hồng còn vương khi môi em cười\nNhưng em yên tâm khi mà anh yêu là anh xác định sẽ cưới\nAnh hứa sẽ không bao giờ để giọt lệ trên mi em phải rơi\nVà anh hứa sẽ không đánh mất em khi ta ở tuổi đôi mươi\nVài câu nói đường mật của anh có thể khiến em say đắm\nNhưng em có thấu cảm giác ngọt ngào khi đôi ta đan tay nắm\nAnh thì không có gì , ngoài một trái tim chân thành\nVà em có muốn xây đắp tương lai ngôi nhà hạnh phúc cùng anh\n\n\"Vài cơn nắng phiêu du theo làn khói mong manh\nLà công chúa hay nàng tiên nữ ở trong tranh\nGió cuốn mây mang theo tình ta đến mây ngàn\nĐể anh hát cho em những giai điệu ngân vang\nNàng ơi em có muốn theo anh, ta về chốn phương xa\nVề một nơi yên bình mà chỉ có đôi ta\nLá khẽ đong đưa trên cành cây chốn xa xăm\nEm có muốn theo anh, ta về chốn trăm năm\"\n\n[RAP:]\n2. Dù ngoài kia có bão có giông thì đã có anh ở đây rồi\nTrầu cau nhà anh đã có chỉ chờ em yêu gật đầu một cái thôi\nAnh biết em vẫn mơ ước về một ngôi nhà mà chúng mình chung đôi\nVậy thì gật đầu nhanh đi , anh đưa em về rồi chúng mình chung gối\nEm muốn nhẫn cưới bằng vàng hay là 24 cara\nEm muốn đi trên con trevita hay là con xe honda\nĐối với em thì tình cảm này của anh sẽ luôn là biển cả\nThiên thần có ở trên trời anh cũng kéo xuống chúc phúc đôi ta\n\n\"Vài cơn nắng phiêu du theo làn khói mong manh\nLà công chúa hay nàng tiên nữ ở trong tranh\nGió cuốn mây mang theo tình ta đến mây ngàn\nĐể anh hát cho em những giai điệu ngân vang\nNàng ơi em có muốn theo anh, ta về chốn phương xa\nVề một nơi yên bình mà chỉ có đôi ta\nLá khẽ đong đưa trên cành cây chốn xa xăm\nEm có muốn theo anh, ta về chốn trăm năm\"\n\"Vài cơn nắng phiêu du theo làn khói mong manh\nLà công chúa hay nàng tiên nữ ở trong tranh\nGió cuốn mây mang theo tình ta đến mây ngàn\nĐể anh hát cho em những giai điệu ngân vang \"\n",
        author: "NamDuc",
        img: "",
        path: "./song/100 Years Love.mp3"
    }
]

function renderListSong() {
    const htmls = songList.map((song, index) => {
        return `
        <div class="song-file" data-value="${index}">
            <div class="song-thumb-mini">
                <img src="${song.img ? song.img : './img/binh.jpg'}" alt="" />
            </div>
            <div class="song-desc-mini">
                <h3>${song.name}</h3>
                <h4>${song.author}</h4>
            </div>
            <div class="song-option">
                <i class="fas fa-ellipsis-h"></i>
                <!-- <ul>
                    <li>
                        <i class="fas fa-heart"></i>
                    </li>
                </ul> -->
            </div>
        </div>
        `
    })
    playList.innerHTML = htmls.join("")
}
renderListSong()

function scrollSong(name) {
    name.scrollIntoView({behavior: 'smooth',block: 'center',inline: 'nearest'})
}

function loadConfig() {
    if (config != {}) {
        defineProperties.isRepeating = config.isRepeating ? config.isRepeating : false
        defineProperties.isShuffling = config.isShuffling ? config.isShuffling : false
        defineProperties.currentSong = config.currentSong
        audio.volume = config.volume ? config.volume : 1
        volumeBar.value = String(config.volume ? config.volume*100 : 1*100)
        defaultRender()
    }
}
loadConfig()

function defaultRender() {
    repeatBtn.firstElementChild.classList.toggle("active",defineProperties.isRepeating)
    randomBtn.firstElementChild.classList.toggle("active",defineProperties.isShuffling)
    loadCurrentSong()
}


function loadCurrentSong() {
    songName.innerText = songList[defineProperties.currentSong].name
    songAuthor.innerText = songList[defineProperties.currentSong].author
    audio.src = songList[defineProperties.currentSong].path
    cdThumb.src = songList[defineProperties.currentSong].img ? songList[defineProperties.currentSong].img : './img/binh.jpg'
    lyricContent.innerText = songList[defineProperties.currentSong].lyric
    setConfig('currentSong',defineProperties.currentSong)
    var songListNames = document.querySelectorAll(".song-desc-mini h3")
    for (const songListName of songListNames) {
        if (songName.innerText == songListName.innerText) {
            songListName.parentElement.parentElement.classList.add("playing")
            scrollSong(songListName.parentElement.parentElement)
        } else {
            songListName.parentElement.parentElement.classList.remove("playing")
        }
    }
}
loadCurrentSong()

playList.onclick = function(e) {
    const songNodeFile = e.target.closest('.song-file:not(.playing)')
    if (songNodeFile || e.target.closest('.song-option')) {
        if (songNodeFile) {
            // console.log(songNodeFile.dataset.value)
            defineProperties.currentSong = Number(songNodeFile.dataset.value)
            loadCurrentSong()
            isPlaying = true
            playSong()
        }
        if (e.target.closest('.song-option')) {

        }
    }
}

playBtn.onclick = function () {
    playSong()
}

audio.onplay = function() {
    isPlaying = false
    playBtn.firstElementChild.classList.remove("fa-play-circle")
    playBtn.firstElementChild.classList.add("fa-pause-circle")
    cdThumbAnimate.play()
}

audio.onpause = function() {
    isPlaying = true
    playBtn.firstElementChild.classList.add("fa-play-circle")
    playBtn.firstElementChild.classList.remove("fa-pause-circle")
    cdThumbAnimate.pause()
}

nextBtn.onclick = function () {
    isPlaying = true
    changeSong()
}

function nextSong() {
    defineProperties.currentSong = defineProperties.currentSong + 1
    if (defineProperties.currentSong>=songList.length) defineProperties.currentSong = 0
    loadCurrentSong()
}

backBtn.onclick = function () {
    isPlaying = true
    if (defineProperties.isRepeating) {
        playSong()
    } else if(defineProperties.isShuffling) {
        randomSong()
        loadCurrentSong()
        playSong()
    } else {
        backSong()
        playSong()
    }
}

function backSong() {
    defineProperties.currentSong = defineProperties.currentSong -1
    if (defineProperties.currentSong < 0) defineProperties.currentSong = songList.length - 1
    loadCurrentSong()
}

const cdThumbAnimate = cdThumb.animate([
    { transform: 'rotate(360deg)' }
],{
    duration: 8000,
    iterations: Infinity,
})
cdThumbAnimate.pause()

function playSong() {
    if (isPlaying) {
        audio.play()
    } else {
        audio.pause()
    }
}

audio.ontimeupdate = function() {
    if (audio.duration) {
        const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
        progress.value = progressPercent
    }
}

progress.onchange = function(e) {
    const seekTime = Math.floor(e.target.value / 100 * audio.duration)
    audio.currentTime = seekTime
}

seekNext.onclick = function() {
    audio.currentTime = audio.currentTime + 5
}

seekBack.onclick = function() {
    audio.currentTime = audio.currentTime - 5
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

var randomNumList = []

function randomSong() {
    var randomNum = getRandomInt(songList.length-1)
    if (!randomNumList.includes(randomNum)) {
        randomNumList.push(randomNum)
        defineProperties.currentSong = randomNum
    } else if (randomNumList.length > songList.length / 2) {
        randomNumList = []
        nextSong()
    } else {
        randomSong()
    }
    // console.log(randomNumList)
}

function changeSong() {
    if (defineProperties.isRepeating) {
        isPlaying = true
        playSong()
    } else if(defineProperties.isShuffling) {
        randomSong()
        loadCurrentSong()
        playSong()
    } else {
        nextSong()
        playSong()
    }
}

audio.onended = function() {
    changeSong()
}

repeatBtn.onclick = function() {
    if (defineProperties.isRepeating) {
        defineProperties.isRepeating = false
    } else {
        defineProperties.isRepeating = true
    }
    this.firstElementChild.classList.toggle("active-config",defineProperties.isRepeating)
    setConfig('isRepeating',defineProperties.isRepeating)
}

randomBtn.onclick = function() {
    if (defineProperties.isShuffling) {
        defineProperties.isShuffling = false
    } else {
        defineProperties.isShuffling = true
    }
    this.firstElementChild.classList.toggle("active-config",defineProperties.isShuffling)
    setConfig('isShuffling',defineProperties.isShuffling)
}

// var songFiles = document.querySelectorAll(".song-file")
// for (var i = 0;i < songFiles.length;i++) {
//     songFiles[i].onclick = function() {
//         this.scrollIntoView({behavior: 'smooth',block: 'center',inline: 'nearest'})
//         for (var k = 0; k<songList.length; k++) {
//             if(this.firstElementChild.nextElementSibling.firstElementChild.innerText == songList[k]['name']) {
//                 // console.log(k)
//                 defineProperties.currentSong = k
//                 loadCurrentSong()
//                 isPlaying = true
//                 playSong()
//             }
//         }
//     }    
// }

volumeBar.addEventListener('input',volumeBarChange)
function volumeBarChange() {
    outputNumVol.style.visibility = "visible"
    audio.volume = volumeBar.value / 100
    outputNumVol.innerHTML = volumeBar.value
    setConfig('volume',audio.volume)
    setTimeout(() => {
        outputNumVol.style.visible = "hidden"
        outputNumVol.innerHTML = ""
    },5000)
}

lyricBtn.onclick = function () {
    if (left.classList.contains("trans")) {
        right.style.opacity = "0"
        right.style.visible = "hidden"
        right.style.width = "0px"
        right.style.height = "0px"
        setTimeout(()=>{
            left.classList.remove("trans")
        },500)
    } else {
        left.classList.add("trans")
        setTimeout(()=>{
            right.style.opacity = "1"
            right.style.visibility = "visible"
            right.style.width = "500px"
            right.style.height = "610px"
        },500)
    }
}