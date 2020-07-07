class Physics{
    static collision(p1, p2){
        let tempx = p1.speedx;
        let tempy = p1.speedy;

        //find angle of tangent by taking reciprocal of angle between radii
        let h = Math.sqrt(Math.pow(p1.x-p2.x,2)+Math.pow(p1.y-p2.y, 2));
        let x = Math.abs(p1.x-p2.x);
        let y = Math.abs(p1.y-p2.y);

        //new procedure
        let referenceFrameVX = p2.speedx;
        let referenceFrameVY = p2.speedy;
        p1.speedx -= referenceFrameVX;
        p2.speedx -= referenceFrameVX;
        p1.speedy -= referenceFrameVY;
        p2.speedy -= referenceFrameVY;
        console.log("test 1 passed: " + String(p2.speedx === 0 && p2.speedy === 0)) //tests to see if p2 vel is 0


        let magnitude = Math.sqrt(Math.pow(p1.speedx,2) + Math.pow(p1.speedy,2))

        //set this so that you add or subtract 90 depending on the inbound angle of the ball
        let angleOfApproachA = (p1.speedy < 0) ? 2*Math.PI - Math.acos(p1.speedx / Math.sqrt(Math.pow(p1.speedx, 2) + Math.pow(p1.speedy, 2) )) : //negative or positive depending on incoming ball
                                                    Math.acos(p1.speedx / Math.sqrt(Math.pow(p1.speedx, 2) + Math.pow(p1.speedy, 2) ));
        let angleOfApproachG = (p2.speedy < 0) ? 2*Math.PI - Math.acos(p2.speedx / Math.sqrt(Math.pow(p2.speedx, 2) + Math.pow(p2.speedy, 2) )) : //negative or positive depending on incoming ball
        Math.acos(p2.speedx / Math.sqrt(Math.pow(p2.speedx, 2) + Math.pow(p2.speedy, 2) ));
        
        let angleOfHit = (p1.x > p2.x) ? Math.PI - Math.asin(y/h) : Math.asin(y/h); //if p1 is on the right of p2, make the angle of impact change.

        let angleOfBounce = angleOfHit + Physics.checkAngles(angleOfHit, angleOfApproachA)

        console.log("p1.x, p1.y: " + Math.round(p1.x, 2) + ", " + Math.round(p1.y,2))
        console.log("p2.x, p2.y: " + Math.round(p2.x, 2) + ", " + Math.round(p2.y,2))
        console.log("p1.speedx, p1.speedy: " + Math.round(p1.speedx) + ", " + Math.round(p1.speedy))
        console.log("angleOfApproach: " + angleOfApproach)
        console.log("angleOfHit: " + angleOfHit)
        console.log("angleOfBounce: " + angleOfBounce)

        //collision logic for one ball in motion goes here
        //p1 is in motion, p2 is static
        let p1_final_speed = ((p1.speedx/Math.sin(angleOfHit)) - (p1.speedy/Math.cos(angleOfHit))) / ((Math.sin(angleOfBounce)/Math.sin(angleOfHit)) - (Math.cos(angleOfBounce)/Math.cos(angleOfHit)))
        let p2_final_speed = Math.sqrt(Math.pow(magnitude, 2) - Math.pow(p1_final_speed, 2))
        
        p1.speedx = p1_final_speed * Math.cos(angleOfBounce)
        p1.speedy = p1_final_speed * Math.sin(angleOfBounce)
        p2.speedx = p2_final_speed * Math.cos(angleOfHit)
        p2.speedy = p2_final_speed * Math.sin(angleOfHit)
        console.log("p1 speedx, y after: " + p1.speedx + ", " + p1.speedy)
        console.log("p2 speedx, y after: " + p2.speedx + ", " + p2.speedy)

        console.log("Test 2: Original Energy - " + String(Math.pow(magnitude, 2)) + "...New Energy - " + String(Math.pow(p1_final_speed, 2) + Math.pow(p2_final_speed, 2)))
        console.log("------------------------------------------")
        console.log("------------------------------------------")

        // if(Math.abs(angleOfApproach - angleOfHit) > Math.PI / 2) {
        //     return(1); //kills the sim            
        // }

        //readd reference frame velocity
        p1.speedx += referenceFrameVX;
        p2.speedx += referenceFrameVX;
        p1.speedy += referenceFrameVY;
        p2.speedy += referenceFrameVY;


        //old procedure
        // p.speedx = pcomp.speedx;
        // p.speedy = pcomp.speedy;
        // pcomp.speedx = tempx;
        // pcomp.speedy = tempy;
        // p.collided = true;
        // pcomp.collided = true;
        // p.x += (p.x > pcomp.x)*2+-1;
        // p.y += (p.y > pcomp.y)*2+-1;
    }

    static checkAngles(angleOfHit, angleOfApproach) {
        let pi = Math.PI;
        let angleOfHitLower = angleOfHit - pi/2
        return (angleOfApproach < angleOfHit && angleOfApproach > angleOfHitLower) ? //if it's to the right of hit, ball goes right
                    -pi/2 : pi/2
    }
}

//NOTE:
//consider doing this so that we make our reference frame the velocity of ball 2
//that way we can always do a static collision then add the reference frame velocity at the end
//
// Also: Consider separating into direct and indirect for simplicity (wall is always direct)
// might be dumb because instead we can just use indirect as general for all collisions