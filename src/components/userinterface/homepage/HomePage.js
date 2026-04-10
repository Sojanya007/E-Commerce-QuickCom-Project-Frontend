import OfferScroll from './OfferScroll'
import Header from './Header'
import AdScroll from './AdScroll'
import ProductsScroll from './ProductsScroll'
import Footer from './Footer'
import { getData, postData } from '../../../services/FetchNodeAdminServices'
import { useState, useEffect } from 'react'
 

export default function HomePage() {
    const [banners, setBanners] = useState([])
    const [bankOffer, setBankOffer] = useState([])
    const [adOffer, setAdOffer] = useState([])
    const [popularProducts,setPopularProducts] = useState([])
    const [refresh, setRefresh] = useState(false)
    

    const fetchAllProductDetails = async (productstatus) => {
        var result = await postData('userinterface/display_all_productdetail_by_status',{productstatus})
       if (result && result.data) {
        setPopularProducts(result.data)
       } else {
        setPopularProducts([])
    }
    }

    const fetchAllOffers = async () => {
        var result = await getData('userinterface/all_adoffers')
        if (result && result.data) {
        setAdOffer(result.data)
       } else {
        setAdOffer([])
    }
    }
    const fetchAllBanners = async () => {
        var result = await getData('userinterface/show_all_banner')
        if (result && result.data) {
        setBanners(result.data)
        } else {
        setBanners([])
    }
    }
    const fetchAllBankOffer = async () => {
        var result = await getData('userinterface/show_all_bankoffer')
        if (result && result.data) {
        setBankOffer(result.data)
    } else {
        setBankOffer([])
    }
    }
    useEffect(function () {
        fetchAllBanners()
        fetchAllBankOffer()
        fetchAllOffers()
        fetchAllProductDetails('Popular')

    }, [])
    return (<div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <div>
            <Header />
        </div>

        <div style={{ width: '82.6%', alignSelf: 'center', marginTop: 35 }}>
            <OfferScroll state={"Offer"} data={adOffer} />
        </div>

        <div style={{ width: '82.6%', alignSelf: 'center', marginTop: 40 }}>
            <OfferScroll state={"Bank"} data={bankOffer} />
        </div>

        <div style={{ width: '82%', alignSelf: 'center', marginTop: 55 }}>
            <ProductsScroll refresh={refresh} setRefresh={setRefresh} title={'Popular'} data={popularProducts} />
        </div>

        <div style={{ width: '82%', alignSelf: 'center', marginTop: 50 }}>
            <ProductsScroll refresh={refresh} setRefresh={setRefresh} title={'Top Brands'} data={popularProducts} />
        </div>


        <div style={{ width: '82%', alignSelf: 'center', marginTop: 40 }}>
            <AdScroll data={banners} />
        </div>
 
 

        <div style={{ width: '100%', alignSelf: 'center', marginTop: 40 }}>
            <Footer />
        </div>


      

    </div>)
}