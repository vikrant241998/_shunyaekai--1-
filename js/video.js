var plugin_url =
  "https://plugins.svn.wordpress.org/play-pause-button-for-video/trunk";
jQuery(document).ready(function () {
  if (jQuery("video").length > 0) {
    jQuery("video").wrap("<div class='video-parent-class'></div>");
    /*Add image just before to vedio  */
    jQuery(
      "<img class='pause-play-img' src='" + plugin_url + "/img/img01.png' >"
    ).insertBefore("video");
    jQuery("video").each(function (index) {
      /*vedio parent div height width code*/
      var vedio_width = jQuery(this).width();
      var vedio_height = jQuery(this).height();
      jQuery(".video-parent-class").css({
        // width: vedio_width + "px",
        // height: vedio_height + "px",
      });

      /*Pause Play image, middle width in vedio code*/
      var half_width_vedio = vedio_width / 2;
      var middle_object_width = half_width_vedio - 32;
      jQuery(".pause-play-img").css({
        // left: middle_object_width + "px",
      });

      /*Pause Play image middle height in vedio code*/
      var half_height_vedio = vedio_height / 2;
      var middle_object_heigh = half_height_vedio - 32;
      jQuery(".pause-play-img").css({
        // top: middle_object_heigh + "px",
      });

      /*Pause play and image src change code*/
      jQuery(this).on("click", function () {
        if (this.paused) {
          this.play();
          jQuery(this)
            .prev()
            .attr("src", plugin_url + "/img/img02.png");
        } else {
          this.pause();
          jQuery(this)
            .prev()
            .attr("src", plugin_url + "/img/img01.png");
        }
      });

      /*pause play image click vedio on off functionlity code*/
      jQuery(this)
        .prev()
        .on("click", function () {
          var myVideo = jQuery(this).next()[0];
          if (myVideo.paused) {
            myVideo.play();
            jQuery(this).attr("src", plugin_url + "/img/img02.png");
          } else {
            myVideo.pause();
            jQuery(this).attr("src", plugin_url + "/img/img01.png");
          }
        });
      /*Floating js for HTML Video Start*/
      var windows = jQuery(window);
      var videoWrap = jQuery(this).parent();
      var video = jQuery(this);
      var videoHeight = video.outerHeight();
      var videoElement = video.get(0);
      windows.on("scroll", function () {
        var windowScrollTop = windows.scrollTop();
        var videoBottom = videoHeight + videoWrap.offset().top;
        //alert(videoBottom);

        if (windowScrollTop > videoBottom) {
          if (!videoElement.paused) {
            videoWrap.height(videoHeight);
            video.addClass("stuck");
            if (video.hasClass("stuck")) {
              video.attr("controls", "1");
            }
            video.prev().attr("src", plugin_url + "/img/img02.png");
            jQuery(".scrolldown").css({ display: "none" });
          } else {
            videoWrap.height("auto");
            video.removeClass("stuck");
            video.removeAttr("controls");
            if (videoElement.paused) {
              video.prev().attr("src", plugin_url + "/img/img01.png");
            }
          }
        } else {
          videoWrap.height("auto");
          video.removeClass("stuck");
          video.removeAttr("controls");
        }
      });
      /*Floating js for HTML Video End*/
    });
    /*After end vedio change image*/
    //                     var video = document.getElementsByTagName('video')[0];

    //                     video.onended = function(e) {
    //                         jQuery(".pause-play-img").attr("src", plugin_url + "/img/img01.png");
    //                     };
  }
});
var ytIframeList,
  videoList,
  currentPlayer,
  closeButton,
  gradientOverlay,
  fullScreenIcon;

var inViewPortBol = true;

var ytIframeIdList = [];

var ytVideoId = [];

var ytPlayerId = [];

var videoTagId = [];

var events = new Array("ended", "pause", "playing");

