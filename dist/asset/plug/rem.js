function setRemFontSize() {
    var remSize = window.innerWidth * 100 / 1920;
    document.querySelector("html").style.fontSize = remSize + "px";
    console.log(window.innerWidth);
    console.log(remSize);
}
setRemFontSize();
window.addEventListener("resize", function () {
    setTimeout(function () {
        setRemFontSize();
    }, 100)
});