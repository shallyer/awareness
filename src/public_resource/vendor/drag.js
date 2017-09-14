//window.onload = function() {
//	dragStart($('.wholeNetwork .chartContainer'));
//}
function dragStart(obj){
	var aLi =obj;
	var disX = 0;
	var disY = 0;
	var minZindex = 1;
	var aPos =[];
	for(var i=0;i<aLi.length;i++){
		var t = aLi[i].offsetTop;
		var l = aLi[i].offsetLeft;
		var w = aLi[i].offsetWidth;
		var h = aLi[i].offsetHeight;
		aLi[i].style.top = t+"px";
		aLi[i].style.left = l+"px";
		aPos[i] = {left:l,top:t};
		aLi[i].index = i;
	}
	for(var i=0;i<aLi.length;i++){
		aLi[i].style.position = "absolute";
		aLi[i].style.margin = 0;
		setDrag(aLi[i]);
	}

	//拖拽
	function setDrag(obj){
		/*obj.onmouseover = function(){
		 obj.style.cursor = "move";
		 }*/
		obj.onmousedown = function(event){
			var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
			var scrollLeft = document.documentElement.scrollLeft||document.body.scrollLeft;
			obj.style.zIndex = ++minZindex;
			//obj.style.zIndex = 3;
			//$(obj).siblings().css('zIndex','1');
			//当鼠标按下时计算鼠标与拖拽对象的距离
			disX = event.clientX +scrollLeft-obj.offsetLeft;
			disY = event.clientY +scrollTop-obj.offsetTop;
			document.onmousemove=function(event){
				//当鼠标拖动时计算div的位置
				var l = event.clientX -disX +scrollLeft;
				var t = event.clientY -disY + scrollTop;
				//判定移动的是不是最大屏幕
				obj.style.left = l + "px";
				obj.style.top = t + "px";

				for(var i=0;i<aLi.length;i++){
					aLi[i].className = aLi[i].className;
				}
				var oNear = findMin(obj);
			}
			document.onmouseup = function(event){
				document.onmousemove = null;//当鼠标弹起时移出移动事件
				document.onmouseup = null;//移出up事件，清空内存
				//获得相对应index的左侧的li
				var dataI=$(obj).attr('data-i');
				var item=$('.nav ul li')[dataI];
				var itemW=item.offsetWidth;
				var itemH=item.offsetHeight;
				var itemT=item.offsetTop;
				if(obj.offsetLeft<w/4){
					$(obj).hide('slow');

				}else{
					//检测是否碰上，再交换位置
					var oNear = findMin(obj);

					if(oNear){
						var width1=$(oNear).width();
						var height1=$(oNear).height();
						var width2=$(obj).width();
						var height2=$(obj).height();
						oNear.style.zIndex = ++minZindex;
						obj.style.zIndex = ++minZindex;
						$(oNear).animate({
							left:aPos[obj.index].left,
							top:aPos[obj.index].top,
						},500);
						$(obj).animate({
							left:aPos[oNear.index].left,
							top:aPos[oNear.index].top,
						},500)

						//交换index
						oNear.index += obj.index;
						obj.index = oNear.index - obj.index;
						oNear.index = oNear.index - obj.index;

						$(obj).width(width1);
						$(obj).height(height1);
						$(oNear).width(width2);
						$(oNear).height(height2);

					}else{
						$(obj).animate({
							left:aPos[obj.index].left,
							top:aPos[obj.index].top,
						},500)
					}
				}
			}
			clearInterval(obj.timer);
			/*$('.nav ul').delegate('li','click', function () {
				var liIndex=$(this).index();
				if($('[data-i='+liIndex+']').css('display')=='none'){
					$(this).parent().parent().css('zIndex',++minZindex);
					console.log(minZindex);

					$('[data-i='+liIndex+']').show('slow').css('zIndex',++minZindex)
					console.log(minZindex);

				}
			})*/
			return false;//低版本出现禁止符号
		}
	}
	//碰撞检测
	function colTest(obj1,obj2){
		var t1 = obj1.offsetTop;
		var r1 = obj1.offsetWidth+obj1.offsetLeft;
		var b1 = obj1.offsetHeight+obj1.offsetTop;
		var l1 = obj1.offsetLeft;

		var t2 = obj2.offsetTop;
		var r2 = obj2.offsetWidth+obj2.offsetLeft;
		var b2 = obj2.offsetHeight+obj2.offsetTop;
		var l2 = obj2.offsetLeft;

		//Obj1只有和obj2有交集才说明碰撞
		if(t1<b2&&r1>l2&&b1>t2&&l1<r2){
			return true;
		}else{
			return false;
		}
	}
	//勾股定理求距离
	function getDis(obj1,obj2){
		var a = obj1.offsetLeft-obj2.offsetLeft;
		var b = obj1.offsetTop-obj2.offsetTop;
		return Math.sqrt(Math.pow(a,2)+Math.pow(b,2));
	}
	//找到距离最近的
	function findMin(obj){
		var minDis = 999999999;
		var minIndex = -1;
		for(var i=0;i<aLi.length;i++){
			if(obj==aLi[i])continue;
			if(colTest(obj,aLi[i])){
				var dis = getDis(obj,aLi[i]);
				if(dis<minDis){
					minDis = dis;
					minIndex = i;
				}
			}
		}
		if(minIndex==-1){
			return null;
		}else{
			return aLi[minIndex];
		}
	}
}




