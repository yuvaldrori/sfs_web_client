/*
   Copyright 2011 Lazar Laszlo (lazarsoft@gmail.com, www.lazarsoft.info)
   
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/


jsqrcode = {};
jsqrcode.imagedata = null;
jsqrcode.width = 0;
jsqrcode.height = 0;
jsqrcode.qrCodeSymbol = null;
jsqrcode.debug = false;

jsqrcode.sizeOfDataLengthInfo =  [  [ 10, 9, 8, 8 ],  [ 12, 11, 16, 10 ],  [ 14, 13, 16, 12 ] ];

jsqrcode.callback = null;

jsqrcode.decode = function(src){
	
	if(arguments.length==0)
	{
		var canvas_qr = document.getElementById("qr-canvas");
		var context = canvas_qr.getContext('2d');
		jsqrcode.width = canvas_qr.width;
		jsqrcode.height = canvas_qr.height;
		jsqrcode.imagedata = context.getImageData(0, 0, jsqrcode.width, jsqrcode.height);
        jsqrcode.result = jsqrcode.process(context);
        if(jsqrcode.callback!=null)
            jsqrcode.callback(jsqrcode.result);
		return jsqrcode.result;
	}
	else
	{
		var image = new Image();
		image.onload=function(){
			//var canvas_qr = document.getElementById("qr-canvas");
			var canvas_qr = document.createElement('canvas');
			var context = canvas_qr.getContext('2d');
			var canvas_out = document.getElementById("out-canvas");
			if(canvas_out!=null)
            {
                var outctx = canvas_out.getContext('2d');
                outctx.clearRect(0, 0, 320, 240);
				outctx.drawImage(image, 0, 0, 320, 240);
            }
			canvas_qr.width = image.width;
			canvas_qr.height = image.height;
            context.drawImage(image, 0, 0);
			jsqrcode.width = image.width;
			jsqrcode.height = image.height;
			try{
				jsqrcode.imagedata = context.getImageData(0, 0, image.width, image.height);
			}catch(e){
				jsqrcode.result = "Cross domain image reading not supported in your browser! Save it to your computer then drag and drop the file!";
				if(jsqrcode.callback!=null)
					jsqrcode.callback(jsqrcode.result);
				return;
			}
			
            try
            {
                jsqrcode.result = jsqrcode.process(context);
            }
            catch(e)
            {
				console.log(e);
                jsqrcode.result = "error decoding QR Code";
            }
			if(jsqrcode.callback!=null)
				jsqrcode.callback(jsqrcode.result);
		}
		image.src = src;
	}
}

jsqrcode.decode_utf8 = function ( s )
{
  return decodeURIComponent( escape( s ) );
}

jsqrcode.process = function(ctx){
	
	var start = new Date().getTime();

	var image = jsqrcode.grayScaleToBitmap(jsqrcode.grayscale());
    //var image = jsqrcode.binarize(128);
	
    if(jsqrcode.debug)
    {
        for (var y = 0; y < jsqrcode.height; y++)
        {
            for (var x = 0; x < jsqrcode.width; x++)
            {
                var point = (x * 4) + (y * jsqrcode.width * 4);
                jsqrcode.imagedata.data[point] = image[x+y*jsqrcode.width]?0:0;
                jsqrcode.imagedata.data[point+1] = image[x+y*jsqrcode.width]?0:0;
                jsqrcode.imagedata.data[point+2] = image[x+y*jsqrcode.width]?255:0;
            }
        }
        ctx.putImageData(jsqrcode.imagedata, 0, 0);
    }
	
	//var finderPatternInfo = new FinderPatternFinder().findFinderPattern(image);
	
	var detector = new Detector(image);

	var qRCodeMatrix = detector.detect();
	
	/*for (var y = 0; y < qRCodeMatrix.bits.Height; y++)
	{
		for (var x = 0; x < qRCodeMatrix.bits.Width; x++)
		{
			var point = (x * 4*2) + (y*2 * jsqrcode.width * 4);
			jsqrcode.imagedata.data[point] = qRCodeMatrix.bits.get_Renamed(x,y)?0:0;
			jsqrcode.imagedata.data[point+1] = qRCodeMatrix.bits.get_Renamed(x,y)?0:0;
			jsqrcode.imagedata.data[point+2] = qRCodeMatrix.bits.get_Renamed(x,y)?255:0;
		}
	}*/
    if(jsqrcode.debug)
        ctx.putImageData(jsqrcode.imagedata, 0, 0);
	
	var reader = Decoder.decode(qRCodeMatrix.bits);
	var data = reader.DataByte;
	var str="";
	for(var i=0;i<data.length;i++)
	{
		for(var j=0;j<data[i].length;j++)
			str+=String.fromCharCode(data[i][j]);
	}
	
	var end = new Date().getTime();
	var time = end - start;
	console.log(time);
    
	return jsqrcode.decode_utf8(str);
	//alert("Time:" + time + " Code: "+str);
}

