const canvas = document.getElementById("canvas")
const GAME_WIDTH = 600
const Unit = 20
const SNAKE_COLOR = 'white'
canvas.width = canvas.height = GAME_WIDTH
const ctx = canvas.getContext("2d")
const BACKGROUND_COLOR = 'black'
ctx.fillStyle = BACKGROUND_COLOR
ctx.fillRect(0, 0, GAME_WIDTH, GAME_WIDTH)
let point = 0
let check = true




const LEFT = 37
const UP = 38
const RIGHT = 39
const DOWN = 40





class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y
    }
}
let currentDirection = new Vector(-1, 0)



class Snake {
    constructor() {
        this.body = [
            new Vector(Unit * 4, Unit * 3),
            new Vector(Unit * 5, Unit * 3),
            new Vector(Unit * 6, Unit * 3),
        ]
        this.header = this.body[0]
        this.speed = new Vector(-1, 0)
    }
    draw() {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.body[0].x, this.body[0].y, Unit, Unit)
        ctx.fillStyle = SNAKE_COLOR
        for (let i = 1; i < this.body.length; i++) {
            ctx.fillRect(this.body[i].x, this.body[i].y, Unit, Unit)
        }
    }
    clear() {
        ctx.fillStyle = 'black'
        ctx.fillRect(this.body[0].x, this.body[0].y, Unit, Unit)
        ctx.fillStyle = BACKGROUND_COLOR
        for (let i = 1; i < this.body.length; i++) {
            ctx.fillRect(this.body[i].x, this.body[i].y, Unit, Unit)
        }
    }
    handleBound() {
        if (this.header.x < 0) {
            this.header.x = GAME_WIDTH - Unit
        }
        if (this.header.x > GAME_WIDTH - Unit) {
            this.header.x = 0
        }
        if (this.header.y < 0) {
            this.header.y = GAME_WIDTH - Unit
        }
        if (this.header.y > GAME_WIDTH - Unit) {
            this.header.y = 0
        }
    }


    move() {
        this.clear()
        for (let i = this.body.length - 1; i >= 1; i--) {
            this.body[i].x = this.body[i - 1].x
            this.body[i].y = this.body[i - 1].y
        }
        this.body[0].x += this.speed.x * Unit
        this.body[0].y += this.speed.y * Unit
        this.handleBound()
        this.draw()
    }
    checkEat(food) {
        let head = this.body[0]
        return food.x === head.x && food.y === head.y
    }

    grow() {
        let snakeLength = this.body.length
        let mountX = this.body[snakeLength - 1].x - this.body[snakeLength - 2].x
        let mountY = this.body[snakeLength - 1].y - this.body[snakeLength - 2].y
        let newPart = new Vector(this.body[snakeLength - 1].x + mountX, this.body[snakeLength - 1].y + mountY)
        this.body.push(newPart)
        this.draw()
    }

}


// thức ăn 
class Food {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    draw() {
        ctx.fillStyle = 'green'
        ctx.fillRect(this.x, this.y, Unit, Unit)
    }
    clear() {
        ctx.fillStyle = BACKGROUND_COLOR
        ctx.fillRect(this.x, this.y, Unit, Unit)
    }
    getRandom() {
        let random = Math.floor(Math.random() * GAME_WIDTH)
        random -= random % Unit
        return random
    }
    spawn() {
        this.clear()
        this.x = this.getRandom()
        this.y = this.getRandom()
        this.draw()
    }
}
let player = new Snake()
player.draw()


let food = new Food()
food.spawn()


setInterval(() => {
    player.move()

    if (player.checkEat(food)) {
        player.grow()
        food.spawn()
    }
}, 200);


document.onkeydown = function (e) {
    switch (e.keyCode) {
        case LEFT:
            if (currentDirection.x === 1) break
            player.speed = new Vector(-1, 0)
            currentDirection = new Vector(-1, 0)
            break;
        case RIGHT:
            if (currentDirection.x === 1) break
            player.speed = new Vector(1, 0)
            currentDirection = new Vector(1, 0)
            break;
        case UP:
            if (currentDirection.y === 1) break
            player.speed = new Vector(0, -1)
            currentDirection = new Vector(0, -1)
            break;
        case DOWN:
            if (currentDirection.y === -1) break
            player.speed = new Vector(0, 1)
            currentDirection = new Vector(0, 1)
            break;

        default:
            break;
    }
}
document.write(point)