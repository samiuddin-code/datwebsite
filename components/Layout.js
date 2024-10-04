import { useEffect } from 'react'
import Router from 'next/router';
import Header from '@/header/Header'
import Footer from '@/footer/Footer'
import Cookies from '@/cookies/Cookies'
import { isInViewport } from '@/helpers/helpers';
import ModalComponent from '@/modals/ModalComponent';
import BlogSection from '@/blogs/BlogSection';
const Layout = ({children,apiData,noImageHeader,modalForm,blogSection}) => {
  const settingsWrap = apiData[apiData.length - 1];
  const clientsData = apiData[apiData.length - 2];
  const blogData = apiData[apiData.length - 3];
  function elementInteractivity(){
    const box = document.querySelectorAll('.interactive-element');
    box.forEach(item => {
        if(isInViewport(item)){
          item.classList.add("add-interactivity");
        }
      }
    )
  }
  function watchInteractivity(){
    if(window.innerWidth > 1024){
      document.addEventListener('scroll', function () {
        elementInteractivity();
        }, {
            passive: true
      });
      document.addEventListener('DOMContentLoaded', function () {
        elementInteractivity();
        }, {
            passive: true
      });
    }
  }
  function removeInteractivity(){
    const box = document.querySelectorAll('.interactive-element');
    box.forEach(item => {
      item.classList.remove("add-interactivity");
    })
  }
  Router.events.on('routeChangeComplete', () => removeInteractivity()); 
  useEffect(() => {
    watchInteractivity();
  }, [])
  return (
    <>
      <Header noImageHeader={noImageHeader}/>
      <main> 
        {children}
        {
          blogSection &&
          <BlogSection data={blogData.data.rows}/>
        }
      </main>
      <Footer settingsWrap={settingsWrap} clientsData={clientsData}/>
      <Cookies />
      {
        modalForm &&
        <ModalComponent/>
      }
    </>
  )
}
Layout.defaultProps = {
  noImageHeader:false,
  modalForm:false,
  blogSection:false
}
export default Layout
  