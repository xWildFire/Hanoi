document.getElementsByTagName("input")[0].onchange = function(){
	generate(this.value < 1 ? 1 : (this.value > 10 ? 10 : this.value));
};
document.getElementsByTagName("input")[1].onclick = function(){
	var val = document.getElementsByTagName("input")[0].value;
	if(val.length > 0){
		generate(val < 1 ? 1 : (val > 10 ? 10 : val));
	}
};
var tower = document.getElementsByClassName("tower");
var discs = 0;
var steps = 0;
var timer = null;
var start = null;
var up = null;
function restart(){
	if(timer != null){
		clearInterval(timer);
		timer = null;
	}
	document.getElementsByClassName("time")[0].innerHTML = "00:00";
	document.getElementsByClassName("time")[0].style.color = "red";
	steps = 0;
	start = null;
	if(up != null)
		up.classList.remove("up");
	up = null;
	for(var i = 0; i < tower.length; i++){
		var container = tower[i].firstElementChild;
		container.innerHTML = "";
	}
}
function generate(dd){
	discs = dd;
	restart();
	var container = tower[0].firstElementChild;
	for(var i = 1; i <= discs; i++){
		var disc = document.createElement("div");
		var txt = document.createTextNode(i);
		disc.appendChild(txt);
		disc.className = "disc size"+i;
		container.appendChild(disc);
	}
}
for(var i = 0; i < tower.length; i++){
	tower[i].addEventListener("click", function(){
		var container = this.firstElementChild;
		if(up !== null){
			++steps;
			if(container.firstElementChild != null){
				var put_size = parseInt(up.className.replace("disc size", ''));
				var size = parseInt(container.firstElementChild.className.replace("disc size", ''));
				if(put_size > size)
					return false;
			}
			up.classList.remove("up");
			if(this != up.parentNode.parentNode)
				container.insertBefore(up,container.firstElementChild);
			up = null;
			if(tower[tower.length-1].firstElementChild.children.length == discs){
				clearInterval(timer);
				timer = null;
				document.getElementsByClassName("time")[0].style.color = "green";
				d = new Date(Date.now()-start);
				d = d < 1000 ? d.getMilliseconds()+"ms" : (d.getMinutes()+"m"+d.getSeconds()+"s").replace("0m", "");
				setTimeout(function(){alert("Gratulacje wygrałeś!\nBłędy = "+(steps-(Math.pow(2, discs)-1))+"\nCzas = "+d);},200);
			}
		}else if(container.firstElementChild != null){
			if(start == null){
				start = Date.now();
				timer = setInterval(function(){
					d = new Date(Date.now()-start);
					document.getElementsByClassName("time")[0].innerHTML = (d.getMinutes() > 10 ? "" : "0")+d.getMinutes()+":"+(d.getSeconds() >= 10 ? "" : "0")+d.getSeconds();
				}, 500);
			}
			up = container.firstElementChild;
			up.classList.add("up");
		}
	});
}