jsqrcode.getPixel = function(x,y){
	if (jsqrcode.width < x) {
		throw "point error";
	}
	if (jsqrcode.height < y) {
		throw "point error";
	}
	point = (x * 4) + (y * jsqrcode.width * 4);
	p = (jsqrcode.imagedata.data[point]*33 + jsqrcode.imagedata.data[point + 1]*34 + jsqrcode.imagedata.data[point + 2]*33)/100;
	return p;
}

jsqrcode.binarize = function(th){
	var ret = new Array(jsqrcode.width*jsqrcode.height);
	for (var y = 0; y < jsqrcode.height; y++)
	{
		for (var x = 0; x < jsqrcode.width; x++)
		{
			var gray = jsqrcode.getPixel(x, y);
			
			ret[x+y*jsqrcode.width] = gray<=th?true:false;
		}
	}
	return ret;
}

jsqrcode.getMiddleBrightnessPerArea=function(image)
{
	var numSqrtArea = 4;
	//obtain middle brightness((min + max) / 2) per area
	var areaWidth = Math.floor(jsqrcode.width / numSqrtArea);
	var areaHeight = Math.floor(jsqrcode.height / numSqrtArea);
	var minmax = new Array(numSqrtArea);
	for (var i = 0; i < numSqrtArea; i++)
	{
		minmax[i] = new Array(numSqrtArea);
		for (var i2 = 0; i2 < numSqrtArea; i2++)
		{
			minmax[i][i2] = new Array(0,0);
		}
	}
	for (var ay = 0; ay < numSqrtArea; ay++)
	{
		for (var ax = 0; ax < numSqrtArea; ax++)
		{
			minmax[ax][ay][0] = 0xFF;
			for (var dy = 0; dy < areaHeight; dy++)
			{
				for (var dx = 0; dx < areaWidth; dx++)
				{
					var target = image[areaWidth * ax + dx+(areaHeight * ay + dy)*jsqrcode.width];
					if (target < minmax[ax][ay][0])
						minmax[ax][ay][0] = target;
					if (target > minmax[ax][ay][1])
						minmax[ax][ay][1] = target;
				}
			}
			//minmax[ax][ay][0] = (minmax[ax][ay][0] + minmax[ax][ay][1]) / 2;
		}
	}
	var middle = new Array(numSqrtArea);
	for (var i3 = 0; i3 < numSqrtArea; i3++)
	{
		middle[i3] = new Array(numSqrtArea);
	}
	for (var ay = 0; ay < numSqrtArea; ay++)
	{
		for (var ax = 0; ax < numSqrtArea; ax++)
		{
			middle[ax][ay] = Math.floor((minmax[ax][ay][0] + minmax[ax][ay][1]) / 2);
			//Console.out.print(middle[ax][ay] + ",");
		}
		//Console.out.println("");
	}
	//Console.out.println("");
	
	return middle;
}

jsqrcode.grayScaleToBitmap=function(grayScale)
{
	var middle = jsqrcode.getMiddleBrightnessPerArea(grayScale);
	var sqrtNumArea = middle.length;
	var areaWidth = Math.floor(jsqrcode.width / sqrtNumArea);
	var areaHeight = Math.floor(jsqrcode.height / sqrtNumArea);
	var bitmap = new Array(jsqrcode.height*jsqrcode.width);
	
	for (var ay = 0; ay < sqrtNumArea; ay++)
	{
		for (var ax = 0; ax < sqrtNumArea; ax++)
		{
			for (var dy = 0; dy < areaHeight; dy++)
			{
				for (var dx = 0; dx < areaWidth; dx++)
				{
					bitmap[areaWidth * ax + dx+ (areaHeight * ay + dy)*jsqrcode.width] = (grayScale[areaWidth * ax + dx+ (areaHeight * ay + dy)*jsqrcode.width] < middle[ax][ay])?true:false;
				}
			}
		}
	}
	return bitmap;
}

jsqrcode.grayscale = function(){
	var ret = new Array(jsqrcode.width*jsqrcode.height);
	for (var y = 0; y < jsqrcode.height; y++)
	{
		for (var x = 0; x < jsqrcode.width; x++)
		{
			var gray = jsqrcode.getPixel(x, y);
			
			ret[x+y*jsqrcode.width] = gray;
		}
	}
	return ret;
}




function URShift( number,  bits)
{
	if (number >= 0)
		return number >> bits;
	else
		return (number >> bits) + (2 << ~bits);
}


Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
