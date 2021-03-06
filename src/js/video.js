

  $(".video_link").click(function() {
    var myPlayer = videojs('my-video');
    var videoUrl = $(this).attr("videohref");
    videojs("my-video", {}, function() {
        window.myPlayer = this;
        $("#my-video source").attr("src", videoUrl);
        myPlayer.src(videoUrl);
        myPlayer.load(videoUrl);
        myPlayer.play();
    });
});

$('.open-popup-link').magnificPopup({
    type: 'inline',
    closeOnBgClick: false,
    showCloseBtn: true,
    closeBtnInside: true,
    callbacks: {
        close: function() {
            myPlayer.pause();
            setTimeout(function () {
                $('#modal').hide();
            },500)
          }
    }
  
})

var magnificPopup = $.magnificPopup.instance; 
$('.close_icon').click(function () { 
    magnificPopup.close();
})



