import react from 'react'
import './HomeScreen.css'
import '../Banner.css'
import Nav from '../Nav'
import Banner from '../Banner'
import requests from '../Requests'
import Row from '../Row'

function HomeScreen() {
    return (
        <div className="homeScreen">
            <Nav />
         
            <Banner />

            <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchTrending} isLargeRow />
            <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
            <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
            <Row title="Comedy Movies" fetchUrl={requests.fetchNetflixOriginals} />
            <Row title="Horror Movies" fetchUrl={requests.fetchComedyMovies} />
            <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
            <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />


        </div>
        )
}

export default HomeScreen