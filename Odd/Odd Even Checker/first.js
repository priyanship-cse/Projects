

let input = document.querySelector(".input");
let button = document.querySelector(".button");
let result = document.querySelector(".result");
let bg = document.querySelector(".bg");

button.addEventListener("click", function () {
    let value = input.value;

    if (input.value === "") {
        result.innerText = " Please Enter a Value";
        result.style.color = "black";
    } else if ( value % 2 == 0 ) {
        result.innerText = " Even Number  " ;
         result.style.color = " red";
    } else  {
        result.innerText = " Odd Number ";
        result.style.color = "blue";
    }

    
});

bg.addEventListener("click" , function(){
        let r = Math.floor(Math.random()*256);
         let g = Math.floor(Math.random()*256);
          let b = Math.floor(Math.random()*256);
           document.body.style.backgroundColor = `rgb(${r} , ${g},${b})`;

});