require.ensure(['jtopo'], function(){
    }, 'jtopo'); // 第三个参数设置打包名称
require('jtopo');
var topoConfig ={
	version:'0.0.1',
	nodesize:0,
	linkarray:[],
	linknodearray:[],
	currentLine:null,
	addLinkNodeArg:{
		beginNode:null,
		endNode:null,
		templinkNodeA:null,
		templinkNodeZ:null,
		tempCreateLink:null,
		confirmLink:null,
		linkType:null,
		lineInfo:{
            "deviceid": "",
            "elementType": "link",
            "deviceA": "",
            "deviceZ": "",
            "scaleX": "1",
            "scaleY": "1",
            "linkType": ""
		}
	},
	nodeClickFtn:function(e,_mainscene,_callback){
		var _self =this;
		if(e.button == 2){
        	_self.addLinkNodeArg.beginNode = null;
        	_self.addLinkNodeArg.endNode = null;
            _mainscene.remove(_self.addLinkNodeArg.tempCreateLink);
            return;
        };
    	if(e.target!= null && e.target instanceof JTopo.Node){
            if(_self.addLinkNodeArg.beginNode == null){
                _self.addLinkNodeArg.beginNode = e.target;
                _self.addLinkNodeArg.templinkNodeA.setLocation(e.x, e.y);
                _mainscene.add(_self.addLinkNodeArg.tempCreateLink);
                //_self.addLinkNodeArg.templinkNodeZ.setLocation(e.x, e.y);
            }else if(_self.addLinkNodeArg.beginNode !== e.target){
//          	console.log(_self.addLinkNodeArg.beginNode)
                _self.addLinkNodeArg.endNode = e.target;
                switch(_self.linkType){
					case 'link':
					//连线
//					console.log("linkType:"+_self.linkType);
					_self.addLinkNodeArg.confirmLink = new JTopo.Link(_self.addLinkNodeArg.beginNode,_self.addLinkNodeArg.endNode);
					break;
					case 'fold_link':
					//折线
//					console.log("linkType:"+_self.linkType);
					_self.addLinkNodeArg.confirmLink = new JTopo.FoldLink(_self.addLinkNodeArg.beginNode,_self.addLinkNodeArg.endNode);
					break;
					case 'flexional_link':
					//二次折线
//					console.log("linkType:"+_self.linkType);
					_self.addLinkNodeArg.confirmLink = new JTopo.FlexionalLink(_self.addLinkNodeArg.beginNode,_self.addLinkNodeArg.endNode);
					break;
				};
                if(typeof(_callback)=='function'){
                	_callback(_self.addLinkNodeArg.confirmLink);
                }else{
//              	console.log("_callback type is not function，Please check type");
                };
                //confirmlink.direction = direction || 'horizontal';
                _self.addLinkNodeArg.lineInfo['linkType']=_self.linkType;
                _self.addLinkNodeArg.lineInfo['deviceA']=_self.addLinkNodeArg.beginNode.suateamdefine.deviceid;
                _self.addLinkNodeArg.lineInfo['deviceZ']=_self.addLinkNodeArg.endNode.suateamdefine.deviceid;
                _self.addLinkNodeArg.confirmLink.suateamdefine=_self.addLinkNodeArg.lineInfo;
                _self.addLinkNodeArg.confirmLink.click(function(e){
                	if(e.target.suateamdefine.elementType=='link'){
                		_self.currentLine=e.target;
                	}
                 })
               	_mainscene.add(_self.addLinkNodeArg.confirmLink);
                _self.addLinkNodeArg.beginNode=null;
                _mainscene.remove(_self.addLinkNodeArg.tempCreateLink);
               
            }else{
                _self.addLinkNodeArg.beginNode=null;
            }
    	}else{
        	_mainscene.remove(_self.addLinkNodeArg.tempCreateLink);
    	};
	},
	initRender:function(_getjson,_mainscene,_mainstage){
		var _self=this;
		var getdata=_getjson;
		var getnodenum=getdata.nodenum;
		var createElement=[];
		for(var a in getdata)a=='childs'?createElement=getdata[a]:createElement=[];
		_self.linkarray=[];
		createElement.forEach(function(e){
			if(e.elementType=='node'){
				_self.nodesize+=1;
				_mainscene.add(_self.createNode(e.x,e.y,e.nodeImage,e));
				if(_self.nodesize==getnodenum){
//					console.log("Node Create Finshed");
				}
			}else if(e.elementType=='link'){
				_self.linkarray.push(e);			
			}		
		})
		var getcreatednode=_mainscene.childs;
		_self.linknodearray=[];
		_self.linkarray.forEach(function(e){
			var linkdeviceA=e.deviceA;
			var linkdeviceZ=e.deviceZ;
			var templinknodeA=null;
			var templinknodeZ=null;
			for(var a=0;a<getcreatednode.length;a++){
				if(getcreatednode[a].suateamdefine.deviceid==linkdeviceA){
					templinknodeA=getcreatednode[a];
				}else if(getcreatednode[a].suateamdefine.deviceid==linkdeviceZ){
					templinknodeZ=getcreatednode[a];
				};
			};
			_self.linknodearray.push({nodeA:templinknodeA,nodeZ:templinknodeZ,option:e});
		});
		for(var a=0;a<_self.linknodearray.length;a++){
			switch(_self.linknodearray[a].option.linkType){
				case 'link':
				//连线
//				console.log("linkType:"+_self.linknodearray[a].option.linkType);
				var templink = new JTopo.Link(_self.linknodearray[a].nodeA,_self.linknodearray[a].nodeZ);
				break;
				case 'fold_link':
				//折线
				console.log("linkType:"+_self.linknodearray[a].option.linkType);
				var templink =new JTopo.FoldLink(_self.linknodearray[a].nodeA,_self.linknodearray[a].nodeZ);
				break;
				case 'flexional_link':
				//二次折线
//				console.log("linkType:"+_self.linknodearray[a].option.linkType);
				var templink = new JTopo.FlexionalLink(_self.linknodearray[a].nodeA,_self.linknodearray[a].nodeZ);
				break;
			};
			templink.suateamdefine=_self.linknodearray[a].option;
			templink.click(function(e){
	         	if(e.target.suateamdefine.elementType=='link'){
            		_self.currentLine=e.target;
            	}
	        })
			_mainscene.add(templink);
		};
		_mainstage.centerAndZoom();
	},
	createNode:function(_x,_y,_imgurl,_option){
		//x,y for Node Pos, img for Node imgurl
        var node = new JTopo.Node();
        node.suateamdefine={};
        node.suateamdefine=_option;
        var tempNodeImage = require('./img/'+_imgurl+'');
       	node.setImage(tempNodeImage, true);
        node.setLocation(Math.random() * 800, Math.random() * 300);
        if(_x==null||_y==null){
        	var temp_x=(this.nodesize*80);
        	var temp_y=this.nodesize;
        	node.setLocation(temp_x,temp_y);
        	node.suateamdefine.x=temp_x;
        	node.suateamdefine.y=temp_y;
        }else{
        	node.setLocation(_x,_y);
        };
        node.text = node.suateamdefine.description.devicename; // 文字
        node.textPosition = 'Middle_Center';// 文字居中
        node.textOffsetY = 50; // 文字向下偏移8个像素
        node.font = '14px "Helvetica Neue",Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif'; // 字体
        node.fontColor= "101,101,101";
        node.fillColor='255,0,0';
        if(node.suateamdefine.warn!==null){
        	setInterval(function(){
                if(node.alarm==node.suateamdefine.warn){
                   node.alarm=null;
                }else{
                    node.alarm=node.suateamdefine.warn;
                };
            },600);	
        };
       /* node.mouseover(function(e){
        	var domString="<div class='topo_popover'>"+"layer"+"</div>"
        	$(".topo_canvasframe").append(domString);
        	var w=e.target.suateamdefine.x;
        	var h=e.target.suateamdefine.y;
          	$(".topo_popover").css("left",w+210);
          	$(".topo_popover").css("top", h+57);
        });*/
        node.mouseout(function(e){
        	$(".topo_popover").remove();
        });
        node.mousemove(function(e){
          	if(e.target.suateamdefine.elementType=='node'){
          		e.target.suateamdefine.x=(e.offsetX);
          		e.target.suateamdefine.y=(e.offsetY);
          	};
      	});  
//      console.log(node)
        return node;
	},
	addLinkNode:function(_linkType,_mainscene,_callback){
//		console.log("addLinkNode_ftn_start");
		_mainscene.removeAllEventListener() ;
		var _self =this;
		_self.addLinkNodeArg.templinkNodeA=null;
		_self.addLinkNodeArg.templinkNodeZ=null;
		_self.addLinkNodeArg.beginNode=null;
		_self.addLinkNodeArg.endNode=null;
		_self.addLinkNodeArg.tempCreateLink=null,
		_self.addLinkNodeArg.confirmLink=null,
		_self.linkType=_linkType;
		_self.addLinkNodeArg.templinkNodeA = new JTopo.Node('tempA');
		_self.addLinkNodeArg.templinkNodeA.setSize(1, 1);
       	_self.addLinkNodeArg.templinkNodeZ = new JTopo.Node('tempZ');;
       	_self.addLinkNodeArg.templinkNodeZ.setSize(1, 1);
		switch(_linkType){
			case 'link':
			//连线
//			console.log("linkType:"+_linkType);
			_self.addLinkNodeArg.tempCreateLink = new JTopo.Link(_self.addLinkNodeArg.templinkNodeA,_self.addLinkNodeArg.templinkNodeZ);
			_self.addLinkNodeArg.tempCreateLink.strokeColor='195,195,195';
			_self.addLinkNodeArg.tempCreateLink.dashedPattern = 3;
			break;
			case 'fold_link':
			//折线
//			console.log("linkType:"+_linkType);
			_self.addLinkNodeArg.tempCreateLink =new JTopo.FoldLink(_self.addLinkNodeArg.templinkNodeA,_self.addLinkNodeArg.templinkNodeZ);
			_self.addLinkNodeArg.tempCreateLink.strokeColor='195,195,195';
			_self.addLinkNodeArg.tempCreateLink.dashedPattern = 3;
			break;
			case 'flexional_link':
			//二次折线
//			console.log("linkType:"+_linkType);
			_self.addLinkNodeArg.tempCreateLink = new JTopo.FlexionalLink(_self.addLinkNodeArg.templinkNodeA,_self.addLinkNodeArg.templinkNodeZ);
			_self.addLinkNodeArg.tempCreateLink.strokeColor='195,195,195';
			_self.addLinkNodeArg.tempCreateLink.dashedPattern = 3;
			break;
		};
		
  		_mainscene.click(function(e){
  			_self.nodeClickFtn(e,_mainscene,_callback);
  		});
    	
        _mainscene.mousedown(function(e){
            if(e.target == null || e.target === _self.addLinkNodeArg.beginNode || e.target === _self.addLinkNodeArg.tempCreateLink){
                _mainscene.remove(_self.addLinkNodeArg.tempCreateLink);
            }
        });
        _mainscene.mousemove(function(e){
          	_self.addLinkNodeArg.templinkNodeZ.setLocation(e.x, e.y);
      	});  
	},
	createLink:function(nodeA, nodeZ, text,dashedPattern){
		var link = new JTopo.Link(nodeA, nodeZ, text);        
        link.lineWidth = 3; // 线宽
        link.bundleOffset = 60; // 折线拐角处的长度
        link.bundleGap = 20; // 线条之间的间隔
        link.textOffsetY = 3; // 文本偏移量（向下3个像素）
        link.strokeColor = JTopo.util.randomColor(); // 线条颜色随机
        link.dashedPattern = dashedPattern; 
        return link;
	},
	createFoldLink:function(nodeA, nodeZ, text, direction, dashedPattern){
		var link = new JTopo.FoldLink(nodeA, nodeZ, text);
        link.direction = direction || 'horizontal';
        link.arrowsRadius = 15; //箭头大小
        link.lineWidth = 3; // 线宽
        link.bundleOffset = 60; // 折线拐角处的长度
        link.bundleGap = 20; // 线条之间的间隔
        link.textOffsetY = 3; // 文本偏移量（向下3个像素）
        link.strokeColor = JTopo.util.randomColor(); // 线条颜色随机
        link.dashedPattern = dashedPattern; 
        return link;
	},
	createFlexionalLink:function(){
		var link = new JTopo.FlexionalLink(nodeA, nodeZ, text);
        link.arrowsRadius = 10;
        link.lineWidth = 3; // 线宽
        link.offsetGap = 30;
        link.bundleGap = 15; // 线条之间的间隔
        link.textOffsetY = 10; // 文本偏移量（向下15个像素）
        link.strokeColor = JTopo.util.randomColor(); // 线条颜色随 机
        link.dashedPattern = dashedPattern; 
        return link;
	},
	clearEventListener:function(_mainscene){
		_mainscene.removeAllEventListener();
	},
	getJson:function(_mainscene){
		var getChildsArray=[];
		var getMainSceneChilds=_mainscene.childs;
		var getMainSceneChildsSize=getMainSceneChilds.length;
		for(var a=0;a<getMainSceneChilds.length;a++){
			getChildsArray.push(getMainSceneChilds[a].suateamdefine);
			if(getChildsArray.length==getMainSceneChildsSize){
				return JSON.stringify(getChildsArray);
			};
		};
	},
	removeLinkNode:function(_mainscene){
		if(this.currentLine!==null){
			_mainscene.remove(this.currentLine);
		}else{
			alert("未指定删除的元素")
		}
		
	}

	
}
module.exports = topoConfig;