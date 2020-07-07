class Point {
    constructor(x,y,r,speedx,speedy) {
        this.x = x
        this.y = y
        this.r = r
        this.speedx = speedx
        this.speedy = speedy
        this.collided = false
        this.status = 'not' //statuses: not, inf, rec, dead, vac
        this.timeInfected = 0
        this.updateColor()
    
        //this.color = color(Math.random()*255,Math.random()*255,Math.random()*255) //makes all random colors for testing

    }

    updateColor() {
        if(this.isNotInfected()) {this.color = "#00FF00"}
        else if(this.isInfected()) {this.color = "#FF0000"}
        else if(this.isRecovered()) {this.color = "#0000FF"}
        else if(this.isDead()) {this.color = "#FF00FF"}
        else if(this.isVaccinated()) {this.color = "#C0C0C0"}
    }

    isNotInfected() {
        if(this.status==='not') {return true}
        else {return false}
    }
    isInfected() {
        if(this.status==='inf') {return true}
        else {return false}
    }
    isRecovered() {
        if (this.status==='rec') {return true}
        else {return false}
    }
    isDead() {
        if(this.status==='dead') {return true}
        else {return false}
    }
    isVaccinated() {
        if(this.status==='vac') {return true}
        else {return false}
    }

    infect() {this.status = 'inf'}
    recover() {
        if(!this.isInfected()) {return}
        else if(this.isInfected() && this.timeInfected < 600) {this.timeInfected++}
        else {
            if(Math.random() < .9) {
                this.status='rec'
            } else {this.status='dead'}
            this.updateColor()
        }
    }
    vaccinate() {this.status='vac'}
}