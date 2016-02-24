module.exports = {
	index_insert:function(arr,key,value,init){
		var index=arr.indexOf(arr.filter(function(el){return el[key]==value;})[0]);
		if(index==-1){
			var obj={}
			obj[key]=value;
			for(var k in init)
				obj[k]=init[k];
			arr.push(obj);
			index=arr.length-1;
		}
		return index;
	},
	JSONmerge:function(obj1,obj2){
		var result={};
		for(var key in obj1)
			result[key]=obj1[key];
		for(var key in obj2)
			result[key]=obj2[key];
		return result;
	}
}