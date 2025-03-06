import React from 'react'
import LogoIcon from '../assets/icons/LogoIcon'
import Input from '../components/shared/Input'
import Button from '../components/shared/Button'

function Forgotpassword() {
  return (
    <div className='w-full p-10'>
     <LogoIcon/>
     <div className='flex flex-col items-center gap-5 justify-center mt-24'>
        <p className='text-3xl font-inter font-bold '>Enter the registered email address</p>
        <Input placeholder='Enter your email' />
        <Button className='w-42'> Submit</Button>
        
     </div>
    </div>
  )
}

export default Forgotpassword
