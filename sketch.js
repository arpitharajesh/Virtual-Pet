var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood, feedDog;
var foodObj;
var time, readTime;

//create feed and lastFed variable here
  var feed, lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  
  

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  

  feedDog = createButton("Feed the Dog");
  feedDog.position(700,95);
  feedDog.mousePressed(deductFood);
  if(feedDog.mousePressed){
    console.log(hour())
  }
  
  

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  //background(46,139,87);
  background("red")

  foodObj.display();

  //write code to read fedtime value from the database 
  //time = hour();
  lastFed = database.ref('FeedTime');
  lastFed.on("value", Lastfed);

  
 
  //write code to display text lastFed time here
  if(lastFed> 12 || lastFed ===12){
    textSize(25)
    text("Last fed is at"+time+"pm", 300, 30)
  }
  else if(lastFed == 0){
    textSize(25)
   text("Last fed is at 12 am", 300, 30);
  }
  else{
    textSize(25)
    text("Last fed is"+ time+"am", 300, 30)
  }


 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}



//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function deductFood(){
  foodS--;
  database.ref('/').update({
    Food: foodS
  })
  dog.addImage(happyDog);
  
}
// to update time in database 
function Lastfed(data){
 time = hour();
  lastFed.getFedTime(time);

}