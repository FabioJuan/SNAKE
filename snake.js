/*
    está pronto(só tem um bug caso mude para direções opostas muito rapido)
*/
var linha = []
var coluna = []
var cordX = [6,5,4,3,2,1]
var cordY = [1,1,1,1,1,1]
var dire = "direita"
var corpo_S = []
let ultimo_elmX = cordX.length -1 //pega o ultimo elemnto x
let ultimo_elmY = cordY.length -1 //pega o ultimo elemento y
var maca_x = parseInt(Math.random()*17) 
var maca_y = parseInt(Math.random()*17) 
var cres_x = 0
var cres_y = 0
var pause = false
//corpo_s indentifica todos os elementos que pertencem ao corpo da cobra e suas coordenadas
//elemtentopai.children retorna os elementos filhors de um elemento pai
window.onload = function(){
    linha_coluna()
    console.log(parseInt(Math.random()*17))
    //console.log(cordX[cordX.length-1],cordY[cordY.length-1])
    controi_corpo()
    maca()
    //console.log(coluna)
}
//obtem a matriz 10x10 do tabuleiro pegando a linha e os elementos filhos da linha x
function linha_coluna(){
    for(i = 0 ;i < 17; i++){
		let elemento_linha = document.createElement("section")
		elemento_linha.setAttribute("class", "linha")
        linha.push(elemento_linha)
		for(j = 0 ;j < 17; j++){
			let elemento_coluna = document.createElement("div")
			elemento_coluna.setAttribute("class", "coluna")
			elemento_linha.appendChild(elemento_coluna)
		}
		coluna.push(elemento_linha.children)
		let tabaleiro = document.querySelector(".tabaleiro")
		tabaleiro.appendChild(elemento_linha)
        //console.log(linha)
    }
}
//cria a cobrinha de forma automatica 
function controi_corpo(){
    for(i = 1; i < cordX.length;i++ ){
        corpo_S.push(coluna[cordY[i]][cordX[i]])
    }
}
//atualizacção do primeiro elemento  
setInterval(() => {
//console.log(cordX,cordY)
    pause_()
    if(pause == false){
        cres_x = cordX[ultimo_elmX]
        cres_y = cordY[ultimo_elmY]
        console.log(cres_x,cres_y)
        //console.log(ultimo_elmX,ultimo_elmY)
	    corpo()
        //console.log(dire)
        //console.log(parseInt(Math.random()*17))
            switch(dire){     
            case "cima":
               cordY[0]--
               coluna[cordY[0]][cordX[0]].style.backgroundColor = "purple"
            break;
            case "direita":
                cordX[0]++
                coluna[cordY[0]][cordX[0]].style.backgroundColor = "purple"           
            break;
            case "baixo":
                cordY[0]++
                coluna[cordY[0]][cordX[0]].style.backgroundColor = "purple"
            break;
            case "esquerda":
                cordX[0]--
                coluna[cordY[0]][cordX[0]].style.backgroundColor = "purple"
            break;
            }
        movimentacao()
	    si_mesmo()
        parede()
        //só é criado outra maça se o jogador comer a anterior 
        if(maca_x == cordX[0] && maca_y == cordY[0]){
            maca()
            cordX.push(cres_x)
            cordY.push(cres_y)
            console.log(cordX)
        }

    }    
}
, 250);
function movimentacao(){
    /*verifica qual tecla foi apertada e muda o valor da varialvel de controle
    da direção da cobrinha,nao se pode se pode mudar para direções opostas
    ex: indo para esquerda e virar direto para direita
    */
        addEventListener("keydown",(Event)=>{
        const tecla = Event.keyCode
        if(dire != "direita" && tecla == 65){
            dire = "esquerda"
        }else if(dire != "baixo" && tecla == 87){
            dire = "cima"
        }else if(dire != "esquerda" && tecla == 68){
            dire = "direita" 
        }else if(dire != 'cima' && tecla == 83){
            dire = "baixo"
        }
    })
}
function corpo(){
    //console.log(ultimo_elmX,ultimo_elmY)
    ultimo_elmY = cordY.length -1
    ultimo_elmX = cordX.length -1 //pega o ultimo elemnto x
    //poe a cor do chao na ponta da calda 
    coluna[cordY[ultimo_elmY]][cordX[ultimo_elmX]].style.backgroundColor= "rgb(47, 255, 47)"
    for(i = ultimo_elmX;i > 0;i--){
        //a atualização das novas coordenadas funciona da ponta da calda ate o inico
        cordX[i] = cordX[i-1]//a ultima coordenada vai receber a penultima ate a cabeça 
        cordY[i] = cordY[i-1]//ex: coluna[3] recebe coluna[2]
        coluna[cordY[i]][cordX[i]].style.backgroundColor = "blueviolet"
    }

}
function reset_tela(){
    //obtem a coordenada se respawn da cobrinha e a direção dela 
    console.log("morreu")
    cordX = [3,2,1]
    cordY = [1,1,1]
    dire = "direita" 
    //muda a cor de todos os quadradinhos para a cor do chão
    for(i = 0 ; i < linha.length; i++){
        for(e = 0; e < coluna.length; e++){
            //console.log(linha[i])
            //console.log(coluna[0][0])
            if(i == 0 || i == linha.length-1 || e == 0 || e == linha.length-1){
                coluna[i][e].style.backgroundColor = "green"
            }else{
                coluna[i][e].style.backgroundColor = "rgb(49, 248, 49)"
            }

        }
    }
    maca()
}
function si_mesmo(){
    //verifica se a cabeça esta em uma mesma coordenada q uma parte do corpo
    for(i = 1; i < cordX.length;i++){
        if(cordX[i] == cordX[0] && cordY[i] == cordY[0]){
            reset_tela()
        }
    }
}
function parede(){
    if(cordX[0] == 0 || cordX[0] ==linha.length  -1|| cordY[0] == 0 || cordY[0] == linha.length-1 ){
        reset_tela()
    }
}
function maca(){
    //console.log(maca_x,maca_y)
    maca_x = parseInt(Math.random()*17)//escolhe aleatoriamente a coordenada de x de 0 a 16
    maca_y = parseInt(Math.random()*17)// ...     ...            .  ..       .. y de 0 a 16
    for(i = 0; i < cordX.length-1; i++){//verifica todos as coordeadas do corpo da cobra
        if(cordX[i] == maca_x && cordY[i] == maca_y ){
            //se a coordenada escolhida for igual a uma das pastes da cobra é chamado novamente a funcção maca
            //console.log("esta na cobra")
            maca()
        }
    }
    if(maca_x > 0 && maca_y > 0  && maca_x < 16 && maca_y < 16){//verifica se a maça nasce na borda
        coluna[maca_y][maca_x].style.backgroundColor = "red"
    }else{//se nasceu na borda ele chama novamente a função maca
        //console.log("não pode ter maça aqui na borda")
        maca()
    }
}
function pause_(){
    addEventListener("keydown",(Event)=>{
        const espaco = Event.keyCode
        if(espaco == 32){
            pause = !pause
        }
    })
}
/*    
    codgo do corpo feito pelo chatgpt
    }
    // Atualiza a posição do último elemento do corpo (a cauda) para a posição da cabeça
    let ultimoX = cordX[cordX.length - 1];
    let ultimoY = cordY[cordY.length - 1];
    coluna[ultimoY][ultimoX].style.backgroundColor = "rgb(47, 255, 47)";  // Cor da cauda
    
    // Mover cada segmento do corpo (exceto a cabeça)
    for (let i = cordX.length - 1; i > 0; i--) {
        // Atualiza as coordenadas do segmento do corpo para as coordenadas do segmento anterior
        cordX[i] = cordX[i - 1];
        cordY[i] = cordY[i - 1];

        // Atualiza a cor do segmento
        coluna[cordY[i]][cordX[i]].style.backgroundColor = "purple";
    }
*/
