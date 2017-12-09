var data=
	{
    "deluxe": {
        "friends": [
            "Bob Smith",
            "Jane Doe",
            "Bubba Hyde",
            "Betsy Toheavens"
        ]
    },
    "shared": {
        "friends": [
            "Bob Smith"
        ]
    },
    "animal-friendly": {
        "friends": [
            "Bob Smith",
            "Jane Doe",
            "Bubba Hyde"
        ]
    },
    "another": {
        "friends": [
            "Bob Smith",
            "Jane Doe"
        ]
    },
    "and-another": {
        "friends": []
    }
}

$(function(){
	var romeType = getRomeType (data);
	var $rl =$(".roomType dl");
	//渲染房间列表
	$.each(romeType,function(index,val){
		$rl.append(`<dd>${firstUperrCase(val)}</dd>`)
	})
	//给每个房间绑定点击事件
	$rl.delegate("dd","click",function(){
		var romeText = firstLowCase($(this).text());
		var friendsArray = data[romeText].friends;
		$(this).siblings().removeClass("on").addClass("off");
		$(this).removeClass("off").addClass("on");
		$('.roomDetail h2').html(romeText.charAt(0).toUpperCase()+romeText.slice(1));
	    $('.roomDetail .friends-detail').html('<i class="iconfont">&#xe612;</i>'+outPut(friendsArray));
	   
	})
	$rl.click(function(){
		$(".roomType dl ").toggleClass("active");
			
	})
	//默认第一个房间被点击
		var $rdd1 =$(".roomType dl dd").eq(0);
		$rdd1.trigger("click");
		$rdd1.addClass("on");

})

//将第一个字母转换为小写
function firstLowCase(string){
	return string.charAt(0).toLowerCase()+string.slice(1)
}
//将第一个字母转换为大写
function firstUperrCase(string){
	return string.charAt(0).toUpperCase()+string.slice(1)
}
//获取房间类型,按根据朋友个数按照升序排序
function getRomeType(obj){
	var roomType = [];
	var frindes=[];
	for( p in obj ){
		frindes.push(obj[p].friends);
	}
	//将二维数组升序排列
	var newfrindes = frindes.sort(function(a,b){return a.length-b.length;})
		for (var i = 0; i < newfrindes.length; i++) {
			for(p in obj){
				if(newfrindes[i].length === obj[p].friends.length){
					roomType.push(p);
				}
			}
		}
		return roomType;
}
//根据规则展示朋友信息
function outPut(arr){
	var length=arr.length;
	if(length){
		if(length == 1){
			return `${arr[0]} has stayed in this room`;
		}
		if(length == 2){
			return `${arr[0]} and ${arr[1]} have stayed in this room`;
		}
		if(length == 3){
			return `${arr[0]},${arr[1]} and  1 other friend have stayed in this room`;
		}
		if(length > 3){
			return `${arr[0]},${arr[1]} and ${arr.length-2} other friends have stayed in this room`;
		}
	}else{
		return "NoBody in this room";
	}
}