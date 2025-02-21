import React from 'react'
import style from './footer.module.css'
export default function Icon({iconName}) {
  let myClass = 'fa-brands  fs-5 border border-2 rounded-circle p-2';
  if (iconName === 'twitter'){
    myClass += ' fa-twitter';
  }
  else if (iconName === 'instagram'){
    myClass += ' fa-instagram';
  }
  else if (iconName === 'linkedin'){
    myClass += ' fa-linkedin-in';
  }
  else if (iconName === 'facebook'){
    myClass += ' fa-facebook-f';
  }
  
  return (
    <>
      <a target='_blanl' href={iconName=='twitter'?'https://x.com/?lang=en':
               iconName=='instagram'?'https://www.instagram.com/':
               iconName=='linkedin'?'https://www.linkedin.com/feed/?trk=guest_homepage-basic_google-one-tap-submit':
               iconName=='facebook'?'https://www.facebook.com/ahed.mafarjeh':''  }>
          <i className={`${myClass} ${style.icon}`} />
      </a>
    
    </>
  )
}
