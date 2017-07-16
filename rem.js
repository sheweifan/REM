// rem 布局
;(function(win,dd){
	var doc = win.document;
	var docEl = doc.documentElement;

	var meta = document.querySelector('meta[name="viewport"]');
	var dpr = void 'fuck'
	var scale = void 'you'
	var remBuffer = {};
	var defaultRem = 100;
    var isIPhone = win.navigator.appVersion.match(/iphone/gi);
    var devicePixelRatio = win.devicePixelRatio;
    if (isIPhone) {
        if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {                
            dpr = 3;
        } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
            dpr = 2;
        } else {
            dpr = 1;
        }
    } else {
        dpr = 1;
    }
    scale = 1 / dpr;

    docEl.setAttribute('data-dpr',dpr);
    docEl.setAttribute('data-device',isIPhone?'ios':'android');
    doc.addEventListener('DOMContentLoaded', function(e) {
        doc.body.style.fontSize = 16 * dpr + 'px';
        doc.body.className+=' rem_ready';
    }, false);


    if(meta){
    	meta.setAttribute('content','initial-scale='+scale+',maximum-scale='+scale+',minimum-scale='+scale+',user-scalable=0')
    }else{
    	doc.write('<meta name="viewport" content="initial-scale='+scale+',maximum-scale='+scale+',minimum-scale='+scale+',user-scalable=0">');
    }
    var setFontSize = function(){
    	var docW = docEl.getBoundingClientRect().width;
        // console.log(docW/dpr)
        if (docW / dpr > 420) {
            docW = 350 * dpr;
        }
        // var _fs = Math.ceil( (docW/dpr)*defaultRem/(dd/dpr) )
    	var _fs = (docW/dpr)*defaultRem/(dd/dpr)
    	docEl.style.fontSize = _fs +'px';
        // docEl.style.width=docW+'px';

    	remBuffer.rem = _fs;
    };
    setFontSize();

	window.addEventListener('orientationchange', function (e) {
    	setTimeout(function(){
    		setFontSize()
    	},300);
    });

    remBuffer.setFontSize = setFontSize;
    remBuffer.dpr = dpr;
    remBuffer.isiphone = isIPhone;

    remBuffer.rem2px = function(d){
    	var val = (parseFloat(d) * this.rem).toFixed(0);
    	if(typeof d === 'string' && d.match(/rem$/)){
    		val += 'px';
    	}
        return val;
    }

    remBuffer.px2rem = function(d){
    	var val = (parseFloat(d) / this.rem).toFixed(2);
    	if(typeof d === 'string' && d.match(/px$/)){
    		val += 'rem';
    	}
        return val;
    }

    window.remBuffer = remBuffer;

})(window,640);
