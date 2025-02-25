import './RoundedImage.css'

const RoundedImage = ({src, alt, width}) => {
  return (
    <img 
        className={`rounded-image ${width}`}
        src= {src}
        alt ={alt}
    />
  )
}

export default RoundedImage
