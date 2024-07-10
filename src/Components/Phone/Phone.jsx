import React from 'react'
import { MotionConfig , easeInOut, motion } from 'framer-motion';
import './phone.css'
import watch from '../../assets/images/banner/Watches.webp'
import taplet from '../../assets/images/banner/Tablets.webp'
import device from '../../assets/images/banner/Philips.webp'

const Phone = () => { 
  return (
    <div className='container' style={{marginTop:"100px"}}>
        <div className='row'>
          <MotionConfig transition={{duration:1 , ease:"easeInOut"}}>
          <motion.div
          initial={{scale:0 , opacity:0}}
          whileInView={{scale:1, opacity:1}}
          className='col col-lg-3 col-md-6 col-xs-12'>
            <div className='child'>
             <i className="fa-solid fa-desktop me-2" style={{color:"blue",fontSize:"70px"}}></i>
             <h5>Desktop</h5>
             <p>Up to 30% 0ff</p>
             <p>Dell,Hp,Lenovo</p>
            </div>
          </motion.div>
          </MotionConfig>
          <MotionConfig transition={{duration:1 , ease:"easeInOut"}}>
          <motion.div
          initial={{scale:0 , opacity:0}}
          whileInView={{scale:1, opacity:1}}
           className='col col-lg-3 col-md-6 col-xs-12'>
          <div className='child'>
          <i class="fa-solid fa-headset"style={{color:"red",fontSize:"70px"}}></i>   
           <h5>Headset</h5>
           <p>Up to 30% 0ff</p>
           <p>Dell,Hp,Lenovo</p>       
           </div>
           </motion.div>
          </MotionConfig>
          <MotionConfig transition={{duration:1 , ease:"easeInOut"}}>
          <motion.div
          initial={{scale:0 , opacity:0}}
          whileInView={{scale:1, opacity:1}}
       className='col col-lg-3 col-md-6 col-xs-12'>
       <div  className='child'>
       <i class="fa-solid fa-mobile-screen"style={{color:"black",fontSize:"70px"}}></i>
           <h5>Mobile</h5>
           <p>Up to 30% 0ff</p>
          <p>Samsung,Oppo,Huahwi</p>
       </div>
       </motion.div>
       </MotionConfig>
       <MotionConfig transition={{duration:1 , ease:"easeInOut"}}>
          <motion.div
          initial={{scale:0 , opacity:0}}
          whileInView={{scale:1, opacity:1}}
      className='col col-lg-3 col-md-6 col-xs-12'> 
      <div className='child'>
      <i class="fa-solid fa-whiskey-glass"style={{color:"green",fontSize:"70px"}} />
       <h5>Glass</h5>
       <p>Up to 30% 0ff</p>
       <p>Dell,Hp,Lenovo</p>
      </div>
      </motion.div>
      </MotionConfig>
          <div className='settingP'>
          <div className='settingchild col col-lg-4 col-md-4 col-xs-12'>        
          <i class="fa-solid fa-truck"  />    
          <h5> Quick Delivery</h5>
          </div>
          <div className='settingchild col col-lg-4 col-md-4 col-xs-12'>
          <i class="fa-solid fa-user-secret"  />
          <h5>All Data Are Secret</h5>
             </div>
             <div className=' settingchild col col-lg-4 col-md-4 col-xs-12'>
             <i class="fa-solid fa-heart-circle-plus"  />
             <h5>Products Offers</h5>
             </div>
             </div>
             <div className = "image-container">
              <div className='image-child-1 col col-lg-6 col-md-6 col-xs-12'> 
                <img src={watch} alt='Tablets' />
                <img  src={taplet} alt='Watches' />
              </div>
              <div className='image-child-2 col col-lg-6 col-md-6 col-xs-12'> 
               <img src={device} alt='e-commerce image' />
              </div>

             </div>
        </div>
    </div>
  )
}

export default Phone