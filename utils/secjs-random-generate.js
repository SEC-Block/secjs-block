
exports.randomGenerate = function (type, length){
	if(type == "number") {
		return Math.floor(Math.random() * Math.floor(length));
	} else if(type == "string") {
		return getRandomString(length)
	}
}

function getRandomString(length){
	var quotient = Math.floor(length/11);
	var remainder = length % 11;
	var result = []

	for(var i = 0; i < quotient; i++){
		result.push(Math.random().toString(36).substring(2, 13))
	}
	
	result.push(Math.random().toString(36).substring(2, remainder + 2))
	
	while(result.join("").length < length){
		result.push(verifyRandomStringLength(result.join(""), length))
	}
	
	return result.join("")
}

function verifyRandomStringLength(string, length){
	if(string.length < length){
		diff = length - string.length
		return getRandomString(diff)
	}
}