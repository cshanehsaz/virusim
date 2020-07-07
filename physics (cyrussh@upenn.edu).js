class Physics{
    static collision(p1, p2){

        let p1_speed = Math.sqrt( Math.pow(p1.speedx, 2) + Math.pow(p1.speedy, 2) )
        let p1_angle = Math.atan( p1.speedy / p1.speedx )
        if( p1.speedx < 0 ) { p1_angle = Math.PI + p1_angle }


        let p2_speed = Math.sqrt( Math.pow(p2.speedx, 2) + Math.pow(p2.speedy, 2) )
        let p2_angle = Math.atan( p2.speedy / p2.speedx )
        if( p2.speedx < 0 ) { p2_angle = Math.PI + p2_angle }

        let h = Math.sqrt(Math.pow(p1.x-p2.x,2)+Math.pow(p1.y-p2.y, 2));
        let x = Math.abs(p1.x-p2.x);
        let y = Math.abs(p1.y-p2.y);

        let angleOfImpact = Math.asin(y/h);
        if(p1.x > p2.x) { angleOfImpact += Math.PI }
        

        let p1_xnew = p2_speed * Math.cos( p2_angle - angleOfImpact ) *
                        Math.cos( angleOfImpact ) + 
                        p1_speed * Math.sin( p1_angle - angleOfImpact ) * 
                        Math.cos( angleOfImpact + Math.PI / 2 )

        let p1_ynew = p2_speed * Math.cos( p2_angle - angleOfImpact ) *
                        Math.sin( angleOfImpact ) + 
                        p1_speed * Math.sin( p1_angle - angleOfImpact ) * 
                        Math.sin( angleOfImpact + Math.PI / 2 )


        let p2_xnew = p1_speed * Math.cos( p1_angle - angleOfImpact ) *
                        Math.cos( angleOfImpact ) + 
                        p2_speed * Math.sin( p2_angle - angleOfImpact ) * 
                        Math.cos( angleOfImpact + Math.PI / 2 )
        let p2_ynew = p1_speed * Math.cos( p1_angle - angleOfImpact ) *
                        Math.cos( angleOfImpact ) + 
                        p2_speed * Math.sin( p2_angle - angleOfImpact ) * 
                        Math.cos( angleOfImpact + Math.PI / 2 )


        // p.speedx = pcomp.speedx;
        // p.speedy = pcomp.speedy;
        // pcomp.speedx = tempx;
        // pcomp.speedy = tempy;

        p1.speedx = p1_xnew;
        p1.speedy = p1_ynew;
        p2.speedx = p2_xnew;
        p2.speedy = p2_ynew;


        p1.collided = true;
        p2.collided = true;

        // p1.x += .25 * Math.cos(angleOfImpact)
        // p1.y += .25 * Math.sin(angleOfImpact)
        // p2.x -= .25 * Math.cos(angleOfImpact)
        // p2.y -= .25 * Math.sin(angleOfImpact)

        p1.x += (p1.x > p2.x);
        p1.y += (p1.y > p2.y);
        p2.x += (p1.x < p2.x);
        p2.y += (p1.y < p2.y);

        // if( p1.x > p2.x ) {
        //     if( p1.y > p2.y ) {
        //         p1.x += .25 * Math.cos(angleOfImpact)

        //     } else {

        //     }
        // }
        // else {
        //     if( p1.y > p2.y ) {

        //     } else {

        //     }
        // }

    }
}

//NOTE:
//consider doing this so that we make our reference frame the velocity of ball 2
//that way we can always do a static collision then add the reference frame velocity at the end