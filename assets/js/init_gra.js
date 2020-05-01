
$(window).load(function(){ $("html,body").animate({scrollTop: 0}, 500);
/*load_zegar('container_zegar');*/
var NowaGraLiczenie = new GraLiczenieSVG("kontener_liczenie");
setTimeout(function() {  

document.getElementById('RunGameLiczenie').addEventListener('click',
 function (event) {
	 NowaGraLiczenie.Show();
	 $('#kontroler').animate({"increment": 750
	 }, 
	 {duration: 1000, step: function (top) {this.setAttribute("transform", "translate(0," + (top-750) + ")");}});
	 }, false);
$('#monitor').removeClass("title");}, 8000); 
});
