import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import appService from '../services/appService'

const CreatePost = () => {
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const handleSubmit = async (e) => {
        
        e.preventDefault()
        console.log("submmit")
        try {
            const results = await appService.post("/posts", {title, content})
            console.log(results)
            history.push("/posts")
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} action="">
                <div>
                  <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />  
                </div>
                <div>

                  <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="content" name="" id="" cols="30" rows="10"></textarea>  
                </div>
                
                <button>Submit</button>
            </form>
        </div>
    )
}

export default CreatePost
