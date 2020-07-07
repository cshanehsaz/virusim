class Point {
    constructor(x,y,speedx,speedy) {
        this.x = x
        this.y = y
        this.speedx = speedx
        this.speedy = speedy
        this.collided = false
        this.status = 'not' //statuses: not, inf, rec, dead, vac
        this.timeInfected = 0
        this.updateColor()
    
        //this.color = color(Math.random()*255,Math.random()*255,Math.random()*255) //makes all random colors for testing

    }

    updateColor() {
        if(this.isNotInfected()) {this.color = color(0,255,0)}
        else if(this.isInfected()) {this.color = color(255,0,0)}
        else if(this.isRecovered()) {this.color = color(0,0,255)}
        else if(this.isDead()) {this.color = color(255,0,255)}
        else if(this.isVaccinated()) {this.color = color(192,192,192)}
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