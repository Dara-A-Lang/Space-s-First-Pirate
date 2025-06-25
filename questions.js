function questions(){
  
let question = [
    "What is the name of the planet we live on?",
    "What is the big bright object we see in the daytime sky?",
    "Which planet is known as the 'Red Planet'?",
    "What shape is the Earth?",
    "What do we call a group of stars that form a pattern?",
    "What is the name of the galaxy that Earth is in?",
    "What is the last planet in our solar system?",
    "What do we call a star that explodes?",
    "What do astronauts wear in space to help them breathe?",
    "What is the ring around Saturn made of?",
    "What do we call the path a planet takes around the Sun?",
    "Which planet is the largest in our Solar System?",
    "What are shooting stars actually called?",
    "What is the smallest planet in our Solar System?",
    "What force keeps us on the ground on Earth?",
    "Which planet is famous for its big red spot?",
    "What do you call a piece of rock or metal that falls to Earth from space?",
    "What is the Sun mostly made of?",
    "What do we call the imaginary line Earth spins on?",
    "How long does it take Earth to go around the Sun?",
    "What is the name of the first person to walk on the Moon?",
    "What do you call the Moon when it is completely round?",
    "What is the name of the space agency in the United States?",
    "Which planet is closest to the Sun?",
    "What is the name of the biggest planet’s moon?",
    "What do we call it when the Moon blocks the Sun?",
    "How many planets are there in our Solar System?",
    "What color is Neptune?",
    "What do we call the time it takes for the Earth to spin once?",
    "What is the name of a star that is very close to Earth?"
];

let choices = [
    "a) Mars     b) Venus     c) Earth     d) Jupiter",
    "a) The Moon     b) The Sun     c) A star     d) A comet",
    "a) Jupiter     b) Mars     c) Mercury     d) Venus",
    "a) Flat     b) Cube     c) Sphere     d) Pyramid",
    "a) Galaxy     b) Planet     c) Constellation     d) Solar System",
    "a) Andromeda     b) Milky Way     c) Whirlpool     d) Sombrero",
    "a) Pluto     b) Jupiter     c) Mars     d) Neptune",
    "a) Comet     b) Supernova     c) Asteroid     d) Black hole",
    "a) Helmet     b) Spacesuit     c) Jetpack     d) Oxygen tank",
    "a) Gas and dust     b) Rock, ice, and dust     c) Liquid water     d) Fire",
    "a) Rotation     b) Orbit     c) Loop     d) Trail",
    "a) Saturn     b) Neptune     c) Earth     d) Jupiter",
    "a) Stars     b) Meteors     c) Asteroids     d) Fireballs",
    "a) Venus     b) Pluto     c) Mercury     d) Mars",
    "a) Magnetism     b) Friction     c) Gravity     d) Air pressure",
    "a) Saturn     b) Jupiter     c) Mars     d) Neptune",
    "a) Meteorite     b) Meteor     c) Asteroid     d) Satellite",
    "a) Rock and dust     b) Gas and water     c) Hydrogen and helium     d) Metal and ice",
    "a) Equator     b) Orbit     c) Axis     d) Latitude",
    "a) 24 hours     b) 1 year     c) 1 month     d) 10 years",
    "a) Yuri Gagarin     b) Buzz Aldrin     c) Neil Armstrong     d) Michael Collins",
    "a) New Moon     b) Full Moon     c) Half Moon     d) Crescent Moon",
    "a) NASA     b) SpaceX     c) ESA     d) ISRO",
    "a) Mercury     b) Venus     c) Earth     d) Mars",
    "a) Titan     b) Europa     c) Ganymede     d) Io",
    "a) Lunar eclipse     b) Solar eclipse     c) New Moon     d) Blackout",
    "a) Nine     b) Seven     c) Eight     d) Ten",
    "a) Green     b) Red     c) Blue     d) Yellow",
    "a) A day     b) A week     c) A year     d) A month",
    "a) Polaris     b) Sirius     c) The Sun     d) Betelgeuse"
];

let answer = [
    "c", "b", "b", "c", "c", 
    "b", "a", "b", "b", "b", 
    "b", "d", "b", "c", "c", 
    "b", "a", "c", "c", "b", 
    "c", "b", "a", "a", "c", 
    "b", "c", "c", "a", "c"
];

    RANinteger = int(random(0,29))
    user_answer = prompt(question[RANinteger]+"\n"+choices[RANinteger])
    
    if (user_answer.toLowerCase() == answer[RANinteger]){
        bullets += bullets_add
        window.alert("Corect answer! You get +"+bullets+" bullets")
    } else {
      bullets += bullets_add/5
      window.alert("Wong answer! You only get +"+bullets+" bullets \n\nThe answer was: "+answer[RANinteger])
    }
}
