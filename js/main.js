window.onload = ()=>{
    let affichage = document.createElement('div')
    affichage.height = 80
    affichage.id = 'affichage' 
    affichage.style.border = '1px solid black'

document.body.appendChild(affichage)
    

    let canvas = document.createElement('canvas')
        canvas.width = 900
        canvas.height = 600 
        canvas.style.border = "2px solid balck"
        canvas.className = 'canvas'
    document.body.appendChild(canvas)

   

    

    document.addEventListener('keydown', intercepter)

    let ctx = canvas.getContext('2d')
    let dimension = 25
    let canvas_Whidt = canvas.width
    let canvas_height = canvas.height
    let isColision = false

    let score = 0 
    let niveau = 0 
    let vie = 3 

    let nombreBlockWhidt = canvas_Whidt/dimension
    let nombreBlockHeight = canvas_height/dimension

    /* propriete de serpent */

    let color = 'black'
   

    let xSerp = canvas_Whidt/2
    let ySerp = canvas_height/2

    let xPos = 0
    let yPos = 0  
    let tailleBody = 5 ;
    let position = []
    let niveauScore = 0 

    let tempsPomme = 0 
    let tempsMaxPomme = 100

    let keyCodeTouch = 0

    // Propriete de la pomme 

    let colorPomme = " red"
    let xPomme = Math.trunc(Math.random()*nombreBlockWhidt)*dimension
    let yPomme = Math.trunc(Math.random()*nombreBlockHeight)*dimension
    let rayonPomme = dimension/2 

    
      affichageScore()
    let game = ()=>{
        creerSerp()
        creerPomme()
       // collision()
        manger()
        collision()
        gestionVie()
        //console.log(collision);
    }
    let intervale = setInterval(game , 100) 
    //Gestion de la position de serpent
    let positionSerpent =()=>{
        xSerp = xSerp + xPos*dimension
        ySerp = ySerp + yPos*dimension
        position.push({x:xSerp , y:ySerp})
        while (position.length > tailleBody) {
            position.shift()
        }
    }
    //creerSerp()
    function creerSerp(){

        ctx.clearRect(0,0,canvas_Whidt,canvas_height)
        positionSerpent()
        ctx.fillStyle = color
       // ctx.fillRect(xSerp,ySerp,dimension,dimension)
        for (let index = 0; index < position.length; index++) {
            ctx.fillRect(position[index].x , position[index].y , dimension-1 , dimension-1)
            
        }
    }
    // function creer de pomme 

    function creerPomme(){
        ctx.beginPath()
        ctx.fillStyle = colorPomme
        ctx.arc(xPomme+rayonPomme,yPomme+rayonPomme,rayonPomme,0,2*Math.PI)
        ctx.fill()
        ctx.fillStyle = "green"
        ctx.fillText('v',xPomme+3,yPomme+6)
        ctx.closePath()
    }
    //teste s'il ya une collision

    function collision(){
        if (position.length < 5) {
            for (let i = 0; i < position.length-1; i++) {
                if (position[i].x == position[position.length -1]*x && 
                    position[i].y == position[position.length-1]*y ) {

                    isColision = true

                    break
                }
                
            }
        }
            
        
        if (xSerp < 0 || ySerp < 0 || xSerp+dimension > canvas_Whidt || ySerp+dimension > canvas_height) {
            isColision = true
        }
        //return isColision
    }
    // initialisation de la position de la pomme
     function initialisePosition() {
         xPomme = Math.trunc(Math.random()*nombreBlockWhidt)*dimension
         yPomme = Math.trunc(Math.random()*nombreBlockHeight)*dimension
         
     }
     function initialisePositionSerpent(){
        xSerp =  Math.trunc(Math.random()*nombreBlockHeight)*dimension
        ySerp =  Math.trunc(Math.random()*nombreBlockHeight)*dimension

     }
     
    // function verifie si on a mamnger

    function manger() {
        if (xPomme == xSerp && yPomme == ySerp) {
            score += 10 + 3*position.length
            niveauScore = Math.trunc(score/100)
            tailleBody += 5  
            affichageScore()
            initialisePosition()
        }else if (tempsPomme++ > tempsMaxPomme) {
            tempsPomme = 0
            initialisePosition()     
        }
        
    }
    // foction affichage score
     function affichageScore() {
        let message = `Score :  ${score} || Vie : ${vie} || Niveau : ${niveauScore}`
        document.getElementById('affichage').innerHTML = message
     }

     // function gestion de vie 
     function gestionVie() {
        if (isColision) {
            vie -- 
            isColision = false
            tailleBody = 5
            initialisePosition()
            initialisePositionSerpent()
            affichageScore()
            position = [position[position.length -1 ]]

            if (vie == 0) {
                ctx.fillStyle = 'black'
                ctx.fillText('GAMME OVER ' , canvas_Whidt/2 , canvas_height/2)
                clearTimeout(intervale)
                
            }
            
        }
     }

     // bouger ataumatique le pomme

    /* let pommmeAutomatique = () => setInterval(initialisePosition,4000)
        if (!manger()) {
            pommmeAutomatique()
        }
  */
  // interception aux claviers
    function intercepter(event){
       // console.log(event.keyCode);

        switch (event.keyCode) {
            case 37://gauche
            if (keyCodeTouch == 39) {
                break
            }
                xPos = -1 
                yPos = 0  
                keyCodeTouch = event.keyCode  
                break;
            case 38://haute
            if (keyCodeTouch == 40) {
                break
            }
                xPos = 0
                yPos= -1
                keyCodeTouch = event.keyCode
                break;

            case 39://droite
            if (keyCodeTouch == 37) {
                break
            }
                xPos = 1 
                yPos =0 
                keyCodeTouch = event.keyCode
                break;

            case 40://bas
            if (keyCodeTouch == 38) {
                break
            }
                xPos = 0
                yPos = 1
                keyCodeTouch = event.keyCode
                break;

            case 32://pause
                xPos = 0
                yPos = 0 
                break;
        
            default:
                break;
        }
    }
    
}