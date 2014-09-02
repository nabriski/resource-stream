ResourceStream = function(url){

    var xhr = new XMLHttpRequest(),
        lastPos = 0, 
        dataCB, 
        endCB;

    xhr.onreadystatechange = function(readyState){
        if(xhr.readyState === 3 && xhr.response){

            var str      = xhr.responseText.substring(lastPos),
                buf     = new ArrayBuffer(str.length),
                bufView = new Uint8Array(buf);

            for (var i=0, strLen=str.length; i<strLen; i++) {
                bufView[i] = str.charCodeAt(i) & 0xff;
            }

            lastPos+=str.length;

            if(typeof(dataCB) === "function") dataCB(buf);
        }

        if(xhr.readyState === 4){
            if(typeof(endCB) === "function") endCB();
        }

    };

    xhr.open("GET", url, true);
    xhr.overrideMimeType('text\/plain; charset=x-user-defined');

    return {
        on : function(eventType,cb){
            if(eventType === "data"){
                dataCB = cb;    
            }    

            if(eventType === "end"){
                endCB = cb;    
            }   
        },
        read : function(){
            xhr.send();
        }
    };
};

