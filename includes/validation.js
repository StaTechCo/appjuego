$(document).ready(function(){
    var pathArray = window.location.pathname.split('/');
    var secondLevelLocation = pathArray[1];
    var localStorageName = secondLevelLocation;
  
    savedData = localStorage.getItem(localStorageName)==null?{registro: false, vidas: 0, victoria: false}:JSON.parse(localStorage.getItem(localStorageName)); 
    if(savedData.registro == false){
        if(pathArray[2] == 'menu'){
            window.location.href = '/'+ secondLevelLocation;
        }
        else{
            window.location.href = '/' + secondLevelLocation;
        }     
    }
});