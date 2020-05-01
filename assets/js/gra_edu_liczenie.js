function GraLiczenieSVG(contener_id){

var check =  checkBrowser();
if (check==-1){return;}
var MarginX_letter = 50;
var	MarginY_letter = 60;
var	points =[];
var	nr_kolejki =0;
var	licznik_pkt = 1;
var	radius_big = 18;
var	radius_enlarge = 23;
var	radius =14;
var	licznik_pkt_timer =0;
var	obj_coord = 0;
var	linie =[];
var answers =[];
var	audio =[];
var	Label1=0;
var	brakujaca_litera = true;
var sciezka_sound = location.protocol + '//' + location.host + '/' + "assets/sound/liczby/";
var	komendy =[];
var	funkcjePHP_url =  location.protocol + '//' + location.host + '/' + "assets/json-data_punkty.php";
var	komendy_read =[];
var	punkty_rect =[];
var	Grupa_readInfo = 0;
var	intervalId_sound = 0;
var	intervalID_smile = 0;
var	grupa_definicji_array =[];
var	answer_loop =0;
var	Kolejka =[];
var balls =[];
var Grupa_dlugosc =[];
var ballsPairs =[];
var correct_answer ;
var requestAnimationFrameID;
var toggleButton = {clicked: 0};
var config = {width: 100 , height: 100, radius: 50};
var MinInteger =1;
var MaxInteger = 7;
var kolejka_length =10;
var rysuj_podpowiedz_time=[];
var	wp = document.getElementById(contener_id);
var	obrazki = [];
	/*  wywoalania funkcji ladujacych*/
var	SVG = SVG_components;
	wp.style.display = 'none';
	wczytajWyrazenia();
	wczytajDefinicjeObrazki();
	wczytajObrazki();
	wczytajSounds();
	//- def odtepow translacji od 0,0-
	
	var svg = SVG.createSVGcanvas(wp.id, {width: 1140, height: 680 ,id: 'Gra_liczenie'});
				
		var rect = SVG.createRect({x:0,y:0, width:1140, height: 680});
		rect.setAttribute('fill','url(#background)');
		rect.setAttribute('stroke-width','4');
		svg.appendChild(rect);
		var rect_ramka_bounce = SVG.createRect({x:200, y:200, width: 900, height:520});
		rect_ramka_bounce.setAttribute('stroke','blue');
		rect_ramka_bounce.setAttribute('fill','transparent');
		rect_ramka_bounce.setAttribute('stroke-width','0');
		//rect_ramka_bounce.setAttribute('filter','url(#dropshadow)');
		svg.appendChild(rect_ramka_bounce);
		
		var licznik =0;
		
		var komenda = SVG.createText({x:300,y:70, id: 'text_komenda', klasa: 'graLiterki_text_header_odpowiedz'});		
		svg.appendChild(komenda); 
				
		var text_odp = SVG.createText({content: '', x:50,y:270, id: 'text_odpowiedz', klasa: 'graLiterki_text_header_odpowiedz'});
		text_odp.setAttribute('font-size', '40');
		svg.appendChild(text_odp); 
		var text_napis = SVG.createText({content: 'GRA W LICZENIE', x:30,y:660, id: 'text_napisy', klasa: 'graLiterki_text_header'});
		text_napis.setAttribute('fill', 'url(#gr-radial)');
		svg.appendChild(text_napis);
		var grupaPunkty = document.createElementNS("http://www.w3.org/2000/svg", "g");
		grupaPunkty.setAttribute('id', 'grupaPunkty');
		
		var grupa_obrazki = document.createElementNS("http://www.w3.org/2000/svg", "g");
			grupa_obrazki.setAttribute('id', 'grupa_obrazki');
			grupa_obrazki.setAttribute('transform', 'translate(200 70)');
			svg.appendChild(grupa_obrazki);	
		var grupa_buttons = document.createElementNS("http://www.w3.org/2000/svg", "g");
			grupa_buttons.setAttribute('id', 'grupa_buttons');
			grupa_buttons.setAttribute('transform', 'translate(200 150)');
			svg.appendChild(grupa_buttons);
		var grupa_tlo = document.createElementNS("http://www.w3.org/2000/svg", "g");
			grupa_tlo.setAttribute('id', 'grupa_tlo');
			grupa_tlo.setAttribute('class', 'grupa_tlo');
			svg.appendChild(grupa_tlo);
		var grupa_definicji = document.createElementNS("http://www.w3.org/2000/svg", "g");
			grupa_definicji.setAttribute('id', 'grupa_definicji');
			grupa_definicji.setAttribute('class', 'sprite');
			svg.appendChild(grupa_definicji);
		var grupa_obrazek = document.createElementNS("http://www.w3.org/2000/svg", "g");
			grupa_obrazek.setAttribute('id', 'grupa_obrazek');
			grupa_obrazek.setAttribute('opacity', '0');
			svg.appendChild(grupa_obrazek);
		var group = document.createElementNS("http://www.w3.org/2000/svg", "g");
		group.setAttribute('id', 'group');
		group.setAttribute('transform', 'translate(50 150)');
		
		/* build button show info*/
		use = SVG.createUse({x:-10,y:440, id: 'info', transform: 'translate(0 0) scale(0.7)',href: '#Read_info' });
		rect = SVG.createRect({x:-15,y:300, width:75, height: 75, klasa: 'graLiterki_buttony_nav'});
		rect.setAttribute('rx','5');
		rect.setAttribute('dane','clear');
		rect.addEventListener("click", show_info, false);
		rect.innerHTML ='<title>Pokaż opis gry</title>';
		group.appendChild(use);
		group.appendChild(rect);
		
		use = SVG.createUse({x:0,y:20, id: 'speed', transform: 'translate(70 395) scale(0.4)',href: '#icon_speed' });
		rect = SVG.createRect({x:65,y:400, width:75, height: 75, klasa: 'graLiterki_buttony_nav'});
		rect.setAttribute('rx','5');
		rect.setAttribute('dane','clear');
		rect.addEventListener("click", controlSpeed, false);
		rect.innerHTML ='<title>kontroler szybkości kulek w grze</title>';
		group.appendChild(use);
		group.appendChild(rect);
		/* stop :  'translate(5 -440) scale(2)' */
		use = SVG.createUse({x:-10,y:420, id: 'bounce', transform: 'translate(5 -440) scale(2)',href: '#stop_icon' });
		rect = SVG.createRect({x:-15,y:400, width:75, height: 75, klasa: 'graLiterki_buttony_nav'});
		rect.setAttribute('rx','5');
		rect.setAttribute('dane','clear');
		rect.addEventListener("click", controlAnim, false);
		rect.innerHTML ='<title>Wstrzymanie/Wznawianie animacji w grze</title>';
		group.appendChild(use);
		group.appendChild(rect);
		Grupa_dlugosc['level1'] = use;
		Grupa_dlugosc['level1'].setAttribute('visibility','hidden');
		
		use = SVG.createUse({x:-10,y:420, id: 'bounce', transform: 'translate(30 -840) scale(3)',href: '#start_icon' });
		rect = SVG.createRect({x:-15,y:400, width:75, height: 75, klasa: 'graLiterki_buttony_nav'});
		rect.setAttribute('rx','5');
		rect.setAttribute('dane','clear');
		rect.addEventListener("click", controlAnim, false);
		rect.innerHTML ='<title>Wstrzymanie/Wznawianie animacji w grze</title>';
		group.appendChild(use);
		group.appendChild(rect);
		Grupa_dlugosc['level2'] = use;
		Grupa_dlugosc['level2'].setAttribute('visibility','visible');
		
		use = SVG.createUse({x:210,y:350, id: 'exit_icon', transform:'translate(-140 -40) scale(1)',href: '#exit_icon' });
		rect = SVG.createRect({x:65,y:300, width:75, height: 75, klasa: 'graLiterki_buttony_nav'});
		rect.setAttribute('dane','exit');
		rect.setAttribute('rx','5');
		rect.innerHTML ='<title>Wyście z gry</title>';
		rect.addEventListener("click", exit_game, false);
		group.appendChild(use);
		group.appendChild(rect);
		
		use = SVG.createUse({x:105,y:340, id: 'back_icon', transform:'translate(-50 50) scale(0.5)',href: '#back_icon' });
		rect = SVG.createRect({x:-15,y:200, width:75, height: 75, klasa: 'graLiterki_buttony_nav'});
		rect.setAttribute('dane','back_icon');
		rect.setAttribute('rx','5');
		rect.addEventListener("click", NEXT, false);
		rect.innerHTML ='<title>Przejscie do wcześniejszego przykładu</title>';
		rect.myParam = -1;
		group.appendChild(use);
		group.appendChild(rect);
		
		use = SVG.createUse({x:140,y:250, id: 'forward_icon', transform:'translate(-50 50) scale(0.5)',href: '#forward_icon' });
		rect = SVG.createRect({x:65,y:200, width:75, height: 75, klasa: 'graLiterki_buttony_nav'});
		rect.setAttribute('dane','forward_icon');
		rect.setAttribute('rx','5');
		rect.addEventListener("click", NEXT, false);
		rect.innerHTML ='<title>Przejscie do następnego przykładu</title>';
		rect.myParam = 1;
		group.appendChild(use);
		group.appendChild(rect);
		svg.appendChild(group);
		
		var grupa_obrazek_smile = document.createElementNS("http://www.w3.org/2000/svg", "g");
			grupa_obrazek_smile.setAttribute('id', 'grupa_obrazek_smile');
			grupa_obrazek_smile.setAttribute('transform', 'translate(50 30)');
			svg.appendChild(grupa_obrazek_smile);
		var grupa_komendy = document.createElementNS("http://www.w3.org/2000/svg", "g");
			grupa_komendy.setAttribute('id', 'grupa_komendy');
			grupa_komendy.setAttribute('transform', 'translate(0 30)');
			svg.appendChild(grupa_komendy);
		
		group = document.createElementNS("http://www.w3.org/2000/svg", "g");
		group.setAttribute('id', 'groupclear');
		
		
		wp.appendChild(svg);
		
			/* write info  */
		//document.createElementNS("http://www.w3.org/2000/svg", "tspan");
		Grupa_readInfo = document.createElementNS("http://www.w3.org/2000/svg", "g");
		Grupa_readInfo.setAttribute('id', 'group_readInfo');
		Grupa_readInfo.setAttribute('visibility', 'hidden');
		
		/* tutaj nie korzystam z fabryki */
		var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		rect.setAttribute('width','700');
		rect.setAttribute('height','270');
		rect.setAttribute('x', '0');
		rect.setAttribute('y', '0');
		rect.setAttribute('fill','yellow');
		rect.setAttribute('opacity','0.9');
		rect.setAttribute('stroke','url(#stroke)');
		rect.setAttribute('stroke-width','4');
		Grupa_readInfo.appendChild(rect); 
		/* 1 linia tekstu , objasnienie ikon */
		var text_info =  SVG.createText({content: '', x:0,y:0, id: 'objasnienie_text1', klasa: 'verse'});
		use =  SVG.createUse({x:10,y:10, id: 'txt_Read_info', transform: 'translate(0 0) scale(0.6)',href: '#Read_info' });
		var linia1 = SVG.createTextSpan({content: 'Instrukcja obsługi gry /objaśnienia', x:60,dy:'1.2em', id: 'Read_info_linia1'});
		var linia2 = SVG.createTextSpan({content:  'Należy połączyć ze sobą punkty w rosnącej kolejności (od 1 do ostatniej liczby)', x:60,dx: '1em',dy:'1.2em', id: 'Read_info_linia2'});
		var linia3 = SVG.createTextSpan({content: 'Zaczynamy od wciśnięcia kulki jedynki "1"', x:60,dx: '1em',dy:'1.2em', id: 'Read_info_linia3'});
		text_info.appendChild(linia1);
		text_info.appendChild(linia2);
		text_info.appendChild(linia3);
		Grupa_readInfo.appendChild(use); 
		Grupa_readInfo.appendChild(text_info); 
		
		/* 2 linia tekstu , objasnienie ikon */
		var text_info =  SVG.createText({content: '', x:0,y:0, id: 'objasnienie_text2', klasa: 'verse', transform: 'translate(0 65)'});
		use = SVG.createUse({x:-105,y:45, id: 'txt_forward_icon', transform: 'translate(0 0) scale(0.5)',href: '#forward_icon' });
		var linia1 = SVG.createTextSpan({content: 'Ikona "Kolejny obrazek"', x:60,dy:'1.2em', id: 'forward_icon_linia1'});
		var linia2 = SVG.createTextSpan({content:  'Przycisk służy do włączenia kolejnego obrazka (w prawo ">>")', x:60,dx: '1em',dy:'1.2em', id: 'forward_icon_linia2'});
		
		text_info.appendChild(linia1);
		text_info.appendChild(linia2);
		Grupa_readInfo.appendChild(use); 
		Grupa_readInfo.appendChild(text_info); 
		
		/* 3 linia tekstu , objasnienie ikon */
		var text_info =  SVG.createText({content: '', x:0,y:0, id: 'objasnienie_text3', klasa: 'verse', transform: 'translate(0 120)'});
		use = SVG.createUse({x:15,y:245, id: 'txt_back_icon', transform: 'translate(0 0) scale(0.5)',href: '#back_icon' });
		var linia1 = SVG.createTextSpan({content: 'Ikona "Poprzedni obrazek"', x:60,dy:'1.2em', id: 'back_icon_linia1'});
		var linia2 = SVG.createTextSpan({content:  'Przycisk służy do włączenia poprzedniego obrazka (w lewo "<<")', x:60,dx: '1em',dy:'1.2em', id: 'back_icon_linia2'});
		
		text_info.appendChild(linia1);
		text_info.appendChild(linia2);
		Grupa_readInfo.appendChild(use); 
		Grupa_readInfo.appendChild(text_info); 
				
		/* 5 linia tekstu , objasnienie ikon */
		var text_info =  SVG.createText({content: '', x:0,y:0, id: 'objasnienie_text4', klasa: 'verse', transform: 'translate(0 170)'});
		use = SVG.createUse({x:15,y:260, id: 'txt_exit_icon', transform: 'translate(0 0) scale(0.7)',href: '#exit_icon' });
		var linia1 = SVG.createTextSpan({content: 'Ikona "Koniec gry"', x:60,dy:'1.2em', id: 'exit_icon_linia1'});
		var linia2 = SVG.createTextSpan({content:  'Przycisk służy do wyjścia z gry', x:60,dx: '1em',dy:'1.2em', id: 'exit_icon_linia2'});
		
		text_info.appendChild(linia1);
		text_info.appendChild(linia2);
		Grupa_readInfo.appendChild(use); 
		Grupa_readInfo.appendChild(text_info);
		svg.appendChild(Grupa_readInfo);
		
		
		// metody prywatne-----------------------------
		function show_info(evt){
			if (Grupa_readInfo.getAttribute('visibility') == 'visible'){
			Grupa_readInfo.setAttribute('visibility', 'hidden');
			}else{
			Grupa_readInfo.setAttribute('visibility', 'visible');
			}
		}
		
		function getWindowSize(){
			 var d= document, root= d.documentElement, body= d.body;
			 var wid= window.innerWidth || root.clientWidth || body.clientWidth, 
			 hi= window.innerHeight || root.clientHeight || body.clientHeight ;
			// console.log('width: '+ [wid,hi]);
			 return [wid,hi];
		}
		function exit_game(evt){
			wp.style.display = 'none';
			window.cancelAnimationFrame(requestAnimationFrameID);
			clearInterval(intervalId_sound);
			$('#kontroler').css({"min-height": 0}).animate({"min-height": -750}, {duration: 1000, step: function (top) {this.setAttribute("transform", "translate(0," + top + ")");}});
		}
		
		function wczytajWyrazenia(){
			for (var i = 0; i < kolejka_length; i++) {
				 Stworz_kolejke();
			}
		  
		}
		function Stworz_kolejke(){
			var x = getRandomInt(MinInteger,MaxInteger);
			var y= getRandomInt(MinInteger,MaxInteger);
			var obj ={ x: x, y: y, akcja: (x<y ? '+' : '-')};
			Kolejka.push(obj);
		}
		function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		function wczytajSounds(){
		   var dane='typ=5';
		   $.ajax({
			 type: "POST",url:funkcjePHP_url ,data: dane, async: true,dataType: "json",
			 beforeSend: function(x) {
				  if(x && x.overrideMimeType) {
				   x.overrideMimeType("application/j-son;charset=UTF-8");
				  }
			},
			 success: function(data_return){
				for (var i = 0, len = data_return.length; i < len; i++) {
					//literki[data_return[i].nazwa] = (data_return[i].d);
					audio[data_return[i].nazwa] = createAudioElement(sciezka_sound, data_return[i].id ,'audio/mpeg'); 
					}
					console.log('wgrano dzwieki');
				 }
		  }); 
		}
		function wczytajDefinicjeObrazki(){
		   var dane='typ=2';
		   $.ajax({
			 type: "POST",url:funkcjePHP_url ,data: dane, async: true,dataType: "json",
			 beforeSend: function(x) {
				  if(x && x.overrideMimeType) {
				   x.overrideMimeType("application/j-son;charset=UTF-8");
				  }
			},
			 success: function(data_return){
				for (var i = 0, len = data_return.length; i < len; i++) {
					obrazki.push(data_return[i]);
					}
					console.log(obrazki);
				 }
		  }); 
		}
		function wczytajObrazki(){
		   var dane='typ=4';
		   $.ajax({
			 type: "POST",url:funkcjePHP_url ,data: dane, async: true,dataType: "json",
			 beforeSend: function(x) {
				  if(x && x.overrideMimeType) {
				   x.overrideMimeType("application/j-son;charset=UTF-8");
				  }
			},
			 success: function(data_return){
				for (var i = 0, len = data_return.length; i < len; i++) {
					grupa_definicji_array[data_return[i].nazwa] = (data_return[i].d);
					//grupa_definicji.innerHTML += data_return[i].d;
					}
					console.log('wgrano obrazki');
				 }
		  }); 
		}
				
		function losujKolejny(max, used, calls){
			
			 if( calls == void 0 ) calls = 0;
			 if( calls++ > 10000 ) return undefined;
			 if( used.length >= max ) return undefined;
			 var newNum = Math.floor(Math.random() * max );
			 for (i=0 ; i<=max ; i++){
				   if($.inArray(newNum, used) === -1){
					 used.push(newNum);
					 //return newNum;
				   }else{
					 return losujKolejny(max,used,calls);
				   }
			 }
		}
		function NEXT(evt){
			var krok =0;
			clearInterval(intervalId_sound);
			clearInterval(licznik_pkt_timer);
			for (var i =0; i< parseInt(correct_answer);i++){
				clearInterval(rysuj_podpowiedz_time[i]);
			}
			answer_loop = 0;
			licznik_pkt= 1;
			balls=[];
			text_odp.textContent = '';
			text_odp.setAttribute('font-size', '60');
			try{
			   krok =  evt.target.myParam;
			}catch(e){
			  console.log('Init wywolanie'); 
			}
			nr_kolejki = ( krok>0 ? Kolejka.next() : Kolejka.prev());
			grupa_buttons.innerHTML ='';
			var x=0;
			var y=0;
			var liczby = [(nr_kolejki.akcja == '+' ? parseInt(nr_kolejki.x) + parseInt(nr_kolejki.y) : Math.abs(parseInt(nr_kolejki.x) - parseInt(nr_kolejki.y))),getRandomInt(MinInteger,MaxInteger),getRandomInt(MinInteger,MaxInteger),getRandomInt(MinInteger,MaxInteger),getRandomInt(MinInteger,MaxInteger+MaxInteger),getRandomInt(MinInteger,MaxInteger+MaxInteger),getRandomInt(MinInteger,MaxInteger+MaxInteger),getRandomInt(MinInteger,MaxInteger+MaxInteger)];
				
			var uniqueliczby = liczby.unique();
			console.log(uniqueliczby);
			/*for (var i = 0; i< 3; i++) {
				x = getRandomInt(0,MaxInteger);
				y = getRandomInt(-MaxInteger,MaxInteger);
				var liczba = uniqueliczby[i];
				AddButtonsLetters(250+x*70,200+y*20,uniqueliczby[i],i);
				AddButtonsLetters(300,300,uniqueliczby[1],1);
				AddButtonsLetters(450,300,uniqueliczby[2],2);
			}*/
			komendy=[];
			komendy_read=[];
			losujKolejny( obrazki.length, komendy);
			AddButtonsLetters(300,100,uniqueliczby[0],0);
			AddButtonsLetters(650,200,uniqueliczby[3],3);
			AddButtonsLetters(200,300,uniqueliczby[1],1);
			AddButtonsLetters(450,300,uniqueliczby[2],2);
			
			komenda.textContent = (nr_kolejki.akcja == '+' ? nr_kolejki.x + ' '+ nr_kolejki.akcja +' '+nr_kolejki.y + ' = ?': (nr_kolejki.y>=nr_kolejki.x ? nr_kolejki.y + ' '+ nr_kolejki.akcja +' '+nr_kolejki.x + ' = ?' : nr_kolejki.x + ' '+ nr_kolejki.akcja +' '+nr_kolejki.y + ' = ?') );
			komendy_read.push((nr_kolejki.akcja == '+' ? nr_kolejki.x : (nr_kolejki.y>=nr_kolejki.x ? nr_kolejki.y : nr_kolejki.x)));
			komendy_read.push((nr_kolejki.akcja == '+' ? 'ADD' : 'SUBTRACT'));
			komendy_read.push((nr_kolejki.akcja == '+' ? nr_kolejki.y : (nr_kolejki.y>=nr_kolejki.x ? nr_kolejki.x : nr_kolejki.y)));
			correct_answer = (nr_kolejki.akcja == '+' ? parseInt(nr_kolejki.x) + parseInt(nr_kolejki.y) : Math.abs(parseInt(nr_kolejki.x) - parseInt(nr_kolejki.y)));
			//AddHandlerFillObject(komendy_read[0]);
			//AddHandlerFillObject(komendy_read[1]);
			//AddHandlerFillObject(komendy_read[2]);
			//dodaj_obrazek();
			//animuj_obrazki();
			//animuj_obrazki_tlo();
			rysuj_podpowiedz();
			play_chars(komendy_read,function() { console.log("all done!");
			  /* try{
			    if ( audio['PODAJ_ODP'].duration >0){
					audio['PODAJ_ODP'].play();
				}
			   }catch(e){
			   clearInterval(intervalId_sound);
			   }*/  
			});
			
			window.cancelAnimationFrame(requestAnimationFrameID);  
			//setTimeout(function() {try { audio['press1'].play(); } catch(e) {console.log(e);}}, 2000);
			// licznik_pkt_timer = setInterval( animuj_odpowiedz, 300 );
			 requestAnimationFrameID = window.requestAnimationFrame(animuj_punkty);
			// toggleButton.clicked = false;
		}
		
		function dodaj_obrazek(){
			grupa_obrazek.innerHTML ='';
			grupa_obrazek.innerHTML = grupa_definicji_array[obrazki[nr_kolejki]];
			obj_coord = getSizeAndMainPath(grupa_obrazek.childNodes[0]);	
			//console.log(obj_coord);
		}
		
		function processBallCollisions(ball) {
		  for (var i = 0; i < balls.length; i++) {
			if (balls[i].grupa.i == ball.grupa.i)
			  continue; // Don't bother to see if the ball has collided with itself - a waste of processing time.

			if (ball.isOverlapping(balls[i]))
			{
				ball.processCollision(balls[i]);
				//var symbol = balls[i].grupa.i  ball.grupa.i
				//ballsPairs.push(ball.grupa.pairs);
			}else{ball.collision =0;}
		  }
		}
		function animuj_punkty(){
		   
			for (var i = 0; i < balls.length; i++) {
				var ball = balls[i];
				 // Move the ball by a small amount.
				ball.move();
				processBallCollisions(ball); // If this ball has collided with another, change the direction of both.
				processWallCollision(ball,rect_ramka_bounce.getBBox()); 
			  }
			window.cancelAnimationFrame(requestAnimationFrameID); // Stop calling the function specified via requestAnimationFrame(), which 
			//var that = this; // Preserves the correct "this" pointer.
			requestAnimationFrameID = window.requestAnimationFrame(function () { animuj_punkty() });
			//console.log(ballsPairs);
			ballsPairs=[];
					
		}
		
		function smile_obrazek(typ){
			grupa_obrazek_smile.innerHTML ='';
			use = document.createElementNS("http://www.w3.org/2000/svg", "use");
			use.setAttributeNS('http://www.w3.org/1999/xlink', 'href',  '#'+ typ); 
			use.setAttribute('id', 'uasee');
			use.setAttribute('x', '10');
			use.setAttribute('y', '10');
			use.setAttribute('class', 'fadeoutLoad'); //class=\"icon_smiley\"
			//use.setAttribute('transform', 'translate(750 0)');
			grupa_obrazek_smile.appendChild(use);
			clearInterval(intervalID_smile);
			intervalID_smile =setTimeout(function() { grupa_obrazek_smile.innerHTML ='';}, 3000);
		}
		
		function getSizeAndMainPath(rysunek){
			// rysunbek to obiekt svg (grupa
			//console.log(rysunek.getBBox());
			var path = 0;
			return {box: rysunek.getBBox(), mainpath: path };
		}
		/* do przerobienia, tu musi byc czytanie dłuzszych liczb */
		function play_Digits(numer) {
			
			if (parseInt(numer)>20){
				try { audio[numer.substring(0, 1)+'0'].play(); 
					var dur = audio[numer.substring(0, 1)+'0'].duration;	 
					setTimeout(function() { try { audio[numer.substring(1, 2)].play(); } catch(e) {console.log(e);} }, dur*1000);
				} catch(e) {console.log(e);} 
			}else{ /* odtwarzanie liczb < 21 oraz słow: dodac, odjac*/
				if(audio[numer].duration>0){try { audio[numer].play(); } catch(e) {console.log(e);}}
			}				
		}
		function play_chars(word, onSuccess) {
			var i = 0;
			intervalId_sound = setInterval(function() { 
							if (i >= word.length) { 
								clearInterval(intervalId_sound);
								onSuccess();
							} else {
								if (audio[word[i]].duration >0){
										audio[word[i]].play();
									}
								i++;
							}
						}, 2000)
		}
		function createAudioElement(src, nazwa, typ) {
			var x = document.createElement("AUDIO");
			if (typ== "audio/mpeg") {
				x.setAttribute("src", src + nazwa+".mp3");
			}
			if (typ== "audio/wav") {
				x.setAttribute("src",src + nazwa+".wav");
			}
			x.setAttribute("id",'m_'+ nazwa);
			return x; //document.body.appendChild(x);
		}
		function rysuj_podpowiedz(){
			var numer = komendy[0];
			grupa_obrazek.innerHTML ='';
			grupa_obrazki.innerHTML ='';
			grupa_obrazki.setAttribute('transform','translate(200 70) scale(1)');
			var x =0;
			var y=0;
			grupa_obrazek.innerHTML = grupa_definicji_array[obrazki[numer]];
			console.log(grupa_obrazek.getBBox());
			obj_coord = getSizeAndMainPath(grupa_obrazek.childNodes[0]);
			var skala = Math.min( config.width/obj_coord.box.width,  config.width/obj_coord.box.height)*0.5;
			for (var i =0; i< parseInt(correct_answer);i++){
				x =i*obj_coord.box.width*0.46; 
				setActions(i,x,skala, obj_coord, (i==correct_answer-1 ? true : false));
			}
			
		}
		
		function setActions(i,x,skala, obj_coord,log){
			rysuj_podpowiedz_time[i] = setTimeout(function() { 
						start_draw(x,skala, obj_coord, log);
					}, i*300);
		}
		function start_draw(x,skala, obj_coord, log){
			var y=0;
			var numer = komendy[0];
			
			var group_pojazd = document.createElementNS("http://www.w3.org/2000/svg", "g");
			group_pojazd.innerHTML = grupa_definicji_array[obrazki[numer]] + '<title>Policz nas, a dowiesz się jaka jest prawidłowa odpowiedź</title>';
			group_pojazd.setAttribute('transform', 'translate('+ (-obj_coord.box.x + x - obj_coord.box.x*Math.log2(skala)) +' '+ (-obj_coord.box.y + y - obj_coord.box.y*Math.log2(skala))+') scale('+ skala +')');
			group_pojazd.setAttribute('opacity', '1');
			group_pojazd.setAttribute('fill', 'transparent');
			grupa_obrazki.appendChild(group_pojazd);
			if (log) {
				console.log(grupa_obrazki.getBBox());
				// trzeba przeskalowac i dostosowac do ookna , zeby lepeij wygladalo
				var wth = rect_ramka_bounce.getBBox().width;
				var sc = Math.min(6,wth*0.9 / grupa_obrazki.getBBox().width);
				console.log('wth: '+ wth + '; sc: '+ sc);
				grupa_obrazki.setAttribute('transform','translate(' + (100 + (wth*0.9 / grupa_obrazki.getBBox().width>6 ? sc*grupa_obrazki.getBBox().x : 1) - sc*grupa_obrazki.getBBox().x) +' '+ (70 -sc*grupa_obrazki.getBBox().y )+') scale('+ sc +')');
			}
		}
		
		function wskaz_liczbe(evt){
			if( parseInt(evt.target.getAttribute('dane')) == correct_answer){
				text_odp.textContent = correct_answer;
				
				smile_obrazek('icon_good');
				var zm = komenda.textContent;
				clearInterval(intervalId_sound);
				komenda.textContent = zm.replace('?', correct_answer);
				try { audio[evt.target.getAttribute('dane')].play(); } catch(e) {console.log(e);}
				setTimeout(function() { 
						try { audio['GOOD1'].play(); } catch(e) {console.log(e);}
					}, 1000)
				window.cancelAnimationFrame(requestAnimationFrameID); // Stop calling the function specified via requestAnimationFrame(), which stops the animation.
				//toggleButton.clicked = !toggleButton.clicked;
				
				setTimeout(function() {NEXT();}, 2500);
			}else{
				text_odp.textContent ="";
				smile_obrazek('icon_bad');
				clearInterval(intervalId_sound);
				try { audio[evt.target.getAttribute('dane')].play(); } catch(e) {console.log(e);}
				setTimeout(function() { 
						try { audio['BAD1'].play(); } catch(e) {console.log(e);}
					}, 1000)
				play_chars(komendy_read,function() { console.log("all done!")});
			}
		}
		function controlAnim() {
			/*
			if (Grupa_dlugosc['level1'].getAttribute('visibility') == 'visible'){
			Grupa_dlugosc['level1'].setAttribute('visibility', 'hidden');
			Grupa_dlugosc['level2'].setAttribute('visibility', 'visible');
			text_napis.textContent = "Dużo punktów";
			}else{
			Grupa_dlugosc['level1'].setAttribute('visibility', 'visible');
			Grupa_dlugosc['level2'].setAttribute('visibility', 'hidden');
			text_napis.textContent = "Mało punktów";
			}
			*/
		  if (toggleButton.clicked) {
			Grupa_dlugosc['level1'].setAttribute('visibility', 'hidden');
			Grupa_dlugosc['level2'].setAttribute('visibility', 'visible');
			text_napis.textContent = "Wznowiono animację kulek";
			requestAnimationFrameID = window.requestAnimationFrame(animuj_punkty); // Call the doAnim() function. Cancel "requestAnimationFrameID" to stop this invocation (and thus the animation).
			toggleButton.clicked = !toggleButton.clicked; 
		  }
		  else {
			Grupa_dlugosc['level1'].setAttribute('visibility', 'visible');
			Grupa_dlugosc['level2'].setAttribute('visibility', 'hidden');
			text_napis.textContent = "Wstrzymano animację kulek";
			window.cancelAnimationFrame(requestAnimationFrameID); // Stop calling the function specified via requestAnimationFrame(), which stops the animation.
			toggleButton.clicked = !toggleButton.clicked; 
		  }
		}
		function controlSpeed() {	
		  if (constants.delay == 1) {
				constants.delay = 3;
		  }
		  else {
				constants.delay = 1;
		  }
		}
		this.Show = function() { wp.style.display = 'inline'; NEXT();}
		function AddButtonsLetters(x,y,liczba,i){
			
			var numer = komendy[i]; //getRandomInteger(0,obrazki.length-1);
			var group = document.createElementNS("http://www.w3.org/2000/svg", "g");
			group.setAttribute('id', 'group'+liczba);
			var label = SVG.createText({content: liczba , x:x+ MarginX_letter,y: y+ MarginY_letter, id: 'literka_'+liczba, klasa: 'graLiczenie_answers_text' });
			rect = SVG.createRect({x: x,y: y, width: config.width, height: config.height, klasa: 'graLiczenie_answers'});
			rect.setAttribute('rx','10');
			rect.setAttribute('fill','transparent');
			//rect.setAttribute('dane',liczba);
			var r = config.width;
			
			grupa_obrazek.innerHTML ='';
			grupa_obrazek.innerHTML = grupa_definicji_array[obrazki[numer]];
			obj_coord = getSizeAndMainPath(grupa_obrazek.childNodes[0]);
			//console.log(obj_coord.box);	
			var circle = SVG.createCircle({x: x+r*0.5,y: y+r*0.5, r: r*0.75, klasa: 'graLiczenieCircle_answers'});
			circle.setAttribute('cursor','pointer');
			circle.setAttribute('dane',liczba);
			circle.setAttribute('filter','url(#dropshadow)');
			var circlePoint = SVG.createCircle({x: x+r*0.5,y: y+r*0.5, r: 5, klasa: 'graLiczenieCircle_fill'});
			var skala = Math.min( config.width/obj_coord.box.width,  config.width/obj_coord.box.height);
			var group_pojazd = document.createElementNS("http://www.w3.org/2000/svg", "g");
			group_pojazd.innerHTML = grupa_definicji_array[obrazki[numer]];
			group_pojazd.setAttribute('transform', 'translate('+ (-obj_coord.box.x + x - obj_coord.box.x*Math.log2(skala)) +' '+ (-obj_coord.box.y + y - obj_coord.box.y*Math.log2(skala))+') scale('+ skala +')')
			group.appendChild(group_pojazd);
			
			circle.addEventListener("click", wskaz_liczbe, false);
			group.appendChild(label);
			group.appendChild(circlePoint);
			group.appendChild(rect); 
			group.appendChild(circle);
			group.cx =  x+r*0.5;
			group.cy =  y+r*0.5;
			group.i = i;
			group.id = liczba;
			group.answer = (i==0 ? true : false);
			group.r =  r*0.75+5;
			group.setAttribute('transform', 'translate(0 0)')
			group.v = new Vector(getRandomInteger(-20, 20),getRandomInteger(-30, 20));
			balls.push(new SvgGroupElement(group));
			grupa_buttons.appendChild(group);	
		}
		
 }