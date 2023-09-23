import React from 'react'

const Banner = () => {
    return (
        <section className="banner-area" id="home">	
        <div className="container">
            <div className="row fullscreen d-flex align-items-center justify-content-start">
                <div className="banner-content col-lg-7">
                    <h5 className="text-white text-uppercase">Author: Travor James</h5>
                    <h1 className="text-uppercase">
                        New Adventure				
                    </h1>
                    <p className="text-white pt-20 pb-20">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod temp <br/> or incididunt ut labore et dolore magna aliqua. Ut enim ad minim.
                    </p>
                </div>
                <div className="col-lg-5 banner-right">
                    <img className="img-fluid" src="img/header-img.png" alt=""/>
                </div>												
            </div>
        </div>
    </section>
    )
  }
  
  export default Banner