document.addEventListener("DOMContentLoaded", function () {
  /*Adding Youtube Iframe API to body*/

  var youTubeVideoTag = document.createElement("script");

  youTubeVideoTag.src = "//www.youtube.com/iframe_api";

  var firstScriptTag = document.getElementsByTagName("script")[0];

  document.body.appendChild(youTubeVideoTag, firstScriptTag);

  /*Getting all the iframe from the Page and finding out valid URL and ID. Then creating instance of players*/

  ytIframeList = document.getElementsByTagName("iframe");

  for (i = 0; i < ytIframeList.length; i++) {
    if (new RegExp("\\b" + "enablejsapi" + "\\b").test(ytIframeList[i].src)) {
      var url = ytIframeList[i].src
        .replace(/(>|<)/gi, "")
        .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

      if (url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_\-]/i);

        ID = ID[0];

        ytIframeIdList.push(ID);

        ytIframeList[i].id = "featured-video" + i;

        ytVideoId.push("ytVideoId" + i);

        ytVideoId[i] = document.getElementById(ytIframeList[i].id);

        ytPlayerId.push("player" + i);
      }
    }
  }

  /*Getting Video Tag List and Creating instances*/

  videoList = document.getElementsByTagName("video");

  for (i = 0; i < videoList.length; i++) {
    videoList[i].id = "video-featured" + i;

    videoTagId.push("videoPlayerId" + i);

    videoTagId[i] = document.getElementById(videoList[i].id);
  }

  for (i = 0; i < videoTagId.length; i++) {
    for (var j in events) {
      videoTagId[i].addEventListener(events[j], videoTagPlayerhandler, false);
    }
  }

  closeButton = document.querySelector("a.close-button");

  gradientOverlay = document.querySelector(".gradient-overlay");

  fullScreenIcon = document.querySelector("i.fa.fa-arrows-alt");

  fullScreenPlay();
});

window.onYouTubeIframeAPIReady = function () {
  for (i = 0; i < ytIframeIdList.length; i++) {
    ytPlayerId[i] = new YT.Player(ytIframeList[i].id, {
      events: {
        onStateChange: onPlayerStateChange,
      },
    });
  }
};

function videoTagPlayerhandler(e) {
  /*Play Rules*/

  for (i = 0; i < videoTagId.length; i++) {
    if (e.target == videoTagId[i]) {
      if (e.type == "playing") {
        currentPlayer = videoTagId[i];

        videoTagId[i].classList.remove("is-paused");

        videoTagId[i].classList.add("is-playing");

        break;
      }
    }
  }

  for (i = 0; i < videoTagId.length; i++) {
    if (currentPlayer == videoTagId[i]) {
      continue;
    }

    videoTagId[i].classList.remove("is-playing");

    videoTagId[i].classList.add("is-paused");
  }

  /*Pause Rules*/

  for (i = 0; i < videoTagId.length; i++) {
    if (e.target == videoTagId[i]) {
      if (e.type == "pause") {
        videoTagId[i].classList.add("is-paused");

        videoTagId[i].classList.remove("is-playing");

        videoTagId[i].pause();
      }
    }
  }

  /*Sticky Rules*/

  for (i = 0; i < videoTagId.length; i++) {
    if (videoTagId[i].classList.contains("is-sticky")) {
      videoTagId[i].pause();

      fullScreenIcon.style.display = "none";
    }
  }

  for (i = 0; i < ytPlayerId.length; i++) {
    if (ytVideoId[i].classList.contains("is-sticky")) {
      ytPlayerId[i].pauseVideo();

      fullScreenIcon.style.display = "none";
    }
  }

  /*End Rules*/

  for (i = 0; i < videoTagId.length; i++) {
    if (e.target == videoTagId[i]) {
      if (e.type == "ended") {
        videoTagId[i].classList.remove("is-playing");

        videoTagId[i].classList.remove("is-paused");
      }
    }
  }

  videohandler();
}

