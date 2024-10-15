import React from 'react'
import PillsNav from './PillsNav'

const UserMenu = () => {
    return (
        <>
        
            <section className="menu_sec sec_padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="comon_heading text-center">
                                <h2>OUR Special MENU</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                        </div>
                    </div>

                    <PillsNav />
                  
                </div>
            </section>

        </>
    )
}

export default UserMenu