import { useEffect, useState } from "react"

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact';
const CAT_PREFIX_IMAGE_URL = "https://cataas.com";

export function App () {
    const [fact, setFact] = useState();
    const [imageUrl, setimageUrl] = useState();

    useEffect(() => {
        fetch(CAT_ENDPOINT_RANDOM_FACT)
            .then(res => res.json())
            .then(data => {
                const { fact } = data;
                setFact(data.fact)
            })

    },[])

    useEffect(() => {
        if (!fact) return
        
        const threeFirstWords = fact.split(" ").slice(0,3).join(" ");
        console.log(threeFirstWords)

        fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
            .then(res => res.json())
            .then(response => {
                const { url } = response;
                setimageUrl(url)
            }) 
    },[fact])

    return (
        <main>
            <h1>App de gatitos</h1>
            {fact && <p>{fact}</p>}
            {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={`Image extracted using the first three words of ${fact}`}></img>}
        </main>
    )
}