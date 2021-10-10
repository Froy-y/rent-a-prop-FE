// import React, { useState } from "react"
// import axios from 'axios'

// async function postImage({image, description}) {
//     try {
//         const formData = new FormData()
//         formData.append("image", image)
//         formData.append("description", description)

//         const result = await axios.post('/images', formData, { headers: {"Content-Type": "multipart/form-data"} })
//         return result.data
//     } catch (err) {
//         console.log(err, "UPLOAD GONE WRONG")
//     }
// }

// const FileUpload = () => {
//     const [file, setFile] = useState()
//     const [description, setDescription] = useState("")
//     const [images, setImages] = useState([])

//     const handleSubmitFile = async (e) => {
//         e.preventDefault()
//         const result = await postImage({image: file, description})
//         setImages([result.image, ...images])
//     }

//     const handleChange = (e) => {
//         const file = e.target.files[0]
//         setFile(file)
//     }

//     return(
//         <>
//             <div>
//                 <form onSubmit={ handleSubmitFile }>
//                     <input type="file" onChange={ handleChange } accept="image/*"/>
//                     <input value="description" onChange={ e => setDescription(e.target.value) } type="text"/>
//                     <button type="submit">Upload!</button>
//                 </form>
//             </div>
//             <div>
//                 { images.map( image => (
//                     <div key={ image }>
//                         <img src={ image } />
//                     </div>
//                 ))}
//             </div>
//         </>
//     )
// }

// export default FileUpload