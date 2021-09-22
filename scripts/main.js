var input=document.createElement('input');
input.type="file";
input.addEventListener('change', readSingleFile, false);
input.setAttribute("accept", ".csv");
document.addEventListener("DOMContentLoaded", function() {

    if(confirm ('Dosya Yuklemek Ister Misin?'))
    {   
    input.click();
    }

 
 });
function readSingleFile(e) {
    var file = e.target.files[0];
    if (!file) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
      var contents = e.target.result;
      console.log(csvJSON(contents));
    };
    reader.readAsText(file);
}

function csvJSON(csv){
       

    var lines=csv.split("\n");
  
    var result = [];
  
    var headers=lines[0].split(",");
  
    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        var currentline=lines[i].split(",");
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
  
        result.push(obj);
  
    }
    
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }
    
    

    

    
    
        