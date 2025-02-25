import React from 'react'
import { APP_NAME } from '@/lib/constants'
const Footer = () => {
    const currentYear = 2025;
    return (
      <footer className='border-t'>
            <div className='p-5 flex-center'>
            {currentYear}   |  {APP_NAME}. All rights reseverd

            </div>
      </footer>

  )
}

export default Footer