function onPlayerStateChange(event) {
  /*Play Rules*/

  for (i = 0; i < ytPlayerId.length; i++) {
    if (ytPlayerId[i].getPlayerState() === 1) {
      currentPlayer = ytVideoId[i];

      ytVideoId[i].classList.remove("is-paused");

      ytVideoId[i].classList.add("is-playing");

      break;
    }
  }

  for (i = 0; i < ytVideoId.length; i++) {
    if (currentPlayer == ytVideoId[i]) {
      continue;
    }

    ytVideoId[i].classList.remove("is-playing");

    ytVideoId[i].classList.add("is-paused");
  }

  /*Pause Rules*/

  for (i = 0; i < ytPlayerId.length; i++) {
    if (ytPlayerId[i].getPlayerState() === 2) {
      ytVideoId[i].classList.add("is-paused");

      ytVideoId[i].classList.remove("is-playing");

      ytPlayerId[i].pauseVideo();
    }
  }

  /*Sticky Rules*/

  for (i = 0; i < ytPlayerId.length; i++) {
    if (ytVideoId[i].classList.contains("is-sticky")) {
      ytPlayerId[i].pauseVideo();

      fullScreenIcon.style.display = "none";
    }
  }

  for (i = 0; i < videoTagId.length; i++) {
    if (videoTagId[i].classList.contains("is-sticky")) {
      videoTagId[i].pause();

      fullScreenIcon.style.display = "none";
    }
  }

  /*End Rule*/

  for (i = 0; i < ytPlayerId.length; i++) {
    if (ytPlayerId[i].getPlayerState() === 0) {
      ytVideoId[i].classList.remove("is-playing");

      ytVideoId[i].classList.remove("is-paused");
    }
  }

  videohandler();
}

function videohandler() {
  if (currentPlayer) {
    if (closeButton) {
      closeButton.addEventListener("click", function (e) {
        if (currentPlayer.classList.contains("is-sticky")) {
          currentPlayer.classList.remove("is-sticky");

          closeFloatVideo();

          for (i = 0; i < ytVideoId.length; i++) {
            if (currentPlayer == ytVideoId[i]) {
              ytPlayerId[i].pauseVideo();
            }
          }

          for (i = 0; i < videoTagId.length; i++) {
            if (currentPlayer == videoTagId[i]) {
              videoTagId[i].pause();
            }
          }
        } else {
          for (i = 0; i < ytVideoId.length; i++) {
            if (currentPlayer != ytVideoId[i]) {
              ytVideoId[i].classList.remove("is-sticky");

              closeFloatVideo();
            }
          }

          for (i = 0; i < videoTagId.length; i++) {
            if (currentPlayer != videoTagId[i]) {
              videoTagId[i].classList.remove("is-sticky");

              closeFloatVideo();
            }
          }
        }
      });
    }
  }
}

window.addEventListener("scroll", function () {
  inViewPortBol = inViewPort();

  if (currentPlayer) {
    if (!inViewPortBol && currentPlayer.classList.contains("is-playing")) {
      for (i = 0; i < ytVideoId.length; i++) {
        if (currentPlayer != ytVideoId[i]) {
          ytVideoId[i].classList.remove("is-sticky");
        }
      }

      for (i = 0; i < videoTagId.length; i++) {
        if (currentPlayer != videoTagId[i]) {
          videoTagId[i].classList.remove("is-sticky");
        }
      }

      currentPlayer.classList.add("is-sticky");

      openFloatVideo();
    } else {
      if (currentPlayer.classList.contains("is-sticky")) {
        currentPlayer.classList.remove("is-sticky");

        closeFloatVideo();
      }
    }
  }
});

function fullScreenPlay() {
  if (fullScreenIcon) {
    fullScreenIcon.addEventListener("click", function () {
      if (currentPlayer.requestFullscreen) {
        currentPlayer.requestFullscreen();
      } else if (currentPlayer.msRequestFullscreen) {
        currentPlayer.msRequestFullscreen();
      } else if (currentPlayer.mozRequestFullScreen) {
        currentPlayer.mozRequestFullScreen();
      } else if (currentPlayer.webkitRequestFullscreen) {
        currentPlayer.webkitRequestFullscreen();
      }
    });
  }
}

function inViewPort() {
  if (currentPlayer) {
    var videoParentLocal = currentPlayer.parentElement.getBoundingClientRect();

    return (
      videoParentLocal.bottom > 0 &&
      videoParentLocal.right > 0 &&
      videoParentLocal.left <
        (window.innerWidth || document.documentElement.clientWidth) &&
      videoParentLocal.top <
        (window.innerHeight || document.documentElement.clientHeight)
    );
  }
}

function openFloatVideo() {
  closeButton.style.display = "block";

  gradientOverlay.style.display = "block";

  fullScreenIcon.style.display = "block";
}

function closeFloatVideo() {
  closeButton.style.display = "none";

  gradientOverlay.style.display = "none";

  fullScreenIcon.style.display = "none";
}
