var  c = document.getElementById("my-canvas");
var ctx = c.getContext("2d");



let loadImage=(src, callback)=>{
    let img = document.createElement("img");
    img.onload=()=> callback(img);
    img.src=src;
};
let imagePath = (frameNumber, animation)=> {
    return "/images/"+ animation +"/" + frameNumber + ".png";
};
let frames = {
    idle:[1, 2, 3, 4, 5, 6, 7, 8],
    kick:[1, 2, 3, 4, 5, 6, 7],
    punch:[1, 2, 3, 4, 5, 6, 7],
    backward:[1, 2,  3, 4, 5, 6],
    block:[1, 2, 3, 4, 5, 6, 7, 8, 9],
    forward:[1, 2, 3, 4, 5, 6],
};
let loadImages = (callback) => {
    let images = {idle: [], kick: [], punch: [],backward: [], block: [],forward: []};
    let imagesToLoad=0;
    ["idle", "kick", "punch","backward","block","forward"].forEach((animation) => {
        let animationFrames = frames[animation];
        imagesToLoad = imagesToLoad+animationFrames.length;
        animationFrames.forEach((frameNumber) => {
            let path = imagePath(frameNumber, animation);
            loadImage(path, (image) => {
                images[animation][frameNumber-1]=image;
                imagesToLoad = imagesToLoad-1;
                if(imagesToLoad === 0){
                    callback(images);
                }
            });
        });
    });
};
let animate = (ctx, images, animation, callback) =>{
    images[animation].forEach((image, index) => {
        setTimeout(() => {
            ctx.clearRect(100, 100, 400, 400);
            ctx.drawImage(image, 100, 100, 400, 400);
        }, index * 150);
    });
    setTimeout(callback, images[animation].length * 150);
};
loadImages((images)=>{
    let queueAnimations=[];
    let aux= () => {
        let selectedAnimation;
        if(queueAnimations.length===0){
            selectedAnimation="idle";
        }else {
            selectedAnimation=queueAnimations.shift();
        }
        animate(ctx, images, selectedAnimation, aux);
    };
    aux();
    document.getElementById("kick").onclick = () => {
        queueAnimations.push("kick");
    };
    document.getElementById("punch").onclick = () => {
        queueAnimations.push("punch");
    };
    document.getElementById("backward").onclick = () => {
        queueAnimations.push("backward");
    };
    document.getElementById("block").onclick = () => {
        queueAnimations.push("block");
    };
    document.getElementById("forward").onclick = () => {
        queueAnimations.push("forward");
    };
    document.addElementListener("keyup", (event) => {
        const key=event.key;
        if(key === "Arrowleft"){
            queueAnimations.push("kick");
        }
        else if(key === "Arrowright") {
            queueAnimations.push("punch");
        }
        else if(key === "Arrowup") {
            queueAnimations.push("backward");
        }
        else if(key === "Arrowdown") {
            queueAnimations.push("forward");
        }
        else  {
            queueAnimations.push("block");
        }
    });
});