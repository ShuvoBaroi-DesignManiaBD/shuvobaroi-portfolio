import Footer from '@/components/Footer'
import { FloatingNav } from '@/components/ui/FloatingNavbar'
import React, { ReactNode } from 'react'
import { getSiteInfo } from '../actions';

const commonLayout = async ({children}:{children: ReactNode | string}) => {
    // const pageData = await getPageInfo({ pageName: "Home" });
  const siteInfo = await getSiteInfo();
  return (
    <>
    <FloatingNav siteInfo={siteInfo}/>
    {children}
    <Footer siteInfo={siteInfo}/>
    </>
  )
}

export default commonLayout;
