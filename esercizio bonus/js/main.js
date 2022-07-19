const images = [
    {
        url: 'http://www.viaggiareonline.it/wp-content/uploads/2014/11/sweden_148857365.jpg',
        title: 'Svezia',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
    {
        url: 'https://static1.evcdn.net/images/reduction/1513757_w-1920_h-1080_q-70_m-crop.jpg',
        title: 'Perù',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
    {
        url: 'https://img.itinari.com/pages/images/original/0d3ed180-d22d-48e8-84df-19c4d888b41f-62-crop.jpg?ch=DPR&dpr=2.625&w=1600&s=7ebd4b5a9e045f41b4e0c7c75d298d6c',
        title: 'Chile',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
    {
        url: 'https://static1.evcdn.net/images/reduction/1583177_w-1920_h-1080_q-70_m-crop.jpg',
        title: 'Argentina',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
    {
        url: 'https://cdn.sanity.io/images/24oxpx4s/prod/ed09eff0362396772ad50ec3bfb728d332eb1c30-3200x2125.jpg?w=1600&h=1063&fit=crop',
        title: 'Colombia',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    }
];

//sezione crazione carousel e thumbnail
let carousel = document.getElementById('carousel');
let thumnails = document.getElementById('thumnails');

for(let i=0; i<images.length; i++){
    
    carousel.innerHTML +=`  <div class="image">
                                <h1>${images[i].title}</h1>
                                <p>${images[i].description}</p>
                                <img src="${images[i].url}">
                            </div>`;
            
    thumnails.innerHTML +=` <div class="thumbnail">
                                <img src="${images[i].url}">
                            </div> `;
};

//impostazione condizioni iniziali di selezione e scorrimento immagini 
let imageSelector = 0;
const imageContainer = document.querySelectorAll('.image');
imageContainer[imageSelector].classList.add('show');

const thumbnail = document.getElementsByClassName('thumbnail');
thumbnail[imageSelector].classList.add('show');

let clock = setInterval(goRight, 1000);//variabile che imposta lo scorrere delle immagini vergo destra di default
let direction = true;//variabile per controllare la direzione 
let permission = false;//variabile per evitare che, premendo più volte su play, i setInterval si accumulino 

//sezione dimensionamento adattivo thumbnail
for(i=0; i<images.length;i++){
    thumbnail[i].style.setProperty('width', `calc(100% / ${images.length})`);  
};

//sezione event listeners
let prev = document.getElementById('prev').addEventListener('click',() => { 
    clearInterval(clock);   
    goLeft();
    direction = false;
    permission = true;
});

let next = document.getElementById('next').addEventListener('click',() => {    
    clearInterval(clock);
    goRight();
    direction = true;
    permission = true;
});

let stop = document.getElementById('stop').addEventListener('click', function(){
    clearInterval(clock);
    permission = true;
});

let play = document.getElementById('play').addEventListener('click', function(){
    if(direction == true){
        clockRigth();
    }else{
        clockLeft();
    };  
});

let invert = document.getElementById('invert').addEventListener('click', function(){
    clearInterval(clock);
    if(direction == true){
        direction = false;
        permission = true;
        clockLeft();
    }else if(direction == false){
        direction = true;
        permission = true;
        clockRigth();
    };  
});

//sezione funzioni
function goLeft(event){
    for(let x=0; x<1; x++ ){
        imageContainer[imageSelector].classList.remove('show');
        thumbnail[imageSelector].classList.remove('show');
        imageSelector--;
        if(imageSelector<0){
            imageSelector = 4;  
        };
        imageContainer[imageSelector].classList.add('show');
        thumbnail[imageSelector].classList.add('show');
    };
    
};

function goRight(event){
    for(let x=0; x<1; x++ ){
        imageContainer[imageSelector].classList.remove('show');
        thumbnail[imageSelector].classList.remove('show');
        imageSelector++;
        if(imageSelector>4){
            imageSelector = 0;  
        };
        imageContainer[imageSelector].classList.add('show');
        thumbnail[imageSelector].classList.add('show');
    };
    
};

function clockRigth(){
    if(direction==true && permission==true){
        clock = setInterval(goRight, 1000);
    };
    permission = false;
};

function clockLeft(){
    if(direction == false && permission==true){
    clock = setInterval(goLeft, 1000);
    };
    permission = false;
};
