import { useEffect, useState } from 'react'
import Banner from '../../components/Banner'
import ProductsList from '../../components/Products.List'

import resident from '../../assets/images_M35/images/resident.png'
import diablo from '../../assets/images_M35/images/diablo.png'
import zelda from '../../assets/images_M35/images/zelda.png'
import starWars from '../../assets/images_M35/images/star_wars.png'

export interface GalleryItem {
  type: 'image' | 'video'
  url: string
}

export type Game = {
  id: number
  name: string
  description: string
  release_date?: string
  prices: {
    discount?: number
    old?: number
    current?: number
  }
  details: {
    category: string
    system: string
    developer: string
    publisher: string
    lenguages: string[]
  }
  media: {
    thumbnail: string
    cover: string
    gallery: GalleryItem[]
  }
}

const Home = () => {
  const [promocoes, setPromocoes] = useState<Game[]>([])
  const [emBreve, setEmBreve] = useState<Game[]>([])

  useEffect(() => {
    fetch('https://fake-api-tau.vercel.app/api/eplay/promocoes')
      .then((res) => res.json())
      .then((res) => setPromocoes(res))

    fetch('https://fake-api-tau.vercel.app/api/eplay/em-breve')
      .then((res) => res.json())
      .then((res) => setEmBreve(res))
  }, [])

  return (
    <>
      <Banner />
      <ProductsList games={promocoes} title="Promoções" background="black" />
      <ProductsList games={emBreve} title="Em breve" background="black" />
    </>
  )
}

export default Home
